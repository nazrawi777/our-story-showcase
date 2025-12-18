/**
 * CinematicHistory Component
 * 
 * Elegant scroll-based company history section with:
 * - Text-focused narrative with scroll-triggered animations
 * - GSAP ScrollTrigger for smooth text reveals
 * - Paragraph-style storytelling (no year-by-year navigation)
 * - Full accessibility support
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companyHistory } from '@/data/aboutData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const CinematicHistory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each paragraph block on scroll
      const paragraphs = contentRef.current?.querySelectorAll('.history-paragraph');
      
      paragraphs?.forEach((para, index) => {
        // Stagger the words within each paragraph
        const words = para.querySelectorAll('.word');
        
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: para,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate the year badge
        const yearBadge = para.querySelector('.year-badge');
        if (yearBadge) {
          gsap.fromTo(
            yearBadge,
            {
              opacity: 0,
              x: -50,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: para,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Animate decorative line
        const line = para.querySelector('.decorative-line');
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: para,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Animate the section title
      const title = sectionRef.current?.querySelector('.section-title');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Split text into words for animation
  const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="section-container overflow-hidden"
      aria-labelledby="history-title"
    >
      {/* Section Header */}
      <div className="mb-20 text-center section-title">
        <h2 
          id="history-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-6"
        >
          Our <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Every great company has a story worth telling. Here is ours — a narrative of ambition, 
          resilience, and the relentless pursuit of excellence.
        </p>
      </div>

      {/* Story Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto space-y-24">
        {companyHistory.map((entry, index) => (
          <article
            key={entry.year}
            className={cn(
              "history-paragraph relative",
              "pl-8 lg:pl-16 border-l-2 border-accent/20"
            )}
          >
            {/* Year Badge */}
            <div 
              className="year-badge absolute -left-4 lg:-left-6 top-0 
                         w-8 h-8 lg:w-12 lg:h-12 rounded-full 
                         bg-accent flex items-center justify-center
                         shadow-lg shadow-accent/30"
              style={{ 
                backgroundColor: `hsl(${entry.accentColor})`,
                boxShadow: `0 8px 32px hsl(${entry.accentColor} / 0.4)`
              }}
            >
              <span className="text-xs lg:text-sm font-bold text-background">
                {String(entry.year).slice(-2)}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Year & Title */}
              <div className="space-y-2">
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: `hsl(${entry.accentColor})` }}
                >
                  {entry.year}
                </span>
                <h3 
                  className="text-2xl lg:text-4xl font-display font-bold text-foreground"
                >
                  {splitIntoWords(entry.title)}
                </h3>
              </div>

              {/* Decorative Line */}
              <div 
                className="decorative-line h-[2px] w-24 origin-left"
                style={{ backgroundColor: `hsl(${entry.accentColor})` }}
              />

              {/* Story Text */}
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                {splitIntoWords(entry.blurb)}
              </p>

              {/* Optional: Pull Quote or Highlight */}
              {index === 2 && (
                <blockquote 
                  className="mt-8 pl-6 border-l-4 italic text-xl text-foreground/80"
                  style={{ borderColor: `hsl(${entry.accentColor})` }}
                >
                  "The moment we realized our potential was limitless."
                </blockquote>
              )}
            </div>
          </article>
        ))}

        {/* Closing Statement */}
        <div className="history-paragraph text-center py-16">
          <p className="text-2xl lg:text-3xl font-display text-foreground mb-4">
            {splitIntoWords("And this is just the beginning...")}
          </p>
          <div 
            className="decorative-line h-[3px] w-32 mx-auto bg-accent origin-center"
          />
        </div>
      </div>

      {/* Noscript Fallback */}
      <noscript>
        <div className="max-w-4xl mx-auto space-y-12 mt-12">
          {companyHistory.map((entry) => (
            <article key={entry.year} className="space-y-4">
              <span className="text-sm font-medium text-accent">{entry.year}</span>
              <h3 className="text-2xl font-bold">{entry.title}</h3>
              <p className="text-lg text-muted-foreground">{entry.blurb}</p>
            </article>
          ))}
        </div>
      </noscript>
    </section>
  );
};

export default CinematicHistory;
