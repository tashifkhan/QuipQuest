'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockAvatars } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
  className?: string;
}

export function AvatarSelector({ onSelect, className }: AvatarSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(mockAvatars[0]);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + mockAvatars.length) % mockAvatars.length;
    setCurrentIndex(newIndex);
    setSelectedAvatar(mockAvatars[newIndex]);
    onSelect(mockAvatars[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % mockAvatars.length;
    setCurrentIndex(newIndex);
    setSelectedAvatar(mockAvatars[newIndex]);
    onSelect(mockAvatars[newIndex]);
  };

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <button
        type="button"
        onClick={handlePrevious}
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Previous avatar"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <div className="relative rounded-full overflow-hidden w-24 h-24 border-4 border-primary/20 bg-background">
        <Image
          src={selectedAvatar}
          alt="Avatar"
          fill
          className="object-cover"
        />
      </div>
      
      <button
        type="button"
        onClick={handleNext}
        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Next avatar"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}