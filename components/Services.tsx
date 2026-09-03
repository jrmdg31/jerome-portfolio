'use client';

import { motion } from 'framer-motion';

type Service = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    number: '01',
    category: 'ADMINISTRATION',
    title: 'Virtual Assistance',
    description:
      'Executive administration, calendar management, email triage, and client communication handled with precision and proactive anticipation.',
    tags: ['Calendar', 'Email', 'Client communication'],
  },
  {
    number: '02',
    category: 'AUTOMATION',
    title: 'Workflow Automation',
    description:
      'Connect your tools, remove repetitive work, and build reliable workflows that run without constant manual intervention.',
    tags: ['Zapier', 'Make', 'APIs'],
  },
  {
    number: '03',
    category: 'DOCUMENTATION',
    title: 'Process Documentation',
    description:
      'Turn scattered knowledge into clear SOPs, process maps, and repeatable systems that your team can actually use.',
    tags: ['SOPs', 'Workflows', 'Process maps'],
  },
  {
    number: '04',
    category: 'SYSTEMS',
    title: 'Systems & Tools Setup',
    description:
      'Select, configure, and organize the tools your operation needs without adding unnecessary complexity.',
    tags: ['CRM', 'Project management', 'Integrations'],
  },
  {
    number: '05',
    category: 'RESEARCH',
    title: 'Data Research & Analysis',
    description:
      'Research markets, competitors, and performance data, then turn the findings into information you can act on.',
    tags: ['Research', 'Analysis', 'Reporting'],
  },
  {
    number: '06',
    category: 'COORDINATION',
    title: 'Remote Collaboration',
    description:
      'Keep projects moving across people, platforms, and time zones with clear communication and structured execution.',
    tags: ['Coordination', 'Project management', 'Operations'],
  },
];

export default function Services() {
  return (
    <section className="what-i-offer" id="services">
      <div className="what-i-offer__inner">

        {/* =========================================
            HEADER
            ========================================= */}

        <header className="what-i-offer__header">
          <div>
            <div className="what-i-offer__eyebrow">
              SERVICES / 06
            </div>

            <h2 className="what-i-offer__title">
              What I offer
            </h2>
          </div>

          <p className="what-i-offer__intro">
            Practical support across the work that
            keeps a business moving.
          </p>
        </header>


        {/* =========================================
            SERVICES
            ========================================= */}

        <div className="what-i-offer__services">

          {SERVICES.map((service, index) => (
            <motion.article
              key={service.number}
              className="what-i-offer__service"
              data-cursor-label={service.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* ===================================
                  NUMBER COLUMN
                  =================================== */}

              <div className="what-i-offer__number-wrap">
                <div className="what-i-offer__number">
                  {service.number}
                </div>
              </div>


              {/* ===================================
                  CONTENT COLUMN
                  =================================== */}

              <div className="what-i-offer__content">

                <div className="what-i-offer__category">
                  {service.category}
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <div className="what-i-offer__tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

            </motion.article>
          ))}

        </div>


        {/* =========================================
            FOOTER
            ========================================= */}

        <footer className="what-i-offer__footer">
          <span>
            BUILT AROUND YOUR WORKFLOW
          </span>

          <span>
            NOT THE OTHER WAY AROUND
          </span>
        </footer>

      </div>


      <style jsx>{`

        /* =========================================
           SECTION
           ========================================= */

        .what-i-offer {
          --bg: #100b09;
          --cream: #f6ede0;
          --muted: #a89a8c;

          position: relative;

          width: 100%;
          max-width: 1080px;

          margin: 0 auto;

          padding:
            120px 40px
            140px;

          box-sizing: border-box;

          background: var(--bg);

          color: var(--cream);
        }


        /* =========================================
           INNER
           ========================================= */

        .what-i-offer__inner {
          width: 100%;
          max-width: 1000px;

          margin: 0 auto;
        }


        /* =========================================
           HEADER
           ========================================= */

        .what-i-offer__header {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            280px;

          column-gap: 80px;

          align-items: end;

          margin-bottom: 70px;
        }


        .what-i-offer__eyebrow {
          margin-bottom: 16px;

          color:
            rgba(246, 237, 224, 0.40);

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.16em;
        }


        .what-i-offer__title {
          margin: 0;

          color: var(--cream);

          font-size: 54px;

          line-height: 0.95;

          font-weight: 800;

          letter-spacing: -0.035em;
        }


        .what-i-offer__intro {
          margin: 0;

          max-width: 28ch;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.55;
        }


        /* =========================================
           SERVICES CONTAINER
           ========================================= */

        .what-i-offer__services {
          position: relative;

          width: 100%;
        }


        /*
          ONE SINGLE VERTICAL LINE.

          The line stays entirely inside the
          number column and never crosses the text.
        */

        .what-i-offer__services::before {
          content: '';

          position: absolute;

          left: 17px;

          top: 17px;
          bottom: 17px;

          width: 1px;

          background:
            rgba(246, 237, 224, 0.14);

          pointer-events: none;

          z-index: 0;
        }


        /* =========================================
           SERVICE ROW
           ========================================= */

        .what-i-offer__service {
          position: relative;

          display: grid;

          /*
            COLUMN 1:
            number

            COLUMN 2:
            content
          */

          grid-template-columns:
            36px
            minmax(0, 1fr);

          column-gap: 24px;

          width: 100%;

          min-height: 190px;

          padding:
            34px 0;

          box-sizing: border-box;

          border-top:
            1px solid
            rgba(246, 237, 224, 0.10);

          background: transparent;
        }


        .what-i-offer__service:last-child {
          border-bottom:
            1px solid
            rgba(246, 237, 224, 0.10);
        }


        /* =========================================
           NUMBER WRAPPER
           ========================================= */

        .what-i-offer__number-wrap {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: flex-start;

          justify-content: flex-start;
        }


        /* =========================================
           NUMBER
           ========================================= */

        .what-i-offer__number {
          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          box-sizing: border-box;

          /*
            Background masks the timeline behind
            the number box.
          */

          background: var(--bg);

          border:
            1px solid
            rgba(246, 237, 224, 0.34);

          color: var(--cream);

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.04em;
        }


        /* =========================================
           CONTENT
           ========================================= */

        .what-i-offer__content {
          position: relative;

          min-width: 0;

          width: 100%;

          max-width: 560px;

          padding: 0;

          box-sizing: border-box;
        }


        /* =========================================
           CATEGORY
           ========================================= */

        .what-i-offer__category {
          margin: 2px 0 8px;

          color:
            rgba(246, 237, 224, 0.40);

          font-size: 9px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.15em;
        }


        /* =========================================
           TITLE
           ========================================= */

        .what-i-offer__content h3 {
          margin: 0 0 10px;

          color: var(--cream);

          font-size: 25px;

          line-height: 1.1;

          font-weight: 700;

          letter-spacing: -0.025em;
        }


        /* =========================================
           DESCRIPTION
           ========================================= */

        .what-i-offer__content p {
          margin: 0;

          max-width: 52ch;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.6;
        }


        /* =========================================
           TAGS
           ========================================= */

        .what-i-offer__tags {
          display: flex;

          flex-wrap: wrap;

          gap: 8px;

          margin-top: 18px;
        }


        .what-i-offer__tags span {
          display: inline-flex;

          align-items: center;

          min-height: 20px;

          padding:
            4px 9px;

          box-sizing: border-box;

          border:
            1px solid
            rgba(246, 237, 224, 0.13);

          color:
            rgba(246, 237, 224, 0.45);

          font-size: 9px;

          line-height: 1;

          letter-spacing: 0.04em;
        }


        /* =========================================
           HOVER
           ========================================= */

        .what-i-offer__service:hover {
          border-top-color:
            rgba(246, 237, 224, 0.20);
        }


        .what-i-offer__service:hover
        .what-i-offer__number {
          border-color:
            rgba(246, 237, 224, 0.60);
        }


        .what-i-offer__service:hover
        .what-i-offer__tags span {
          border-color:
            rgba(246, 237, 224, 0.24);

          color:
            rgba(246, 237, 224, 0.65);
        }


        /* =========================================
           FOOTER
           ========================================= */

        .what-i-offer__footer {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;

          margin-top: 26px;

          color:
            rgba(246, 237, 224, 0.28);

          font-size: 9px;

          line-height: 1.4;

          font-weight: 600;

          letter-spacing: 0.15em;
        }


        /* =========================================
           TABLET
           ========================================= */

        @media (max-width: 900px) {

          .what-i-offer {
            padding:
              100px 32px
              120px;
          }


          .what-i-offer__header {
            grid-template-columns:
              minmax(0, 1fr)
              240px;

            column-gap: 50px;
          }

        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 720px) {

          .what-i-offer {
            padding:
              90px 24px
              100px;
          }


          .what-i-offer__header {
            display: block;

            margin-bottom: 54px;
          }


          .what-i-offer__title {
            font-size: 42px;
          }


          .what-i-offer__intro {
            margin-top: 26px;

            max-width: 34ch;
          }


          .what-i-offer__service {
            grid-template-columns:
              34px
              minmax(0, 1fr);

            column-gap: 16px;

            min-height: 0;

            padding:
              30px 0;
          }


          .what-i-offer__services::before {
            left: 16px;

            top: 15px;
            bottom: 15px;
          }


          .what-i-offer__number {
            width: 32px;
            height: 32px;

            font-size: 9px;
          }


          .what-i-offer__category {
            font-size: 8px;

            margin-top: 1px;
          }


          .what-i-offer__content h3 {
            font-size: 21px;
          }


          .what-i-offer__content p {
            font-size: 13px;

            line-height: 1.55;
          }


          .what-i-offer__tags {
            margin-top: 16px;

            gap: 6px;
          }


          .what-i-offer__tags span {
            font-size: 8px;

            padding:
              4px 7px;
          }


          .what-i-offer__footer {
            flex-direction: column;

            align-items: flex-start;

            gap: 8px;
          }

        }


        /* =========================================
           SMALL MOBILE
           ========================================= */

        @media (max-width: 480px) {

          .what-i-offer {
            padding:
              76px 20px
              90px;
          }


          .what-i-offer__title {
            font-size: 38px;
          }


          .what-i-offer__service {
            grid-template-columns:
              32px
              minmax(0, 1fr);

            column-gap: 14px;
          }


          .what-i-offer__services::before {
            left: 15px;
          }


          .what-i-offer__number {
            width: 30px;
            height: 30px;
          }


          .what-i-offer__content h3 {
            font-size: 19px;
          }


          .what-i-offer__content p {
            font-size: 12px;
          }

        }


        /* =========================================
           REDUCED MOTION
           ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .what-i-offer__number,
          .what-i-offer__tags span {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}