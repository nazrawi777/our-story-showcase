/**
 * About Page
 * 
 * Production-ready About page combining four advanced components:
 * A) Cinematic Company History - Parallax imagery with typewriter text
 * B) Mission/Vision/Values/Goals - Expandable cards with analytics
 * C) Company Way Timeline - Interactive 2021-2025 timeline
 * D) Testimonial Slider - Swiper carousel with PDF interaction
 * 
 * Features:
 * - GSAP ScrollTrigger animations
 * - Swiper.js carousel
 * - IntersectionObserver micro-reveals
 * - Full accessibility (ARIA, keyboard navigation)
 * - Reduced motion support
 * - Responsive design
 * - Analytics hooks
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AboutHero } from '@/components/about/AboutHero';
import { CinematicHistory } from '@/components/about/CinematicHistory';
import { MVVGSection } from '@/components/about/MVVGSection';
import { CompanyTimeline } from '@/components/about/CompanyTimeline';
import { TestimonialSlider } from '@/components/about/TestimonialSlider';

const About: React.FC = () => {
  // Initialize global analytics hooks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.aboutMvvClicks = window.aboutMvvClicks || [];
      window.testimonialPdfOpened = window.testimonialPdfOpened || [];
    }
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us | Building the Future Together</title>
        <meta 
          name="description" 
          content="Discover our journey from startup to industry leader. Explore our mission, vision, values, and the milestones that shaped who we are today." 
        />
        <meta name="keywords" content="about us, company history, mission, vision, values, goals, testimonials" />
        <link rel="canonical" href="/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us | Building the Future Together" />
        <meta property="og:description" content="Discover our journey from startup to industry leader." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Us",
            "description": "Company history, mission, vision, values, and testimonials",
            "mainEntity": {
              "@type": "Organization",
              "name": "Our Company",
              "foundingDate": "2019",
              "description": "A movement of innovators transforming how the world works"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* A) Hero Section */}
        <AboutHero />

        {/* B) Cinematic Company History */}
        <CinematicHistory />

        {/* Decorative Divider */}
        <div className="section-container py-0">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* C) Mission, Vision, Values, Goals */}
        <MVVGSection />

        {/* Decorative Divider */}
        <div className="section-container py-0">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* D) Company Way Timeline */}
        <CompanyTimeline />

        {/* Decorative Divider */}
        <div className="section-container py-0">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* E) Testimonial Slider */}
        <TestimonialSlider />

        {/* Footer CTA */}
        <section className="section-container text-center">
          <div className="glass-card p-12 lg:p-16 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Ready to Be Part of Our <span className="gradient-text">Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of organizations already transforming their future with us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors focus-ring"
              >
                Get Started Today
              </a>
              <a
                href="#careers"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors focus-ring"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </section>

        {/* Noscript Global Fallback */}
        <noscript>
          <style>
            {`
              .opacity-0 { opacity: 1 !important; }
              .translate-y-8 { transform: none !important; }
              .invisible-until-animated { opacity: 1 !important; transform: none !important; }
            `}
          </style>
        </noscript>
      </main>
    </>
  );
};

export default About;
