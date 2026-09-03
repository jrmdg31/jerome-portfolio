'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
  { number: '01', label: 'About', href: '#about' },
  { number: '02', label: 'Work', href: '#work' },
  { number: '03', label: 'Contact', href: '#contact' },
];

const RESUME_URL = '/Resume_Jerome_David.pdf';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = NAV_ITEMS.map((item) =>
        item.href.replace('#', '')
      );

      let current = 'about';

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= window.innerHeight * 0.35) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateTo = (href: string) => {
    if (!href.startsWith('#')) return;

    const target = document.querySelector(href);

    if (!target) return;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, '', href);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}

      <motion.nav
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#100b09]/75 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto max-w-[1400px] px-6 transition-all duration-500 md:px-10 lg:px-16 ${
            isScrolled ? 'py-3' : 'py-5'
          }`}
        >
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-12' : 'h-14'
            }`}
          >
            {/* =====================================================
                NAME
            ===================================================== */}

            <a
              href="/"
              data-cursor-label="Home"
              className="group relative flex items-center"
            >
              <span className="relative text-xl font-bold tracking-tighter text-[#f6ede0] md:text-2xl">
                Jerome David

                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-[#d99a4e]"
                  initial={{
                    width: '0%',
                  }}
                  whileHover={{
                    width: '100%',
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>
            </a>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    data-cursor-label={item.label}
                    className="group relative flex items-center gap-2 py-2"
                  >
                    {/* Number */}
                    <span
                      className={`text-[8px] tracking-[0.15em] transition-colors duration-300 ${
                        isActive
                          ? 'text-[#d99a4e]'
                          : 'text-[#f6ede0]/30 group-hover:text-[#d99a4e]'
                      }`}
                    >
                      {item.number}
                    </span>

                    {/* Label */}
                    <span
                      className={`text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isActive
                          ? 'text-[#f6ede0]'
                          : 'text-[#f6ede0]/55 group-hover:text-[#f6ede0]'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active / hover underline */}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px bg-[#d99a4e]"
                      initial={false}
                      animate={{
                        width: isActive ? '100%' : '0%',
                      }}
                      whileHover={{
                        width: '100%',
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}

            <div className="flex items-center gap-5 lg:gap-6">
              {/* Availability */}
              <div className="hidden items-center gap-2 lg:flex">
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

                <span className="text-[8px] uppercase tracking-[0.2em] text-[#f6ede0]/40">
                  Available
                </span>
              </div>

              {/* =================================================
                  DOWNLOAD RESUME
              ================================================= */}

              <motion.a
                href={RESUME_URL}
                download="Resume_Jerome_David.pdf"
                data-cursor-label="Download Resume"
                initial="rest"
                whileHover="hover"
                className="group relative hidden items-center gap-2 py-2 text-[10px] uppercase tracking-[0.2em] text-[#f6ede0]/70 md:flex"
              >
                <span className="relative">
                  Resume

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
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </span>

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
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  ↓
                </motion.span>
              </motion.a>

              {/* =================================================
                  DESKTOP CTA
              ================================================= */}

              <button
                type="button"
                onClick={() => navigateTo('#contact')}
                data-cursor-label="Let's Talk"
                className="group relative hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#f6ede0] md:flex"
              >
                <span>Let's Talk</span>

                <motion.span
                  className="text-[#d99a4e]"
                  initial={{
                    x: 0,
                  }}
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  →
                </motion.span>

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d99a4e] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* ===================================================
                  MOBILE MENU BUTTON
              =================================================== */}

              <button
                type="button"
                aria-label={
                  isMenuOpen ? 'Close menu' : 'Open menu'
                }
                aria-expanded={isMenuOpen}
                onClick={() =>
                  setIsMenuOpen((open) => !open)
                }
                className="relative flex h-10 w-10 items-center justify-center md:hidden"
              >
                {/* Corner graphic */}
                <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[#d99a4e]" />

                <span className="flex w-5 flex-col gap-1.5">
                  {/* Top */}
                  <motion.span
                    className="h-px w-full bg-[#f6ede0]"
                    animate={
                      isMenuOpen
                        ? {
                            rotate: 45,
                            y: 4,
                          }
                        : {
                            rotate: 0,
                            y: 0,
                          }
                    }
                    transition={{
                      duration: 0.3,
                    }}
                  />

                  {/* Middle */}
                  <motion.span
                    className="h-px w-3/4 self-end bg-[#f6ede0]/60"
                    animate={
                      isMenuOpen
                        ? {
                            opacity: 0,
                            x: 5,
                          }
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    transition={{
                      duration: 0.2,
                    }}
                  />

                  {/* Bottom */}
                  <motion.span
                    className="h-px w-full bg-[#f6ede0]"
                    animate={
                      isMenuOpen
                        ? {
                            rotate: -45,
                            y: -4,
                          }
                        : {
                            rotate: 0,
                            y: 0,
                          }
                    }
                    transition={{
                      duration: 0.3,
                    }}
                  />
                </span>
              </button>
            </div>

            {/* Bottom rule */}
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-[#f6ede0]/10"
              initial={{
                width: '0%',
              }}
              animate={{
                width: '100%',
              }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      </motion.nav>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-40 bg-[#100b09]/98 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {/* Menu label */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className="mb-10 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#d99a4e]" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#f6ede0]/40">
                  Navigation
                </span>
              </motion.div>

              {/* Mobile links */}
              <div className="flex flex-col">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      delay: 0.15 + index * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex w-full items-center justify-between border-b border-[#f6ede0]/10 py-6 text-left"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[9px] tracking-[0.2em] text-[#d99a4e]">
                        {item.number}
                      </span>

                      <span className="text-3xl font-bold tracking-tighter text-[#f6ede0]">
                        {item.label}
                      </span>
                    </div>

                    <motion.span
                      className="text-xl text-[#d99a4e]"
                      whileHover={{
                        x: 6,
                      }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              {/* =================================================
                  MOBILE RESUME
              ================================================= */}

              <motion.a
                href={RESUME_URL}
                download="Resume_Jerome_David.pdf"
                data-cursor-label="Download Resume"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center justify-between border-b border-[#f6ede0]/10 py-6"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-5">
                  <span className="text-[9px] tracking-[0.2em] text-[#d99a4e]">
                    CV
                  </span>

                  <span className="text-2xl font-bold tracking-tighter text-[#f6ede0]">
                    Download Resume
                  </span>
                </div>

                <motion.span
                  className="text-xl text-[#d99a4e]"
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                >
                  ↓
                </motion.span>
              </motion.a>

              {/* Mobile footer */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                }}
                className="mt-10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-[#d99a4e]"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#f6ede0]/40">
                    Available for selected projects
                  </span>
                </div>

                <span className="text-[8px] uppercase tracking-[0.2em] text-[#f6ede0]/25">
                  JD / 2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}