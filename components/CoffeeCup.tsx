'use client';

import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

export default function CoffeeCup({ progress }: { progress: MotionValue<number> }) {
  // Guard against NaN progress values
  const safeProgress = useTransform(progress, (p) => typeof p === 'number' && !isNaN(p) ? p : 0);

  // Calculate liquid properties based on progress (0-1)
  const liquidHeight = useTransform(safeProgress, (p: number) => p * 90); // 90 is the inner height of the cup
  const liquidY = useTransform(liquidHeight, (h: number) => 120 - h); // Start from bottom and grow up

  // Steam animation - only show when cup is full (progress >= 0.95)
  const steamOffset = useTransform(
    safeProgress,
    [0.95, 1],
    [-10, -30], // Move steam upward as it appears
    { clamp: true }
  );
  const steamOpacity = useTransform(
    safeProgress,
    [0.95, 1],
    [0, 0.6],
    { clamp: true }
  );

  // Calculate steam positions with offsets
  const steam1Y = useTransform(steamOffset, (offset: number) => offset + 20);
  const steam2Y = useTransform(steamOffset, (offset: number) => offset + 25);
  const steam3Y = useTransform(steamOffset, (offset: number) => offset + 18);

  // Create string motion values for steam transforms
  const steam1YTransform = useTransform(steam1Y, (y: number) => `translateY(${y})`);
  const steam2YTransform = useTransform(steam2Y, (y: number) => `translateY(${y})`);
  const steam3YTransform = useTransform(steam3Y, (y: number) => `translateY(${y})`);

  // Create motion versions of SVG elements
  const MotionPath = motion.create('path');
  const MotionRect = motion.create('rect');
  const MotionG = motion.create('g');

  return (
    <motion.div
      className="relative w-[100px] h-[140px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        width="100"
        height="140"
        viewBox="0 0 100 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="cup-liquid-clip">
            <path
              d="M10,30
                 Q20,0 40,0
                 T70,30
                 L70,120
                 Q60,130 50,125
                 Q40,120 30,130
                 T10,120 Z"
            />
          </clipPath>
        </defs>

        {/* Cup outline */}
        <path
          d="M10,30
             Q20,0 40,0
             T70,30
             L70,120
             Q60,130 50,125
             Q40,120 30,130
             T10,120 Z"
          stroke="var(--coffee-cream)"
          strokeWidth="3"
          fill="none"
        />

        {/* Liquid group */}
        <MotionG>
          {/* Liquid rectangle */}
          <MotionRect
            x="10"
            width="60"
            height="90"
            style={{
              transformOrigin: 'bottom',
              scaleY: liquidHeight,
              translateY: liquidY
            }}
            clipPath="url(#cup-liquid-clip)"
            fill="var(--coffee-accent)"
          />

          {/* Crema line */}
          <MotionRect
            x="10"
            width="60"
            height="2"
            style={{
              transformOrigin: 'bottom',
              scaleY: liquidHeight,
              translateY: liquidY
            }}
            clipPath="url(#cup-liquid-clip)"
            fill="var(--coffee-darker-accent)"
          />
        </MotionG>

        {/* Steam group */}
        <MotionG
          style={{ opacity: steamOpacity }}
        >
          {/* Steam wisp 1 */}
          <MotionPath
            d="M35,20 Q30,10 25,20 Q30,30 35,20"
            stroke="var(--coffee-cream)"
            strokeWidth="1.5"
            fill="none"
            style={{
              strokeDasharray: '4 2',
              transform: steam1YTransform
            }}
          />

          {/* Steam wisp 2 */}
          <MotionPath
            d="M45,25 Q40,15 35,25 Q40,35 45,25"
            stroke="var(--coffee-cream)"
            strokeWidth="1.2"
            fill="none"
            style={{
              strokeDasharray: '3 2',
              transform: steam2YTransform
            }}
          />

          {/* Steam wisp 3 */}
          <MotionPath
            d="M40,18 Q35,8 30,18 Q35,28 40,18"
            stroke="var(--coffee-cream)"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: '2 2',
              transform: steam3YTransform
            }}
          />
        </MotionG>
      </svg>
    </motion.div>
  );
}