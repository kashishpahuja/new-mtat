'use client';

import React from "react";
import {
  FaIndustry,
  FaHandshake,
  FaCogs,
  FaHeadset,
} from "react-icons/fa";


const strengths = [
  {
    icon: FaIndustry,
    number: "01",
    title: "Precision",
    description:
      "Advanced machine-tool technologies for accuracy and reliable manufacturing performance.",
  },
  {
    icon: FaHandshake,
    number: "02",
    title: "Partnership",
    description:
      "Strong technology partnerships built on trust, expertise, and shared growth.",
  },
  {
    icon: FaCogs,
    number: "03",
    title: "Expertise",
    description:
      "The right machinery and technology for diverse industrial applications.",
  },
  {
    icon: FaHeadset,
    number: "04",
    title: "Progress",
    description:
      "Responsive on-ground support to keep businesses moving forward.",
  },
];


const column1Images = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=500&q=80",
];

const column2Images = [
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
];

export default function WhyUsSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-[#01050a] py-12 text-white lg:py-0">
      {/* Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/Images/banner.webp')" }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#01050a]/40 to-[#01050a]/70" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        <div className="grid min-h-screen grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">

          {/* Left Content */}
          <div className="space-y-10 lg:col-span-8">
            <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
              Why MTAT
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Precision.
              <br />
              Partnership. Progress.
            </h2>


              <div className="mt-4 h-px w-14 bg-white/30" />

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              The right technology. Expert guidance. Reliable support. MTAT helps
  businesses make informed manufacturing decisions with confidence.
              </p>
            </div>

            {/* Why Choose MTAT */}
            <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
              {strengths.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative flex items-start gap-4 rounded-xl border border-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-black/40 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors duration-300 group-hover:bg-white/20">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Closing Statement */}
            <div className="flex flex-col items-start justify-start gap-2 border-t border-white/10 pt-4 text-left sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs font-medium text-gray-200 sm:text-sm">
                Technology you can trust.
              </span>

              <span className="hidden text-white/30 sm:inline">/</span>

              <span className="text-xs text-gray-400 sm:text-sm">
                Relationships built for the long term.
              </span>
            </div>
          </div>

          {/* Right: Infinite Scrolling Image Columns */}
          <div className="relative flex h-[550px] gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)] sm:h-[650px] lg:col-span-4">

            {/* Column 1 */}
            <div className="animate-scroll-up flex w-1/2 flex-col gap-3">
              {column1Images.concat(column1Images).map((src, idx) => (
                <div
                  key={`col1-${idx}`}
                  className="h-32 w-full shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-md sm:h-36"
                >
                  <img
                    src={src}
                    alt="Industrial manufacturing and engineering"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="animate-scroll-down flex w-1/2 flex-col gap-3">
              {column2Images.concat(column2Images).map((src, idx) => (
                <div
                  key={`col2-${idx}`}
                  className="h-32 w-full shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-md sm:h-36"
                >
                  <img
                    src={src}
                    alt="Precision machinery and industrial technology"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Animations */}
      <style jsx global>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-up {
          animation: scrollUp 18s linear infinite;
        }

        .animate-scroll-down {
          animation: scrollDown 18s linear infinite;
        }

        .animate-scroll-up:hover,
        .animate-scroll-down:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-up,
          .animate-scroll-down {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
