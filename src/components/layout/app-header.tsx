import type { FC } from 'react';
import { HandHeart } from 'lucide-react';
import PointDisplay from '@/components/points/point-display';

interface AppHeaderProps {
  points: number;
}

const AppHeader: FC<AppHeaderProps> = ({ points }) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HandHeart size={32} className="text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">KindredGo</h1>
        </div>
        <PointDisplay points={points} />
      </div>
    </header>
  );
};

export default AppHeader;
