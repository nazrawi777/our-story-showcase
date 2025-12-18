/**
 * AboutHero Component
 * 
 * Cinematic hero section with:
 * - Full-viewport background with gradient overlay
 * - Animated headline with stagger reveal
 * - Call-to-action buttons
 * - Scroll indicator
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Small delay to ensure elements are mounted
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Stagger animation for hero content
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  const scrollToContent = () => {
    const firstSection = document.getElementById('history-2019');
    firstSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-float"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div 
          className={cn(
            "inline-flex items-center gap-2 glass-card px-4 py-2 mb-8",
            "text-sm text-accent"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Discover Our Story</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          id="hero-title"
          className={cn(
            "text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-8",
            "leading-tight text-balance",
            !reducedMotion && "opacity-0"
          )}
        >
          Building the Future,{' '}
          <span className="gradient-text">Together</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className={cn(
            "text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10",
            "leading-relaxed",
            !reducedMotion && "opacity-0"
          )}
        >
          We're more than a company—we're a movement of innovators, dreamers, 
          and doers united by a singular mission to transform how the world works.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4",
            !reducedMotion && "opacity-0"
          )}
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] focus-ring"
            onClick={scrollToContent}
          >
            Explore Our Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px] focus-ring"
          >
            Join Our Team
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "flex flex-col items-center gap-2 text-muted-foreground",
          "hover:text-foreground transition-colors cursor-pointer focus-ring rounded-lg p-2"
        )}
        aria-label="Scroll to content"
      >
        <span className="text-sm uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
};

export default AboutHero;
