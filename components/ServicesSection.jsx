"use client";

import { getMediaUrl } from "../src/app/lib/mediaUrl";
import Link from "next/link";
import { useRef } from "react";


// [
//   {
//     title: "1. Metal Cutting Solutions",
//     description:
//       "Explore advanced CNC turning centres, machining centres, multi-axis machines and gear-hobbing solutions for precision machining applications.",
//     image:
//       "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80",
//     href: "/products/metal-cutting",
//     buttonText: "Explore Metal Cutting",
//   },
//   {
//     title: "02. Metal Forming Solutions",
//     description:
//       "Discover press brakes, power presses, hydraulic presses and sheet metal processing technologies for industrial forming applications.",
//     image:
//       "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
//     href: "/products/metal-forming",
//     buttonText: "Explore Metal Forming",
//   },
//   {
//     title: "03. Precision Metrology",
//     description:
//       "Explore dimensional measurement and inspection solutions, including coordinate measuring machines, optical measuring systems and portable measuring arms.",
//     image:
//       "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80",
//     href: "/products/metrology",
//     buttonText: "Explore Metrology",
//   },
//   {
//     title: "04. Tool Room Solutions",
//     description:
//       "Discover specialised machinery for precision tooling and finishing, including EDM, wire EDM, surface grinding and cylindrical grinding solutions.",
//     image:
//       "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
//     href: "/products/tool-room-accessories",
//     buttonText: "Explore Tool Room Solutions",
//   },
//   {
//     title: "05. Machine Selection & Supply",
//     description:
//       "Explore machine options from our product portfolio with assistance in identifying equipment suited to your production requirements and applications.",
//     image:
//       "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80",
//     href: "/contact",
//     buttonText: "Enquire About Machinery",
//   },
//   {
//     title: "06. Service & Spares Support",
//     description:
//       "Connect with our team for service assistance and spare-parts enquiries for supported machines and brands.",
//     image:
//       "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
//     href: "/contact",
//     buttonText: "Get Support",
//   },
// ];

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicesSection({ data }) {
  const trackRef = useRef(null);
  const services = data?.items || [];
  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;

    el.scrollBy({
      left: dir * step,
      behavior: "smooth",
    });
  };

  // Duplicate list continuously for smooth endless sliding effect
  const displayedServices = [...services, ...services, ...services];

  return (
    <section
      id="all-services"
      className="overflow-hidden bg-slate-200/80 py-16 md:py-24"
    >
      <style jsx global>{`
        @keyframes slowMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-slow-marquee {
          display: flex;
          width: max-content;
          animation: slowMarquee 40s linear infinite;
          will-change: transform;
        }
        .animate-slow-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        {/* Section Header */}
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
              {/* OUR EXPERTISE */}
              {data?.eyebrow}
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
              {data?.heading}
              {/* Complete Manufacturing Solutions. */}
              <span className="block text-slate-500">
                {data?.highlightedHeading}

                {/* Precision at Every Step. */}
              </span>
            </h2>

            {/* <a
              href="#all-services"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#004DA3] underline underline-offset-4 transition hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004DA3]"
            >
              Explore Our Solutions
              <ArrowUpRight />
            </a> */}
          </div>

          {/* Description */}
          <div className="space-y-4 text-sm leading-7 md:text-base">
            <p className="font-medium text-slate-800">
              {data?.description?.map((paragraph, index) => (
                <span key={index}>{paragraph}</span>
              ))}
              {/* MTAT Technologies brings together advanced machine tools, industrial machinery and precision measurement technologies to support the evolving needs of modern manufacturing.  */}
            </p>

            {/* <p className="text-slate-500">
         
              From metal cutting and sheet metal processing to tool room equipment and metrology, we connect businesses with established technology partners and solutions designed to enhance accuracy, productivity and operational efficiency.  <br /><br />With a customer-focused approach and a commitment to dependable support, we help manufacturers identify the right technologies for their production requirements. 
            </p> */}
          </div>
        </div>

        {/* Service Cards Container */}
        <div
          ref={trackRef}
          className="-mx-6 mt-16 overflow-x-auto px-6 pb-3 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="animate-slow-marquee gap-6">
            {displayedServices.map((service, index) => (
  //              <div key={service._id || index}>
  //   <img
  //     src={getMediaUrl(service.image)}
  //     alt={service.title}
  //   />

  //   <h3>{service.title}</h3>

  //   <p>{service.description}</p>

  //   <Link href={service.href || "/contact"}>
  //     {service.buttonText}
  //   </Link>
  // </div>
              <div
                key={service._id || index}
                data-card
                className="group relative flex h-96 w-65 shrink-0 snap-start flex-col justify-end overflow-visible bg-slate-900 md:h-80 md:w-72"
              >
                {/* Card Link Container */}
                <a
                  href={service.href}
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden"
                >
                  {/* Image */}
                  <img
                     src={getMediaUrl(service.image)}
                    alt={service.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/90" />

                  <div />

                  {/* Card Footer - Absolute at bottom-4 */}
                  <div className="absolute bottom-4 w-full pr-4 flex py-3 items-center justify-between gap-3 bg-slate-950/80 text-sm text-white backdrop-blur-sm z-10">
                    <span className="w-full font-medium leading-5 px-4">
                      {service.title}
                    </span>

                    <ArrowUpRight />
                  </div>
                </a>
              </div>





            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-8 flex items-center justify-center gap-5 text-slate-500">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous services"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004DA3]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="m15 6-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            Our Capabilities
          </span>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next services"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004DA3]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="m9 6 6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
