import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function GameCard({
  title,
  children,
  footer,
  className,
  innerClassName,
}: GameCardProps) {
  return (
    <div className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden',
      'transition-all duration-200 hover:shadow-xl',
      className
    )}>
      {title && (
        <div className="bg-primary/10 p-4 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      )}
      
      <div className={cn('p-6', innerClassName)}>
        {children}
      </div>
      
      {footer && (
        <div className="bg-muted/30 p-4 border-t">
          {footer}
        </div>
      )}
    </div>
  );
}