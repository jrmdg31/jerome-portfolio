'use client';

import { motion } from 'framer-motion';

type Project = {
  number: string;
  title: string;
  metric: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Executive Workflow Overhaul',
    metric: '25 hrs/week saved',
    description:
      'Streamlined calendar management, email processing, and travel booking for a busy CEO through custom automations and delegation systems.',
    image: '/Executive_Workflow_Overhaul.png',
    category: 'OPERATIONS',
    tags: ['Automation', 'Calendar', 'Email', 'Delegation'],
  },
  {
    number: '02',
    title: 'Client Onboarding Automation',
    metric: '90% time reduction',
    description:
      'Built a seamless onboarding flow that collects client information, sets up accounts, and sends welcome materials without manual intervention.',
    image: '/Client_Onboarding_Automation.png',
    category: 'CLIENT SYSTEMS',
    tags: ['Onboarding', 'Automation', 'Forms', 'Account Setup'],
  },
  {
    number: '03',
    title: 'Social Media Content System',
    metric: '10 hrs/week saved',
    description:
      'Created a content calendar, approval workflow, and scheduling system that maintains consistent posting across 5 platforms.',
    image: '/Social_Media_Content_System.png',
    category: 'CONTENT OPERATIONS',
    tags: ['Content', 'Approval', 'Scheduling', '5 Platforms'],
  },
];

export default function CaseStudies() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-[#100b09] text-[#f6ede0]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="border-b border-[#f6ede0]/15 py-20 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#a89a8c]">
                03 / Selected Work
              </span>
            </div>

            <div>
              <h2 className="max-w-[850px] text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Real systems.
                <br />
                Measurable results.
              </h2>

              <p className="mt-8 max-w-[620px] text-sm leading-7 text-[#a89a8c] sm:text-base">
                A selection of systems built to remove repetitive work,
                simplify operations, and give teams more room to focus on
                higher-value work.
              </p>
            </div>

          </div>
        </div>

        {/* PROJECTS */}
        <div>
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border-b border-[#f6ede0]/15 py-14 sm:py-20 lg:py-24"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-8">

                {/* NUMBER */}
                <div className="flex items-start">
                  <span className="text-[11px] tabular-nums tracking-[0.18em] text-[#a89a8c]">
                    {project.number}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="min-w-0">

                  {/* META */}
                  <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a89a8c]">
                      {project.category}
                    </span>

                    <span className="h-px w-8 bg-[#f6ede0]/20" />

                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#a89a8c]">
                      Case Study
                    </span>
                  </div>

                  {/* TITLE + METRIC */}
                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">

                    <h3 className="max-w-[900px] text-3xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-4xl lg:text-5xl xl:text-6xl">
                      {project.title}
                    </h3>

                    <div className="xl:text-right">
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#a89a8c]">
                        Impact
                      </span>

                      <span className="mt-2 block text-2xl font-medium tracking-[-0.03em] text-[#f6ede0] sm:text-3xl">
                        {project.metric}
                      </span>
                    </div>

                  </div>

                  {/* WORKFLOW IMAGE */}
                  <div className="relative mt-10 w-full overflow-hidden border border-[#f6ede0]/10 bg-[#f6ede0]">

                    <motion.img
                      src={project.image}
                      alt={`${project.title} workflow`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="block h-auto w-full object-contain"
                      whileHover={{ scale: 1.012 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />

                  </div>

                  {/* DESCRIPTION + TAGS */}
                  <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start">

                    <p className="max-w-[680px] text-sm leading-7 text-[#a89a8c] sm:text-base">
                      {project.description}
                    </p>

                    <div className="flex max-w-[420px] flex-wrap gap-x-5 gap-y-2 lg:justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.16em] text-[#a89a8c]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-10 flex items-center justify-between border-t border-[#f6ede0]/10 pt-4">
                  </div>

                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* END NOTE */}
        <div className="py-16 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#a89a8c]">
              Selected results
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#a89a8c]">
              Systems that earn their keep.
            </span>

          </div>
        </div>

      </div>
    </section>
  );
}