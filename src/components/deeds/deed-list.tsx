import type { FC } from 'react';
import DeedItem from './deed-item';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DeedListProps {
  deeds: string[];
  isLoading: boolean;
  onCompleteDeed: (deed: string, points: number) => void;
  onShareDeed: (deed: string) => void;
}

const DeedList: FC<DeedListProps> = ({ deeds, isLoading, onCompleteDeed, onShareDeed }) => {
  if (isLoading) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        Finding good deeds near you...
      </div>
    );
  }

  if (deeds.length === 0) {
    return (
      <p className="text-center p-4 text-muted-foreground">
        No deeds found for this location yet. Try generating some!
      </p>
    );
  }

  return (
    <ScrollArea className="h-[400px] rounded-md">
      <div className="space-y-3 p-1">
        {deeds.map((deed, index) => (
          <DeedItem
            key={index}
            deed={deed}
            pointsValue={Math.floor(Math.random() * 20) + 10} // Random points for now
            onComplete={onCompleteDeed}
            onShare={onShareDeed}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default DeedList;
