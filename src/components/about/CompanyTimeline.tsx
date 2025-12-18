/**
 * CompanyTimeline Component
 * 
 * Scroll-driven timeline (2021-2025) with:
 * - Scroll down: progresses from 2021 → 2025
 * - Scroll up: goes back through years
 * - Medium-sized images with hover animations
 * - Mobile: Vertical layout with same scroll behavior
 * - No manual controls - pure scroll-based navigation
 */

import React, { useState, useEffect, useRef } from 'react';
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
}

/**
 * Individual Timeline Year Card
 */
const TimelineCard: React.FC<TimelineCardProps> = ({ data, index, reducedMotion }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      ref={cardRef}
      className={cn(
        "timeline-card relative",
        "grid gap-8 lg:gap-12",
        index % 2 === 0 ? "lg:grid-cols-[1fr,1.5fr]" : "lg:grid-cols-[1.5fr,1fr]"
      )}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "aspect-[4/3] max-h-[400px]",
          index % 2 === 1 && "lg:order-2"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={data.heroImage}
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
            isHovered && "scale-110 shadow-2xl"
          )}
        >
          <span className="text-4xl lg:text-5xl font-display font-bold gradient-text">
            {data.year}
          </span>
        </div>

        {/* Optional Media Indicator */}
        {data.mediaUrl && (
          <div 
            className={cn(
              "absolute top-4 right-4 glass-card p-2 rounded-full",
              "transition-transform duration-300",
              isHovered && "scale-110"
            )}
          >
            {data.mediaType === 'video' ? (
              <span className="text-xs font-medium text-accent">▶ Video</span>
            ) : (
              <span className="text-xs font-medium text-accent">GIF</span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div 
        className={cn(
          "flex flex-col justify-center space-y-6",
          index % 2 === 1 && "lg:order-1 lg:text-right lg:items-end"
        )}
      >
        {/* Summary */}
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
          {data.summary}
        </p>

        {/* KPI Badges */}
        <div 
          className={cn(
            "flex flex-wrap gap-4",
            index % 2 === 1 && "lg:justify-end"
          )}
        >
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

        {/* Gallery Thumbnails */}
        {data.gallery.length > 0 && (
          <div 
            className={cn(
              "flex gap-3 overflow-x-auto pb-2",
              index % 2 === 1 && "lg:justify-end"
            )}
          >
            {data.gallery.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${data.year} gallery ${i + 1}`}
                loading="lazy"
                className={cn(
                  "w-16 h-16 object-cover rounded-lg flex-shrink-0",
                  "opacity-60 hover:opacity-100 transition-all duration-300",
                  "hover:scale-110 cursor-pointer"
                )}
              />
            ))}
          </div>
        )}
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
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

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

      // Progress indicator
      const progressBar = sectionRef.current?.querySelector('.progress-bar-fill');
      if (progressBar && timelineRef.current) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section 
      ref={sectionRef}
      className="section-container"
      aria-labelledby="timeline-title"
    >
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
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="progress-bar h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="progress-bar-fill h-full bg-accent origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{timelineData[0].year}</span>
            <span>{timelineData[timelineData.length - 1].year}</span>
          </div>
        </div>
      </div>

      {/* Timeline Cards */}
      <div ref={timelineRef} className="space-y-24 lg:space-y-32">
        {timelineData.map((data, index) => (
          <TimelineCard
            key={data.year}
            data={data}
            index={index}
            reducedMotion={reducedMotion}
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
