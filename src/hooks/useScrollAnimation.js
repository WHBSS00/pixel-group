'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -20% 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  // GSAP animation when visible
  useEffect(() => {
    if (isVisible && ref.current) {
      const targets = [];
      const isAnimated = (el) => {
        const cls = typeof el.className === 'string' ? el.className : '';
        return cls.includes('opacity-0');
      };

      if (isAnimated(ref.current)) {
        targets.push(ref.current);
      }

      const children = ref.current.querySelectorAll('*');
      children.forEach((child) => {
        if (isAnimated(child)) {
          targets.push(child);
        }
      });

      targets.forEach((target) => {
        // Suppress CSS transitions temporarily so GSAP can take over cleanly
        target.style.transition = 'none';

        const classStr = target.className || '';
        let fromY = 40;
        let fromBlur = 0;
        let delay = 0;

        // Parse custom translate-y values from Tailwind JIT notation
        if (classStr.includes('translate-y-[')) {
          const match = classStr.match(/translate-y-\[(\d+)px\]/);
          if (match) fromY = parseInt(match[1], 10);
        } else if (classStr.includes('translate-y-10')) {
          fromY = 40;
        } else if (classStr.includes('translate-y-[20px]')) {
          fromY = 20;
        } else if (classStr.includes('translate-y-[40px]')) {
          fromY = 40;
        } else if (classStr.includes('translate-y-[60px]')) {
          fromY = 60;
        }

        // Parse blur values
        if (classStr.includes('blur-[')) {
          const match = classStr.match(/blur-\[(\d+)px\]/);
          if (match) fromBlur = parseInt(match[1], 10);
        }

        // Parse animation delays (e.g. delay-150, delay-300)
        if (classStr.includes('delay-')) {
          const match = classStr.match(/delay-(\d+)/);
          if (match) {
            delay = parseInt(match[1], 10) / 1000; // convert milliseconds to seconds
          }
        }

        // Animate with GSAP for smooth easing
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: fromY,
            filter: fromBlur ? `blur(${fromBlur}px)` : 'none',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'none',
            duration: 1.2,
            delay: delay,
            ease: 'power3.out',
            clearProps: 'transform,opacity,filter,transition',
          }
        );
      });
    }
  }, [isVisible]);

  return [ref, isVisible];
}

export function useMultiScrollAnimation(count, options = {}) {
  const refs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleItems((prev) => new Set([...prev, index]));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50% 0px',
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count, options.threshold, options.rootMargin]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return [setRef, visibleItems];
}
