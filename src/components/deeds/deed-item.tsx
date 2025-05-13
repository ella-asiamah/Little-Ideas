"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, CheckCircle, Zap } from 'lucide-react';

interface DeedItemProps {
  deed: string;
  pointsValue: number;
  onComplete: (deed: string, points: number) => void;
  onShare: (deed: string) => void;
}

const DeedItem: FC<DeedItemProps> = ({ deed, pointsValue, onComplete, onShare }) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start space-x-4 pb-3">
        <Gift className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
        <div>
          <CardTitle className="text-lg leading-tight">{deed}</CardTitle>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Zap size={14} className="text-yellow-500" /> Worth {pointsValue} points!
          </p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2 pt-3">
        <Button variant="outline" size="sm" onClick={() => onShare(deed)}>
          Share Idea
        </Button>
        <Button size="sm" onClick={() => onComplete(deed, pointsValue)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <CheckCircle className="mr-2 h-4 w-4" /> Complete Deed
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeedItem;
