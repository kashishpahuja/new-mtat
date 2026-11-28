'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from "next/link";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGlobe,
  FaCheckCircle,
  FaLinkedin,
} from "react-icons/fa";


// import brands from "./brandData";

// export function generateStaticParams(){
//   return Object.keys(brands).map((slug)=>({
//     slug,
//   }))
// }

const smootherstep = t => t * t * t * (t * (t * 6 - 15) + 10);

const FADE_STEPS = Array.from({ length: 9 }, (_, i) => i / 8);

const FADE_MASK = `linear-gradient(to right, ${[
  ...FADE_STEPS.map(t => `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) ${(t * 12).toFixed(1)}%`),
  ...FADE_STEPS.map(t => `rgba(0, 0, 0, ${smootherstep(1 - t).toFixed(3)}) ${(88 + t * 12).toFixed(1)}%`)
].join(', ')})`;

const OUTLINE_STYLE = {
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: 'max(1px, 0.028em) currentColor'
};

function wrap(min, max, v) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateWidth = (nextWidth) => {
      setWidth((previousWidth) =>
        previousWidth === nextWidth ? previousWidth : nextWidth
      );
    };

    if (typeof ResizeObserver === "undefined") {
      const handleResize = () => updateWidth(element.offsetWidth);

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const observer = new ResizeObserver(([entry]) => {
      updateWidth(
        Math.round(
          entry.borderBoxSize?.[0]?.inlineSize ??
          entry.contentRect.width
        )
      );
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}




  // eslint-disable-next-line @next/next/no-async-client-component
  export default function BrandPageClient({ brand }) {
  if (!brand) return null;
  
const categories = (brand.categories || []).map((category) => ({
  ...category,
  href: `/products/${brand.categorySlug || "metal-cutting"}/${brand.slug}/${category.slug}`,
}));
  // const categories = (brand.categories || []).map((category) => ({
  //   ...category,
  //   href: `/brands/${brand.slug}/${category.slug}`,
  // }));

  const featuredProducts = (brand.featuredProducts || []).map(
    (product) => ({
      ...product,
      image: product.images?.[0] || "",
      category: product.brandCategory?.title || "",
      description:
        product.shortDescription || product.description || "",
      href: `/products/${product.slug}`,
    })
  );
  // export default async function BrandPage({ params }) {
  // const { slug } = await params;

  // Safely retrieve brand data, handling potential case sensitivity issues.
  // const brand = brands[slug?.toLowerCase()];

  // if (!brand) {
  //   return (
  //     <main className="flex min-h-[65vh] items-center justify-center bg-slate-200 px-6">
  //       <div className="max-w-lg text-center">
  //         <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
  //           Brand Not Found
  //         </p>
  //         <h1 className="mt-4 text-3xl font-medium tracking-tight text-slate-900 lg:text-4xl">
  //           Manufacturer not found.
  //         </h1>
  //         <p className="mt-4 leading-7 text-slate-600">
  //           Return to the brands directory to explore our manufacturers and their product ranges.
  //         </p>
  //         <Link
  //           href="/brands"
  //           className="mt-7 inline-flex items-center gap-3 bg-[#004DA3] px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-700"
  //         >
  //           Explore All Brands <FaArrowRight />
  //         </Link>
  //       </div>
  //     </main>
  //   );
  // }

  // const categories = brand?.categories ?? [];
  // const featuredProducts = brand?.featuredProducts ?? [];



  return (
    <main className="overflow-hidden bg-slate-200/80 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-200">
        <div className="mx-auto grid items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr] md:px-12 lg:px-24 xl:px-40">
          <div className="relative z-10">
            <div className="mb-8 flex flex-wrap items-center gap-6">
              <div className="flex h-20 w-48 items-center justify-center border border-slate-300 bg-white p-4 shadow-inner">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Our Strategic Partner / Brand Profile
              </span>
            </div>

            <h1 className="max-w-3xl font-medium leading-tight tracking-tight ">
              <span className="text-3xl  lg:text-5xl block text-[#004DA3]">{brand.name}</span>
              <span className="text-2xl  lg:text-4xl mt-3 block text-slate-600">{brand.tagline}</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-700">
              {brand.shortDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#004DA3] px-8 py-4 text-sm font-medium text-white transition hover:bg-orange-700"
              >
                Visit Manufacturer Website
                <FaExternalLinkAlt className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#product-categories"
                className="inline-flex items-center gap-3 border-2 border-slate-400 px-8 py-4 text-sm font-medium text-slate-900 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white"
              >
                Explore Product Range <FaArrowRight />
              </a>
            </div>
          </div>

          <div className="relative h-full min-h-[360px] overflow-hidden bg-slate-900 shadow-2xl md:min-h-[560px]">
            <img
              src={brand.heroImage}
              alt={`${brand.name} industrial application`}
              className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                Portfolio Category
              </p>
              <h2 className="mt-3 text-3xl font-medium lg:text-4xl">{brand.heroTitle || brand.name}</h2>
            </div>
          </div>
        </div>
      </section>

    
      {/* ABOUT THE MANUFACTURER */}
      <section className="bg-slate-100 py-20 md:py-28">
        <div className="mx-auto grid gap-12 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-12 lg:px-24 xl:px-40">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
              Manufacturer Overview
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-slate-950 lg:text-5xl">
              Global Technology. Trusted Expertise. Local Support.
            </h2>
            <p className="mt-6 text-lg leading-9 text-slate-700">
              {brand.aboutTitle || `About ${brand.name}`}
            </p>
            <div className="mt-10 h-1.5 w-20 bg-[#004DA3]" />
          </div>

          <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-950 prose-headings:font-medium">
            <p>{brand.description}</p>
            <p>{brand.about}</p>

            <div className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {(brand.expertise || []).map((item, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <FaCheckCircle className="mt-1 shrink-0 text-[#004DA3]" />
                  <span className="text-base font-medium leading-6 text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MTAT & PARTNER COLLABORATION */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/Images/banner.webp')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/20 via-black/30 to-[#01193B]/60" />

        <div className="relative z-10 mx-auto grid gap-10 px-4 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-12 md:py-28 lg:px-24 xl:px-40">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">
              Our Partnership Model
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-tight lg:text-5xl">
              Strong Partnerships are Central to Our Approach.
            </h2>
            <div className="mt-8 h-1.5 w-20 bg-orange-500" />
          </div>

          <div className="border-l border-white/10 pl-10 md:pl-16">
            <div className="mb-7 inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white">
              {brand.relationshipLabel ||
                "MTAT Certified Distributor & Service Partner"}
            </div>

            <p className="max-w-3xl text-lg leading-9 text-white/80">
              {brand.collaboration ||
                `MTAT Technologies works with established machine tool manufacturers like ${brand.name} to offer customers access to a broad range of industrial machinery, precision equipment and manufacturing software. Together, these relationships strengthen MTAT's ability to support diverse manufacturing requirements.`}
            </p>

            <a
              href="/company"
              className="mt-10 inline-flex items-center gap-3 text-base font-medium text-white transition hover:text-orange-400"
            >
              Learn more about MTAT Technologies <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section id="product-categories" className="scroll-mt-20 bg-slate-200/90 py-24 md:py-32">
        <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
          <header className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                Our Partner Ecosystem
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-slate-950 lg:text-5xl">
                Browse {brand.name} by Application
              </h2>
            </div>
            <p className="text-lg leading-9 text-slate-700 lg:text-xl">
              Explore the comprehensive range of industrial machinery and product categories available through our partnership. Select a category to view detailed specifications and product information.
            </p>
          </header>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex flex-col overflow-hidden bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden bg-slate-900">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950/90" />
                  <span className="absolute right-5 top-5 rounded-sm bg-orange-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
                    {category.countLabel || "Solutions"}
                  </span>
                  <h3 className="absolute bottom-6 left-7 right-7 text-2xl font-medium tracking-tight text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="mb-6 flex-1 text-base leading-8 text-slate-700">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                    <span className="text-sm font-semibold text-[#004DA3]">Explore Category</span>
                    <FaArrowRight className="h-5 w-5 text-[#004DA3] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="bg-slate-100 py-24 md:py-32">
          <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
            <header className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                Featured Solutions
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-slate-950 lg:text-6xl">
                Top-Performing {brand.name} Machinery
              </h2>
            </header>

            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <article
                  key={product.name}
                  className="group overflow-hidden rounded-sm border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-80 overflow-hidden bg-slate-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-3xl font-bold text-white shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#004DA3]">
                      {product.category}
                    </p>
                    <h4 className="mt-3.5 text-2xl font-medium tracking-tight text-slate-950">
                      {product.name}
                    </h4>
                    <p className="mt-4 text-base leading-8 text-slate-700 line-clamp-3">
                      {product.description}
                    </p>
                    <Link
                      href={product.href}
                      className="mt-8 inline-flex items-center gap-3 border-b-2 border-transparent pb-1.5 text-sm font-semibold text-orange-600 transition hover:border-orange-500"
                    >
                      View Full Specifications
                      <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES WE SERVE */}
      <section className="relative flex items-center overflow-hidden bg-[#01050a] py-16 text-white lg:py-24">
        {/* Background Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/Images/banner.webp')" }}
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#01050a] via-[#01050a]/80 to-[#01050a]" />

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Content: Title & Short Intro */}
            <div className="space-y-6 lg:col-span-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
                  Industrial Reach
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Supporting Diverse Manufacturing
                </h2>
                <div className="mt-4 h-1 w-16 bg-orange-500" />
                <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-base">
                  Our {brand.name} solutions are engineered for a broad range of industrial sectors, delivering precision, reliability, and productivity where it matters most.
                </p>
              </div>

              <div className="pt-2 text-xs text-gray-400">
                <span>Explore our application domains on the right</span>
              </div>
            </div>

            {/* Right: Infinite Scrolling Industry Columns */}
            <div className="relative flex h-[480px] gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)] sm:h-[540px] lg:col-span-7">

              {/* Column 1 (Scroll Up) */}
              <div className="animate-scroll-up flex w-1/2 flex-col gap-4">
                {[
                  { title: "Automotive & Auto Components", desc: "Precision machining and production equipment." },
                  { title: "Agriculture & Implements", desc: "Machinery solutions for equipment manufacturers." },
                  { title: "Railways & Transportation", desc: "Machining and measurement technologies." },
                  { title: "Aerospace & Precision", desc: "Advanced machining and inspection solutions." },
                  { title: "Defence & Heavy Engineering", desc: "Manufacturing technologies for specialised requirements." },
                  { title: "Medical Equipment & Devices", desc: "Precision machining and dimensional measurement." },
                ].concat([
                  { title: "Automotive & Auto Components", desc: "Precision machining and production equipment." },
                  { title: "Agriculture & Implements", desc: "Machinery solutions for equipment manufacturers." },
                  { title: "Railways & Transportation", desc: "Machining and measurement technologies." },
                  { title: "Aerospace & Precision", desc: "Advanced machining and inspection solutions." },
                  { title: "Defence & Heavy Engineering", desc: "Manufacturing technologies for specialised requirements." },
                  { title: "Medical Equipment & Devices", desc: "Precision machining and dimensional measurement." },
                ]).map((sector, idx) => (
                  <div
                    key={`col1-${idx}`}
                    className="group flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"
                  >
                    <h4 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                      {sector.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-300">
                      {sector.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Column 2 (Scroll Down) */}
              <div className="animate-scroll-down flex w-1/2 flex-col gap-4">
                {[
                  { title: "Oil, Gas & Energy", desc: "Machining and fabrication solutions for industry." },
                  { title: "Textiles & Industrial Equipment", desc: "Component manufacturing and equipment production." },
                  { title: "Jewellery & Fine Engineering", desc: "Precision machining and specialised applications." },
                  { title: "Telecommunications & Electronics", desc: "Technologies supporting precision components." },
                  { title: "Scaffolding & Infrastructure", desc: "Fabrication and metal processing machinery." },
                ].concat([
                  { title: "Oil, Gas & Energy", desc: "Machining and fabrication solutions for industry." },
                  { title: "Textiles & Industrial Equipment", desc: "Component manufacturing and equipment production." },
                  { title: "Jewellery & Fine Engineering", desc: "Precision machining and specialised applications." },
                  { title: "Telecommunications & Electronics", desc: "Technologies supporting precision components." },
                  { title: "Scaffolding & Infrastructure", desc: "Fabrication and metal processing machinery." },
                ]).map((sector, idx) => (
                  <div
                    key={`col2-${idx}`}
                    className="group flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"
                  >
                    <h4 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                      {sector.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-300">
                      {sector.desc}
                    </p>
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
            animation: scrollUp 22s linear infinite;
          }

          .animate-scroll-down {
            animation: scrollDown 22s linear infinite;
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

      {/* OFFICIAL WEBSITE CALL TO ACTION */}
      <section className="bg-slate-200/90 py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        <div className="relative mx-auto overflow-hidden bg-[#004DA3] p-10 text-white shadow-2xl md:p-16">
          <div className="absolute animate-pulse -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/10" />
          <div className="absolute animate-pulse -bottom-32 right-48 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className=" font-medium uppercase tracking-[0.24em] text-white/70">
                Official Manufacturer Resources
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight lg:text-4xl">
                Need More {brand.name} Technical Data?
              </h2>
              <p className="mt-6 max-w-3xl md:text-lg leading-9 text-white/80">
                Visit the official {brand.name} website for additional manufacturer information, technical specifications, documentation, CAD files, and global product resources.
              </p>
              <p className="mt-5 break-all text-sm font-mono text-white/60">
               {(brand.website || "").replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            </div>

            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center justify-center gap-3 bg-white px-4 md:px-10 py-4 text-base font-semibold text-slate-950 shadow-lg transition hover:bg-orange-500 hover:text-white"
            >
              {brand.websiteLabel || `Go to ${brand.name} Website`}
              <FaExternalLinkAlt className="h-4 w-4" />
            </a>
          </div>

          <p className="relative z-10 mt-10 border-t border-white/20 pt-6 text-xs leading-7 text-white/50">
            You are being redirected to an external website operated by {brand.name}. MTAT Technologies makes no guarantees regarding the accuracy of information found on manufacturer websites. Please confirm specifications directly with the manufacturer.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t-2 border-slate-300 bg-slate-100 py-16 text-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
            Start Your Project with Us
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-slate-950 lg:text-5xl">
            Discuss Your {brand.name} Requirements with MTAT Technologies.
          </h2>
          <p className="mt-6 text-lg leading-9 text-slate-700">
            Contact our specialist team to explore application possibilities, discuss your manufacturing challenges, and find the right machinery or software solution from our extensive portfolio.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex h-16 items-center justify-center gap-3 bg-[#004DA3] px-10 py-4 text-base font-semibold text-white shadow transition hover:bg-orange-700"
            >
              Request a Consultation <FaArrowRight />
            </Link>
            {/* <Link
              href="/contact-service"
              className="inline-flex h-16 items-center justify-center gap-3 border-2 border-slate-400 bg-white px-10 py-4 text-base font-semibold text-slate-950 shadow-sm transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white"
            >
              Book Service & Support <FaExternalLinkAlt />
            </Link> */}
          </div>
        </div>
      </section>
    </main>
  );
}



