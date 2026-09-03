'use client';

import { useEffect, useRef } from 'react';

type Step = {
  number: string;
  title: string;
  description: string;
};

/*
  IMPORTANT:
  The visual layout is intentionally reversed.

  TOP
  04 Optimize
  03 Build & execute
  02 Mapping
  01 Discovery
  BOTTOM

  During scroll, they reveal from BOTTOM → TOP:

  01 Discovery
  02 Mapping
  03 Build & execute
  04 Optimize
*/

const STEPS: Step[] = [
  {
    number: '04',
    title: 'Optimize',
    description:
      "Refine and scale what's working, cut what isn't",
  },
  {
    number: '03',
    title: 'Build & execute',
    description:
      'Set up systems and automate the repetitive stuff',
  },
  {
    number: '02',
    title: 'Mapping',
    description:
      'Build a clear plan/roadmap for admin and automation needs',
  },
  {
    number: '01',
    title: 'Discovery',
    description:
      'Understand your workflow, bottlenecks, and goals from scratch',
  },
];

/* =========================================
   CUP GEOMETRY
   ========================================= */

const CUP_BODY_TOP = 68;
const CUP_BODY_BOTTOM = 255;
const LIQUID_BOTTOM = 260;

const CUP_BODY_HEIGHT =
  CUP_BODY_BOTTOM - CUP_BODY_TOP;

const LIQUID_HEIGHT =
  LIQUID_BOTTOM - CUP_BODY_TOP;

const VIEWBOX_MIN_Y = -70;
const VIEWBOX_HEIGHT = 335;

/* =========================================
   SCROLL
   ========================================= */

const PIN_HEIGHT_VH = 320;

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(min, Math.min(max, value));
}

function lerp(
  a: number,
  b: number,
  t: number
) {
  return a + (b - a) * t;
}

export default function HowIWork() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const stepsWrapRef =
    useRef<HTMLDivElement>(null);

  const stepRefs =
    useRef<(HTMLDivElement | null)[]>([]);

  const cupSvgRef =
    useRef<SVGSVGElement>(null);

  const liquidRef =
    useRef<SVGRectElement>(null);

  const surfaceLineRef =
    useRef<SVGLineElement>(null);

  const steamGroupRef =
    useRef<SVGGElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    const stepsWrap =
      stepsWrapRef.current;

    const cupSvg =
      cupSvgRef.current;

    const liquid =
      liquidRef.current;

    const surfaceLine =
      surfaceLineRef.current;

    const steamGroup =
      steamGroupRef.current;

    if (
      !section ||
      !stepsWrap ||
      !cupSvg ||
      !liquid ||
      !surfaceLine ||
      !steamGroup
    ) {
      return;
    }

    let targetProgress = 0;
    let currentProgress = 0;

    const stepTargets =
      STEPS.map(() => 0);

    const stepCurrents =
      STEPS.map(() => 0);

    let rafId = 0;
    let scrollTicking = false;

    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    /* =========================================
       SIZE CUP
       ========================================= */

    function sizeCup() {
      if (!stepsWrap) return;
      const processHeight =
        stepsWrap.getBoundingClientRect().height;

      if (!processHeight) return;

      const scale =
        processHeight /
        CUP_BODY_HEIGHT;

      const svgHeight =
        VIEWBOX_HEIGHT * scale;

      const svgWidth =
        150 * scale;

      const bodyTopInViewBox =
        CUP_BODY_TOP -
        VIEWBOX_MIN_Y;

      const svgTop =
        -(bodyTopInViewBox * scale);

      cupSvg.style.height =
        `${svgHeight}px`;

      cupSvg.style.width =
        `${svgWidth}px`;

      cupSvg.style.top =
        `${svgTop}px`;
    }

    /* =========================================
       MASTER SCROLL PROGRESS

       0 = beginning
       1 = end

       The IMPORTANT part:

       The DOM is visually:

       04 Optimize
       03 Build & execute
       02 Mapping
       01 Discovery

       Therefore we reveal the DOM
       backwards:

       index 3 → first
       index 2 → second
       index 1 → third
       index 0 → last
       ========================================= */

    function computeProgress() {
      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollDistance <= 0) {
        targetProgress = 0;
        return;
      }

      targetProgress = clamp(
        -rect.top / scrollDistance,
        0,
        1
      );

      STEPS.forEach((_, i) => {
        /*
          i = 0 → Optimize
          i = 1 → Build & execute
          i = 2 → Mapping
          i = 3 → Discovery

          Reveal index:

          Optimize        = 3
          Build & execute = 2
          Mapping         = 1
          Discovery       = 0
        */

        const revealIndex =
          STEPS.length - 1 - i;

        const start =
          revealIndex /
          STEPS.length;

        const end =
          (revealIndex + 1) /
          STEPS.length;

        const p =
          clamp(
            (targetProgress - start) /
              (end - start),
            0,
            1
          );

        stepTargets[i] = p;
      });
    }

    /* =========================================
       ANIMATION LOOP
       ========================================= */

    function tick() {
      if (reduceMotion) {
        currentProgress =
          targetProgress;
      } else {
        currentProgress =
          lerp(
            currentProgress,
            targetProgress,
            0.12
          );
      }

      /* =====================================
         COFFEE

         Always fills:

         BOTTOM → TOP

         This happens simultaneously
         with the process reveal.
         ===================================== */

      const liquidHeight =
        LIQUID_HEIGHT *
        currentProgress;

      const liquidY =
        LIQUID_BOTTOM -
        liquidHeight;

      liquid.setAttribute(
        'y',
        liquidY.toFixed(2)
      );

      liquid.setAttribute(
        'height',
        liquidHeight.toFixed(2)
      );

      surfaceLine.setAttribute(
        'y1',
        liquidY.toFixed(2)
      );

      surfaceLine.setAttribute(
        'y2',
        liquidY.toFixed(2)
      );

      /* =====================================
         PROCESS REVEALS

         Discovery is physically at the
         bottom, so it appears first.

         Then:

         Discovery
         ↓
         Mapping
         ↓
         Build & execute
         ↓
         Optimize
         ===================================== */

      stepRefs.current.forEach(
        (step, i) => {
          if (!step) return;

          if (reduceMotion) {
            stepCurrents[i] =
              stepTargets[i];
          } else {
            stepCurrents[i] =
              lerp(
                stepCurrents[i],
                stepTargets[i],
                0.15
              );
          }

          const p =
            stepCurrents[i];

          /*
            Hidden items sit slightly below
            their final position.

            As they appear they rise into
            their final position.
          */

          const translateY =
            (1 - p) * 24;

          step.style.opacity =
            p.toFixed(3);

          step.style.transform =
            `translateY(${translateY}px)`;
        }
      );

      /* =====================================
         STEAM

         Steam begins once Discovery
         starts appearing.

         Discovery is index 3.
         ===================================== */

      steamGroup.style.opacity =
        stepCurrents[3].toFixed(3);

      rafId =
        requestAnimationFrame(tick);
    }

    /* =========================================
       SCROLL HANDLER
       ========================================= */

    function onScroll() {
      if (scrollTicking) return;

      scrollTicking = true;

      requestAnimationFrame(() => {
        computeProgress();
        scrollTicking = false;
      });
    }

    /* =========================================
       RESIZE
       ========================================= */

    function onResize() {
      sizeCup();
      computeProgress();
    }

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      onResize
    );

    sizeCup();
    computeProgress();

    rafId =
      requestAnimationFrame(tick);

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );

      window.removeEventListener(
        'resize',
        onResize
      );

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-i-work"
    >

      {/* =====================================
          STICKY STAGE
          ===================================== */}

      <div className="how-i-work__sticky">

        {/* ===================================
            TITLE
            =================================== */}

        <h2 className="how-i-work__title">
          How I work
        </h2>


        {/* ===================================
            MAIN WORK AREA
            =================================== */}

        <div className="how-i-work__layout">

          {/* =================================
              PROCESS TIMELINE
              ================================= */}

          <div
            className="how-i-work__steps"
            ref={stepsWrapRef}
          >

            <div
              className="how-i-work__timeline"
              aria-hidden="true"
            />

            {STEPS.map(
              (step, i) => (
                <div
                  className="how-i-work__step"
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] =
                      el;
                  }}
                >

                  {/* NUMBER */}

                  <div className="how-i-work__num">
                    {step.number}
                  </div>


                  {/* CONTENT */}

                  <div className="how-i-work__step-body">

                    <div className="how-i-work__step-label">
                      PROCESS {step.number}
                    </div>

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>


          {/* =================================
              COFFEE CUP
              ================================= */}

          <div className="how-i-work__cup-col">

            <svg
              ref={cupSvgRef}
              className="how-i-work__cup-svg"
              viewBox="0 -70 150 335"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >

              <defs>

                <clipPath
                  id="howIWorkCupClip"
                >
                  <path
                    d="
                      M24 68
                      L126 68
                      L112 245
                      Q75 255 38 245
                      Z
                    "
                  />
                </clipPath>

              </defs>


              {/* =================================
                  STEAM
                  ================================= */}

              <g
                ref={steamGroupRef}
                style={{
                  opacity: 0,
                }}
              >

                <path
                  className="how-i-work__steam s1"
                  d="
                    M55 48
                    C47 38 60 29 54 18
                    C48 8 62 -2 56 -14
                  "
                  fill="none"
                  stroke="var(--cream)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  className="how-i-work__steam s2"
                  d="
                    M75 43
                    C67 31 82 22 75 10
                    C68 -2 83 -12 76 -25
                  "
                  fill="none"
                  stroke="var(--cream)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  className="how-i-work__steam s3"
                  d="
                    M95 48
                    C87 38 100 29 94 18
                    C88 8 102 -2 96 -14
                  "
                  fill="none"
                  stroke="var(--cream)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

              </g>


              {/* =================================
                  CUP LID
                  ================================= */}

              <path
                d="
                  M31 55
                  Q75 50 119 55
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.5"
              />

              <path
                d="
                  M28 56
                  L122 56
                  L126 67
                  Q75 72 24 67
                  Z
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              <path
                d="
                  M23 67
                  Q75 72 127 67
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.5"
              />


              {/* =================================
                  COFFEE
                  ================================= */}

              <g
                clipPath="url(#howIWorkCupClip)"
              >

                <rect
                  ref={liquidRef}
                  x="-10"
                  y={LIQUID_BOTTOM}
                  width="170"
                  height="0"
                  fill="var(--coffee)"
                  opacity="1"
                />

                <rect
                  x="-10"
                  y="68"
                  width="170"
                  height="192"
                  fill="var(--coffee-deep)"
                  opacity="0.12"
                />

                <line
                  ref={surfaceLineRef}
                  x1="18"
                  y1={LIQUID_BOTTOM}
                  x2="132"
                  y2={LIQUID_BOTTOM}
                  stroke="var(--coffee)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

              </g>


              {/* =================================
                  CUP BODY
                  ================================= */}

              <path
                d="
                  M24 68
                  L126 68
                  L112 245
                  Q75 255 38 245
                  Z
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />


              {/* =================================
                  CUP HORIZONTAL BANDS
                  ================================= */}

              <path
                d="
                  M27 104
                  Q75 111 123 104
                "
                fill="none"
                stroke="var(--cream)"
                strokeOpacity="0.48"
                strokeWidth="1"
              />

              <path
                d="
                  M31 164
                  Q75 170 119 164
                "
                fill="none"
                stroke="var(--cream)"
                strokeOpacity="0.48"
                strokeWidth="1"
              />

              <path
                d="
                  M35 231
                  Q75 240 115 231
                "
                fill="none"
                stroke="var(--cream)"
                strokeOpacity="0.42"
                strokeWidth="1"
              />


              {/* =================================
                  EDITORIAL SIDE DETAIL
                  ================================= */}

              <path
                d="
                  M34 113
                  L38 157
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity="0.75"
              />

              <path
                d="
                  M40 116
                  L43 143
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeOpacity="0.18"
              />


              {/* =================================
                  SMALL GRAPHIC MARKS
                  ================================= */}

              <circle
                cx="108"
                cy="93"
                r="1"
                fill="var(--cream)"
                opacity="0.28"
              />

              <circle
                cx="113"
                cy="97"
                r="0.6"
                fill="var(--cream)"
                opacity="0.2"
              />


              {/* MEASUREMENT TICKS */}

              <path
                d="M117 181 L120 181"
                stroke="var(--cream)"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />

              <path
                d="M116 185 L119 185"
                stroke="var(--cream)"
                strokeWidth="0.8"
                strokeOpacity="0.2"
              />


              {/* SIDE REGISTRATION MARK */}

              <path
                d="
                  M118 211
                  L121 211
                "
                stroke="var(--cream)"
                strokeWidth="0.7"
                strokeOpacity="0.25"
              />


              {/* =================================
                  BOTTOM RIM
                  ================================= */}

              <path
                d="
                  M38 245
                  Q75 253 112 245
                "
                fill="none"
                stroke="var(--cream)"
                strokeWidth="1.5"
              />


              {/* =================================
                  GROUNDING LINE
                  ================================= */}

              <line
                x1="34"
                y1="258"
                x2="116"
                y2="258"
                stroke="var(--cream)"
                strokeWidth="1"
                strokeOpacity="0.18"
              />

            </svg>

          </div>

        </div>

      </div>


      <style jsx>{`

        /* =========================================
           SECTION
           ========================================= */

        .how-i-work {
          --bg: #100b09;
          --cream: #f6ede0;
          --muted: #a89a8c;

          --coffee: #4a2a1b;
          --coffee-deep: #24140d;

          background: var(--bg);
          color: var(--cream);

          max-width: 1000px;

          margin: 0 auto;

          min-height: ${PIN_HEIGHT_VH}vh;

          position: relative;
        }


        /* =========================================
           STICKY STAGE
           ========================================= */

        .how-i-work__sticky {
          position: sticky;

          top: 0;

          width: 100%;

          height: 100vh;

          box-sizing: border-box;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 40px;

          overflow: visible;
        }


        /* =========================================
           TITLE
           ========================================= */

        .how-i-work__title {
          margin: 0 0 52px;

          font-size: 44px;

          line-height: 1;

          font-weight: 800;

          letter-spacing: -0.025em;

          color: var(--cream);

          position: relative;

          z-index: 5;

          text-align: center;
        }


        /* =========================================
           MAIN LAYOUT
           ========================================= */

        .how-i-work__layout {
          position: relative;

          width: min(860px, 100%);

          height: min(390px, 56vh);

          min-height: 320px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            300px;

          gap: 60px;

          align-items: stretch;

          flex: 0 0 auto;
        }


        /* =========================================
           PROCESS LIST

           Visual order:

           04 Optimize
           03 Build & execute
           02 Mapping
           01 Discovery

           This is intentional because the
           animation runs bottom → top.
           ========================================= */

        .how-i-work__steps {
          position: relative;

          height: 100%;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          min-width: 0;
        }


        /* =========================================
           TIMELINE
           ========================================= */

        .how-i-work__timeline {
          position: absolute;

          left: 17px;

          top: 17px;

          bottom: 17px;

          width: 1px;

          background:
            linear-gradient(
              to bottom,
              rgba(246, 237, 224, 0.32),
              rgba(246, 237, 224, 0.08)
            );

          pointer-events: none;

          z-index: 0;
        }


        /* =========================================
           PROCESS ITEM
           ========================================= */

        .how-i-work__step {
          position: relative;

          display: flex;

          align-items: flex-start;

          gap: 20px;

          padding: 0;

          opacity: 0;

          will-change:
            opacity,
            transform;

          z-index: 2;
        }


        /* =========================================
           PROCESS NUMBER
           ========================================= */

        .how-i-work__num {
          position: relative;

          z-index: 3;

          flex: 0 0 auto;

          width: 34px;

          height: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          box-sizing: border-box;

          background: var(--bg);

          border:
            1px solid
            rgba(246, 237, 224, 0.38);

          color: var(--cream);

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.04em;
        }


        /* =========================================
           STEP BODY
           ========================================= */

        .how-i-work__step-body {
          padding-top: 1px;

          max-width: 440px;

          min-width: 0;
        }


        .how-i-work__step-label {
          margin-bottom: 5px;

          color:
            rgba(246, 237, 224, 0.42);

          font-size: 9px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.14em;
        }


        .how-i-work__step-body h3 {
          margin: 0 0 7px;

          color: var(--cream);

          font-size: 19px;

          line-height: 1.15;

          font-weight: 700;

          letter-spacing: -0.01em;
        }


        .how-i-work__step-body p {
          margin: 0;

          max-width: 38ch;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.5;
        }


        /* =========================================
           CUP COLUMN
           ========================================= */

        .how-i-work__cup-col {
          position: relative;

          height: 100%;

          display: flex;

          align-items: flex-start;

          justify-content: center;

          overflow: visible;
        }


        /* =========================================
           CUP

           Entire cup stays static.
           ========================================= */

        .how-i-work__cup-svg {
          position: absolute;

          left: 50%;

          transform:
            translateX(-50%);

          display: block;

          overflow: visible;

          max-width: none;

          will-change: auto;
        }


        /* =========================================
           STEAM

           Only steam moves.
           ========================================= */

        .how-i-work__steam {
          transform-box: fill-box;

          transform-origin: center bottom;

          animation:
            steam-wave 3.2s ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }


        .how-i-work__steam.s2 {
          animation-delay: 0.8s;
        }


        .how-i-work__steam.s3 {
          animation-delay: 1.6s;
        }


        /* =========================================
           STEAM MOTION
           ========================================= */

        @keyframes steam-wave {

          0% {
            transform:
              translateX(0)
              translateY(5px)
              rotate(-4deg);

            opacity: 0;
          }

          20% {
            transform:
              translateX(-1px)
              translateY(1px)
              rotate(-2deg);

            opacity: 0.7;
          }

          40% {
            transform:
              translateX(3px)
              translateY(-3px)
              rotate(5deg);

            opacity: 0.65;
          }

          60% {
            transform:
              translateX(-3px)
              translateY(-7px)
              rotate(-5deg);

            opacity: 0.5;
          }

          80% {
            transform:
              translateX(2px)
              translateY(-11px)
              rotate(4deg);

            opacity: 0.25;
          }

          100% {
            transform:
              translateX(0)
              translateY(-15px)
              rotate(0deg);

            opacity: 0;
          }
        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 720px) {

          .how-i-work {
            min-height: 280vh;
          }


          .how-i-work__sticky {
            padding:
              30px 24px;
          }


          .how-i-work__title {
            margin-bottom: 38px;

            font-size: 38px;
          }


          .how-i-work__layout {
            width: 100%;

            height: 58vh;

            min-height: 360px;

            grid-template-columns:
              minmax(0, 1fr)
              190px;

            gap: 18px;
          }


          .how-i-work__step {
            gap: 12px;
          }


          .how-i-work__num {
            width: 30px;

            height: 30px;

            font-size: 10px;
          }


          .how-i-work__timeline {
            left: 14px;
          }


          .how-i-work__step-body h3 {
            font-size: 16px;
          }


          .how-i-work__step-body p {
            font-size: 12px;
          }


          .how-i-work__step-label {
            font-size: 8px;
          }

        }


        /* =========================================
           REDUCED MOTION
           ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .how-i-work__steam {
            animation: none;
          }

        }

      `}</style>
    </section>
  );
}
