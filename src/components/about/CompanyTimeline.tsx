/**
 * CompanyTimeline Component
 * 
 * Interactive timeline (2021-2025) with:
 * - Desktop: Horizontal scrub with draggable handle and snap-to-year
 * - Mobile: Vertical accordion with tap-to-expand
 * - Ken Burns zoom effect on active hero images
 * - KPI badges and optional media (GIF/video)
 * - Keyboard navigation (left/right arrows)
 * - Autoplay slideshow toggle
 * - Dev mode for testing slow CPU scenarios
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Settings,
  Clock
} from 'lucide-react';
import { timelineData, type TimelineYear } from '@/data/aboutData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dev mode flag - set to true to simulate slow CPU
const DEV_MODE = false;
const DEV_ANIMATION_DELAY = DEV_MODE ? 1000 : 0;

interface TimelineCardProps {
  data: TimelineYear;
  isActive: boolean;
  reducedMotion: boolean;
}

/**
 * Timeline Year Card Content
 */
const TimelineCard: React.FC<TimelineCardProps> = ({ data, isActive, reducedMotion }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  // Ken Burns effect on active card
  useEffect(() => {
    if (!isActive || reducedMotion || !imageRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(
      imageRef.current.querySelector('img'),
      { scale: 1 },
      { 
        scale: 1.1, 
        duration: 20, 
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      }
    );

    return () => {
      tl.kill();
    };
  }, [isActive, reducedMotion]);

  return (
    <div className="space-y-6">
      {/* Hero Image with Ken Burns */}
      <div 
        ref={imageRef}
        className="relative aspect-video rounded-xl overflow-hidden"
      >
        <img
          src={data.heroImage}
          alt={`Company milestone ${data.year}`}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            !reducedMotion && isActive && "scale-100"
          )}
        />
        
        {/* Optional GIF/Video overlay */}
        {data.mediaUrl && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20">
            {data.mediaType === 'video' ? (
              <video
                src={data.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="max-w-full max-h-full rounded-lg"
              />
            ) : (
              <img
                src={data.mediaUrl}
                alt=""
                className="max-w-full max-h-full rounded-lg"
              />
            )}
          </div>
        )}

        {/* Year Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
          <span className="text-5xl lg:text-7xl font-display font-bold gradient-text">
            {data.year}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-lg text-muted-foreground leading-relaxed">
        {data.summary}
      </p>

      {/* KPI Badges */}
      <div className="flex flex-wrap gap-3">
        {data.kpis.map((kpi, i) => (
          <div
            key={i}
            className={cn(
              "glass-card px-4 py-3 flex flex-col items-center min-w-[100px]",
              "transition-all duration-300",
              isActive && "accent-glow"
            )}
          >
            <span className="text-2xl font-bold text-accent">{kpi.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>

      {/* Gallery Thumbnails */}
      {data.gallery.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${data.year} gallery image ${i + 1}`}
              loading="lazy"
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Desktop Horizontal Timeline
 */
const DesktopTimeline: React.FC<{
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  isAutoplay: boolean;
  toggleAutoplay: () => void;
  reducedMotion: boolean;
}> = ({ activeIndex, setActiveIndex, isAutoplay, toggleAutoplay, reducedMotion }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate handle position
  const progress = (activeIndex / (timelineData.length - 1)) * 100;

  const handleDotClick = (index: number) => {
    setTimeout(() => setActiveIndex(index), DEV_ANIMATION_DELAY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'ArrowRight' && activeIndex < timelineData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Handle drag on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newIndex = Math.round(percentage * (timelineData.length - 1));
    setActiveIndex(Math.max(0, Math.min(timelineData.length - 1, newIndex)));
  };

  return (
    <div 
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-valuemin={timelineData[0].year}
      aria-valuemax={timelineData[timelineData.length - 1].year}
      aria-valuenow={timelineData[activeIndex].year}
      aria-label="Company timeline year selector"
    >
      {/* Timeline Track */}
      <div 
        ref={trackRef}
        className="relative h-2 bg-muted rounded-full mb-8 cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Progress Fill */}
        <div 
          className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        
        {/* Dots */}
        <div className="absolute inset-0 flex justify-between items-center">
          {timelineData.map((data, i) => (
            <button
              key={data.year}
              onClick={() => handleDotClick(i)}
              className={cn(
                "timeline-dot transition-all duration-300 focus-ring",
                i === activeIndex && "timeline-dot-active"
              )}
              aria-label={`Go to year ${data.year}`}
            >
              <span className="sr-only">{data.year}</span>
            </button>
          ))}
        </div>

        {/* Draggable Handle */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full",
            "bg-accent border-4 border-background",
            "cursor-grab shadow-lg transition-all duration-300",
            isDragging && "cursor-grabbing scale-125"
          )}
          style={{ left: `calc(${progress}% - 12px)` }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        />
      </div>

      {/* Year Labels */}
      <div className="flex justify-between mb-8">
        {timelineData.map((data, i) => (
          <button
            key={data.year}
            onClick={() => handleDotClick(i)}
            className={cn(
              "text-sm font-medium transition-all duration-300 focus-ring px-2 py-1 rounded",
              i === activeIndex 
                ? "text-accent scale-110" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {data.year}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="focus-ring"
          aria-label="Previous year"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleAutoplay}
          className="focus-ring"
          aria-label={isAutoplay ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoplay ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Autoplay
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => activeIndex < timelineData.length - 1 && setActiveIndex(activeIndex + 1)}
          disabled={activeIndex === timelineData.length - 1}
          className="focus-ring"
          aria-label="Next year"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Active Card */}
      <div 
        className={cn(
          "transition-all duration-500",
          !reducedMotion && "animate-fade-in"
        )}
        key={activeIndex}
      >
        <TimelineCard
          data={timelineData[activeIndex]}
          isActive={true}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
};

/**
 * Mobile Vertical Accordion Timeline
 */
const MobileTimeline: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const [openItem, setOpenItem] = useState<string>(timelineData[0].year.toString());

  return (
    <Accordion 
      type="single" 
      collapsible 
      value={openItem}
      onValueChange={setOpenItem}
      className="space-y-4"
    >
      {timelineData.map((data) => (
        <AccordionItem
          key={data.year}
          value={data.year.toString()}
          className="glass-card border-none overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-bold gradient-text">
                {data.year}
              </span>
              <div className="flex gap-2">
                {data.kpis.slice(0, 2).map((kpi, i) => (
                  <span 
                    key={i}
                    className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                  >
                    {kpi.label}: {kpi.value}
                  </span>
                ))}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <TimelineCard
              data={data}
              isActive={openItem === data.year.toString()}
              reducedMotion={reducedMotion}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

/**
 * Main CompanyTimeline Component
 */
export const CompanyTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  // Update document title for screen readers
  useEffect(() => {
    const year = timelineData[activeIndex].year;
    document.title = `Company Timeline - ${year} | About Us`;
    
    return () => {
      document.title = 'About Us';
    };
  }, [activeIndex]);

  // Autoplay logic
  useEffect(() => {
    if (isAutoplay && !isMobile) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex(prev => {
          if (prev >= timelineData.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, isMobile]);

  // Pause on interaction, resume after 12s inactivity
  const handleInteraction = useCallback(() => {
    if (isAutoplay) {
      setIsAutoplay(false);
      
      if (inactivityRef.current) {
        clearTimeout(inactivityRef.current);
      }
      
      inactivityRef.current = setTimeout(() => {
        setIsAutoplay(true);
      }, 12000);
    }
  }, [isAutoplay]);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay(prev => !prev);
  }, []);

  // Dev mode indicator
  const DevModeIndicator = DEV_MODE ? (
    <div className="fixed bottom-4 left-4 glass-card px-3 py-2 flex items-center gap-2 text-xs text-accent z-50">
      <Settings className="w-4 h-4 animate-spin" />
      DEV MODE: {DEV_ANIMATION_DELAY}ms delay
    </div>
  ) : null;

  return (
    <section 
      className="section-container"
      aria-labelledby="timeline-title"
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
    >
      {DevModeIndicator}

      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 
          id="timeline-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-4"
        >
          The <span className="gradient-text">Company Way</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Five years of growth, innovation, and transformation.
        </p>
      </div>

      {/* Timeline Component */}
      {isMobile ? (
        <MobileTimeline reducedMotion={reducedMotion} />
      ) : (
        <DesktopTimeline
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isAutoplay={isAutoplay}
          toggleAutoplay={toggleAutoplay}
          reducedMotion={reducedMotion}
        />
      )}
    </section>
  );
};

export default CompanyTimeline;
