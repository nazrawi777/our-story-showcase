/**
 * useIntersectionObserver Hook
 * 
 * Generic hook for detecting when elements enter/exit viewport.
 * Used for scroll-triggered animations and lazy loading.
 */

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  /** Threshold(s) at which callback fires (0-1) */
  threshold?: number | number[];
  /** Root margin for early/late trigger */
  rootMargin?: string;
  /** Root element (null = viewport) */
  root?: Element | null;
  /** Only trigger once */
  triggerOnce?: boolean;
  /** Callback when visibility changes */
  onIntersect?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}

interface UseIntersectionObserverReturn<T extends Element> {
  ref: RefObject<T>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
    onIntersect,
  } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        const isVisible = observerEntry.isIntersecting;
        
        // Update state
        setIsIntersecting(isVisible);
        setEntry(observerEntry);
        
        // Call callback if provided
        onIntersect?.(isVisible, observerEntry);
        
        // Handle triggerOnce
        if (isVisible && triggerOnce) {
          hasTriggered.current = true;
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, onIntersect]);

  return { ref, isIntersecting, entry };
}

export default useIntersectionObserver;
