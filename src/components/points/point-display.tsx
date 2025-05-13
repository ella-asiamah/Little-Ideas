"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointDisplayProps {
  points: number;
  className?: string;
}

const PointDisplay: FC<PointDisplayProps> = ({ points, className }) => {
  const [displayPoints, setDisplayPoints] = useState(0);

  useEffect(() => {
    // Initialize displayPoints with the initial points value on mount, without animation
    setDisplayPoints(points);
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Animate only subsequent changes to points
    if (displayPoints === points) return;

    const difference = points - displayPoints;
    // Determine step: if points are increasing, step is positive, if decreasing, negative.
    // Ensure step is at least 1 or -1 to always make progress.
    let step = Math.sign(difference) * Math.max(1, Math.floor(Math.abs(difference) / 20)); // Faster animation

    if (step === 0 && difference !== 0) { // Ensure step is not zero if there's a difference
      step = Math.sign(difference);
    }
    
    const timer = setInterval(() => {
      setDisplayPoints(prev => {
        if (prev === points) {
          clearInterval(timer);
          return prev;
        }
        const nextValue = prev + step;
        // Stop if we've passed the target (for both increasing and decreasing)
        if ((step > 0 && nextValue >= points) || (step < 0 && nextValue <= points)) {
          clearInterval(timer);
          return points;
        }
        return nextValue;
      });
    }, 30); // Animation speed

    return () => clearInterval(timer);
  }, [points, displayPoints]);


  return (
    <div className={cn("flex items-center gap-2 p-2 bg-accent text-accent-foreground rounded-lg shadow-sm", className)}>
      <Star size={24} className="fill-current" />
      <span className="text-xl font-bold min-w-[50px] text-right">{displayPoints}</span>
      <span className="text-sm">Points</span>
    </div>
  );
};

export default PointDisplay;
