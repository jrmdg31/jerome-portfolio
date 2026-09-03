'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreloader, setShowPreloader] = useState(true);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorPillRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const cursorIconRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------
  // Preloader
  // ------------------------------------------------------------

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      setShowPreloader(false);
      return;
    }

    sessionStorage.setItem('hasVisited', 'true');

    const timer = window.setTimeout(() => {
      setShowPreloader(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  // ------------------------------------------------------------
  // Custom cursor
  // ------------------------------------------------------------

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable custom cursor on touch/coarse-pointer devices.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const pill = cursorPillRef.current;
    const label = cursorLabelRef.current;
    const icon = cursorIconRef.current;

    if (!dot || !pill || !label || !icon) return;

    let activeTarget: HTMLElement | null = null;
    let pointerInsideWindow = false;

    // ----------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------

    const setPosition = (x: number, y: number) => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      pill.style.left = `${x}px`;
      pill.style.top = `${y}px`;

      label.style.left = `${x + 22}px`;
      label.style.top = `${y - 28}px`;
    };

    const findInteractiveTarget = (
      target: EventTarget | null
    ): HTMLElement | null => {
      if (!(target instanceof Element)) return null;

      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor-label], input, textarea, select'
      );

      return interactive instanceof HTMLElement ? interactive : null;
    };

    const enterInteractive = (target: HTMLElement) => {
      if (activeTarget === target) return;

      activeTarget = target;

      const customLabel =
        target.getAttribute('data-cursor-label') ||
        target.getAttribute('aria-label');

      const fallbackLabel =
        target.tagName === 'BUTTON'
          ? 'Click'
          : target.tagName === 'A'
            ? 'Open'
            : target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT'
              ? 'Select'
              : 'Open';

      const labelText =
        customLabel ||
        target.textContent?.trim().replace(/\s+/g, ' ').slice(0, 24) ||
        fallbackLabel;

      label.textContent = labelText;

      // --------------------------------------------------------
      // Dot
      // --------------------------------------------------------

      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      dot.style.opacity = '0';

      // --------------------------------------------------------
      // Interaction ring
      // --------------------------------------------------------

      pill.style.width = '52px';
      pill.style.height = '52px';
      pill.style.opacity = '1';
      pill.style.borderColor = 'rgba(217, 154, 78, 0.9)';
      pill.style.backgroundColor = 'rgba(16, 11, 9, 0.12)';

      // --------------------------------------------------------
      // Arrow
      // --------------------------------------------------------

      icon.style.opacity = '1';
      icon.style.transform =
        'translate(-50%, -50%) scale(1) rotate(0deg)';

      // --------------------------------------------------------
      // Label
      // --------------------------------------------------------

      label.style.opacity = '1';
      label.style.transform = 'translateY(0)';
    };

    const leaveInteractive = () => {
      activeTarget = null;

      // --------------------------------------------------------
      // Dot
      // --------------------------------------------------------

      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.opacity = pointerInsideWindow ? '1' : '0';

      // --------------------------------------------------------
      // Interaction ring
      // --------------------------------------------------------

      pill.style.width = '8px';
      pill.style.height = '8px';
      pill.style.opacity = '0';
      pill.style.borderColor = 'rgba(217, 154, 78, 0)';
      pill.style.backgroundColor = 'transparent';

      // --------------------------------------------------------
      // Arrow
      // --------------------------------------------------------

      icon.style.opacity = '0';
      icon.style.transform =
        'translate(-50%, -50%) scale(0.5) rotate(-20deg)';

      // --------------------------------------------------------
      // Label
      // --------------------------------------------------------

      label.style.opacity = '0';
      label.style.transform = 'translateY(6px)';
    };

    // ----------------------------------------------------------
    // Mouse movement
    // ----------------------------------------------------------

    const handleMouseMove = (event: MouseEvent) => {
      pointerInsideWindow = true;

      const { clientX, clientY } = event;

      setPosition(clientX, clientY);

      const target = findInteractiveTarget(event.target);

      if (target) {
        enterInteractive(target);
      } else if (activeTarget) {
        leaveInteractive();
      }

      // Safety: if the cursor ever becomes hidden accidentally,
      // restore the base dot while the pointer is inside the page.
      if (!activeTarget && dot.style.opacity !== '1') {
        dot.style.opacity = '1';
      }
    };

    // ----------------------------------------------------------
    // Window enter
    // ----------------------------------------------------------

    const handleWindowEnter = () => {
      pointerInsideWindow = true;

      if (!activeTarget) {
        dot.style.opacity = '1';
      }
    };

    // ----------------------------------------------------------
    // Window leave
    // ----------------------------------------------------------

    const handleWindowLeave = () => {
      pointerInsideWindow = false;

      activeTarget = null;

      dot.style.opacity = '0';
      pill.style.opacity = '0';
      label.style.opacity = '0';
      icon.style.opacity = '0';
    };

    // ----------------------------------------------------------
    // Pointer leave protection
    // ----------------------------------------------------------

    const handlePointerOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget;

      // If we're moving between children of the same interactive
      // element, don't reset the cursor.
      if (
        relatedTarget instanceof Node &&
        event.target instanceof Node &&
        (event.target === relatedTarget ||
          (event.target as Node).contains(relatedTarget) ||
          (relatedTarget as Node).contains(event.target))
      ) {
        return;
      }

      // Don't hide the cursor simply because a child element
      // generated a mouseout event.
      const currentTarget = findInteractiveTarget(event.target);
      const nextTarget = findInteractiveTarget(relatedTarget);

      if (currentTarget && currentTarget === nextTarget) {
        return;
      }

      if (nextTarget) {
        enterInteractive(nextTarget);
        return;
      }

      if (!nextTarget && activeTarget) {
        leaveInteractive();
      }
    };

    // ----------------------------------------------------------
    // Events
    // ----------------------------------------------------------

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleWindowEnter);
    window.addEventListener('mouseleave', handleWindowLeave);
    window.addEventListener('mouseout', handlePointerOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleWindowEnter);
      window.removeEventListener('mouseleave', handleWindowLeave);
      window.removeEventListener('mouseout', handlePointerOut);
    };
  }, []);

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-dark">
          <div className="text-center">
            <div className="text-5xl font-bold tracking-tighter text-coffee-cream">
              J
            </div>

            <p className="mt-2 text-coffee-cream/60">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative min-h-screen bg-background text-foreground">
        {/* ----------------------------------------------------
            Base cursor dot
        ---------------------------------------------------- */}

        <div
          ref={cursorDotRef}
          className="pointer-events-none fixed z-[99999] h-2 w-2 rounded-full bg-[#f6ede0]"
          style={{
            left: 0,
            top: 0,
            opacity: 1,
            transform: 'translate(-50%, -50%)',
            transition:
              'transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease',
          }}
        />

        {/* ----------------------------------------------------
            Interaction ring
        ---------------------------------------------------- */}

        <div
          ref={cursorPillRef}
          className="pointer-events-none fixed z-[99998] rounded-full border"
          style={{
            left: 0,
            top: 0,
            width: '8px',
            height: '8px',
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            borderColor: 'rgba(217, 154, 78, 0)',
            backgroundColor: 'transparent',
            transition:
              'width 450ms cubic-bezier(0.16, 1, 0.3, 1), height 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease, border-color 350ms ease, background-color 350ms ease',
            animation: 'cursor-spin 5s linear infinite',
          }}
        >
          {/* Interaction arrow */}
          <div
            ref={cursorIconRef}
            className="pointer-events-none absolute left-1/2 top-1/2 text-[11px] font-light text-[#d99a4e]"
            style={{
              opacity: 0,
              transform:
                'translate(-50%, -50%) scale(0.5) rotate(-20deg)',
              transition:
                'opacity 250ms ease, transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            ↗
          </div>
        </div>

        {/* ----------------------------------------------------
            Cursor label
        ---------------------------------------------------- */}

        <div
          ref={cursorLabelRef}
          className="pointer-events-none fixed z-[99999] whitespace-nowrap border border-[#f6ede0]/10 bg-[#100b09]/90 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-[#f6ede0]/70 backdrop-blur-sm"
          style={{
            left: 0,
            top: 0,
            opacity: 0,
            transform: 'translateY(6px)',
            transition:
              'opacity 220ms ease, transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {children}
      </div>

      {/* ------------------------------------------------------
          Cursor CSS
      ------------------------------------------------------ */}

      <style jsx global>{`
        html,
        body,
        a,
        button,
        [role='button'],
        input,
        textarea,
        select {
          cursor: none !important;
        }

        /*
         * Prevent child elements inside buttons/links from
         * interfering with the custom cursor.
         */
        a *,
        button *,
        [role='button'] * {
          cursor: none !important;
        }

        /*
         * Keep the custom cursor above every portfolio element,
         * including animated sections, navigation and modals.
         */
        .cursor-dot,
        .cursor-pill,
        .cursor-label {
          pointer-events: none !important;
        }

        @keyframes cursor-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /*
         * Touch devices keep the native cursor/touch behavior.
         */
        @media (pointer: coarse) {
          html,
          body,
          a,
          button,
          [role='button'],
          input,
          textarea,
          select {
            cursor: auto !important;
          }

          a *,
          button *,
          [role='button'] * {
            cursor: auto !important;
          }

          .cursor-dot,
          .cursor-pill,
          .cursor-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}