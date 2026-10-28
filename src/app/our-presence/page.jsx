"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../../lib/gsap";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaQuoteLeft,
} from "react-icons/fa6";
import EnquirySection from "../../../components/EnquirySection";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaStar } from "react-icons/fa";

const images = {
  hero: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=90",

  team1:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",

  team2:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85",

  team3:
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=85",

  team4:
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=85",

  gallery1:
    "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=85",

  gallery2:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85",

  gallery3:
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85",

  gallery4:
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=85",

  gallery5:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",

  gallery6:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
};

const team = [
  {
    role: "Leadership",
    description:
      "Guiding our vision, building partnerships, and supporting long-term business growth.",
    image: images.team1,
  },
  {
    role: "Sales & Solutions",
    description:
      "Helping customers explore machine tools and technologies suited to their requirements.",
    image: images.team2,
  },
  {
    role: "Technical Support",
    description:
      "Supporting customers with service coordination and machinery-related assistance.",
    image: images.team3,
  },
  {
    role: "Customer Partnerships",
    description:
      "Building lasting relationships with customers, suppliers, and technology partners.",
    image: images.team4,
  },
];

// Replace these sample cards with verified customer reviews before publishing.
const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Managing Director, Apex Precision Engineering",
    content:
      "MTAT's Vertical Machining Centers completely transformed our production output. Exceptional build quality and unparalleled local support in Punjab.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    machine: "VMC-850 High Speed Series",
  },
  {
    name: "Gurpreet Singh",
    role: "Director, Dashmesh Agricultural Works",
    content:
      "Their CNC Lathes and turning solutions deliver supreme precision and reliability under heavy industrial workloads. Highly dependable team.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    machine: "CNC Heavy Duty Lathe",
  },
  {
    name: "Vikram Malhotra",
    role: "Founder, Novatech Components",
    content:
      "Investing in their 5-Axis machining systems elevated our aerospace component accuracy to an entirely new tier. Truly world-class machinery.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    machine: "5-Axis Gantry Mill",
  },
  {
    name: "Amit Bansal",
    role: "Operations Head, Shivalik Die Makers",
    content:
      "From consultation to installation and prompt after-sales service, MTAT has proven to be an indispensable manufacturing partner.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    machine: "EDM Wire Cut System",
  },
  {
    name: "Harpreet Brar",
    role: "Plant Manager, Kesar Industries",
    content:
      "The laser cutting systems we sourced are robust, incredibly fast, and operate with zero downtime. Outstanding performance overall.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    machine: "Fiber Laser Cutter",
  },
  {
    name: "Maninder Oberoi",
    role: "Chief Engineer, Guru Nanak Tools",
    content:
      "Reliable tooling, accurate CMM metrology equipment, and expert guidance. They genuinely understand the nuances of industrial machining.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    machine: "Precision CMM System",
  },
];

function SectionEyebrow({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#004DA3] sm:text-sm">
      {children}
    </p>
  );
}

export default function OurPresencePage() {
  const [swiper, setSwiper] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-content]",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
        );

        root.querySelectorAll("[data-section-reveal]").forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        root.querySelectorAll("[data-reveal]").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        root.querySelectorAll("[data-image-reveal]").forEach((image) => {
          gsap.fromTo(
            image,
            { clipPath: "inset(12% 0 12% 0)", scale: 1.06 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <main ref={rootRef} className="overflow-hidden bg-white text-[#01193B]">
        {/* =====================================================
          HERO
      ====================================================== */}
        <section className="relative">
          <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-slate-800 sm:min-h-[540px] lg:min-h-[650px]">
            <img
              src={images.hero}
              alt="Industrial machinery and manufacturing environment"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-slate-950/40" />

            <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white">
              <p
                data-hero-content
                className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-sm"
              >
                MTAT TECHNOLOGIES PRIVATE LIMITED
              </p>

              <h1
                data-hero-content
                className="mt-6 text-5xl font-medium tracking-tight sm:text-7xl lg:text-8xl"
              >
                Our Presence
              </h1>

              <p
                data-hero-content
                className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
              >
                People, partnerships, and industrial technologies working
                together to support manufacturing progress.
              </p>

              <a
                data-hero-content
                href="#our-story"
                className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#01193B]"
              >
                Explore Our Story
                <FaArrowRight className="text-xs" />
              </a>
            </div>

            <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
              Engineering Precision · Powering Progress
            </div>
          </div>
        </section>

        {/* =====================================================
    INTRODUCTION + IMAGE COLLAGE
====================================================== */}
        <section
          id="our-story"
          className="mx-auto px-4 py-20 sm:px-6 md:px-12 lg:px-24 xl:px-40"
        >
          <div>
            {/* Editorial image collage */}
            <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {/* Image 1 — Industrial machinery */}
              <div
                data-image-reveal
                className="col-span-3 mt-8 overflow-hidden sm:mt-12"
              >
                <Image
                  src={images.gallery1}
                  alt="Industrial machine tools"
                  width={900}
                  height={650}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 600px"
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64 lg:h-80"
                />
              </div>

              {/* Image 2 — Team */}
              <div data-image-reveal className="col-span-3 overflow-hidden">
                <Image
                  src={images.team1}
                  alt="Team collaboration and workplace"
                  width={900}
                  height={650}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 600px"
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-52 lg:h-64"
                />
              </div>

              {/* Image 3 — Precision equipment */}
              <div data-image-reveal className="col-span-2 overflow-hidden">
                <Image
                  src={images.gallery3}
                  alt="Precision engineering equipment"
                  width={600}
                  height={500}
                  sizes="(max-width: 640px) 33vw, 350px"
                  loading="lazy"
                  className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48 lg:h-56"
                />
              </div>

              {/* Image 4 — Industrial workplace */}
              <div
                data-image-reveal
                className="col-span-4 -mt-4 overflow-hidden sm:-mt-8"
              >
                <Image
                  src={images.gallery6}
                  alt="Industrial workplace and engineering operations"
                  width={1200}
                  height={700}
                  sizes="(max-width: 640px) 67vw, (max-width: 1024px) 60vw, 800px"
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-60 lg:h-72"
                />
              </div>

              {/* Image 5 — Machine shop */}
              <div data-image-reveal className="col-span-3 overflow-hidden">
                <Image
                  src={images.gallery2}
                  alt="Machine shop and manufacturing equipment"
                  width={900}
                  height={600}
                  sizes="(max-width: 640px) 50vw, 600px"
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56 lg:h-64"
                />
              </div>

              {/* Image 6 — Team interaction */}
              <div
                data-image-reveal
                className="col-span-3 mt-5 overflow-hidden sm:mt-8"
              >
                <Image
                  src={images.team2}
                  alt="Team members working together"
                  width={900}
                  height={600}
                  sizes="(max-width: 640px) 50vw, 600px"
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-52 lg:h-60"
                />
              </div>

              {/* Image 7 — Manufacturing process */}
              <div data-image-reveal className="col-span-2 overflow-hidden">
                <Image
                  src={images.gallery4}
                  alt="Manufacturing and metalworking process"
                  width={600}
                  height={500}
                  sizes="(max-width: 640px) 33vw, 350px"
                  loading="lazy"
                  className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
                />
              </div>

              {/* Image 8 — Industrial facility */}
              <div data-image-reveal className="col-span-2 overflow-hidden">
                <Image
                  src={images.gallery5}
                  alt="Industrial facility and production area"
                  width={600}
                  height={500}
                  sizes="(max-width: 640px) 33vw, 350px"
                  loading="lazy"
                  className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
                />
              </div>

              {/* Image 9 — Team or company environment */}
              <div data-image-reveal className="col-span-2 overflow-hidden">
                <Image
                  src={images.team3}
                  alt="Professional team and company environment"
                  width={600}
                  height={500}
                  sizes="(max-width: 640px) 33vw, 350px"
                  loading="lazy"
                  className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
          OUR PRESENCE / APPROACH
      ====================================================== */}
        <section className="bg-slate-100/80 py-20 sm:py-28">
          <div className="mx-auto px-4 py-20 sm:px-6 md:px-12 lg:px-24 xl:px-40">
            <div
              data-section-reveal
              className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-16"
            >
              <div>
                <SectionEyebrow>Our Approach</SectionEyebrow>

                <h2 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  More Than Machines.
                  <span className="block text-slate-400">
                    Stronger Connections.
                  </span>
                </h2>
              </div>

              <div>
                <p className="max-w-3xl text-lg leading-8 text-slate-800 sm:text-2xl sm:leading-10">
                  We bring together machinery, technology partners, and
                  customer-focused support to help businesses make informed
                  manufacturing decisions.
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  From exploring machine options to coordinating service and
                  spares, our focus is on building dependable working
                  relationships throughout the customer journey.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Industry Knowledge",
                  text: "Understanding manufacturing needs and industrial applications.",
                },
                {
                  number: "02",
                  title: "Technology Partners",
                  text: "Connecting customers with established machine-tool brands.",
                },
                {
                  number: "03",
                  title: "Customer Support",
                  text: "Helping coordinate service and spare-parts requirements.",
                },
                {
                  number: "04",
                  title: "Long-Term Relationships",
                  text: "Building partnerships through communication and reliability.",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  data-reveal
                  className="group border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#004DA3]/40 sm:p-7"
                >
                  <span className="text-sm font-semibold text-[#004DA3]">
                    {item.number}
                  </span>

                  <h3 className="mt-8 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>

                  <FaArrowUpRightFromSquare className="mt-7 text-sm text-slate-300 transition group-hover:text-[#004DA3]" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
          TEAM
      ====================================================== */}
        <section className="mx-auto px-4 py-20 sm:px-6 md:px-12 lg:px-24 xl:px-40">
          <div
            data-section-reveal
            className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <SectionEyebrow>The People Behind MTAT</SectionEyebrow>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                Technology Moves Forward.
                <span className="block text-slate-400">
                  People Make It Happen.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              Our team works across customer relationships, machine-tool
              solutions, and support to help keep business moving.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <article key={member.role} data-reveal className="group">
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={`${member.role} representative image`}
                    loading="lazy"
                    className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[340px]"
                  />

                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#004DA3] shadow-sm">
                    <FaArrowRight className="-rotate-45 text-sm transition group-hover:rotate-0" />
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#004DA3]">
                  0{index + 1}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {member.role}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {member.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Team images are temporary stock photos. Replace them with actual
            MTAT team photographs before publishing.
          </p>
        </section>

        {/* =====================================================
          CUSTOMER REVIEWS
      ====================================================== */}

        <section className="overflow-hidden text-[#0a0c10] py-16 md:py-28 bg-white">
          {/* Header Container */}
          <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#004DA3]">
                Customer Relationships
              </span>
              <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                Trust Built Through
                <span className="block text-slate-400">Every Interaction.</span>
              </h2>
              <div>
                <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  Lasting partnerships are built on communication, dependable
                  support, and understanding each customer&apos;s requirements.
                </p>

                <a
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#004DA3] transition hover:gap-5"
                >
                  Connect With Our Team
                  <FaArrowRight />
                </a>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 justify-end w-full md:w-auto">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004DA3]"
              >
                <BiChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004DA3]"
              >
                <BiChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Full-Width Swiper Carousel */}
          <div className="w-full">
            <Swiper
              onSwiper={setSwiper}
              slidesPerView={1.15}
              spaceBetween={20}
              centeredSlides={false}
              grabCursor
              speed={700}
              watchOverflow
              breakpoints={{
                540: { slidesPerView: 2.1, spaceBetween: 24 },
                768: { slidesPerView: 2.6, spaceBetween: 28 },
                1024: { slidesPerView: 3.2, spaceBetween: 32 },
                1280: { slidesPerView: 3.8, spaceBetween: 36 },
                1536: { slidesPerView: 4.2, spaceBetween: 40 },
              }}
              className="overflow-visible! px-4! sm:px-6! md:px-12! lg:px-16!"
            >
              {testimonials.map((item, index) => {
                const raised = index % 2 === 1;

                return (
                  <SwiperSlide key={item.name} className="h-auto!">
                    <div
                      className={`group flex flex-col justify-between transition-transform duration-500 rounded-2xl bg-slate-50 border border-slate-200 p-8 shadow-sm hover:shadow-md ${
                        raised ? "mt-0 md:mt-10" : "mt-6 md:mt-0"
                      }`}
                      style={{ minHeight: "380px" }}
                    >
                      <div>
                        {/* Quote Icon & Rating */}
                        <div className="flex items-center justify-between mb-6">
                          <FaQuoteLeft className="h-8 w-8 text-[#004DA3]/20" />
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(item.rating)].map((_, i) => (
                              <FaStar key={i} className="h-3.5 w-3.5" />
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                          "{item.content}"
                        </p>
                      </div>

                      {/* Client Info & Machine Tag */}
                      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-[#004DA3]/30"
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {item.role}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#004DA3]/10 text-[#004DA3]">
                            {item.machine}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      </main>
      <EnquirySection />
    </>
  );
}
