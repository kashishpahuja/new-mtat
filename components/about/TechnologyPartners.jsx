
"use client";

import React from "react";
import Link from "next/link";
import { getMediaUrl } from "../../src/app/lib/mediaUrl";

export default function TechnologyPartners({ data = {} }) {
  const logos = data.logos || [];

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-slate-50 py-20 text-slate-900">
      <div className="mb-8 px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {data.label || "Our Technology Partners"}
        </p>

        {data.description && (
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
            {data.description}
          </p>
        )}
      </div>

      {logos.length > 0 && (
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="animate-infinite-scroll flex w-max items-center gap-16 py-4">
            {[...logos, ...logos].map((logo, index) => {
              const image =
                typeof logo.image === "string"
                  ? { url: logo.image, alt: logo.name }
                  : logo.image || {};

              if (!image.url) return null;

              const content = (
                <img
                  src={getMediaUrl(image.url)}
                  alt={image.alt || logo.name || "Technology partner"}
                  loading="lazy"
                  className="h-10 w-auto object-contain transition duration-300 hover:opacity-70 sm:h-12"
                />
              );

              return (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex shrink-0 items-center justify-center"
                >
                  {logo.url ? (
                    <Link
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${logo.name}`}
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

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


// 'use client';

// import React from "react";

// export default function CompanyStorySection() {
//   // Replace repeated company logos with actual, approved partner logos.
//   const logos = [
//     { src: "/Images/brands/jyoti.webp", alt: "Jyoti CNC" },
//     { src: "/Images/brands/eifco.webp", alt: "EIFCO" },
//     { src: "/Images/brands/energymission.webp", alt: "Energy Mission" },
//     { src: "/Images/brands/hexagon.webp", alt: "Hexagon" },
//     { src: "/Images/brands/sodick.webp", alt: "Sodick" },
//     { src: "/Images/brands/pinnacle.webp", alt: "Pinnacle" },
//     { src: "/Images/brands/sukrit.webp", alt: "Sukrit" },
//     { src: "/Images/brands/kiya.webp", alt: "Kiya" },
//   ];

//   return (
//     <section className="overflow-hidden border-t border-slate-200 bg-slate-50 py-20 text-slate-900">

//       {/* Brand Partners Marquee */}
//       <div className="">
//         <div className="mb-8 text-center">
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//             Our Technology Partners
//           </p>
//           <p className="mt-2 text-sm text-slate-500">
//             Exploring manufacturing excellence through specialised machine-tool solutions.
//             <br /> <br />Together, our technology partnerships enable us to offer a diverse range of manufacturing solutions backed by industry expertise, technical coordination and customer-focused support.
//           </p>
//         </div>

//         <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
//           <div className="animate-infinite-scroll flex w-max items-center gap-16 py-4">
//             {[...logos, ...logos].map((logo, idx) => (
//               <div
//                 key={`${logo.alt}-${idx}`}
//                 className="flex items-center justify-center transition duration-300 hover:opacity-100"
//               >
//                 <img
//                   src={logo.src}
//                   alt={logo.alt}
//                   loading="lazy"
//                   className="h-10 w-auto object-contain transition duration-300 hover:grayscale-0 sm:h-12"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Infinite Logo Scroll */}
//       <style jsx global>{`
//         @keyframes infiniteScroll {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-infinite-scroll {
//           animation: infiniteScroll 35s linear infinite;
//           will-change: transform;
//         }

//         .animate-infinite-scroll:hover {
//           animation-play-state: paused;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .animate-infinite-scroll {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

