/**
 * MVVGSection Component
 * 
 * Mission, Vision, Values, Goals section with:
 * - 4-card grid layout (desktop) / stacked (mobile)
 * - IntersectionObserver scroll animations
 * - GSAP micro-flip effects on reveal
 * - Icon pop and gradient glow on hover/tap
 * - Accessible expand/collapse functionality
 * - Analytics tracking via window.aboutMvvClicks
 */

import React, { useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Target, Eye, Gem, Rocket } from 'lucide-react';
import { mvvgData, trackMvvClick, type MVVGItem } from '@/data/aboutData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Icon mapping for card types
const iconMap: Record<MVVGItem['type'], React.ComponentType<{ className?: string }>> = {
  mission: Target,
  vision: Eye,
  values: Gem,
  goals: Rocket,
};

interface MVVGCardProps {
  item: MVVGItem;
  index: number;
  reducedMotion: boolean;
}

/**
 * Individual MVVG Card with expand functionality
 */
const MVVGCard: React.FC<MVVGCardProps> = ({ item, index, reducedMotion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  // Intersection observer for scroll reveal
  const { ref: observerRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
    onIntersect: (visible) => {
      if (visible && !reducedMotion && cardRef.current) {
        // GSAP micro-flip animation
        gsap.fromTo(
          cardRef.current,
          { 
            opacity: 0, 
            rotateX: -15,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
          }
        );
      }
    }
  });

  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
    // Track analytics
    trackMvvClick(item.id, item.title);
  }, [item.id, item.title]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const Icon = iconMap[item.type];

  return (
    <div 
      ref={(el) => {
        // Combine refs
        (observerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={cn(
        "glass-card p-6 lg:p-8 card-hover group",
        "transform perspective-1000",
        !reducedMotion && !isIntersecting && "opacity-0"
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Icon with hover effects */}
      <div className="relative mb-6">
        <div 
          className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-accent/20 to-accent/5",
            "border border-accent/20",
            "transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-glow-accent"
          )}
        >
          <Icon className="w-8 h-8 text-accent" />
        </div>
        {/* Glow effect on hover */}
        <div 
          className={cn(
            "absolute inset-0 w-16 h-16 rounded-xl",
            "bg-accent/20 blur-xl opacity-0",
            "transition-opacity duration-300",
            "group-hover:opacity-100"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 text-foreground">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {item.summary}
      </p>

      {/* Expandable Content */}
      <div 
        id={`mvvg-content-${item.id}`}
        className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isExpanded}
      >
        <div className="pt-4 border-t border-border">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {item.expandedContent}
          </p>
        </div>
      </div>

      {/* Read More Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`mvvg-content-${item.id}`}
        className={cn(
          "mt-4 focus-ring text-accent hover:text-accent-foreground hover:bg-accent/20",
          "transition-all duration-300"
        )}
      >
        {isExpanded ? 'Read less' : 'Read more'}
        <ChevronDown 
          className={cn(
            "w-4 h-4 ml-2 transition-transform duration-300",
            isExpanded && "rotate-180"
          )} 
        />
      </Button>

      {/* Noscript fallback - show full content if JS disabled */}
      <noscript>
        <div className="pt-4 border-t border-border mt-4">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {item.expandedContent}
          </p>
        </div>
      </noscript>
    </div>
  );
};

/**
 * Main MVVGSection Component
 */
export const MVVGSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section 
      className="section-container bg-gradient-radial"
      aria-labelledby="mvvg-title"
    >
      {/* Section Header */}
      <div 
        ref={headerRef}
        className={cn(
          "mb-16 text-center transition-all duration-700",
          !reducedMotion && !headerVisible && "opacity-0 translate-y-8",
          headerVisible && "opacity-100 translate-y-0"
        )}
      >
        <h2 
          id="mvvg-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-4"
        >
          What <span className="gradient-text">Drives</span> Us
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The principles and ambitions that guide every decision we make.
        </p>
      </div>

      {/* MVVG Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {mvvgData.map((item, index) => (
          <MVVGCard
            key={item.id}
            item={item}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default MVVGSection;
