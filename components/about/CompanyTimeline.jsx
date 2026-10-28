"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import ScrollFloat from "../animations/ScrollFloat";
import SectionLabel from "./SectionLabel";
import { TIMELINE, TIMELINE_SECTION } from "../../lib/aboutContent";

export default function CompanyTimeline() {
  const rootRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const path = pathRef.current;

      if (path) {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector("[data-timeline-track]"),
            start: "top 75%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      }

      const items = root.querySelectorAll("[data-milestone]");

      items.forEach((item, index) => {
        const number = item.querySelector("[data-number]");
        const content = item.querySelector("[data-content]");
        const marker = item.querySelector("[data-marker]");

        gsap.fromTo(
          marker,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.04,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          }
        );

        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, scale: 0.5, rotation: -12 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.55,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <section
      id="our-journey"
      ref={rootRef}
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-36"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-lime-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <SectionLabel>{TIMELINE_SECTION.label}</SectionLabel>

            <h2 id="journey-heading" className="mt-5">
              <ScrollFloat
                effect="float"
                splitBy="words"
                direction="up"
                scrollStart="top 85%"
                scrollEnd="bottom 55%"
                stagger={0.05}
                distance={45}
                textClassName="text-left text-3xl font-bold leading-tight tracking-tight text-[#01193B] sm:text-4xl lg:text-6xl"
              >
                {TIMELINE_SECTION.heading}
              </ScrollFloat>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover the milestones that have shaped MTAT Technologies,
            from our beginnings in industrial automation to our expanding
            machine-tool and manufacturing technology portfolio.
          </p>
        </div>

        {/* Desktop curved timeline */}
        <div
          data-timeline-track
          className="relative mt-20 hidden min-h-[610px] lg:block"
        >
          {/* Curved black roadmap */}
          <svg
            viewBox="0 0 1200 480"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M -30 310
                 C 100 310, 105 190, 230 190
                 S 360 310, 490 310
                 S 620 190, 750 190
                 S 880 310, 1010 310
                 S 1120 230, 1230 230"
              stroke="#e2e8f0"
              strokeWidth="62"
              strokeLinecap="round"
            />

            <path
              ref={pathRef}
              d="M -30 310
                 C 100 310, 105 190, 230 190
                 S 360 310, 490 310
                 S 620 190, 750 190
                 S 880 310, 1010 310
                 S 1120 230, 1230 230"
              stroke="#171717"
              strokeWidth="56"
              strokeLinecap="round"
            />
          </svg>

          {/* Milestones positioned along the curve */}
          {TIMELINE.slice(0, 5).map((milestone, index) => {
            const positions = [
              { left: "7%", top: "43%" },
              { left: "25%", top: "14%" },
              { left: "43%", top: "43%" },
              { left: "62%", top: "14%" },
              { left: "81%", top: "43%" },
            ];

            const position = positions[index];

            return (
              <article
                key={milestone.year}
                id={`milestone-${milestone.year}`}
                data-milestone
                className="absolute z-10 w-[190px] xl:w-[205px]"
                style={{
                  left: position.left,
                  top: position.top,
                  transform: "translate(-10%, -50%)",
                }}
              >
                {/* Lime milestone number */}
                <div
                  data-marker
                  className="relative z-20 mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#C7FF00] text-base font-black text-[#111111] shadow-[0_5px_20px_rgba(199,255,0,0.25)] ring-4 ring-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Floating white information panel */}
                <div
                  data-content
                  className="rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.15)]"
                >
                  <p
                    data-number
                    className="text-2xl font-black tracking-tight text-[#01193B]"
                  >
                    {milestone.year}
                  </p>

                  <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900">
                    {milestone.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {milestone.text}
                  </p>
                </div>
              </article>
            );
          })}

          {/* Small caption inside the roadmap */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-slate-200 pt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            <span>Our Journey</span>
            <span>Experience · Technology · Progress</span>
          </div>
        </div>

        {/* Mobile and tablet timeline */}
        <div className="relative mt-14 lg:hidden">
          {/* Vertical black timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[21px] top-6 w-[5px] rounded-full bg-slate-200"
          />

          <div className="space-y-9">
            {TIMELINE.map((milestone, index) => (
              <article
                key={milestone.year}
                id={`milestone-mobile-${milestone.year}`}
                data-milestone
                className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4"
              >
                {/* Number marker */}
                <div
                  data-marker
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#C7FF00] text-xs font-black text-slate-950 shadow-md"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Information panel */}
                <div
                  data-content
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.06)]"
                >
                  <p
                    data-number
                    className="text-2xl font-black tracking-tight text-[#01193B]"
                  >
                    {milestone.year}
                  </p>

                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {milestone.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {milestone.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
