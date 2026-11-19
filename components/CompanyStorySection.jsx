'use client';

import Link from "next/link";
import React from "react";

export default function CompanyStorySection({data}) {
  // Replace repeated company logos with actual, approved partner logos.
  const logos =  data?.partners || [];
    const displayedLogos = [...logos, ...logos, ...logos];
  // [
  //   { src: "/Images/brands/jyoti.webp", alt: "Jyoti CNC" },
  //   { src: "/Images/brands/eifco.webp", alt: "EIFCO" },
  //   { src: "/Images/brands/energymission.webp", alt: "Energy Mission" },
  //   { src: "/Images/brands/hexagon.webp", alt: "Hexagon" },
  //   { src: "/Images/brands/sodick.webp", alt: "Sodick" },
  //   { src: "/Images/brands/pinnacle.webp", alt: "Pinnacle" },
  //   { src: "/Images/brands/sukrit.webp", alt: "Sukrit" },
  //   { src: "/Images/brands/kiya.webp", alt: "Kiya" },
  // ];

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-slate-50 py-20 text-slate-900">
      {/* Company Story Heading */}
      <div className="mx-auto mb-12 max-w-7xl space-y-5 text-center  px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#004DA3]">
          {/* Our Story Since 1995 */}
          {data?.eyebrow}
        </p>

        <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
       {data?.heading}
          {/* Three Decades of */}
          <br />
          <span className="font-medium italic text-[#004DA3]">
            {/* Engineering Progress. */}
            {data?.highlightedHeading}

          </span>
        </h2>

        <p className="mx-auto text-base leading-relaxed text-slate-600">
      {/* Established in Ludhiana, Punjab, in 1995, MTAT Technologies began with a vision to connect manufacturing businesses with dependable machine tools and practical engineering solutions. */}
      {data?.introduction}
        </p>

        <p className="mx-auto text-sm leading-7 text-slate-500 md:text-base">
       {data?.description}
         {/* From an initial team of two professionals, we have grown into an organisation of approximately 60 professionals, developing our technology portfolio, strengthening industry partnerships and expanding our customer support capabilities.   <br /><br />Today, we continue to support manufacturing businesses with advanced machinery, application-oriented guidance and a commitment to long-term relationships.*/}
          </p> 

        <Link
           href={data?.buttonLink || "/about"}
          className="group inline-flex items-center gap-2 pt-3 text-sm font-semibold text-[#004DA3] transition hover:text-[#467B23]"
        >
          {/* Discover Our Journey */}
        {data?.buttonText}

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Company Introduction Video */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl">
          <video
            autoPlay
            loop
            muted
            controls
            playsInline
            preload="metadata"
            // poster="/Images/company-video-poster.webp"
             poster={getMediaUrl(data?.videoPoster)}
            className="h-[220px] w-full object-contain sm:h-[320px] md:h-[480px] xl:h-[70vh] xl:object-cover"
          >
            {/* <source src="/video/intro1.mp4" type="video/mp4" /> */}
            <source src={getMediaUrl(data?.video)} type="video/mp4" />

            Your browser does not support the video tag.
          </video>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-slate-500">
      From precision machining to advanced manufacturing technologies, we connect industrial expertise with solutions built for progress.  </p>
      </div>


          {/* Brand Partners Marquee */}
      <div className="mt-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {data?.partnersHeading}  {/* Our Technology Partners */}
          </p>
          <p className="mt-2 text-sm text-slate-500">
   {data?.partnersSubheading}
    {/* Global Technology.
Trusted Expertise. Local Support. */}
     </p> 
        </div>

        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="animate-infinite-scroll flex w-max items-center gap-16 py-4">
          {displayedLogos.map((partner, index) => (
  <div key={partner._id || index} className="flex items-center justify-center transition duration-300 hover:opacity-100">
    <img
      src={getMediaUrl(partner.logo)}
      alt={partner.name}
             loading="lazy"
                  className="h-10 w-auto object-contain  transition duration-300 sm:h-12"
               
    />
  </div>
))}

  {/* {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.alt}-${idx}`}
                className="flex items-center justify-center transition duration-300 hover:opacity-100"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-10 w-auto object-contain  transition duration-300 sm:h-12"
                />
              </div>
            ))} */}
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



// 'use client';
// import React from "react";

// export default function CompanyStorySection() {
//   // Array of logos for the automatic scrolling ticker
//   const logos = Array(8).fill("/Images/logo.webp");

//   return (
//     <section className="bg-slate-50 text-slate-900 py-20 overflow-hidden border-t border-slate-200">
      
//       {/* Top Automatic Scrolling Logo Marquee Ticker */}
//       <div className="mb-20">
//         <div className="text-center mb-8">
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//             Trusted by 75,000+ VIP Customers & Industrial Partners
//           </p>
//         </div>
        
//         <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
//           <div className="flex w-max animate-infinite-scroll items-center gap-16 py-4">
//             {logos.concat(logos).map((logo, idx) => (
//               <div key={idx} className="flex items-center justify-center opacity-70 hover:opacity-100 transition duration-300">
//                 <img
//                   src={logo}
//                   alt="Partner Logo"
//                   className="h-10 sm:h-12 w-auto object-contain filter grayscale hover:grayscale-0"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Heading & Video Showcase Layout */}
//       <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 text-center max-w-4xl mx-auto space-y-4 mb-12">
     
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-500">
//           Create An Even <br /><span className="font-medium italic underline text-[#004DA3]">Greater Experience</span>
//         </h2>
//         <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
//           Founded with a commitment to uncompromised precision, MTAT integrates advanced multi-axis CNC machinery and automated tooling solutions to deliver complex components worldwide.
//         </p>
//       </div>

//       {/* Full-Width Video Frame Container */}
//       <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
//         <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black">
//           <video
//             autoPlay
//             loop
//             muted
//             controls
//             playsInline
//             className="w-full h-[200px] md:h-[400px] xl:h-[70vh] object-contain xl:object-cover"
//           >
//             <source src="/video/intro1.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </div>

      

//       {/* Inline styles for infinite scrolling ticker animation */}
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
//         }
//         .animate-infinite-scroll:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// }