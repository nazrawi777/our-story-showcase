/**
 * CompanyStory Component
 * 
 * Long-form company narrative with elegant GSAP animations:
 * - Word-by-word reveal with blur-to-sharp effect
 * - Floating accent orbs in background
 * - Quote callout with special styling
 * - Decorative elements
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Company story content
const storyContent = {
  intro: "Every great journey begins with a single step, a spark of inspiration that ignites a flame destined to illuminate the world.",
  
  mainParagraph: `Our story is not merely a chronicle of business milestones—it is a testament to the power of belief, the courage to challenge conventions, and the relentless pursuit of excellence that defines who we are. In 2019, from a small garage workshop filled with whiteboards covered in ambitious diagrams and coffee cups that never seemed empty, three visionaries dared to imagine a different future. They saw a world where technology wasn't just a tool, but a bridge connecting human potential to limitless possibilities.

The early days were marked by eighteen-hour coding sessions, countless iterations, and the kind of passionate debates that only true believers engage in. Every rejection from investors became fuel for innovation. Every technical challenge became an opportunity to pioneer new solutions. The team grew not through job postings, but through shared conviction—people who believed in the mission found their way to us, drawn by an invisible force that recognized kindred spirits.

When the world faced unprecedented challenges in 2020, we didn't retreat—we evolved. Remote collaboration became our laboratory for innovation, and the distance between team members became a canvas for creativity. We emerged from that crucible stronger, more resilient, and more certain than ever that our purpose was not just to build products, but to transform how humanity works, creates, and thrives together.`,

  quote: "We don't build technology for technology's sake. We build bridges—between ideas and execution, between potential and achievement, between today and tomorrow.",
  
  closingParagraph: `Today, our solutions power enterprises across six continents, but our heart remains the same—that garage energy, that relentless curiosity, that unwavering commitment to our customers' success. We measure our achievements not in revenue alone, but in the millions of moments we've helped create: the startup founder who closed their first major deal, the enterprise team that finally broke through their productivity plateau, the innovator who turned their vision into reality. These are the stories that drive us forward, and we're just getting started.`
};

export const CompanyStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const mainParagraphRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate intro with wave effect
      if (introRef.current) {
        const words = introRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 20, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate main paragraph - line by line reveal
      if (mainParagraphRef.current) {
        const lines = mainParagraphRef.current.querySelectorAll('.paragraph-line');
        gsap.fromTo(
          lines,
          { opacity: 0, x: -30, filter: 'blur(4px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mainParagraphRef.current,
              start: 'top 75%',
              end: 'bottom 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate quote with special effect
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.95, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate quote marks
        const quoteMarks = quoteRef.current.querySelectorAll('.quote-mark');
        gsap.fromTo(
          quoteMarks,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 0.2,
            scale: 1,
            duration: 0.8,
            delay: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate closing paragraph
      if (closingRef.current) {
        const words = closingRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 15, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: closingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate decorative orbs
      const orbs = sectionRef.current?.querySelectorAll('.story-orb');
      orbs?.forEach((orb, index) => {
        gsap.to(orb, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          duration: 'random(4, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.5,
        });
      });

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

  // Split paragraph into lines for animation
  const splitIntoParagraphLines = (text: string) => {
    const sentences = text.split('. ').filter(Boolean);
    return sentences.map((sentence, i) => (
      <span key={i} className="paragraph-line block mb-6">
        {sentence}{i < sentences.length - 1 ? '.' : ''}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="company-story"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="story-title"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating Orbs */}
        <div 
          className="story-orb absolute top-20 left-[10%] w-72 h-72 bg-accent/5 rounded-full blur-[80px]"
        />
        <div 
          className="story-orb absolute top-1/3 right-[5%] w-96 h-96 bg-accent/8 rounded-full blur-[100px]"
        />
        <div 
          className="story-orb absolute bottom-1/4 left-[15%] w-64 h-64 bg-accent/4 rounded-full blur-[60px]"
        />
        
        {/* Gradient Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-accent mb-6">
            ✦ Our Story
          </span>
          <h2
            ref={titleRef}
            id="story-title"
            className={cn(
              "text-4xl md:text-5xl lg:text-7xl font-display font-bold",
              !reducedMotion && "opacity-0"
            )}
          >
            The Heart of{' '}
            <span className="gradient-text">Innovation</span>
          </h2>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <p
            ref={introRef}
            className={cn(
              "text-2xl lg:text-3xl font-display text-foreground/90 leading-relaxed text-center mb-16",
              !reducedMotion && "[&_.word]:opacity-0"
            )}
          >
            {splitIntoWords(storyContent.intro)}
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 rounded-full bg-accent/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          {/* Main Paragraph */}
          <div
            ref={mainParagraphRef}
            className={cn(
              "text-lg lg:text-xl text-muted-foreground leading-relaxed mb-20",
              !reducedMotion && "[&_.paragraph-line]:opacity-0"
            )}
          >
            {splitIntoParagraphLines(storyContent.mainParagraph)}
          </div>

          {/* Quote Callout */}
          <blockquote
            ref={quoteRef}
            className={cn(
              "relative glass-card p-8 lg:p-12 my-20 text-center",
              !reducedMotion && "opacity-0"
            )}
          >
            {/* Quote Marks */}
            <span 
              className="quote-mark absolute top-4 left-4 text-8xl font-serif text-accent opacity-20 select-none"
              aria-hidden="true"
            >
              "
            </span>
            <span 
              className="quote-mark absolute bottom-4 right-4 text-8xl font-serif text-accent opacity-20 select-none rotate-180"
              aria-hidden="true"
            >
              "
            </span>
            
            <p className="text-xl lg:text-2xl font-display italic text-foreground/90 relative z-10">
              {storyContent.quote}
            </p>
            <footer className="mt-6 text-sm text-accent uppercase tracking-wider">
              — Our Founding Principle
            </footer>
          </blockquote>

          {/* Closing Paragraph */}
          <p
            ref={closingRef}
            className={cn(
              "text-lg lg:text-xl text-muted-foreground leading-relaxed text-center",
              !reducedMotion && "[&_.word]:opacity-0"
            )}
          >
            {splitIntoWords(storyContent.closingParagraph)}
          </p>
        </div>
      </div>

      {/* Noscript Fallback */}
      <noscript>
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-8">The Heart of Innovation</h2>
          <p className="text-xl text-center mb-8">{storyContent.intro}</p>
          <p className="text-lg text-muted-foreground mb-8">{storyContent.mainParagraph}</p>
          <blockquote className="glass-card p-8 my-8 text-center italic">
            "{storyContent.quote}"
          </blockquote>
          <p className="text-lg text-muted-foreground text-center">{storyContent.closingParagraph}</p>
        </div>
      </noscript>
    </section>
  );
};

export default CompanyStory;
