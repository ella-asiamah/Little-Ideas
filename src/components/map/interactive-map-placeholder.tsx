import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface InteractiveMapPlaceholderProps {
  currentLocation: string;
}

const InteractiveMapPlaceholder: FC<InteractiveMapPlaceholderProps> = ({ currentLocation }) => {
  return (
    <Card className="shadow-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Your Adventure Zone</CardTitle>
        <MapPin className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden relative">
          <Image
            src="https://picsum.photos/800/450"
            alt="Virtual map placeholder"
            layout="fill"
            objectFit="cover"
            data-ai-hint="map city"
            className="transition-transform duration-300 hover:scale-105"
          />
           <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4">
            <p className="text-background text-center text-xl font-semibold backdrop-blur-sm p-2 rounded">Exploring: {currentLocation}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Imagine finding good deeds here! (Interactive map coming soon)
        </p>
      </CardContent>
    </Card>
  );
};

export default InteractiveMapPlaceholder;
