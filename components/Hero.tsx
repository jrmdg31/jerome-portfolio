'use client';

import { motion } from 'framer-motion';
import Marquee from './Marquee';

const NAME = 'Jerome David';

const nameContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.045,
    },
  },
};

export default function Hero() {
  const scrollToContact = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const target = document.querySelector('#contact');

    if (!target) return;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, '', '#contact');

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-8 py-24 md:px-16 lg:px-24" id='about'>
      {/* =========================================================
          VIDEO BACKGROUND
      ========================================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/coffee.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Keep the center of the coffee footage visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/80 via-coffee-dark/55 to-coffee-darker/90" />

      {/* Editorial grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 grid w-full grid-cols-1 items-start gap-16 md:grid-cols-2 md:gap-24 lg:gap-32">
        {/* =======================================================
            LEFT — NAME / IDENTITY
        ======================================================= */}

        <div className="text-left">
          {/* Operator label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              className="h-px w-8 bg-[#d99a4e]"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{
                delay: 0.35,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            <span className="text-[9px] uppercase tracking-[0.3em] text-coffee-cream/45">
              Independent operator
            </span>
          </motion.div>

          {/* =====================================================
              ANIMATED NAME
          ===================================================== */}

          <motion.h1
            variants={nameContainer}
            initial="hidden"
            animate="visible"
            className="relative text-5xl font-bold tracking-tighter text-coffee-cream md:text-6xl lg:text-7xl"
          >
            <motion.span
              className="group relative inline-flex cursor-default"
              whileHover="hover"
            >
              {NAME.split('').map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                      rotateX: -70,
                      filter: 'blur(8px)',
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.7,
                        delay: index * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },

                    hover: {
                      y: index % 2 === 0 ? -7 : 7,
                      rotate: index % 2 === 0 ? -2 : 2,
                      transition: {
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  animate={{
                    opacity: [1, 0.82, 1],
                    y: [
                      0,
                      index % 2 === 0 ? -1.5 : 1.5,
                      0,
                    ],
                  }}
                  transition={{
                    opacity: {
                      duration: 4,
                      delay: 2 + index * 0.12,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    },

                    y: {
                      duration: 3.5,
                      delay: 2 + index * 0.08,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: 'easeInOut',
                    },
                  }}
                  className={`relative inline-block ${
                    character === ' ' ? 'w-[0.28em]' : ''
                  }`}
                  style={{
                    perspective: 600,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Main character */}
                  <span className="relative z-10">
                    {character === ' ' ? '\u00A0' : character}
                  </span>

                  {/* Amber ghost / chromatic offset */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-0 text-[#d99a4e]"
                    animate={{
                      x: [0, 2, -1, 0],
                      opacity: [0, 0.18, 0, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: 2.5 + index * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </motion.span>
                </motion.span>
              ))}

              {/* Primary scanning underline */}
              <span className="pointer-events-none absolute -bottom-3 left-0 h-px w-full overflow-hidden bg-coffee-cream/15">
                <motion.span
                  className="absolute left-0 top-0 h-full w-1/4 bg-[#d99a4e]"
                  animate={{
                    x: ['-150%', '500%'],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>

              {/* Secondary breathing line */}
              <motion.span
                className="pointer-events-none absolute -bottom-[7px] left-0 h-px bg-coffee-cream/10"
                initial={{ width: '0%' }}
                animate={{
                  width: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />
            </motion.span>

            {/* Hero tagline */}
            <motion.span
              initial={{
                opacity: 0,
                y: 18,
                filter: 'blur(6px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                delay: 1.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block text-xl font-medium tracking-tight text-coffee-cream/70 md:text-2xl lg:text-3xl"
            >
              {' '}— The fuel for your business grind.
            </motion.span>
          </motion.h1>

          {/* =====================================================
              ROLE + PERSONAL STORY + RESUME
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.05,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex flex-col items-start gap-5"
          >
            {/* Discipline / role marker */}
            <div className="flex items-center gap-3">
              <span className="text-[#d99a4e]">01</span>

              <span className="text-[10px] uppercase tracking-[0.2em] text-coffee-cream/50">
                Systems · Automation · Operations
              </span>
            </div>

            {/* =================================================
                LEARN MORE ABOUT ME
            ================================================= */}

            <motion.a
              href="/about-me"
              data-cursor-label="My Story"
              initial="rest"
              whileHover="hover"
              className="group relative inline-flex items-center gap-4 py-2 text-[10px] uppercase tracking-[0.22em] text-coffee-cream"
            >
              {/* Editorial left marker */}
              <motion.span
                className="absolute -left-3 top-1/2 h-5 w-px -translate-y-1/2 bg-[#d99a4e]/40"
                variants={{
                  rest: {
                    height: 20,
                    opacity: 0.6,
                  },
                  hover: {
                    height: '100%',
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <span className="relative">
                Learn more about me

                {/* Hover underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-[#d99a4e]"
                  variants={{
                    rest: {
                      width: '0%',
                    },
                    hover: {
                      width: '100%',
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>

              {/* Animated arrow */}
              <motion.span
                className="text-[#d99a4e]"
                variants={{
                  rest: {
                    x: 0,
                  },
                  hover: {
                    x: 5,
                  },
                }}
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  },
                }}
              >
                ↗
              </motion.span>
            </motion.a>

            {/* =================================================
                DOWNLOAD RESUME
            ================================================= */}

            <motion.a
              href="/Resume_Jerome_David.pdf"
              download="Resume_Jerome_David.pdf"
              data-cursor-label="Resume"
              initial="rest"
              whileHover="hover"
              className="group relative inline-flex items-center gap-4 py-2 text-[10px] uppercase tracking-[0.22em] text-coffee-cream/75"
            >
              {/* Editorial left marker */}
              <motion.span
                className="absolute -left-3 top-1/2 h-5 w-px -translate-y-1/2 bg-[#d99a4e]/25"
                variants={{
                  rest: {
                    height: 20,
                    opacity: 0.45,
                  },
                  hover: {
                    height: '100%',
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <span className="relative">
                Download my resume

                {/* Hover underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-[#d99a4e]"
                  variants={{
                    rest: {
                      width: '0%',
                    },
                    hover: {
                      width: '100%',
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>

              {/* Download arrow */}
              <motion.span
                className="text-[#d99a4e]"
                variants={{
                  rest: {
                    y: 0,
                  },
                  hover: {
                    y: 3,
                  },
                }}
                animate={{
                  y: [0, 2, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  },
                }}
              >
                ↓
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* =======================================================
            RIGHT — DESCRIPTION / CTA
        ======================================================= */}

        <div className="mt-6 flex flex-col items-end gap-7 text-right">
          <motion.p
            initial={{
              opacity: 0,
              x: 30,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              delay: 0.75,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-xl text-xl leading-relaxed text-coffee-cream/90 md:text-2xl"
          >
            I help businesses turn repetitive work into systems that run
            themselves, so you can spend less time managing the grind and more
            time growing the business.
          </motion.p>

          {/* Let's Talk */}
          <motion.a
            href="#contact"
            onClick={scrollToContact}
            data-cursor-label="Let's Talk"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative flex items-center gap-4 py-2 text-[10px] uppercase tracking-[0.25em] text-coffee-cream"
          >
            <span className="relative">
              Let's Talk

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d99a4e] transition-all duration-300 group-hover:w-full" />
            </span>

            <motion.span
              className="text-[#d99a4e]"
              whileHover={{ x: 5 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Availability */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.25,
              duration: 0.7,
            }}
            className="flex items-center gap-2"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#d99a4e]"
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <span className="text-[8px] uppercase tracking-[0.2em] text-coffee-cream/40">
              Available for selected projects
            </span>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM MARQUEE
      ========================================================= */}

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
          delay: 1.2,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-8 left-1/2 w-[90%] max-w-[1200px] -translate-x-1/2"
      >
        <Marquee />
      </motion.div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
        className="absolute bottom-8 right-8 hidden items-center gap-3 md:flex"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-coffee-cream/35">
          Scroll
        </span>

        <motion.span
          className="relative h-8 w-px overflow-hidden bg-coffee-cream/15"
        >
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-[#d99a4e]"
            animate={{
              y: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.span>
      </motion.div>
    </section>
  );
}