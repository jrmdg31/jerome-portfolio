'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setIsPressed(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsPressed(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex h-14 w-14 items-center justify-center overflow-hidden border border-[#f6ede0]/20 bg-[#100b09] text-[#f6ede0] shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Rotating outer frame */}
            <motion.span
              className="absolute inset-1 border border-[#f6ede0]/10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Amber corner */}
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#d99a4e]" />

            {/* Orbiting amber line */}
            <motion.span
              className="absolute left-1/2 top-1/2 h-[1px] w-1/2 origin-left bg-[#d99a4e]"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Arrow */}
            <motion.span
              className="relative z-10 text-lg"
              animate={
                isPressed
                  ? { y: [-2, -8, 0] }
                  : { y: [0, -3, 0] }
              }
              transition={{
                duration: isPressed ? 0.5 : 2,
                repeat: isPressed ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            >
              ↑
            </motion.span>

            {/* Click ripple */}
            <AnimatePresence>
              {isPressed && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.4 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-[#d99a4e]"
                />
              )}
            </AnimatePresence>

            {/* Hover label */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-[#100b09] px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[#a89a8c] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Back to top
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}