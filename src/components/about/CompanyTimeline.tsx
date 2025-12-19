/**
 * CompanyTimeline Component
 * 
 * Scroll-driven timeline (2021-2025) with:
 * - Vertical progress indicator on the left
 * - Real-time year tracking as you scroll
 * - Gallery image click to change hero image
 * - Medium-sized images with hover animations
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData, type TimelineYear } from '@/data/aboutData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TimelineCardProps {
  data: TimelineYear;
  index: number;
  reducedMotion: boolean;
  isActive: boolean;
}

/**
 * Individual Timeline Year Card
 */
const TimelineCard: React.FC<TimelineCardProps> = ({ data, index, reducedMotion, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(data.heroImage);

  // Reset active image when card becomes active
  useEffect(() => {
    if (isActive) {
      setActiveImage(data.heroImage);
    }
  }, [isActive, data.heroImage]);

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // Animate card entrance
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate KPI badges
      const kpis = cardRef.current?.querySelectorAll('.kpi-badge');
      gsap.fromTo(
        kpis,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleGalleryClick = useCallback((imageSrc: string) => {
    setActiveImage(imageSrc);
  }, []);

  return (
    <div
      ref={cardRef}
      id={`timeline-${data.year}`}
      className={cn(
        "timeline-card relative",
        "grid gap-8 lg:gap-12 lg:grid-cols-[1fr,1.2fr]",
        "transition-all duration-500",
        isActive && "scale-[1.02]"
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "aspect-[4/3] max-h-[350px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={activeImage}
          alt={`Company milestone ${data.year}`}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110 brightness-110" : "scale-100 brightness-100"
          )}
        />
        
        {/* Hover Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent",
            "transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-60"
          )}
        />

        {/* Year Badge */}
        <div 
          className={cn(
            "absolute bottom-4 left-4 glass-card px-5 py-3",
            "transition-all duration-500",
            isHovered && "scale-110 shadow-2xl",
            isActive && "ring-2 ring-accent"
          )}
        >
          <span className="text-3xl lg:text-4xl font-display font-bold gradient-text">
            {data.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center space-y-6">
        {/* Summary */}
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
          {data.summary}
        </p>

        {/* KPI Badges */}
        <div className="flex flex-wrap gap-4">
          {data.kpis.map((kpi, i) => (
            <div
              key={i}
              className={cn(
                "kpi-badge glass-card px-5 py-4 flex flex-col items-center",
                "min-w-[100px] transition-all duration-300",
                "hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              )}
            >
              <span className="text-2xl lg:text-3xl font-bold text-accent">
                {kpi.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        {/* Gallery Thumbnails - Clickable */}
        {data.gallery.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Hero image as first thumbnail */}
            <button
              onClick={() => handleGalleryClick(data.heroImage)}
              className={cn(
                "w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden",
                "transition-all duration-300 cursor-pointer",
                "hover:scale-110 focus-ring",
                activeImage === data.heroImage 
                  ? "ring-2 ring-accent opacity-100" 
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label={`View main ${data.year} image`}
            >
              <img
                src={data.heroImage}
                alt={`${data.year} main`}
                className="w-full h-full object-cover"
              />
            </button>
            
            {data.gallery.slice(0, 3).map((img, i) => (
              <button
                key={i}
                onClick={() => handleGalleryClick(img)}
                className={cn(
                  "w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden",
                  "transition-all duration-300 cursor-pointer",
                  "hover:scale-110 focus-ring",
                  activeImage === img 
                    ? "ring-2 ring-accent opacity-100" 
                    : "opacity-60 hover:opacity-100"
                )}
                aria-label={`View ${data.year} gallery image ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`${data.year} gallery ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Vertical Year Indicator Component - Fixed on RIGHT side
 */
const VerticalYearIndicator: React.FC<{ 
  activeYear: number;
  progress: number;
  isVisible: boolean;
}> = ({ activeYear, progress, isVisible }) => {
  const years = timelineData.map(d => d.year);
  
  return (
    <div 
      className={cn(
        "hidden lg:flex fixed right-8 xl:right-12 top-1/2 -translate-y-1/2 z-50",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      {/* Glass Background */}
      <div className="glass-card p-4 rounded-2xl backdrop-blur-xl border border-border/30">
        <div className="relative flex flex-col items-center">
          {/* Progress Line Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-muted/50 rounded-full" />
          
          {/* Progress Line Fill */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 top-4 w-1 bg-gradient-to-b from-accent to-accent/60 rounded-full transition-all duration-500 ease-out"
            style={{ height: `calc(${progress}% * 0.85)` }}
          />
          
          {/* Year Dots */}
          <div className="relative flex flex-col gap-10">
            {years.map((year, index) => {
              const isActive = year === activeYear;
              const isPast = years.indexOf(activeYear) >= index;
              
              return (
                <a
                  key={year}
                  href={`#timeline-${year}`}
                  className="flex items-center gap-4 group relative"
                  aria-label={`Jump to year ${year}`}
                >
                  {/* Dot */}
                  <div 
                    className={cn(
                      "relative w-5 h-5 rounded-full transition-all duration-500",
                      "flex items-center justify-center",
                      isActive 
                        ? "bg-accent scale-125 shadow-lg shadow-accent/60" 
                        : isPast 
                          ? "bg-accent/70"
                          : "bg-muted/60 group-hover:bg-muted"
                    )}
                  >
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                        <div className="absolute -inset-2 rounded-full bg-accent/20 animate-pulse" />
                      </>
                    )}
                    <div 
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        isActive ? "bg-accent-foreground" : isPast ? "bg-background/80" : "bg-transparent"
                      )}
                    />
                  </div>
                  
                  {/* Year Label */}
                  <span 
                    className={cn(
                      "text-sm font-mono transition-all duration-300 min-w-[48px]",
                      isActive 
                        ? "text-accent font-bold text-base" 
                        : isPast 
                          ? "text-foreground/80"
                          : "text-muted-foreground group-hover:text-foreground/60"
                    )}
                  >
                    {year}
                  </span>
                  
                  {/* Active Indicator Arrow */}
                  {isActive && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-accent animate-pulse" />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Current Year Display */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Now</span>
            <div className="text-2xl font-display font-bold gradient-text">{activeYear}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main CompanyTimeline Component
 */
export const CompanyTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(timelineData[0].year);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      const title = sectionRef.current?.querySelector('.section-title');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Track scroll progress and active year
      if (timelineRef.current) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => setIsIndicatorVisible(true),
          onLeave: () => setIsIndicatorVisible(false),
          onEnterBack: () => setIsIndicatorVisible(true),
          onLeaveBack: () => setIsIndicatorVisible(false),
          onUpdate: (self) => {
            const progress = self.progress * 100;
            setScrollProgress(progress);
            
            // Calculate which year should be active based on scroll position
            const yearIndex = Math.min(
              Math.floor(self.progress * timelineData.length),
              timelineData.length - 1
            );
            setActiveYear(timelineData[yearIndex].year);
          },
        });

        // Individual year tracking for more precise detection
        timelineData.forEach((data) => {
          const cardElement = document.getElementById(`timeline-${data.year}`);
          if (cardElement) {
            ScrollTrigger.create({
              trigger: cardElement,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => setActiveYear(data.year),
              onEnterBack: () => setActiveYear(data.year),
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section 
      ref={sectionRef}
      className="section-container relative"
      aria-labelledby="timeline-title"
    >
      {/* Vertical Year Indicator - Right Side */}
      <VerticalYearIndicator 
        activeYear={activeYear} 
        progress={scrollProgress} 
        isVisible={isIndicatorVisible}
      />

      {/* Section Header */}
      <div className="section-title mb-16 text-center">
        <h2 
          id="timeline-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-4"
        >
          The <span className="gradient-text">Company Way</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Five years of growth, innovation, and transformation. Scroll to explore our journey.
        </p>
        
        {/* Mobile Progress Bar */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{timelineData[0].year}</span>
            <span className="font-bold text-accent">{activeYear}</span>
            <span>{timelineData[timelineData.length - 1].year}</span>
          </div>
        </div>
      </div>

      {/* Timeline Cards - removed left padding since indicator is now on right */}
      <div ref={timelineRef} className="space-y-24 lg:space-y-32">
        {timelineData.map((data, index) => (
          <TimelineCard
            key={data.year}
            data={data}
            index={index}
            reducedMotion={reducedMotion}
            isActive={data.year === activeYear}
          />
        ))}
      </div>

      {/* End Marker */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-4 glass-card px-8 py-4">
          <span className="text-2xl font-display font-bold gradient-text">
            The Future Awaits
          </span>
        </div>
      </div>

      {/* Noscript Fallback */}
      <noscript>
        <div className="space-y-16 mt-12">
          {timelineData.map((data) => (
            <div key={data.year} className="space-y-4">
              <img
                src={data.heroImage}
                alt={`${data.year} milestone`}
                className="w-full max-w-xl rounded-lg"
              />
              <h3 className="text-3xl font-bold">{data.year}</h3>
              <p className="text-lg text-muted-foreground">{data.summary}</p>
              <div className="flex gap-4">
                {data.kpis.map((kpi, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-accent">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </noscript>
    </section>
  );
};

export default CompanyTimeline;
