'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isInView = rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25;
      setIsVisible(isInView);
    };

    // Initial check
    checkVisibility();

    // Listen for scroll and resize events
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  // Animated numbers
  const [hoursSaved, setHoursSaved] = useState(0);
  const [tasksAutomated, setTasksAutomated] = useState(0);
  const [clientRelationship, setClientRelationship] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Animate numbers from 0 to target value
      const animateCount = (target: number, duration: number, setter: (n: number) => void) => {
        let startTime: number | null = null;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          const current = Math.floor(easedProgress * target);
          setter(current);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      };

      animateCount(25, 2000, setHoursSaved); // 25 hrs saved/week
      animateCount(75, 2500, setTasksAutomated); // 75% tasks automated
      animateCount(3, 3000, setClientRelationship); // 3 yrs average client relationship
    }
  }, [isVisible]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {/* Hours saved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-coffee-cream tabular-nums">
              {hoursSaved}
            </div>
            <div className="ml-2 flex items-baseline">
              <span className="text-coffee-cream/80">+</span>
              <span className="text-sm text-coffee-cream/80">hrs saved/week</span>
            </div>
          </div>
          <div className="w-0.5 h-6 mx-auto bg-coffee-deep/20" />
          <p className="text-coffee-cream/70">Time reclaimed for strategic work</p>
        </motion.div>

        {/* Tasks automated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-coffee-cream tabular-nums">
              {tasksAutomated}
            </div>
            <div className="ml-2 flex items-baseline">
              <span className="text-coffee-cream/80">%</span>
              <span className="text-sm text-coffee-cream/80">tasks automated</span>
            </div>
          </div>
          <div className="w-0.5 h-6 mx-auto bg-coffee-deep/20" />
          <p className="text-coffee-cream/70">Repetitive work eliminated</p>
        </motion.div>

        {/* Client relationship */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-coffee-cream tabular-nums">
              {clientRelationship}
            </div>
            <div className="ml-2 flex items-baseline">
              <span className="text-coffee-cream/80">+</span>
              <span className="text-sm text-coffee-cream/80">yrs avg. relationship</span>
            </div>
          </div>
          <div className="w-0.5 h-6 mx-auto bg-coffee-deep/20" />
          <p className="text-coffee-cream/70">Long-term partnerships built</p>
        </motion.div>
      </div>

      {/* Up indicators - optional decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex -z-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`ml-[${i * 8}px] -mt-[${i * 4}px] text-coffee-deep/10`}>
              ↑
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}