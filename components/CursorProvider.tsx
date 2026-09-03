'use client';

import { useEffect, useState, useRef } from 'react';

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorPillRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  // Preloader logic
  useEffect(() => {
    // Check if user has visited in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowPreloader(false);
    } else {
      // Mark as visited
      sessionStorage.setItem('hasVisited', 'true');
      // Hide preloader after a short delay (simulating load time)
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 1500); // 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Magnetic cursor effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update dot position
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }

      // Update pill position with slight delay for magnetic effect
      if (cursorPillRef.current) {
        cursorPillRef.current.style.left = `${x}px`;
        cursorPillRef.current.style.top = `${y}px`;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if element is interactive (button, link, etc.)
      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.hasAttribute('role') && target.getAttribute('role') === 'button' ||
          target.closest('a, button, [role="button"]')) {
        // Show pill and label
        if (cursorPillRef.current) {
          cursorPillRef.current.style.width = '40px';
          cursorPillRef.current.style.opacity = '0.7';
        }
        if (cursorLabelRef.current) {
          const labelText = target.getAttribute('data-cursor-label') ||
                           target.textContent?.trim() ||
                           'Click';
          cursorLabelRef.current.textContent = labelText;
          cursorLabelRef.current.style.opacity = '1';

          // Position label above the pill
          const rect = target.getBoundingClientRect();
          cursorLabelRef.current.style.left = `${rect.left + rect.width / 2}px`;
          cursorLabelRef.current.style.top = `${rect.top - 10}px`;
        }
      }
    };

    const handleMouseLeave = () => {
      // Hide pill and label
      if (cursorPillRef.current) {
        cursorPillRef.current.style.width = '8px';
        cursorPillRef.current.style.opacity = '0';
      }
      if (cursorLabelRef.current) {
        cursorLabelRef.current.style.opacity = '0';
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter, true); // Use capture phase
    window.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Preloader - only show on first visit */}
      {showPreloader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-dark">
          <div className="text-center">
            <div className="text-5xl font-bold tracking-tighter text-coffee-cream">
              J
            </div>
            <p className="text-coffee-cream/60 mt-2">Loading...</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative min-h-screen bg-background text-foreground">
        {/* Custom cursor elements */}
        <div
          className="cursor-dot"
          ref={cursorDotRef}
        ></div>
        <div
          className="cursor-pill"
          ref={cursorPillRef}
        ></div>
        <div
          className="cursor-label"
          ref={cursorLabelRef}
        ></div>

        {children}
      </div>
    </>
  );
}