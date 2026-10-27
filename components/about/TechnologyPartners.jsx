'use client';

import React from "react";

export default function CompanyStorySection() {
  // Replace repeated company logos with actual, approved partner logos.
  const logos = [
    { src: "/Images/brands/jyoti-cnc.webp", alt: "Jyoti CNC" },
    { src: "/Images/brands/eifco.webp", alt: "EIFCO" },
    { src: "/Images/brands/energy-mission.webp", alt: "Energy Mission" },
    { src: "/Images/brands/hexagon.webp", alt: "Hexagon" },
    { src: "/Images/brands/sodick.webp", alt: "Sodick" },
    { src: "/Images/brands/pinnacle.webp", alt: "Pinnacle" },
    { src: "/Images/brands/sukrit.webp", alt: "Sukrit" },
    { src: "/Images/brands/kiya.webp", alt: "Kiya" },
  ];

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-slate-50 py-20 text-slate-900">

      {/* Brand Partners Marquee */}
      <div className="mb-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Our Technology Partners
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Exploring manufacturing excellence through specialised machine-tool solutions.
          </p>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="animate-infinite-scroll flex w-max items-center gap-16 py-4">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.alt}-${idx}`}
                className="flex items-center justify-center opacity-70 transition duration-300 hover:opacity-100"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-10 w-auto object-contain grayscale transition duration-300 hover:grayscale-0 sm:h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Logo Scroll */}
      <style jsx global>{`
        @keyframes infiniteScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infiniteScroll 35s linear infinite;
          will-change: transform;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-infinite-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

