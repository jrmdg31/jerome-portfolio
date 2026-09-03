'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/*
|--------------------------------------------------------------------------
| FOOTER SETTINGS
|--------------------------------------------------------------------------
| Update your LinkedIn URL here.
|--------------------------------------------------------------------------
*/

const LINKEDIN_URL = 'https://www.linkedin.com/in/jerome-david-810079271/';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const EFFICIENCY_TEXT = 'Efficiency brewed daily.';

export default function Footer() {
  /*
  |--------------------------------------------------------------------------
  | SMOOTH INTERNAL NAVIGATION
  |--------------------------------------------------------------------------
  | Prevents Next.js hash navigation from teleporting to the section.
  |--------------------------------------------------------------------------
  */
  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith('#')) return;

    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) return;

    const headerOffset = 0;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.history.pushState(null, '', href);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full border-t border-[#f6ede0]/15 bg-[#100b09] text-[#f6ede0]">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 border-b border-[#f6ede0]/10 py-12 md:grid-cols-3 md:py-14">

          {/* IDENTITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-b border-[#f6ede0]/10 pb-8 md:border-b-0 md:pb-0"
          >
            <Link
              href="/"
              data-cursor-label="Home"
              className="group inline-block"
            >
              <span className="text-xl font-medium tracking-[-0.035em] text-[#f6ede0] transition-opacity duration-300 group-hover:opacity-70 sm:text-2xl">
                Jerome David
              </span>
            </Link>

            <p className="mt-2 max-w-[260px] text-[10px] uppercase leading-5 tracking-[0.16em] text-[#a89a8c]">
              Virtual Assistant & Automation Specialist
            </p>

            {/* LINKEDIN ONLY */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="LinkedIn"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 inline-flex items-center gap-3 border-b border-[#f6ede0]/15 pb-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#f6ede0]/75 transition-colors duration-300 hover:border-[#d99a4e]/60 hover:text-[#f6ede0]"
            >
              LinkedIn

              <span className="text-[#d99a4e] transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </motion.a>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-b border-[#f6ede0]/10 py-8 md:border-b-0 md:py-0"
          >
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#a89a8c]">
              Navigate
            </span>

            <nav className="mt-5 flex flex-col items-start gap-3">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.12 + index * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={(event) =>
                      handleNavigation(event, item.href)
                    }
                    data-cursor-label={item.label}
                    className="group inline-flex items-center gap-2 text-xs text-[#a89a8c] transition-colors duration-300 hover:text-[#f6ede0]"
                  >
                    <span className="text-[8px] tabular-nums tracking-[0.15em] text-[#a89a8c]/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pt-8 md:pt-0"
          >
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#a89a8c]">
              Contact
            </span>

            <div className="mt-5">
              <a
                href="mailto:jerome.david.cs@gmail.com"
                data-cursor-label="Email"
                className="group inline-flex items-center gap-2 text-xs text-[#a89a8c] transition-colors duration-300 hover:text-[#f6ede0]"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  jerome.david.cs@gmail.com
                </span>

                <span className="text-[#d99a4e] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </a>
            </div>

            <p className="mt-4 max-w-[240px] text-[9px] uppercase leading-5 tracking-[0.15em] text-[#a89a8c]/60">
              Available for automation, systems, research, and
              administrative projects.
            </p>
          </motion.div>

        </div>

        {/* CLOSING STATEMENT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="border-b border-[#f6ede0]/10 py-10 sm:py-12"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            {/* ANIMATED STATEMENT */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#a89a8c]">
                Closing thought
              </span>

              <div
                className="group relative mt-4 inline-block"
                data-cursor-label="Efficiency Brewed Daily"
              >
                <h2
                  aria-label={EFFICIENCY_TEXT}
                  className="flex flex-wrap overflow-hidden text-3xl font-medium leading-[0.9] tracking-[-0.045em] text-[#f6ede0] sm:text-4xl lg:text-5xl"
                >
                  {EFFICIENCY_TEXT.split('').map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      initial={{
                        opacity: 0.35,
                        y: 8,
                      }}
                      animate={{
                        opacity: [0.35, 1, 1, 0.35],
                        y: [8, 0, 0, 8],
                      }}
                      transition={{
                        duration: 3.2,
                        delay: index * 0.055,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                      style={{
                        whiteSpace: char === ' ' ? 'pre' : undefined,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h2>

                {/* SCANNING ACCENT LINE */}
                <div className="relative mt-4 h-px w-full overflow-hidden bg-[#f6ede0]/10">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/4 bg-[#d99a4e]"
                    initial={{ x: '-100%' }}
                    animate={{
                      x: ['0%', '400%'],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* CATEGORY LABEL */}
            <motion.span
              animate={{
                opacity: [0.45, 0.8, 0.45],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-[8px] uppercase tracking-[0.2em] text-[#a89a8c]/60"
            >
              Systems / Automation / Operations
            </motion.span>

          </div>
        </motion.div>

        {/* COPYRIGHT */}
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span
            data-cursor-label="Copyright"
            className="text-[8px] uppercase tracking-[0.2em] text-[#a89a8c]/60"
          >
            © {new Date().getFullYear()} Jerome David. All rights reserved.
          </span>

          <span className="text-[8px] uppercase tracking-[0.2em] text-[#a89a8c]/40">
            Built with intention.
          </span>
        </div>

      </div>
    </footer>
  );
}