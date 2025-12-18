/**
 * CinematicHistory Component
 * 
 * A cinematic company history section with:
 * - Desktop: Two-column layout with parallax imagery (left) and typewriter text (right)
 * - Mobile: Stacked layout with image above text
 * - GSAP ScrollTrigger for parallax effects
 * - Typewriter animation with pause/resume controls
 * - Jump to Year navigation
 * - Full accessibility support
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { companyHistory, type HistoryEntry } from '@/data/aboutData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HistoryItemProps {
  entry: HistoryEntry;
  index: number;
  isActive: boolean;
  isPaused: boolean;
  reducedMotion: boolean;
  onComplete: () => void;
}

/**
 * Individual history entry with parallax image and typewriter text
 */
const HistoryItem: React.FC<HistoryItemProps> = ({
  entry,
  index,
  isActive,
  isPaused,
  reducedMotion,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);

  // Parallax effect on scroll
  useEffect(() => {
    if (reducedMotion || !imageContainerRef.current) return;

    const layers = imageContainerRef.current.querySelectorAll('.parallax-layer');
    
    layers.forEach((layer, i) => {
      const depth = (i + 1) * 20; // Increasing parallax depth
      
      gsap.to(layer, {
        y: depth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [reducedMotion]);

  // Typewriter effect
  useEffect(() => {
    if (!isActive || reducedMotion) {
      // Show full text immediately if reduced motion or not active
      if (reducedMotion && isActive) {
        setDisplayedText(entry.blurb);
      }
      return;
    }

    if (isPaused) {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      return;
    }

    setIsTyping(true);
    const text = entry.blurb;
    
    // Resume from current position
    typingIntervalRef.current = setInterval(() => {
      if (charIndexRef.current < text.length) {
        setDisplayedText(text.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
      } else {
        clearInterval(typingIntervalRef.current!);
        setIsTyping(false);
        onComplete();
      }
    }, 30); // Typing speed

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [isActive, isPaused, entry.blurb, reducedMotion, onComplete]);

  // Reset when entry changes
  useEffect(() => {
    charIndexRef.current = 0;
    setDisplayedText('');
  }, [entry.year]);

  return (
    <div
      ref={containerRef}
      id={`history-${entry.year}`}
      className={cn(
        "grid gap-8 lg:gap-16 lg:grid-cols-2 items-center min-h-[60vh] py-12",
        "opacity-0 transition-opacity duration-700",
        isActive && "opacity-100"
      )}
      style={{ 
        '--accent-color': entry.accentColor 
      } as React.CSSProperties}
    >
      {/* Image Column - Parallax Layers */}
      <div
        ref={imageContainerRef}
        className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden order-1 lg:order-none"
      >
        {/* Layer 1 - Background (deepest) */}
        {entry.imageLayer3 && (
          <div className="parallax-layer absolute inset-0 z-0">
            <img
              src={entry.imageLayer3}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover opacity-40 scale-125"
              aria-hidden="true"
            />
          </div>
        )}
        
        {/* Layer 2 - Middle */}
        {entry.imageLayer2 && (
          <div className="parallax-layer absolute inset-0 z-10">
            <img
              src={entry.imageLayer2}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover opacity-60 scale-110"
              aria-hidden="true"
            />
          </div>
        )}
        
        {/* Layer 3 - Foreground (main image) */}
        <div className="parallax-layer absolute inset-0 z-20">
          <img
            src={entry.imageUrl}
            alt={`Company history ${entry.year}: ${entry.title}`}
            loading="lazy"
            srcSet={`${entry.imageUrl}&w=400 400w, ${entry.imageUrl}&w=800 800w, ${entry.imageUrl}&w=1200 1200w`}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 z-30 bg-gradient-to-t from-background/80 via-transparent to-transparent"
        />
        
        {/* Year badge */}
        <div 
          className="absolute bottom-4 left-4 z-40 glass-card px-4 py-2"
          style={{ 
            borderColor: `hsl(${entry.accentColor} / 0.5)` 
          }}
        >
          <span 
            className="text-2xl font-display font-bold"
            style={{ color: `hsl(${entry.accentColor})` }}
          >
            {entry.year}
          </span>
        </div>
      </div>

      {/* Text Column - Cinematic Storytelling */}
      <div className="order-2 lg:order-none">
        <h3 
          className="text-3xl lg:text-5xl font-display font-bold mb-6 text-balance"
          style={{ color: `hsl(${entry.accentColor})` }}
        >
          {entry.title}
        </h3>
        
        <p
          ref={textRef}
          className={cn(
            "text-lg lg:text-xl text-muted-foreground leading-relaxed",
            isTyping && "typewriter-cursor"
          )}
          aria-live="polite"
          aria-atomic="false"
        >
          {displayedText || entry.blurb}
        </p>
        
        {/* Noscript fallback - shows full text if JS disabled */}
        <noscript>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {entry.blurb}
          </p>
        </noscript>
      </div>
    </div>
  );
};

/**
 * Main CinematicHistory Component
 */
export const CinematicHistory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Get unique years for navigation
  const years = companyHistory.map(h => h.year);

  const handleJumpToYear = useCallback((year: number) => {
    const index = companyHistory.findIndex(h => h.year === year);
    if (index !== -1) {
      setActiveIndex(index);
      // Scroll to the section
      const element = document.getElementById(`history-${year}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleComplete = useCallback(() => {
    // Auto-advance to next entry after completion
    if (activeIndex < companyHistory.length - 1 && !isPaused) {
      setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, 2000);
    }
  }, [activeIndex, isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Intersection observer to update active item on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    companyHistory.forEach((entry, index) => {
      const element = document.getElementById(`history-${entry.year}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([observerEntry]) => {
          if (observerEntry.isIntersecting && observerEntry.intersectionRatio > 0.5) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container"
      aria-labelledby="history-title"
    >
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 
          id="history-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-4"
        >
          Our <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A cinematic exploration of the moments that shaped who we are today.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {/* Pause/Resume */}
        <Button
          variant="outline"
          size="sm"
          onClick={togglePause}
          className="focus-ring"
          aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Resume
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          )}
        </Button>

        {/* Year Navigation */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Jump to:</span>
          {years.map((year, i) => (
            <Button
              key={year}
              variant={activeIndex === i ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleJumpToYear(year)}
              className={cn(
                "focus-ring min-w-[4rem]",
                activeIndex === i && "bg-accent text-accent-foreground"
              )}
              aria-current={activeIndex === i ? 'true' : undefined}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      {/* History Entries */}
      <div className="space-y-24">
        {companyHistory.map((entry, index) => (
          <HistoryItem
            key={entry.year}
            entry={entry}
            index={index}
            isActive={index <= activeIndex}
            isPaused={isPaused}
            reducedMotion={reducedMotion}
            onComplete={handleComplete}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-16">
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${((activeIndex + 1) / companyHistory.length) * 100}%` 
            }}
            role="progressbar"
            aria-valuenow={(activeIndex + 1)}
            aria-valuemin={1}
            aria-valuemax={companyHistory.length}
            aria-label={`History progress: ${activeIndex + 1} of ${companyHistory.length}`}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {activeIndex + 1} of {companyHistory.length} milestones
        </p>
      </div>
    </section>
  );
};

export default CinematicHistory;
