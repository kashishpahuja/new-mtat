'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import ScrollFloat from '../animations/ScrollFloat';
import SectionLabel from './SectionLabel';
import { TIMELINE, TIMELINE_SECTION } from '../../lib/aboutContent';

export default function CompanyTimeline() {
  const rootRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const path = pathRef.current;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: true,
            },
          });
        }

        // Animate each milestone node and text cleanly without boxed cards
        root.querySelectorAll('[data-milestone]').forEach((card) => {
          const node = card.querySelector('[data-node]');
          const content = card.querySelector('[data-content]');
          const yearEl = card.querySelector('[data-year]');
          const year = Number(yearEl?.dataset.year || 2000);
          const counter = { v: year - 20 };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
          });

          tl.fromTo(
            node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.5)' }
          )
            .fromTo(
              content,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
              '-=0.3'
            )
            .fromTo(
              counter,
              { v: year - 20 },
              {
                v: year,
                duration: 1,
                ease: 'power2.out',
                onUpdate: () => {
                  if (yearEl) yearEl.textContent = String(Math.round(counter.v));
                },
              },
              0
            );
        });
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="our-journey"
      ref={rootRef}
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-white py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel>{TIMELINE_SECTION.label}</SectionLabel>
        <h2 id="journey-heading" className="mt-6 max-w-4xl">
          <ScrollFloat
            effect="float"
            splitBy="words"
            direction="up"
            scrollStart="top 85%"
            scrollEnd="bottom 55%"
            stagger={0.06}
            distance={80}
            textClassName="text-left text-3xl font-bold tracking-tight text-[#01193B] sm:text-4xl lg:text-6xl"
          >
            {TIMELINE_SECTION.heading}
          </ScrollFloat>
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg">
          Explore the key milestones that shaped our evolution into an industry-leading technology partner.
        </p>

        {/* Desktop / Large screen Wavy Roadmap Flow without boxed background */}
        <div className="relative mt-20 lg:mt-32 min-h-[500px]">
          {/* SVG Wavy Path Background matching reference design */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 500"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={pathRef}
                d="M 50 400 Q 320 80 600 280 T 1150 120"
                stroke="#cbd5e1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Timeline Milestones Flow Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10 pt-8">
            {TIMELINE.map((m, i) => {
              // Alternating positions along the wave curve (top vs bottom placement)
              const isEven = i % 2 === 0;
              const verticalLayout = isEven
                ? 'lg:-translate-y-12 lg:items-start lg:text-left'
                : 'lg:translate-y-36 lg:items-start lg:text-left';

              const dotColors = ['bg-blue-600', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-indigo-600'];
              const currentDotColor = dotColors[i % dotColors.length];

              return (
                <div
                  key={m.year}
                  id={`milestone-${m.year}`}
                  data-milestone
                  className={`flex flex-col ${verticalLayout} relative group`}
                >
                  {/* Node Dot on Curve */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      data-node
                      className={`h-4 w-4 rounded-full ${currentDotColor} ring-4 ring-white shadow-md flex-shrink-0`}
                    />
                    <span
                      data-year={m.year}
                      className="text-xl lg:text-2xl font-black text-[#01193B] tabular-nums tracking-tight"
                    >
                      {m.year}
                    </span>
                  </div>

                  {/* Content block without background box */}
                  <div data-content className="flex flex-col max-w-xs">
                    <h3 className="text-base lg:text-lg font-bold text-[#01193B] group-hover:text-[#467B23] transition-colors mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}