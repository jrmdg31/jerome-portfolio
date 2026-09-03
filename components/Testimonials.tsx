'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mitchell',
    role: 'Content Creator',
    quote:
      'had him do a task that i was absolutely dreading doing- and he ended up having it done much quicker than i expected. very very very worth it, will definitely be using him for more one-off tasks like that again!',
  },
  {
    name: 'Sadie',
    role: 'Youtuber',
    quote:
      'It has been nice working with jerome. He does works fast :))',
  },
  {
    name: 'Icy',
    role: 'Agency Owner',
    quote:
      'Jerome did automated our campaigns and we have seen significant improvements in our metrics.',
  },
  {
    name: 'Don',
    role: 'Realtor',
    quote:
      'He built our entire GHL backend from scratch. Industry level kind of work!',
  },
  {
    name: 'John',
    role: 'Band Manager',
    quote:
      'Jerome built us a workflow we can run to automate creating simple animated ads, and they are not sloppy at all!',
  },
  {
    name: 'King',
    role: 'Marketing Associate',
    quote:
      'Asked jerome to build and run a workflow to scrape leads according to my very defined criteria.',
  },
  {
    name: 'Wessal',
    role: 'Social Media Manager',
    quote:
      'He built me my own website and provided me detailed documentations and how to maintain it.',
  },
  {
    name: 'Apollo',
    role: 'Real Estate Developer',
    quote:
      'Jerome completely fixed and automated my broken real estate tracking spreadsheet, writing custom scripts to handle complex calculations, goal toggles, and budget tracking in a clean google sheet.',
  },
  {
    name: 'Dan',
    role: 'Marketing Analyst',
    quote:
      'I hired Jerome to do some research / lead enrichment for me and the work was delivered accurately, on time, and with way better quality than expected! he also communicated super clearly, and was very responsive over the whole process.',
  },
  {
    name: 'Hannah',
    role: 'Content Creator',
    quote:
      'Hey! I worked with him and he delivered solid workflows! I vouch for him 1000%.',
  },
  {
    name: 'Tesse',
    role: 'Executive Assistant',
    quote:
      'Hello everyone! I asked help with him in some coding and set-up stuff- I could really say that he is LEGIT super NICE and easy to WORK with. I recommend him to everyone also seeking for help in terms of tech stuff/ video editing! Will super and will soon in the future work with him!',
  },
  {
    name: 'Kenton',
    role: 'Event Manager',
    quote:
      'Got a few squarespace pages done by him. Super fast and extremely helpful. Will be using his services in the future again',
  },
];

const AUTO_ROTATE_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = TESTIMONIALS[index];

  const goTo = (nextIndex: number) => {
    setIndex(
      (nextIndex + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const previous = () => {
    goTo(index - 1);
  };

  const next = () => {
    goTo(index + 1);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => {
        return (currentIndex + 1) % TESTIMONIALS.length;
      });
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#100b09] text-[#f6ede0]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="border-b border-[#f6ede0]/15 py-20 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">

            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#a89a8c]">
                04 / Testimonials
              </span>
            </div>

            <div>
              <h2 className="max-w-[900px] text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Don't take
                <br />
                my word for it.
              </h2>

              <p className="mt-8 max-w-[600px] text-sm leading-7 text-[#a89a8c] sm:text-base">
                Feedback from people I've worked with across automation,
                operations, marketing, research, and technical projects.
              </p>
            </div>

          </div>
        </div>

        {/* TESTIMONIAL AREA */}
        <div
          className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* TESTIMONIAL INDEX */}
          <div className="border-b border-[#f6ede0]/15 py-10 lg:border-b-0 lg:border-r lg:py-16 lg:pr-10">

            <div className="flex items-center justify-between lg:mb-8">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#a89a8c]">
                People
              </span>

              <span className="text-[10px] tabular-nums tracking-[0.18em] text-[#a89a8c] lg:hidden">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-6 hidden lg:block">
              {TESTIMONIALS.map((testimonial, i) => {
                const active = i === index;

                return (
                  <button
                    key={`${testimonial.name}-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    className="group relative flex w-full items-center gap-4 border-b border-[#f6ede0]/10 py-4 text-left"
                    aria-label={`View testimonial from ${testimonial.name}`}
                  >
                    {/* ACTIVE LINE */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-px bg-[#d99a4e]"
                      initial={false}
                      animate={{
                        opacity: active ? 1 : 0,
                        scaleY: active ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        transformOrigin: 'top',
                      }}
                    />

                    <span
                      className={`pl-4 text-[10px] tabular-nums tracking-[0.18em] transition-colors duration-300 ${
                        active
                          ? 'text-[#d99a4e]'
                          : 'text-[#a89a8c]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`text-xs transition-colors duration-300 ${
                        active
                          ? 'text-[#f6ede0]'
                          : 'text-[#a89a8c] group-hover:text-[#f6ede0]'
                      }`}
                    >
                      {testimonial.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MOBILE INDEX */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {TESTIMONIALS.map((testimonial, i) => {
                const active = i === index;

                return (
                  <button
                    key={`${testimonial.name}-mobile-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`flex shrink-0 items-center gap-2 border px-3 py-2 transition-all duration-300 ${
                      active
                        ? 'border-[#d99a4e]/50 text-[#f6ede0]'
                        : 'border-[#f6ede0]/10 text-[#a89a8c]'
                    }`}
                  >
                    <span className="text-[9px] tabular-nums tracking-[0.15em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.12em]">
                      {testimonial.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN TESTIMONIAL */}
          <div className="relative flex flex-col justify-between py-14 sm:py-16 lg:py-20 lg:pl-16 xl:pl-24">

            {/* TOP META */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#a89a8c]">
                Client feedback
              </span>

              <span className="hidden text-[10px] tabular-nums tracking-[0.18em] text-[#a89a8c] sm:block">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>

            {/* QUOTE */}
            <div className="flex min-h-[360px] items-center py-16 sm:min-h-[400px] lg:min-h-[420px] lg:py-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -18,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full"
                >
                  {/* QUOTE MARK */}
                  <span className="mb-6 block text-5xl font-serif leading-none text-[#d99a4e]/60 sm:text-6xl">
                    “
                  </span>

                  <blockquote className="max-w-[950px] text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[#f6ede0] sm:text-3xl lg:text-4xl xl:text-5xl">
                    {current.quote}
                  </blockquote>

                  {/* AUTHOR */}
                  <div className="mt-10 flex items-center gap-5">
                    <div className="h-px w-10 bg-[#d99a4e]/60" />

                    <div>
                      <p className="text-sm font-medium text-[#f6ede0]">
                        {current.name}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#a89a8c]">
                        {current.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BOTTOM CONTROLS */}
            <div className="border-t border-[#f6ede0]/15 pt-5">

              <div className="flex items-center justify-between">

                {/* PROGRESS */}
                <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#a89a8c]">
                    {isPaused ? 'Paused' : 'Auto'}
                  </span>

                  <div className="h-px w-24 overflow-hidden bg-[#f6ede0]/10 sm:w-40">
                    <motion.div
                      key={index}
                      className="h-full origin-left bg-[#d99a4e]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTO_ROTATE_MS / 1000,
                        ease: 'linear',
                      }}
                    />
                  </div>
                </div>

                {/* NAVIGATION */}
                <div className="flex items-center gap-2">

                  <motion.button
                    type="button"
                    onClick={previous}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.92 }}
                    data-cursor-label="Previous"
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center border border-[#f6ede0]/15 text-[#a89a8c] transition-colors duration-300 hover:border-[#f6ede0]/35 hover:text-[#f6ede0]"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={next}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.92 }}
                    data-cursor-label="Next"
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center border border-[#f6ede0]/15 text-[#a89a8c] transition-colors duration-300 hover:border-[#f6ede0]/35 hover:text-[#f6ede0]"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#f6ede0]/15 py-16 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#a89a8c]">
              {TESTIMONIALS.length} client testimonials
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#a89a8c]">
              Results speak louder.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}