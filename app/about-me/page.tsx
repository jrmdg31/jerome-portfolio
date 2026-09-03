'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const CHAPTERS = [
  { id: 'beginning', number: '01', label: 'The beginning' },
  { id: 'rowing', number: '02', label: 'Keep rowing' },
  { id: 'fourteen', number: '03', label: 'Start now' },
  { id: 'kai', number: '04', label: 'What matters' },
  { id: 'now', number: '05', label: 'Who I became' },
  { id: 'meaning', number: '06', label: 'What I want' },
  { id: 'coffee', number: '07', label: 'The quiet moment' },
];

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ChapterLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="text-[10px] tracking-[0.25em] text-[#d99a4e]">
        {number}
      </span>

      <span className="h-px w-10 bg-[#f6ede0]/20" />

      <span className="text-[9px] uppercase tracking-[0.3em] text-[#a89a8c]">
        {label}
      </span>
    </div>
  );
}

function CoffeeGraphic() {
  return (
    <div className="relative flex h-[280px] w-[280px] items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full border border-[#f6ede0]/10"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute inset-7 rounded-full border border-dashed border-[#d99a4e]/20"
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute inset-14 rounded-full border border-[#f6ede0]/10"
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative h-28 w-36">
        <div className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 border-2 border-[#f6ede0]/60" />

        <div className="absolute bottom-2 left-1/2 h-12 w-20 -translate-x-1/2 border border-[#d99a4e]/40" />

        <div className="absolute bottom-7 left-[calc(50%+38px)] h-9 w-8 rounded-r-full border-2 border-l-0 border-[#f6ede0]/50" />

        <motion.div
          className="absolute left-1/2 top-0 h-12 w-16 -translate-x-1/2"
          animate={{
            y: [-3, 3, -3],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="absolute left-1/2 h-full w-px -translate-x-1/2 rotate-6 bg-[#f6ede0]/30" />

          <span className="absolute left-[35%] h-9 w-px -rotate-12 bg-[#f6ede0]/20" />

          <span className="absolute left-[65%] h-10 w-px rotate-12 bg-[#d99a4e]/30" />
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   STICKY BACK TO PORTFOLIO
================================================================ */

function BackToPortfolio() {
  return (
    <motion.a
      href="/"
      aria-label="Return to main portfolio"
      data-cursor-label="Portfolio"
      initial={{
        opacity: 0,
        x: 45,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 0.9,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group fixed right-0 top-1/2 z-[60] -translate-y-1/2"
    >
      <motion.div
        whileHover={{
          x: -7,
        }}
        whileTap={{
          scale: 0.96,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative flex items-center gap-3 border border-r-0 border-[#f6ede0]/15 bg-[#100b09]/90 px-3 py-4 backdrop-blur-md sm:px-4"
      >
        {/* Top-right corner */}
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#d99a4e]" />

        {/* Bottom-left corner */}
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#d99a4e]/40" />

        {/* Scanning vertical line */}
        <span className="relative h-9 w-px overflow-hidden bg-[#f6ede0]/10">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-[#d99a4e]"
            animate={{
              y: ['-120%', '320%'],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </span>

        {/* Arrow */}
        <motion.span
          className="text-lg leading-none text-[#d99a4e]"
          animate={{
            x: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        >
          ←
        </motion.span>

        {/* Desktop label */}
        <span className="hidden whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-[#f6ede0]/60 transition-colors duration-300 group-hover:text-[#f6ede0] sm:block">
          Back to portfolio
        </span>

        {/* Mobile label */}
        <span className="text-[8px] uppercase tracking-[0.18em] text-[#f6ede0]/60 sm:hidden">
          Back
        </span>
      </motion.div>

      {/* Connecting animated line */}
      <motion.span
        className="pointer-events-none absolute -left-8 top-1/2 h-px w-8 origin-right bg-[#d99a4e]/30"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        }}
      />
    </motion.a>
  );
}

export default function AboutMePage() {
  const [activeChapter, setActiveChapter] = useState('beginning');

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(
    progress,
    [0, 1],
    ['0%', '100%']
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CHAPTERS.forEach((chapter) => {
      const element = document.getElementById(chapter.id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(chapter.id);
          }
        },
        {
          rootMargin: '-35% 0px -55% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#100b09] text-[#f6ede0]">
      {/* =========================================================
          GLOBAL EDITORIAL UI
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="absolute left-0 top-0 h-12 w-12 border-l border-t border-[#d99a4e]/30" />

        <div className="absolute right-0 top-0 h-12 w-12 border-r border-t border-[#d99a4e]/30" />

        <div className="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-[#d99a4e]/30" />

        <div className="absolute bottom-0 right-0 h-12 w-12 border-b border-r border-[#d99a4e]/30" />
      </div>

      {/* =========================================================
          STICKY BACK TO PORTFOLIO
      ========================================================= */}

      <BackToPortfolio />

      {/* =========================================================
          CHAPTER PROGRESS
      ========================================================= */}

      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="relative h-56 w-px bg-[#f6ede0]/10">
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-[#d99a4e]"
            style={{
              height: progressHeight,
            }}
          />
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          {CHAPTERS.map((chapter) => {
            const active = activeChapter === chapter.id;

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                className="group relative flex items-center"
                aria-label={`Go to ${chapter.label}`}
              >
                <span
                  className={`h-1 w-1 rounded-full transition-all duration-300 ${
                    active
                      ? 'scale-150 bg-[#d99a4e]'
                      : 'bg-[#f6ede0]/20 group-hover:bg-[#f6ede0]/60'
                  }`}
                />

                <span className="pointer-events-none absolute right-4 whitespace-nowrap bg-[#100b09] px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-[#a89a8c] opacity-0 transition-opacity group-hover:opacity-100">
                  {chapter.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 lg:px-16">
        <a
          href="/"
          className="group relative text-sm font-bold tracking-tight"
        >
          Jerome David

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d99a4e] transition-all duration-300 group-hover:w-full" />
        </a>

        <div className="flex items-center gap-4">
          <span className="hidden text-[8px] uppercase tracking-[0.25em] text-[#a89a8c]/60 sm:block">
            Personal story
          </span>

          <span className="h-px w-8 bg-[#f6ede0]/15" />

          <span className="text-[8px] tracking-[0.2em] text-[#d99a4e]">
            2026
          </span>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative flex min-h-[calc(100vh-80px)] items-center px-6 py-24 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(#f6ede0 1px, transparent 1px),
                linear-gradient(90deg, #f6ede0 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          <motion.div
            className="absolute left-[8%] top-[20%] h-px w-32 bg-[#d99a4e]/20"
            animate={{
              width: ['8rem', '14rem', '8rem'],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-[20%] right-[8%] h-24 w-24 border border-[#f6ede0]/5"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[9px] tracking-[0.3em] text-[#d99a4e]">
              PERSONAL / 001
            </span>

            <span className="h-px w-12 bg-[#f6ede0]/20" />

            <span className="text-[9px] uppercase tracking-[0.3em] text-[#a89a8c]">
              A little more about me
            </span>
          </div>

          <div className="grid items-end gap-16 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-5xl text-[clamp(4rem,11vw,10rem)] font-bold leading-[0.82] tracking-[-0.07em]"
              >
                A life
                <br />
                <span className="text-[#d99a4e]">
                  worth rowing
                </span>
                <br />
                for.
              </motion.h1>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                }}
                className="mt-12 max-w-md"
              >
                <p className="text-base leading-relaxed text-[#a89a8c]">
                  This isn't a résumé. It's the story behind the
                  person building everything you see here.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                rotate: -8,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden justify-end lg:flex"
            >
              <CoffeeGraphic />
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.2,
            }}
            className="absolute bottom-0 left-0 flex items-center gap-3"
          >
            <motion.span
              className="h-8 w-px bg-[#d99a4e]"
              animate={{
                scaleY: [1, 0.4, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <span className="text-[8px] uppercase tracking-[0.25em] text-[#a89a8c]/50">
              Scroll to read
            </span>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          01 — BEGINNING
      ========================================================= */}

      <section
        id="beginning"
        className="relative px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <ChapterLabel
            number="01"
            label="The beginning"
          />

          <div className="grid gap-16 lg:grid-cols-[0.35fr_1fr]">
            <Reveal>
              <span className="text-[clamp(5rem,12vw,11rem)] font-bold leading-none tracking-[-0.08em] text-[#f6ede0]/[0.04]">
                01
              </span>
            </Reveal>

            <div className="max-w-4xl">
              <Reveal>
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  I learned early that
                  <br />
                  <span className="text-[#d99a4e]">
                    people can be cruel.
                  </span>
                </h2>
              </Reveal>

              <Reveal
                delay={0.1}
                className="mt-12 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  My name is Jerome. I'm from the Philippines,
                  and I was born with a cleft palate.
                </p>
              </Reveal>

              <Reveal
                delay={0.2}
                className="mt-6 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  Growing up, I learned very early that people
                  can be cruel about things they don't
                  understand.
                </p>
              </Reveal>

              <Reveal
                delay={0.3}
                className="mt-10"
              >
                <p className="max-w-3xl text-2xl font-medium leading-relaxed text-[#f6ede0] md:text-3xl">
                  I was called a monster.
                  <br />
                  I was told I wasn't normal.
                  <br />
                  People avoided me.
                </p>
              </Reveal>

              <Reveal
                delay={0.4}
                className="mt-10 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  Mean words were shouted at me constantly.
                  There were moments when simply walking into a
                  room made me feel like everyone was looking at
                  what was different about me.
                </p>
              </Reveal>

              <Reveal
                delay={0.5}
                className="mt-10"
              >
                <p className="text-xl italic text-[#f6ede0]/70">
                  For a long time, I didn't have the courage to
                  be strong.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02 — ROWING
      ========================================================= */}

      <section
        id="rowing"
        className="relative border-y border-[#f6ede0]/10 px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <ChapterLabel
            number="02"
            label="Keep rowing"
          />

          <div className="grid gap-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Reveal>
                <p className="text-2xl leading-relaxed text-[#f6ede0]/80 md:text-4xl">
                  But I kept going anyway.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <h2 className="mt-8 text-5xl font-bold tracking-[-0.04em] md:text-7xl">
                  Even when I
                  <br />
                  <span className="text-[#d99a4e]">
                    didn't know why.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="relative border-l border-[#d99a4e]/30 pl-8 md:pl-12">
                <span className="absolute -left-[4px] top-2 h-2 w-2 rounded-full bg-[#d99a4e]" />

                <p className="text-xl leading-[1.9] text-[#a89a8c]">
                  When I was sixteen, I had a strange dream.
                  There was an old woman I didn't recognize.
                </p>

                <p className="mt-8 text-xl leading-[1.9] text-[#a89a8c]">
                  I don't remember everything about the dream.
                </p>

                <p className="mt-8 text-2xl font-medium leading-relaxed text-[#f6ede0]">
                  But I remember what she told me.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.35}
            className="mt-32"
          >
            <div className="relative overflow-hidden border-y border-[#f6ede0]/10 py-20 text-center md:py-28">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d99a4e]/10"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <p className="relative z-10 px-4 text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.05em]">
                “God will steer,
                <br />
                <span className="text-[#d99a4e]">
                  but you must row.”
                </span>
              </p>

              <p className="relative z-10 mt-8 text-[9px] uppercase tracking-[0.35em] text-[#a89a8c]/50">
                A dream / age 12
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          03 — AGE 14
      ========================================================= */}

      <section
        id="fourteen"
        className="relative px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <ChapterLabel
            number="03"
            label="Start now"
          />

          <div className="grid gap-16 lg:grid-cols-[0.45fr_1fr]">
            <Reveal>
              <div className="relative">
                <span className="block text-[clamp(9rem,22vw,20rem)] font-bold leading-[0.7] tracking-[-0.1em] text-[#d99a4e]/10">
                  14
                </span>

                <span className="absolute left-2 top-1/2 text-[9px] uppercase tracking-[0.3em] text-[#d99a4e]">
                  The turning point
                </span>
              </div>
            </Reveal>

            <div className="max-w-4xl">
              <Reveal>
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  I met a stranger
                  <br />
                  who changed how I
                  <br />
                  <span className="text-[#d99a4e]">
                    looked at time.
                  </span>
                </h2>
              </Reveal>

              <Reveal
                delay={0.15}
                className="mt-12 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  When I was fourteen, I had a conversation
                  with someone I didn't know. Somehow, we ended
                  up talking about life.
                </p>
              </Reveal>

              <Reveal
                delay={0.25}
                className="mt-8 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  He told me that he had all the money and time
                  he needed. Everything he had once wanted and
                  dreamed of was within his reach.
                </p>
              </Reveal>

              <Reveal
                delay={0.35}
                className="mt-12"
              >
                <blockquote className="border-l-2 border-[#d99a4e] pl-6 text-2xl font-medium leading-relaxed text-[#f6ede0] md:text-3xl">
                  “I have all the money and time now, but
                  everything that I've ever wanted and dreamed
                  of... I don't feel like wanting to do and get
                  them anymore.”
                </blockquote>
              </Reveal>

              <Reveal
                delay={0.45}
                className="mt-12 max-w-2xl"
              >
                <p className="text-xl leading-relaxed text-[#a89a8c]">
                  That stayed with me.
                </p>

                <p className="mt-6 text-2xl font-semibold leading-relaxed text-[#f6ede0]">
                  I thought:
                  <br />
                  <span className="text-[#d99a4e]">
                    I don't want to wait.
                  </span>
                </p>

                <p className="mt-6 text-lg leading-[1.9] text-[#a89a8c]">
                  If there is something I want to do with my
                  life, I want to start while I still can.
                </p>

                <p className="mt-8 text-3xl font-bold tracking-tight">
                  Not someday.
                  <br />
                  <span className="text-[#d99a4e]">
                    Now.
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04 — KAI
      ========================================================= */}

      <section
        id="kai"
        className="relative bg-[#f6ede0] px-6 py-32 text-[#100b09] md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-center gap-4">
            <span className="text-[10px] tracking-[0.25em] text-[#d99a4e]">
              04
            </span>

            <span className="h-px w-10 bg-[#100b09]/20" />

            <span className="text-[9px] uppercase tracking-[0.3em] text-[#100b09]/50">
              What matters
            </span>
          </div>

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <Reveal>
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#100b09]/40">
                  One of my first lessons about success
                </p>

                <h2 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em] md:text-8xl">
                  It wasn't
                  <br />
                  about
                  <br />
                  <span className="text-[#d99a4e]">
                    money.
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl">
              <Reveal delay={0.15}>
                <p className="text-xl leading-[1.8] text-[#100b09]/65 md:text-2xl">
                  When I started earning a little money of my
                  own, one of the first things I did was buy my
                  younger brother Kai some ice cream.
                </p>
              </Reveal>

              <Reveal
                delay={0.25}
                className="mt-10"
              >
                <p className="text-3xl font-semibold leading-tight md:text-5xl">
                  I can still remember
                  <br />
                  <span className="text-[#d99a4e]">
                    the crystal-clear smile
                  </span>
                  <br />
                  that he had.
                </p>
              </Reveal>

              <Reveal
                delay={0.35}
                className="mt-10"
              >
                <p className="text-lg leading-[1.9] text-[#100b09]/60">
                  It was such a small thing. But it meant
                  something to me. It reminded me that maybe the
                  things I build don't have to matter because
                  they make me look successful.
                </p>
              </Reveal>

              <Reveal
                delay={0.45}
                className="mt-6"
              >
                <p className="text-lg leading-[1.9] text-[#100b09]/60">
                  Maybe they're important because they make
                  someone's life a little better.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal
            delay={0.5}
            className="mt-32"
          >
            <div className="flex flex-col justify-between gap-8 border-t border-[#100b09]/15 pt-8 md:flex-row md:items-end">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#100b09]/40">
                A small moment
              </span>

              <span className="text-right text-4xl font-bold tracking-tight md:text-6xl">
                Maybe that's
                <br />
                what matters.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          05 — NOW
      ========================================================= */}

      <section
        id="now"
        className="relative px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <ChapterLabel
            number="05"
            label="Who I became"
          />

          <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <Reveal>
                <h2 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] md:text-8xl">
                  I'm not the kid
                  <br />
                  they used to
                  <br />
                  <span className="text-[#d99a4e]">
                    define.
                  </span>
                </h2>
              </Reveal>

              <Reveal
                delay={0.2}
                className="mt-14 max-w-2xl"
              >
                <p className="text-lg leading-[1.9] text-[#a89a8c]">
                  I don't care as much about what people think
                  of me anymore.
                </p>

                <p className="mt-6 text-lg leading-[1.9] text-[#a89a8c]">
                  Not because I've become indifferent to
                  everything.
                </p>

                <p className="mt-6 text-xl font-medium leading-relaxed text-[#f6ede0]">
                  I've simply learned to decide what deserves
                  my attention and what doesn't.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <div className="relative min-h-[300px] border-l border-[#f6ede0]/10 pl-8 md:pl-12">
                <div className="absolute left-[-1px] top-0 h-20 w-px bg-[#d99a4e]" />

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#a89a8c]/50">
                  Then
                </p>

                <p className="mt-4 text-2xl font-medium leading-relaxed text-[#f6ede0]/40">
                  Afraid of being seen.
                </p>

                <div className="my-10 h-px w-full bg-[#f6ede0]/10" />

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d99a4e]">
                  Now
                </p>

                <p className="mt-4 text-3xl font-bold leading-tight">
                  Deciding what deserves
                  <br />
                  my attention.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.4}
            className="mt-32"
          >
            <div className="border-y border-[#f6ede0]/10 py-16">
              <p className="text-center text-3xl font-semibold leading-tight md:text-5xl">
                I'm stronger now.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          06 — MEANING
      ========================================================= */}

      <section
        id="meaning"
        className="relative border-t border-[#f6ede0]/10 px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <ChapterLabel
            number="06"
            label="What I want"
          />

          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#d99a4e]">
              The ambition
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="mt-8 max-w-6xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] md:text-[clamp(4rem,9vw,9rem)]">
              I want to
              <br />
              <span className="text-[#d99a4e]">
                create something
              </span>
              <br />
              meaningful.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <p className="text-xl leading-[1.9] text-[#a89a8c]">
                I don't have every part of my future figured
                out. I don't think anyone really does.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-xl leading-[1.9] text-[#a89a8c]">
                But I know I want to create things that matter.
                I want to build a life I'm proud of, make the
                people around me happy, and leave something
                behind that makes my time here feel worthwhile.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.25}
            className="mt-24"
          >
            <div className="relative border-l-2 border-[#d99a4e] py-2 pl-8 md:pl-12">
              <p className="text-2xl font-medium leading-relaxed md:text-4xl">
                I want to become someone who can look back and
                say:
              </p>

              <p className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                “I didn't waste
                <br />
                the opportunity
                <br />
                <span className="text-[#d99a4e]">
                  I was given.”
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.35}
            className="mt-24"
          >
            <div className="grid gap-8 md:grid-cols-3">
              {[
                [
                  '01',
                  'Build',
                  'Create things that are useful and meaningful.',
                ],
                [
                  '02',
                  'Grow',
                  'Keep becoming better than who I was yesterday.',
                ],
                [
                  '03',
                  'Give',
                  'Make the people around me happier because I was here.',
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="border-t border-[#f6ede0]/10 pt-6"
                >
                  <span className="text-[9px] tracking-[0.25em] text-[#d99a4e]">
                    {number}
                  </span>

                  <h3 className="mt-8 text-2xl font-bold">
                    {title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#a89a8c]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          07 — COFFEE
      ========================================================= */}

      <section
        id="coffee"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-[#f6ede0]/10 px-6 py-32 md:px-12 md:py-48 lg:px-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d99a4e]/10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#f6ede0]/5"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] text-center">
          <Reveal>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d99a4e]">
              07 / The quiet moment
            </span>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="mx-auto mt-10 max-w-5xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] md:text-8xl">
              Every morning,
              <br />
              I make{' '}
              <span className="text-[#d99a4e]">
                coffee.
              </span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.25}
            className="mx-auto mt-14 max-w-2xl"
          >
            <p className="text-lg leading-[1.9] text-[#a89a8c] md:text-xl">
              It's become a little ritual.
            </p>

            <p className="mt-6 text-lg leading-[1.9] text-[#a89a8c] md:text-xl">
              Before the phone. Before the notifications. Before
              everyone else's thoughts enter my head.
            </p>
          </Reveal>

          <Reveal
            delay={0.35}
            className="mx-auto mt-12 max-w-2xl"
          >
            <p className="text-2xl font-medium leading-relaxed md:text-3xl">
              Just coffee.
              <br />
              A few quiet minutes.
              <br />
              <span className="text-[#d99a4e]">
                Time to think.
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={0.45}
            className="mt-20"
          >
            <div className="flex justify-center">
              <CoffeeGraphic />
            </div>
          </Reveal>

          <Reveal
            delay={0.55}
            className="mt-20"
          >
            <p className="text-lg italic leading-relaxed text-[#a89a8c]">
              I think about my goals.
              <br />
              My life.
              <br />
              Life itself.
            </p>
          </Reveal>

          <Reveal
            delay={0.65}
            className="mt-16"
          >
            <p className="text-4xl font-bold tracking-tight md:text-6xl">
              Then I take a sip.
            </p>
          </Reveal>

          <Reveal
            delay={0.75}
            className="mt-10"
          >
            <p className="text-5xl font-bold leading-none tracking-[-0.05em] md:text-8xl">
              And I{' '}
              <span className="text-[#d99a4e]">
                row.
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={0.9}
            className="mt-20"
          >
            <div className="mx-auto h-px w-24 bg-[#d99a4e]" />

            <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-[#a89a8c]/60">
              God will steer, but you must row.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-[#f6ede0]/10 px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 text-[8px] uppercase tracking-[0.25em] text-[#a89a8c]/35 md:flex-row">
          <span>Jerome David / Personal story</span>

          <span>Made with intention.</span>

          <span>Philippines / 2026</span>
        </div>
      </footer>

      {/* =========================================================
          MOBILE CHAPTER INDICATOR
      ========================================================= */}

      <AnimatePresence>
        {activeChapter && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 md:hidden"
          >
            <div className="flex items-center gap-3 border border-[#f6ede0]/10 bg-[#100b09]/90 px-4 py-2 backdrop-blur-md">
              <span className="text-[8px] tracking-[0.2em] text-[#d99a4e]">
                {
                  CHAPTERS.find(
                    (chapter) =>
                      chapter.id === activeChapter
                  )?.number
                }
              </span>

              <span className="h-px w-5 bg-[#f6ede0]/20" />

              <span className="text-[8px] uppercase tracking-[0.2em] text-[#a89a8c]">
                {
                  CHAPTERS.find(
                    (chapter) =>
                      chapter.id === activeChapter
                  )?.label
                }
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}