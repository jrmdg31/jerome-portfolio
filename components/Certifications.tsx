'use client';

import { motion } from 'framer-motion';

/*
|--------------------------------------------------------------------------
| CERTIFICATION DATA
|--------------------------------------------------------------------------
| Edit certifications HERE.
|
| status:
|   'in-progress' = currently taking
|   'completed'   = finished
|
| To add a certification, copy an object and change the values.
|
|--------------------------------------------------------------------------
*/

type CertificationStatus = 'in-progress' | 'completed';

type Certification = {
  name: string;
  issuing: string;
  status: CertificationStatus;
};

const CERTIFICATIONS: Certification[] = [
  // ─────────────────────────────────────────────────────────────────────
  // GOOGLE
  // ─────────────────────────────────────────────────────────────────────

  {
    name: 'Google Data Analytics',
    issuing: 'Google',
    status: 'in-progress',
  },

  {
    name: 'Google Project Management',
    issuing: 'Google',
    status: 'in-progress',
  },

  {
    name: 'Google Digital Marketing & E-commerce',
    issuing: 'Google',
    status: 'in-progress',
  },

  {
    name: 'Google IT Support',
    issuing: 'Google',
    status: 'in-progress',
  },

  // ─────────────────────────────────────────────────────────────────────
  // HARVARD
  // ─────────────────────────────────────────────────────────────────────

  {
    name: 'Introduction to Computer Science',
    issuing: 'Harvard University',
    status: 'completed',
  },

  // ─────────────────────────────────────────────────────────────────────
  // CISCO NETWORKING ACADEMY
  // ─────────────────────────────────────────────────────────────────────

  {
    name: 'Data Analytics Essentials',
    issuing: 'Cisco Networking Academy',
    status: 'in-progress',
  },

  {
    name: 'Data Science Essentials with Python',
    issuing: 'Cisco Networking Academy',
    status: 'in-progress',
  },

  {
    name: 'Introduction to Data Science',
    issuing: 'Cisco Networking Academy',
    status: 'in-progress',
  },

  {
    name: 'AI Fundamentals: Foundations for Understanding AI',
    issuing: 'Cisco Networking Academy',
    status: 'in-progress',
  },

  {
    name: 'AI Fundamentals: Language and Vision in AI',
    issuing: 'Cisco Networking Academy',
    status: 'in-progress',
  },
];

export default function Certifications() {
  const completedCount = CERTIFICATIONS.filter(
    (cert) => cert.status === 'completed'
  ).length;

  const inProgressCount = CERTIFICATIONS.filter(
    (cert) => cert.status === 'in-progress'
  ).length;

  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-[#100b09] px-6 py-20 text-[#f6ede0] sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">

        {/* HEADER */}
        <div className="border-b border-[#f6ede0]/15 pb-10 sm:pb-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">

            <div>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#a89a8c]">
                06 / Certifications
              </span>
            </div>

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
                Learning never
                <br />
                really stops.
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
                Continuously building knowledge across analytics,
                project management, technology, data science,
                marketing, and artificial intelligence.
              </motion.p>
            </div>

          </div>
        </div>

        {/* CERTIFICATION LIST */}
        <div className="border-b border-[#f6ede0]/15">

          {CERTIFICATIONS.map((cert, index) => {
            const isCompleted = cert.status === 'completed';

            return (
              <motion.div
                key={`${cert.name}-${cert.issuing}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border-t border-[#f6ede0]/10"
              >
                <div className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 py-5 sm:grid-cols-[48px_minmax(0,1fr)_180px_auto] sm:gap-6 lg:py-6">

                  {/* NUMBER */}
                  <span className="text-[9px] tabular-nums tracking-[0.18em] text-[#a89a8c]/45">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* CERTIFICATION */}
                  <div className="min-w-0">
                    <motion.h3
                      className="text-sm font-medium tracking-[-0.01em] text-[#f6ede0] transition-transform duration-300 group-hover:translate-x-1 sm:text-base"
                    >
                      {cert.name}
                    </motion.h3>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#a89a8c] sm:text-[10px]">
                      {cert.issuing}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="hidden sm:block">
                    <span
                      className={`text-[9px] uppercase tracking-[0.18em] ${
                        isCompleted
                          ? 'text-[#d99a4e]'
                          : 'text-[#a89a8c]/70'
                      }`}
                    >
                      {isCompleted ? 'Completed' : 'In progress'}
                    </span>
                  </div>

                  {/* STATUS INDICATOR */}
                  <div className="flex items-center justify-end">
                    <div
                      className={`relative h-2 w-2 rounded-full border transition-all duration-300 ${
                        isCompleted
                          ? 'border-[#d99a4e] bg-[#d99a4e]'
                          : 'border-[#a89a8c]/50 bg-transparent group-hover:border-[#f6ede0]/80'
                      }`}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.04 + 0.2,
                          }}
                          className="absolute inset-[-4px] rounded-full border border-[#d99a4e]/20"
                        />
                      )}
                    </div>
                  </div>

                </div>

                {/* MOBILE STATUS */}
                <div className="pb-4 pl-10 sm:hidden">
                  <span
                    className={`text-[8px] uppercase tracking-[0.18em] ${
                      isCompleted
                        ? 'text-[#d99a4e]'
                        : 'text-[#a89a8c]/70'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'In progress'}
                  </span>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* FOOTER / SUMMARY */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between py-5"
        >
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#a89a8c]/60">
            {CERTIFICATIONS.length} certifications tracked
          </span>

          <div className="flex items-center gap-5 text-[8px] uppercase tracking-[0.18em]">
            <span className="text-[#a89a8c]/60">
              {completedCount} completed
            </span>

            <span className="text-[#d99a4e]">
              {inProgressCount} in progress
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}