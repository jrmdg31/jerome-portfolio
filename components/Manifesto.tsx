'use client';

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

const tools = [
  {
    label: 'EMAIL',
    detail: '47 unread',
    x: '8%',
    y: '18%',
    rotate: -6,
  },
  {
    label: 'SHEETS',
    detail: 'Manual data',
    x: '58%',
    y: '8%',
    rotate: 5,
  },
  {
    label: 'CRM',
    detail: '12 updates',
    x: '68%',
    y: '62%',
    rotate: -4,
  },
  {
    label: 'ADMIN',
    detail: '3.4 hrs/day',
    x: '4%',
    y: '68%',
    rotate: 6,
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  // Graphic movement based on scroll
  const graphicY = useTransform(progress, [0, 0.5, 1], [40, 0, -40]);
  const graphicOpacity = useTransform(
    progress,
    [0, 0.15, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Text reveal
  const textY = useTransform(progress, [0, 0.35], [30, 0]);
  const textOpacity = useTransform(progress, [0, 0.25], [0, 1]);

  // Mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 20);
    mouseY.set(y * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-[1400px] mx-auto px-4 py-28 sm:px-6 lg:px-8 lg:py-36 overflow-hidden"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT: COPY */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          className="relative z-10 max-w-2xl"
        >
          <h2 className="mb-7 text-4xl font-bold tracking-[-0.045em] text-coffee-cream sm:text-5xl lg:text-[4rem] lg:leading-[0.95]">
            Some call it burnout.
            <br />
            Others call it undercaffeinated.
          </h2>

          <p className="mb-8 max-w-xl text-base leading-7 text-coffee-cream/90 sm:text-lg">
            You're drowning in admin tasks, manual processes, and scattered
            tools that should be saving you time — not stealing it. I help
            virtual assistants and automation specialists build systems that
            work while they sleep, so they can focus on strategy, growth, and
            actually enjoying their work.
          </p>

          <p className="max-w-xl text-sm leading-6 text-coffee-cream/65 sm:text-base">
            Because your expertise shouldn't be buried under spreadsheets and
            email chains.
          </p>
        </motion.div>

        {/* RIGHT: INTERACTIVE SYSTEM */}
        <motion.div
          style={{
            y: graphicY,
            opacity: graphicOpacity,
            x: smoothMouseX,
          }}
          className="relative hidden min-h-[430px] lg:block"
        >
          {/* Ambient grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
              maskImage:
                'radial-gradient(circle at center, black, transparent 72%)',
            }}
          />

          {/* Connection lines */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 600 430"
            fill="none"
          >
            <motion.path
              d="M100 105 C180 120 220 185 300 215"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-cream/20"
              style={{
                pathLength: progress,
              }}
            />

            <motion.path
              d="M390 80 C360 135 340 170 300 215"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-cream/20"
              style={{
                pathLength: progress,
              }}
            />

            <motion.path
              d="M410 305 C375 275 345 250 300 215"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-cream/20"
              style={{
                pathLength: progress,
              }}
            />

            <motion.path
              d="M95 315 C175 295 225 250 300 215"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-cream/20"
              style={{
                pathLength: progress,
              }}
            />

            {/* Output */}
            <motion.path
              d="M350 215 C430 215 465 215 535 215"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coffee-cream/30"
              style={{
                pathLength: progress,
              }}
            />
          </svg>

          {/* Floating task cards */}
          {tools.map((tool, index) => (
            <motion.div
              key={tool.label}
              className="absolute w-[145px]"
              style={{
                left: tool.x,
                top: tool.y,
                rotate: tool.rotate,
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.25,
              }}
            >
              <div className="border border-coffee-cream/15 bg-[#110c0a]/90 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-coffee-cream/80">
                    {tool.label}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-coffee-cream/40" />
                </div>

                <div className="mt-2 text-xs text-coffee-cream/40">
                  {tool.detail}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Central automation node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          >
            {/* Pulse */}
            <motion.div
              className="absolute -inset-8 rounded-full border border-coffee-cream/10"
              animate={{
                scale: [0.8, 1.15, 0.8],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-coffee-cream/30 bg-[#110c0a]"
              animate={{
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="mb-2 h-2 w-2 rounded-full bg-coffee-cream" />

              <span className="text-[9px] font-bold tracking-[0.2em] text-coffee-cream">
                AUTOMATION
              </span>

              <span className="mt-1 text-[8px] tracking-widest text-coffee-cream/35">
                RUNNING
              </span>
            </motion.div>
          </motion.div>

          {/* Output */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          >
            <div className="border border-coffee-cream/15 bg-[#110c0a] px-4 py-3">
              <div className="text-[9px] font-bold tracking-[0.18em] text-coffee-cream/80">
                SYSTEM
              </div>

              <div className="mt-1 text-xs text-coffee-cream/40">
                WORKS WHILE YOU SLEEP
              </div>
            </div>
          </motion.div>

          {/* Tiny status label */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] text-coffee-cream/25">
            MANUAL → AUTOMATED
          </div>
        </motion.div>
      </div>
    </section>
  );
}