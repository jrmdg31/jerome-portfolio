'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mljelrgg';

export default function CTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100vh-80px)] w-full items-center overflow-hidden bg-[#100b09] text-[#f6ede0]"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="border-b border-[#f6ede0]/15 py-10 sm:py-12 lg:py-14">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr] lg:gap-16">

            {/* SECTION NUMBER */}
            <div>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#a89a8c]">
                05 / Contact
              </span>
            </div>

            {/* INTRO */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-[850px] text-4xl font-medium leading-[0.9] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
              >
                Let's grab a
                <br />
                virtual coffee.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 max-w-[600px] text-xs leading-6 text-[#a89a8c] sm:text-sm"
              >
                Tell me what is taking up too much of your time.
                I'll take a look and see where systems, automation,
                or better processes can help.
              </motion.p>
            </div>

          </div>
        </div>

        {/* CONTACT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] lg:gap-16">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-b border-[#f6ede0]/15 py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-12"
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#a89a8c]">
              Start a conversation
            </span>

            <p className="mt-4 max-w-[310px] text-xs leading-6 text-[#a89a8c]">
              No complicated brief required. Give me the context,
              the problem, and what you want to improve.
            </p>

            {/* PROJECT TYPES */}
            <div className="mt-7 border-t border-[#f6ede0]/10 pt-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#a89a8c]">
                Typical projects
              </span>

              <div className="mt-3 space-y-2">
                {[
                  'Workflow automation',
                  'Administrative systems',
                  'Lead generation',
                  'Content operations',
                  'AI-assisted workflows',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[8px] tabular-nums tracking-[0.15em] text-[#a89a8c]/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-[11px] text-[#f6ede0]/75">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="py-8 lg:py-10 lg:pl-2"
          >
            <form
              onSubmit={handleSubmit}
              className="w-full"
            >

              {/* HONEYPOT */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {/* NAME */}
              <div className="group border-b border-[#f6ede0]/15 py-4 transition-colors duration-300 focus-within:border-[#f6ede0]/40">
                <label
                  htmlFor="name"
                  className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-[#a89a8c]"
                >
                  01 / Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full border-0 bg-transparent p-0 text-base text-[#f6ede0] outline-none placeholder:text-[#a89a8c]/35 sm:text-lg"
                />
              </div>

              {/* EMAIL */}
              <div className="group border-b border-[#f6ede0]/15 py-4 transition-colors duration-300 focus-within:border-[#f6ede0]/40">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-[#a89a8c]"
                >
                  02 / Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full border-0 bg-transparent p-0 text-base text-[#f6ede0] outline-none placeholder:text-[#a89a8c]/35 sm:text-lg"
                />
              </div>

              {/* MESSAGE */}
              <div className="group border-b border-[#f6ede0]/15 py-4 transition-colors duration-300 focus-within:border-[#f6ede0]/40">
                <label
                  htmlFor="message"
                  className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-[#a89a8c]"
                >
                  03 / Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell me what you're working on..."
                  className="w-full resize-none border-0 bg-transparent p-0 text-base leading-6 text-[#f6ede0] outline-none placeholder:text-[#a89a8c]/35 sm:text-lg"
                />
              </div>

              {/* SUBJECT */}
              <input
                type="hidden"
                name="_subject"
                value="New portfolio inquiry"
              />

              {/* SUBMIT AREA */}
              <div className="mt-5 flex items-center justify-between gap-5">

                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-[#a89a8c]"
                      >
                        Message sent. I'll get back to you soon.
                      </motion.p>
                    ) : status === 'error' ? (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-[#d99a4e]"
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    ) : (
                      <motion.p
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] uppercase tracking-[0.18em] text-[#a89a8c]"
                      >
                        Usually replies within 24–48 hours
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor-label={isSubmitting ? 'Sending' : 'Send'}
                  whileHover={!isSubmitting ? { y: -2 } : undefined}
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  className="inline-flex min-w-[135px] items-center justify-center gap-3 border border-[#f6ede0]/25 px-6 py-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#f6ede0] transition-all duration-300 hover:border-[#f6ede0]/60 hover:bg-[#f6ede0]/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border border-[#f6ede0]/30 border-t-[#f6ede0]" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <span className="text-[#d99a4e]">↗</span>
                    </>
                  )}
                </motion.button>

              </div>

            </form>
          </motion.div>
        </div>

        {/* SMALL BOTTOM LINE */}
        <div className="border-t border-[#f6ede0]/10 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-[0.22em] text-[#a89a8c]/70">
              Open to new projects
            </span>

            <span className="text-[8px] uppercase tracking-[0.18em] text-[#a89a8c]/70">
              Let's make the busywork disappear.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}