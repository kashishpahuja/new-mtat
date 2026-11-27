"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../../lib/gsap";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaQuoteLeft,
} from "react-icons/fa6";
import EnquirySection from "../../../components/EnquirySection";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { getPublicOurPresence } from "../../app/lib/publicApi";
import { getMediaUrl } from "../../app/lib/mediaUrl";

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
    role: "Consultation & Sales",
    description:
      "Understanding customer requirements and helping identify suitable machine tools and manufacturing technologies.",
    image: images.team1,
  },
  {
    role: "Technical Coordination",
    description:
      "Facilitating technical discussions around machining processes, applications and equipment capabilities.",
    image: images.team2,
  },
  {
    role: "Service & Support",
    description:
      "Coordinating installation assistance, maintenance requirements and after-sales service support.",
    image: images.team3,
  },
  {
    role: "Customer Partnerships",
    description:
      "Building lasting relationships with customers, principals and technology partners through dependable support.",
    image: images.team4,
  },
];

// Replace these sample cards with verified customer reviews before publishing.
const testimonials = [
  {
    name: "Machine Selection",
    role: "Understanding Production Requirements",
    content:
      "Every manufacturing requirement is different. We focus on understanding production objectives, component specifications and application needs before exploring suitable machine tool solutions.",
    rating: 5,
    image: images.team1,
    machine: "Consultation & Selection",
  },
  {
    name: "Technology Solutions",
    role: "Connecting with the Right Technologies",
    content:
      "Our diverse technology portfolio connects manufacturers with established Indian and international machine tool brands across multiple industrial applications.",
    rating: 5,
    image: images.team2,
    machine: "Technology Partnerships",
  },
  {
    name: "Technical Coordination",
    role: "Supporting Manufacturing Applications",
    content:
      "From machining processes to equipment capabilities, technical coordination helps customers evaluate solutions aligned with their manufacturing requirements.",
    rating: 5,
    image: images.team3,
    machine: "Application Support",
  },
  {
    name: "After-Sales Support",
    role: "Support Beyond Machinery Supply",
    content:
      "Our commitment extends beyond machine supply through installation coordination, service assistance, maintenance and spare parts support.",
    rating: 5,
    image: images.team4,
    machine: "Service & Maintenance",
  },
  {
    name: "Long-Term Relationships",
    role: "Building Partnerships Through Trust",
    content:
      "We believe lasting business relationships are built through transparent communication, dependable coordination and an understanding of evolving customer needs.",
    rating: 5,
    image: images.team1,
    machine: "Customer Commitment",
  },
  {
    name: "Manufacturing Progress",
    role: "Three Decades of Industry Presence",
    content:
      "Since 1995, our journey has been shaped by technology partnerships, industry relationships and a continuing commitment to manufacturing progress.",
    rating: 5,
    image: images.team2,
    machine: "Established 1995",
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

// const [pageData, setPageData] = useState(null);


// const content = pageData || {
//   hero: {
//     eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
//     title: "Our Presence",
//     description:
//       "Three decades of experience, established technology partnerships and customer-focused solutions driving manufacturing progress.",
//     buttonText: "Explore Our Story",
//     buttonLink: "#our-story",
//     bottomText: "Engineering Precision · Powering Progress",
//     image: images.hero,
//   },
//   gallery: images.gallery1
//     ? [
//         images.gallery1,
//         images.team1,
//         images.gallery3,
//         images.gallery6,
//         images.gallery2,
//         images.gallery5,
//         images.team2,
//         images.gallery4,
//         images.team3,
//       ].map((image) => ({ image, alt: "MTAT manufacturing and company" }))
//     : [],
//   teamSection: {
//     eyebrow: "Our People",
//     heading: "Approximately 60 Professionals.",
//     highlightedText: "One Shared Vision.",
//     description:
//       "From an initial team of two professionals to an organisation of approximately 60, our journey reflects the dedication, experience and collaborative efforts of our people.",
//     note: "",
//   },
//   team,
//   industriesSection: {
//     eyebrow: "Industrial Reach",
//     heading: "Supporting Diverse Manufacturing",
//     description:
//       "Our solutions are engineered for a broad range of industrial sectors, delivering precision, reliability, and productivity where it matters most.",
//     note: "Explore our application domains on the right",
//     backgroundImage: "/Images/banner.webp",
//     columnOne: [],
//     columnTwo: [],
//   },
//   approachSection: {
//     eyebrow: "Why Choose MTAT",
//     heading: "Experience That",
//     highlightedText: "Moves Industry Forward.",
//     description:
//       "Bringing together three decades of industry experience, established technology partnerships and dependable customer support.",
//     secondaryDescription:
//       "From machine selection and technical coordination to installation assistance, maintenance and spares.",
//   },
//   highlights: [],
//   approachCards: [],
//   supportSection: {
//     eyebrow: "SALES, SERVICE & SUPPORT",
//     heading: "Support Beyond",
//     highlightedText: "The Machine.",
//     description:
//     "The value of a machine extends beyond its installation.",
//     buttonText: "Discuss Your Requirements",
//     buttonLink: "/contact",
//   },
//   supportCards: testimonials,
// };



const defaultContent = {
  hero: {
    eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
    title: "Our Presence",
    description:
      "Three decades of experience, established technology partnerships and customer-focused solutions driving manufacturing progress.",
    buttonText: "Explore Our Story",
    buttonLink: "#our-story",
    bottomText: "Engineering Precision · Powering Progress",
    image: images.hero,
  },

  gallery: [
    images.gallery1,
    images.team1,
    images.gallery3,
    images.gallery6,
    images.gallery2,
    images.gallery5,
    images.team2,
    images.gallery4,
    images.team3,
  ].map((image) => ({
    image,
    alt: "MTAT manufacturing and company",
  })),

  teamSection: {
    eyebrow: "Our People",
    heading: "Approximately 60 Professionals.",
    highlightedText: "One Shared Vision.",
    description:
      "From an initial team of two professionals to an organisation of approximately 60, our journey reflects the dedication, experience and collaborative efforts of our people.",
    note: "",
  },

  team,

  industriesSection: {
    eyebrow: "Industrial Reach",
    heading: "Supporting Diverse Manufacturing",
    description:
      "Our solutions are engineered for a broad range of industrial sectors, delivering precision, reliability, and productivity where it matters most.",
    note: "Explore our application domains on the right",
    backgroundImage: "/Images/banner.webp",
    columnOne: [
      {
        title: "Automotive & Auto Components",
        desc: "Precision machining and production equipment.",
      },
      {
        title: "Agriculture & Implements",
        desc: "Machinery solutions for equipment manufacturers.",
      },
      {
        title: "Railways & Transportation",
        desc: "Machining and measurement technologies.",
      },
      {
        title: "Aerospace & Precision",
        desc: "Advanced machining and inspection solutions.",
      },
      {
        title: "Defence & Heavy Engineering",
        desc: "Manufacturing technologies for specialised requirements.",
      },
      {
        title: "Medical Equipment & Devices",
        desc: "Precision machining and dimensional measurement.",
      },
    ],
    columnTwo: [
      {
        title: "Oil, Gas & Energy",
        desc: "Machining and fabrication solutions for industry.",
      },
      {
        title: "Textiles & Industrial Equipment",
        desc: "Component manufacturing and equipment production.",
      },
      {
        title: "Jewellery & Fine Engineering",
        desc: "Precision machining and specialised applications.",
      },
      {
        title: "Telecommunications & Electronics",
        desc: "Technologies supporting precision components.",
      },
      {
        title: "Scaffolding & Infrastructure",
        desc: "Fabrication and metal processing machinery.",
      },
    ],
  },

  approachSection: {
    eyebrow: "Why Choose MTAT",
    heading: "Experience That",
    highlightedText: "Moves Industry Forward.",
    description:
      "Bringing together three decades of industry experience, established technology partnerships and dependable customer support.",
    secondaryDescription:
      "From machine selection and technical coordination to installation assistance, maintenance and spares.",
  },

  highlights: [
    {
      number: "01",
      title: "Since 1995",
      text: "Three decades of presence in the machine tool and manufacturing solutions sector.",
    },
    {
      number: "02",
      title: "Technology Portfolio",
      text: "Solutions across metal cutting, metal forming, metrology and tool room machinery.",
    },
    {
      number: "03",
      title: "Established Partnerships",
      text: "Connecting manufacturers with reputed Indian and international technology brands.",
    },
    {
      number: "04",
      title: "Beyond Sales",
      text: "Installation coordination, after-sales service, maintenance and spare parts support.",
    },
  ],

  approachCards: [
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
  ],

  supportSection: {
    eyebrow: "SALES, SERVICE & SUPPORT",
    heading: "Support Beyond",
    highlightedText: "The Machine.",
    description:
      "The value of a machine extends beyond its installation. We focus on customer support, technical coordination and dependable assistance throughout the equipment lifecycle.",
    buttonText: "Discuss Your Requirements",
    buttonLink: "/contact",
  },

  supportCards: testimonials,
};

const [pageData, setPageData] = useState(null);
const [pageLoading, setPageLoading] = useState(true);

const content = {
  ...defaultContent,
  ...(pageData || {}),

  hero: {
    ...defaultContent.hero,
    ...(pageData?.hero || {}),
  },

  teamSection: {
    ...defaultContent.teamSection,
    ...(pageData?.teamSection || {}),
  },

  industriesSection: {
    ...defaultContent.industriesSection,
    ...(pageData?.industriesSection || {}),
  },

  approachSection: {
    ...defaultContent.approachSection,
    ...(pageData?.approachSection || {}),
  },

  supportSection: {
    ...defaultContent.supportSection,
    ...(pageData?.supportSection || {}),
  },

  gallery: pageData?.gallery ?? defaultContent.gallery,
  team: pageData?.team ?? defaultContent.team,
  highlights: pageData?.highlights ?? defaultContent.highlights,
  approachCards: pageData?.approachCards ?? defaultContent.approachCards,
  supportCards: pageData?.supportCards ?? defaultContent.supportCards,
};

const media = (path, fallback = "") =>
  getMediaUrl(path || fallback);

useEffect(() => {
  let active = true;

  const loadPage = async () => {
    try {
      const data = await getPublicOurPresence();

      if (active) {
        setPageData(data);
      }
    } catch (error) {
      console.error("Our Presence API:", error);
    } finally {
      if (active) {
        setPageLoading(false);
      }
    }
  };

  loadPage();

  return () => {
    active = false;
  };
}, []);




// useEffect(() => {
//   const loadPage = async () => {
//     try {
//       const API =
//         process.env.NEXT_PUBLIC_API_URL ||
//         "http://localhost:8002/api";

//       const response = await fetch(`${API}/our-presence`, {
//         cache: "no-store",
//       });

//       if (!response.ok) {
//         throw new Error("Unable to load Our Presence page.");
//       }

//       const result = await response.json();
//       setPageData(result.data);
//     } catch (error) {
//       console.error("Our Presence API:", error);
//     }
//   };

//   loadPage();
// }, []);

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
          <div className="relative flex  items-center justify-center overflow-hidden bg-slate-800 sm:min-h-[540px] lg:min-h-[650px]">
            <img
             src={media(content.hero.image, images.hero)}
  alt={content.hero.title || "MTAT Technologies"}
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
                className="mt-6 text-5xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
              >
  {content.hero.eyebrow}    
     {/* Our Presence */}
              </h1>

              <p
                data-hero-content
                className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
              >  
              {content.hero.description}
  {/* Three decades of experience, established technology partnerships
  and customer-focused solutions driving manufacturing progress.  */}
    </p>

              <a
                data-hero-content
       href={content.hero.buttonLink || "#our-story"}
                className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#01193B]"
              >
            {content.hero.buttonText}
                  {/* Explore Our Story */}
                <FaArrowRight className="text-xs" />
              </a>
            </div>

            <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
              {content.hero.bottomText}
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
     <div>
  {/* Editorial image collage */}
  <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
    {/* Image 1 — Industrial machinery */}
    <div
      data-image-reveal
      className="col-span-3 mt-8 overflow-hidden sm:mt-12"
    >
      <img
        src={media(content.gallery?.[0]?.image, images.gallery1)}
        alt={content.gallery?.[0]?.alt || "Industrial machine tools"}
        loading="lazy"
        className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64 lg:h-80"
      />
    </div>

    {/* Image 2 — Team */}
    <div data-image-reveal className="col-span-3 overflow-hidden">
      <img
        src={media(content.gallery?.[1]?.image, images.team1)}
        alt={content.gallery?.[1]?.alt || "Team collaboration and workplace"}
        loading="lazy"
        className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-52 lg:h-64"
      />
    </div>

    {/* Image 3 — Precision equipment */}
    <div data-image-reveal className="col-span-2 overflow-hidden">
      <img
        src={media(content.gallery?.[2]?.image, images.gallery3)}
        alt={content.gallery?.[2]?.alt || "Precision engineering equipment"}
        loading="lazy"
        className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48 lg:h-56"
      />
    </div>

    {/* Image 4 — Industrial workplace */}
    <div
      data-image-reveal
      className="col-span-4 -mt-4 overflow-hidden sm:-mt-8"
    >
      <img
        src={media(content.gallery?.[3]?.image, images.gallery6)}
        alt={
          content.gallery?.[3]?.alt ||
          "Industrial workplace and engineering operations"
        }
        loading="lazy"
        className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-60 lg:h-72"
      />
    </div>

    {/* Image 5 — Machine shop */}
    <div data-image-reveal className="col-span-3 overflow-hidden">
      <img
        src={media(content.gallery?.[4]?.image, images.gallery2)}
        alt={
          content.gallery?.[4]?.alt ||
          "Machine shop and manufacturing equipment"
        }
        loading="lazy"
        className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56 lg:h-64"
      />
    </div>

    {/* Image 6 — Team interaction */}
    <div
      data-image-reveal
      className="col-span-3 mt-5 overflow-hidden sm:mt-8"
    >
      <img
        src={media(content.gallery?.[5]?.image, images.team2)}
        alt={content.gallery?.[5]?.alt || "Team members working together"}
        loading="lazy"
        className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-52 lg:h-60"
      />
    </div>

    {/* Image 7 — Manufacturing process */}
    <div data-image-reveal className="col-span-2 overflow-hidden">
      <img
        src={media(content.gallery?.[6]?.image, images.gallery4)}
        alt={
          content.gallery?.[6]?.alt ||
          "Manufacturing and metalworking process"
        }
        loading="lazy"
        className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
      />
    </div>

    {/* Image 8 — Industrial facility */}
    <div data-image-reveal className="col-span-2 overflow-hidden">
      <img
        src={media(content.gallery?.[7]?.image, images.gallery5)}
        alt={
          content.gallery?.[7]?.alt ||
          "Industrial facility and production area"
        }
        loading="lazy"
        className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
      />
    </div>

    {/* Image 9 — Team or company environment */}
    <div data-image-reveal className="col-span-2 overflow-hidden">
      <img
        src={media(content.gallery?.[8]?.image, images.team3)}
        alt={
          content.gallery?.[8]?.alt ||
          "Professional team and company environment"
        }
        loading="lazy"
        className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-44 lg:h-52"
      />
    </div>
  </div>
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
    <SectionEyebrow>  {content.teamSection.eyebrow}</SectionEyebrow>

    <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
     {content.teamSection.heading}
      <span className="block text-slate-400">
      {content.teamSection.highlightedText}
      </span>
    </h2>
  </div>

  <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
  {content.teamSection.description}
  </p>
</div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.team.map((member, index) => (
  <article
    key={`${member.role}-${index}`}
    data-reveal
    className="group"
  >
    <div className="relative overflow-hidden bg-slate-100">
      <img
        src={media(member.image, images.team1)}
        alt={`${member.role} representative image`}
        loading="lazy"
        className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[340px]"
      />

      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#004DA3] shadow-sm">
        <FaArrowRight className="-rotate-45 text-sm transition group-hover:rotate-0" />
      </span>
    </div>

    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#004DA3]">
      {String(index + 1).padStart(2, "0")}
    </p>

    <h3 className="mt-2 text-xl font-semibold text-slate-900">
      {member.role}
    </h3>

    <p className="mt-3 text-sm leading-6 text-slate-500">
      {member.description}
    </p>
  </article>
))}
  {/* {team.map((member, index) => (
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
            ))} */}
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Team images are temporary stock photos. Replace them with actual
            MTAT team photographs before publishing.
          </p>
        </section>


 {/* INDUSTRIES WE SERVE */}
      <section className="relative flex items-center overflow-hidden py-16 text-white lg:py-24">
        {/* Background Overlay */}
<div
  className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
  style={{
    backgroundImage: `url("${media(
      content.industriesSection.backgroundImage,
      "/Images/banner.webp"
    )}")`,
  }}
/>
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-[#01050a83] via-[#021022] to-[#060d16d3]" />

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Content: Title & Short Intro */}
            {/* <div className="space-y-6 lg:col-span-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
                  Industrial Reach
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Supporting Diverse Manufacturing
                </h2>
                <div className="mt-4 h-1 w-16 bg-orange-500" />
                <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-base">
                  Our solutions are engineered for a broad range of industrial sectors, delivering precision, reliability, and productivity where it matters most.
                </p>
              </div>

              <div className="pt-2 text-xs text-gray-400">
                <span>Explore our application domains on the right</span>
              </div>
            </div> */}
            <div className="space-y-6 lg:col-span-5">
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
      {content.industriesSection.eyebrow}
    </p>

    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
      {content.industriesSection.heading}
    </h2>

    <div className="mt-4 h-1 w-16 bg-orange-500" />

    <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-base">
      {content.industriesSection.description}
    </p>
  </div>

  <div className="pt-2 text-xs text-gray-400">
    <span>{content.industriesSection.note}</span>
  </div>
</div>

            {/* Right: Infinite Scrolling Industry Columns */}
            <div className="relative flex h-[480px] gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)] sm:h-[540px] lg:col-span-7">

              {/* Column 1 (Scroll Up) */}
      {/* Column 1 */}
<div className="animate-scroll-up flex w-1/2 flex-col gap-4">
  {[...(content.industriesSection.columnOne || []),
    ...(content.industriesSection.columnOne || [])].map((sector, idx) => (
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

{/* Column 2 */}
<div className="animate-scroll-down flex w-1/2 flex-col gap-4">
  {[...(content.industriesSection.columnTwo || []),
    ...(content.industriesSection.columnTwo || [])].map((sector, idx) => (
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
        {/* <div className="animate-scroll-up flex w-1/2 flex-col gap-4">
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
              </div> */}

              {/* Column 2 (Scroll Down) */}
              {/* <div className="animate-scroll-down flex w-1/2 flex-col gap-4">
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
              </div> */}
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
    <SectionEyebrow>{content.approachSection.eyebrow}</SectionEyebrow>

    <h2 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
  {content.approachSection.heading}
      <span className="block text-slate-400">
  {content.approachSection.highlightedText}
      </span>
    </h2>
  </div>

  <div>
    <p className="max-w-3xl text-lg leading-8 text-slate-800 sm:text-2xl sm:leading-10">
 {content.approachSection.description}
    </p>

    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
      {content.approachSection.secondaryDescription}
    </p>
  </div>
</div>

<div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {content.highlights.map((item, index) => (
  <article
    key={`${item.number}-${index}`}
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

{/* {[
    {
      number: "01",
      title: "Since 1995",
      text: "Three decades of presence in the machine tool and manufacturing solutions sector.",
    },
    {
      number: "02",
      title: "Technology Portfolio",
      text: "Solutions across metal cutting, metal forming, metrology and tool room machinery.",
    },
    {
      number: "03",
      title: "Established Partnerships",
      text: "Connecting manufacturers with reputed Indian and international technology brands.",
    },
    {
      number: "04",
      title: "Beyond Sales",
      text: "Installation coordination, after-sales service, maintenance and spare parts support.",
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
  ))} */}
</div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
           {content.approachCards.map((item, index) => (
  <article
    key={`${item.number}-${index}`}
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
   {/* {[
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
              ))} */}
            </div>
          </div>
        </section>


        {/* =====================================================
          CUSTOMER REVIEWS
      ====================================================== */}

        <section className="overflow-hidden text-[#0a0c10] py-16 md:py-28 bg-white">
          {/* Header Container */}
         <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
  <div>
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#004DA3]">
  {content.supportSection.eyebrow}
    </span>

    <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
    {content.supportSection.heading}
      <span className="block text-slate-400">
    {content.supportSection.highlightedText}
      </span>
    </h2>

    <div>
      <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        {content.supportSection.description}  </p>

      <a
     href={content.supportSection.buttonLink || "/contact"}
        className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#004DA3] transition hover:gap-5"
      >
   {content.supportSection.buttonText}
        <FaArrowRight />
      </a>
    </div>
  </div>

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
             {content.supportCards.map((item, index) => {
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
           src={media(item.image, images.team1)}
  alt={item.name || "MTAT support"}
  loading="lazy"
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
      <EnquirySection data={content.supportSection} />
    </>
  );
}
