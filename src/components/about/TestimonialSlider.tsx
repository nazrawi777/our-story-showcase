/**
 * TestimonialSlider Component
 * 
 * Testimonial carousel with:
 * - Left/right navigation buttons
 * - Hover overlay showing only "Read PDF" button
 * - PDF opens in new external tab
 * - Realistic hover animations
 * - Full accessibility support
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import { FileText, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { testimonialData, trackPdfOpen, type Testimonial } from '@/data/aboutData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Individual Testimonial Card with hover overlay
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpenPdf = useCallback(() => {
    // Track analytics
    trackPdfOpen(testimonial.id, testimonial.name);
    // Open in new external tab
    window.open(testimonial.pdfUrl, '_blank', 'noopener,noreferrer');
  }, [testimonial]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer",
        "transition-all duration-500",
        isHovered && "shadow-2xl shadow-accent/30 -translate-y-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <img
        src={testimonial.coverImage}
        alt={`${testimonial.name}, ${testimonial.title} at ${testimonial.company}`}
        loading="lazy"
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isHovered && "scale-110 brightness-50"
        )}
      />

      {/* Gradient Overlay - Always visible */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isHovered 
            ? "bg-gradient-to-t from-background via-background/80 to-background/40"
            : "bg-gradient-to-t from-background/90 via-background/30 to-transparent"
        )}
      />

      {/* Base Info - Always visible at bottom */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-6 transition-all duration-500",
          isHovered && "translate-y-[-60px] opacity-0"
        )}
      >
        <p className="text-xl font-display font-semibold text-foreground">
          {testimonial.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{testimonial.title}</p>
        <p className="text-sm font-medium text-accent">{testimonial.company}</p>
      </div>

      {/* Hover Overlay - Read PDF Button */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center p-6",
          "transition-all duration-500 ease-out",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isHovered}
      >
        {/* Person Info on Hover */}
        <div className={cn(
          "text-center mb-6 transition-all duration-500 delay-100",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <p className="text-xl font-display font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          <p className="text-sm font-medium text-accent">{testimonial.company}</p>
        </div>

        {/* Short Preview */}
        <p 
          className={cn(
            "text-center text-foreground/80 text-sm leading-relaxed mb-8 max-w-[220px]",
            "transition-all duration-500 delay-150",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          "{testimonial.excerpt}"
        </p>

        {/* Read PDF Button */}
        <Button
          variant="default"
          size="lg"
          onClick={handleOpenPdf}
          className={cn(
            "bg-accent text-accent-foreground hover:bg-accent/90",
            "shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50",
            "transition-all duration-500 delay-200",
            "hover:scale-110 active:scale-95",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
          aria-label={`Read PDF letter from ${testimonial.name} at ${testimonial.company}`}
        >
          <FileText className="w-5 h-5 mr-2" />
          Read PDF
          <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
        </Button>
      </div>

      {/* Focus indicator for accessibility */}
      <button
        className="absolute inset-0 w-full h-full opacity-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl"
        onClick={handleOpenPdf}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`View testimonial from ${testimonial.name}`}
      />
    </div>
  );
};

/**
 * Fallback Grid if Swiper fails
 */
const FallbackGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {testimonialData.map((testimonial) => (
      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
    ))}
  </div>
);

/**
 * Main TestimonialSlider Component
 */
export const TestimonialSlider: React.FC = () => {
  const [swiperFailed, setSwiperFailed] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section 
      className="section-container"
      aria-labelledby="testimonials-title"
    >
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 
          id="testimonials-title"
          className="text-4xl lg:text-6xl font-display font-bold mb-4"
        >
          Voices of <span className="gradient-text">Trust</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hear from the leaders and teams who've transformed their organizations with us.
        </p>
      </div>

      {/* Swiper or Fallback */}
      {swiperFailed ? (
        <FallbackGrid />
      ) : (
        <div className="relative px-4 lg:px-16">
          {/* Left Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "swiper-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20",
              "w-12 h-12 lg:w-14 lg:h-14 rounded-full",
              "bg-background/80 backdrop-blur-sm border-accent/30",
              "hover:bg-accent hover:text-accent-foreground hover:border-accent",
              "hover:scale-110 hover:shadow-lg hover:shadow-accent/30",
              "transition-all duration-300",
              "focus-ring"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Right Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "swiper-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20",
              "w-12 h-12 lg:w-14 lg:h-14 rounded-full",
              "bg-background/80 backdrop-blur-sm border-accent/30",
              "hover:bg-accent hover:text-accent-foreground hover:border-accent",
              "hover:scale-110 hover:shadow-lg hover:shadow-accent/30",
              "transition-all duration-300",
              "focus-ring"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={false}
            navigation={{
              prevEl: '.swiper-btn-prev',
              nextEl: '.swiper-btn-next',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            keyboard={{ enabled: true }}
            autoplay={reducedMotion ? false : {
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 28 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onError={() => setSwiperFailed(true)}
            a11y={{
              prevSlideMessage: 'Previous testimonial',
              nextSlideMessage: 'Next testimonial',
              firstSlideMessage: 'This is the first testimonial',
              lastSlideMessage: 'This is the last testimonial',
            }}
            className="pb-14"
          >
            {testimonialData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Noscript Fallback */}
      <noscript>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {testimonialData.map((testimonial) => (
            <div key={testimonial.id} className="glass-card p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.coverImage}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="text-sm text-accent">{testimonial.company}</p>
                </div>
              </div>
              <blockquote className="italic text-muted-foreground">
                "{testimonial.fullQuote}"
              </blockquote>
              <a 
                href={testimonial.pdfUrl}
                className="inline-flex items-center mt-4 text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-4 h-4 mr-2" />
                Read PDF Letter
              </a>
            </div>
          ))}
        </div>
      </noscript>
    </section>
  );
};

export default TestimonialSlider;
