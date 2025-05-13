"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateDeeds, type GenerateDeedsInput } from "@/ai/flows/generate-deeds";
import AppHeader from '@/components/layout/app-header';
import InteractiveMapPlaceholder from '@/components/map/interactive-map-placeholder';
import DeedList from '@/components/deeds/deed-list';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Compass } from 'lucide-react';

export default function KindredGoPage() {
  const [location, setLocation] = useState<string>("Central Park, New York");
  const [deeds, setDeeds] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [isLoadingDeeds, setIsLoadingDeeds] = useState<boolean>(false);
  const { toast } = useToast();

  // Effect to set initial points, avoids animation on first load
  useEffect(() => {
    // Simulate loading initial points if any
    // setPoints(0); // Or load from storage
  }, []);


  const handleGenerateDeeds = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Needed",
        description: "Please enter a location to find good deeds.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingDeeds(true);
    try {
      const input: GenerateDeedsInput = { location };
      const result = await generateDeeds(input);
      setDeeds(result.deeds);
      toast({
        title: "Deeds Generated!",
        description: `Found ${result.deeds.length} good deeds around ${location}.`,
      });
    } catch (error) {
      console.error("Failed to generate deeds:", error);
      toast({
        title: "Error",
        description: "Could not generate deeds. Please try again.",
        variant: "destructive",
      });
      setDeeds([]); // Clear deeds on error
    } finally {
      setIsLoadingDeeds(false);
    }
  };

  const handleCompleteDeed = (deed: string, deedPoints: number) => {
    setPoints(prevPoints => prevPoints + deedPoints);
    // Optionally remove deed from list or mark as completed
    // setDeeds(prevDeeds => prevDeeds.filter(d => d !== deed));
    toast({
      title: "Deed Completed!",
      description: `You earned ${deedPoints} points for: "${deed}". Keep it up!`,
      className: "bg-secondary text-secondary-foreground",
    });
  };

  const handleShareDeed = (deed: string) => {
    toast({
      title: "Sharing is Caring!",
      description: `You're about to share: "${deed}". (Sharing feature coming soon!)`,
    });
    // Implement actual sharing logic here if needed
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-blue-100 to-green-100">
      <AppHeader points={points} />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <InteractiveMapPlaceholder currentLocation={location} />
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Compass className="text-primary" /> Set Your Location</CardTitle>
                <CardDescription>Where are you looking to spread kindness today?</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Downtown, My Neighborhood"
                  className="text-base"
                />
              </CardContent>
              <CardFooter>
                 <Button onClick={handleGenerateDeeds} disabled={isLoadingDeeds} className="w-full bg-primary hover:bg-primary/90">
                  <Wand2 className="mr-2 h-5 w-5" />
                  {isLoadingDeeds ? "Finding Deeds..." : "Discover Good Deeds"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Kindness Quests</CardTitle>
                <CardDescription>Pick a deed and make a difference!</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DeedList
                  deeds={deeds}
                  isLoading={isLoadingDeeds}
                  onCompleteDeed={handleCompleteDeed}
                  onShareDeed={handleShareDeed}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} KindredGo. Spread kindness, one deed at a time.</p>
      </footer>
    </div>
  );
}
