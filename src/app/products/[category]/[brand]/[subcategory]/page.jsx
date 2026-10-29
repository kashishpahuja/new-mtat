"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const heroContent = {
  "/products/metal-cutting/jyoti/turning-centres": {
    eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
    title: "CNC Turning & Turn-Mill Centres",
    description:
      "Explore Jyoti CNC's range of turning and turn-mill centres, featuring solutions for different machining requirements and industrial applications.",
    image: "/Images/contact.webp",
    imageAlt: "CNC turning and industrial machining environment",
    buttonText: "Explore Product Range",
    buttonLink: "#product-range",
    bottomText: "Precision Engineering · Advanced Machining",
  },

  "/products/metal-cutting/jyoti": {
    eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
    title: "Jyoti CNC Solutions",
    description:
      "Explore CNC machine solutions from Jyoti CNC, designed for a range of industrial machining and manufacturing applications.",
    image: "/Images/contact.webp",
    imageAlt: "Industrial CNC machinery",
    buttonText: "Explore Solutions",
    buttonLink: "#product-range",
    bottomText: "Engineering Precision · Powering Progress",
  },

  "/contact": {
    eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
    title: "Let's Connect",
    description:
      "Connect with our team to discuss your industrial technology, machinery, and support requirements.",
    image: "/Images/contact.webp",
    imageAlt: "Industrial machinery and manufacturing environment",
    buttonText: "Contact Us",
    buttonLink: "#contact-form",
    bottomText: "Building Partnerships · Powering Progress",
  },
};

const defaultHero = {
  eyebrow: "MTAT TECHNOLOGIES PRIVATE LIMITED",
  title: "Our Presence",
  description:
    "People, partnerships, and industrial technologies working together to support manufacturing progress.",
  image: "/Images/contact.webp",
  imageAlt: "Industrial machinery and manufacturing environment",
  buttonText: "Explore Our Story",
  buttonLink: "#our-story",
  bottomText: "Engineering Precision · Powering Progress",
};

export default function DynamicHero() {
  const pathname = usePathname();

  // Match the current URL, ignoring a trailing slash.
  const currentPath =
    pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  const content = heroContent[currentPath] || defaultHero;

  return (
    <section className="relative">
      <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-slate-800 sm:min-h-[540px] lg:min-h-[650px]">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white">
          <p
            data-hero-content
            className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-sm"
          >
            {content.eyebrow}
          </p>

          <h1
            data-hero-content
            className="mt-6 text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
          >
            {content.title}
          </h1>

          <p
            data-hero-content
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
          >
            {content.description}
          </p>

          <a
            data-hero-content
            href={content.buttonLink}
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition duration-300 hover:border-white hover:bg-white hover:text-[#01193B]"
          >
            {content.buttonText}
            <FaArrowRight className="text-xs" />
          </a>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
          {content.bottomText}
        </div>
      </div>
    </section>
  );
}



// "use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { FaChevronRight, FaArrowRight, FaCheckCircle, FaTools, FaFileDownload, FaCog } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// const productCategories = [
//   {
//     title: "Metal Cutting",
//     slug: "metal-cutting",
//     desc: "Jyoti CNC & Eifco machining and gear hobbing solutions.",
//     brands: [
//       {
//         title: "Jyoti CNC",
//         slug: "jyoti",
//         subcategories: [
//           { title: "Turning Centres", slug: "turning-centres" },
//           { title: "Vertical Turning Lathes (VTL)", slug: "vertical-turning-lathes-vtl" },
//           { title: "Vertical Machining Centres (VMC)", slug: "vertical-machining-centres-vmc" },
//           { title: "Turn-Mill Centres (TMC)", slug: "turn-mill-centres-tmc" },
//           { title: "Horizontal Machining Centres", slug: "horizontal-machining-centres" },
//           { title: "5-Axis Machines", slug: "5-axis-machines" },
//           { title: "Double Column Machines", slug: "double-column-machines" },
//         ],
//       },
//       {
//         title: "EIFCO",
//         slug: "eifco",
//         subcategories: [
//           { title: "Vertical Gear Hobber", slug: "vertical-gear-hobber" },
//           { title: "Horizontal Gear Hobber", slug: "horizontal-gear-hobber" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Metal Forming",
//     slug: "metal-forming",
//     desc: "Energy Mission, Singhal Press & Sukrit sheet metal systems.",
//     brands: [
//       {
//         title: "Energy Mission",
//         slug: "energy-mission",
//         subcategories: [
//           { title: "CNC Press Brakes", slug: "cnc-press-brakes" },
//           { title: "Shearing Machines", slug: "shearing-machines" },
//           { title: "Hydraulic Presses", slug: "hydraulic-presses" },
//           { title: "Iron Worker", slug: "iron-worker" },
//           { title: "BusBar Machine", slug: "busbar-machine" },
//           { title: "V-Grooving Machine", slug: "v-grooving-machine" },
//         ],
//       },
//       {
//         title: "Singhal Press (SEW)",
//         slug: "singhal-press",
//         subcategories: [
//           { title: "Cross Shaft Press", slug: "cross-shaft-press" },
//           { title: "Two Point Press", slug: "two-point-press" },
//           { title: "Eccentric Driven Press", slug: "eccentric-driven-press" },
//           { title: "Link Motion Power Press", slug: "link-motion-power-press" },
//           { title: "Knuckle Joint Press", slug: "knuckle-joint-press" },
//           { title: "2 in 1 and 3 in 1 Automation System", slug: "2-in-1-and-3-in-1-automation-system" },
//         ],
//       },
//       {
//         title: "SUKRIT",
//         slug: "sukrit",
//         subcategories: [
//           { title: "Ball Screw Driven", slug: "ball-screw-driven" },
//           { title: "Belt Driven", slug: "belt-driven" },
//           { title: "Servo Electric Press", slug: "servo-electric-press" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Metrology",
//     slug: "metrology",
//     desc: "Hexagon precision measurement, CMM & optical inspection.",
//     brands: [
//       {
//         title: "Hexagon",
//         slug: "hexagon",
//         subcategories: [
//           { title: "Optical Light Measuring Machines (OLM)", slug: "optical-light-measuring-machines-olm" },
//           { title: "Coordinate Measuring Machine (CMM)", slug: "coordinate-measuring-machine-cmm" },
//           { title: "Romer Arm (Portable Arm)", slug: "romer-arm-portable-arm" },
//           { title: "Tool and Job Probes", slug: "tool-and-job-probes" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Tool Room & Software",
//     slug: "tool-room-software",
//     desc: "Sodick EDM, Pinnacle & Kiya grinders and workshop solutions.",
//     brands: [
//       {
//         title: "Sodick",
//         slug: "sodick",
//         subcategories: [
//           { title: "EDM Machines", slug: "edm-machines" },
//           { title: "Wire EDM Machines", slug: "wire-edm-machines" },
//         ],
//       },
//       {
//         title: "Pinnacle",
//         slug: "pinnacle",
//         subcategories: [
//           { title: "Surface Grinders (Semi Automatic)", slug: "surface-grinders-semi-automatic" },
//           { title: "CNC Surface Grinders", slug: "cnc-surface-grinders" },
//           { title: "Rotary Surface Grinders", slug: "rotary-surface-grinders" },
//         ],
//       },
//       {
//         title: "Kiya",
//         slug: "kiya",
//         subcategories: [
//           { title: "CNC Hybrid Grinder (ID/OD)", slug: "cnc-hybrid-grinder-id-od" },
//           { title: "CNC External Cylindrical Grinder", slug: "cnc-external-cylindrical-grinder" },
//           { title: "CNC Internal Cylindrical Grinder", slug: "cnc-internal-cylindrical-grinder" },
//           { title: "CNC External Bush/Track Grinder", slug: "cnc-external-bush-track-grinder" },
//           { title: "Hydraulic Cylindrical Grinder", slug: "hydraulic-cylindrical-grinder" },
//           { title: "CNC LIP Grinder", slug: "cnc-lip-grinder" },
//         ],
//       },
//     ],
//   },
// ];

// const jyotiTurningSeries = [
//   {
//     title: "DX 60 & DX 100",
//     category: "Compact Turning Centres",
//     desc: "Compact high-performance CNC turning centers engineered for utmost accuracy, small footprint, and high productivity.",
//     features: ["Linear Tooling Options", "High Spindle Rigidity", "Compact Footprint", "Ideal for Small Components"]
//   },
//   {
//     title: "Zebra Series",
//     category: "CNC Chucker & Turning",
//     desc: "Rugged and precise CNC Chucker configuration designed for heavy material removal rates and superior surface finish.",
//     features: ["High Chucker Stability", "Rigid Bed Structure", "Optimized Chip Flow", "User-Friendly Operation"]
//   },
//   {
//     title: "DX Series",
//     category: "CNC Turning / Turn-Mill Centers",
//     desc: "Versatile turning and turn-mill centers built for multi-tasking operations, complex contouring, and rigorous workshop environments.",
//     features: ["Live Tooling Capability", "High Indexing Accuracy", "Rigid Turret Design", "Thermal Stability"]
//   },
//   {
//     title: "AX Series",
//     category: "High Precision Turning / Turn-Mill",
//     desc: "Advanced high-precision turning and turn-mill centers tailored for aerospace, automotive, and general engineering sectors.",
//     features: ["Sub-micron Precision", "Advanced CNC Control Integration", "Superior Dynamic Rigidity", "High-Speed Turret"]
//   },
//   {
//     title: "DXG Series",
//     category: "Turning Centers with Automation",
//     desc: "Turning centers equipped with smart automation solutions for unattended continuous production and reduced cycle times.",
//     features: ["Gantry / Loader Integration", "Automated Workpiece Handling", "Maximized Machine Uptime", "Process Reliability"]
//   },
//   {
//     title: "BTM 100",
//     category: "Blank Turning with Automation",
//     desc: "Specialized automated blank turning station optimized for high-volume component manufacturing.",
//     features: ["Automated Loading/Unloading", "Heavy Duty Cutting", "Optimized Production Flow", "Low Manual Intervention"]
//   },
//   {
//     title: "TS Series",
//     category: "Twin Spindle Twin Turret with Gantry Robot",
//     desc: "Twin spindle, twin turret configuration integrated with gantry robot for complete 'done-in-one' machining solutions.",
//     features: ["Simultaneous Machining", "Integrated Gantry Robot", "Dual Turret Flexibility", "High-Volume Automation"]
//   },
//   {
//     title: "AWT 22",
//     category: "Alloy Wheel Turning",
//     desc: "Dedicated high-performance turning center specifically designed for precision machining of automotive alloy wheels.",
//     features: ["Specialized Workholding", "High Speed Contouring", "Efficient Chip Evacuation", "Automated Cycle Execution"]
//   },
//   {
//     title: "VTL Series",
//     category: "Heavy Duty Vertical Turning Lathes",
//     desc: "Robust vertical turning lathes engineered for heavy, bulky, and large diameter components with exceptional stability.",
//     features: ["High Table Load Capacity", "Rigid Ram Structure", "Heavy-Duty Cutting Performance", "Precision Feedback Systems"]
//   },
//   {
//     title: "VTL Large Series",
//     category: "Ram-Type Heavy-Duty VTL",
//     desc: "Extra-heavy-duty ram-type vertical turning lathes designed for massive industrial applications and energy sectors.",
//     features: ["Ram Tool Interchangeability", "Massive Structural Rigidity", "Deep Bore Machining Support", "High Torque Spindle"]
//   },
//   {
//     title: "VST 160",
//     category: "Vertical Shaft Turning Machines",
//     desc: "Innovative vertical shaft turning machines engineered for high-speed precision machining of shaft-type components.",
//     features: ["Vertical Workpiece Clamping", "Integrated Pick-up Spindle", "High Dynamic Response", "Compact Footprint"]
//   },
//   {
//     title: "AT/ATM Series",
//     category: "Inverted Turning Lathes",
//     desc: "Inverted turning lathes featuring pick-up spindle technology for automated, fast loading and high-efficiency production.",
//     features: ["Pick-up Spindle Automation", "Elimination of Extra Handling", "High Productivity Rate", "Compact Integration"]
//   },
//   {
//     title: "i-Sect",
//     category: "Oval Turning Centers",
//     desc: "Specialized turning centers engineered for complex non-circular and oval turning applications like piston manufacturing.",
//     features: ["High-Speed Axis Synchronization", "Advanced CNC Algorithms", "Specialized Oval Profiling", "Strict Tolerance Control"]
//   }
// ];

// export default function DynamicProductPage() {
//   const params = useParams();
//   const categorySlug = params?.category;
//   const brandSlug = params?.brand;
//   const subcategorySlug = params?.subcategory;

//   const containerRef = useRef(null);

//   const category = productCategories.find((c) => c.slug === categorySlug) || productCategories[0];
//   const brand = category.brands.find((b) => b.slug === brandSlug) || category.brands[0];
//   const subcategory = brand?.subcategories.find((s) => s.slug === subcategorySlug) || brand?.subcategories[0] || { title: "Turning Centres", slug: "turning-centres" };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from("[data-animate]", {
//         opacity: 0,
//         y: 35,
//         duration: 0.9,
//         stagger: 0.15,
//         ease: "power3.out",
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [categorySlug, brandSlug, subcategorySlug]);

//   return (
//     <div ref={containerRef} className="w-full bg-white text-slate-900 overflow-hidden font-sans">
      
//       {/* Dynamic Hero Section */}
//       <section className="relative">
//         <div className="relative flex items-center justify-center overflow-hidden bg-slate-800 sm:min-h-[540px] lg:min-h-[650px]">
//           <img
//             src="/Images/contact.webp"
//             alt="Industrial machinery and manufacturing environment"
//             fetchPriority="high"
//             className="absolute inset-0 h-full w-full object-cover"
//           />

//           <div className="absolute inset-0 bg-slate-950/50" />

//           <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white" data-animate>
//             {/* Breadcrumbs */}
//             <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70 mb-6 flex-wrap">
//               <Link href="/" className="hover:text-white transition-colors">Home</Link>
//               <FaChevronRight className="text-[10px]" />
//               <Link href="/products" className="hover:text-white transition-colors">Products</Link>
//               <FaChevronRight className="text-[10px]" />
//               <span className="text-white/80">{category.title}</span>
//               <FaChevronRight className="text-[10px]" />
//               <span className="text-[#fdeb44] font-medium">{brand.title}</span>
//             </div>

//             <p
//               data-hero-content
//               className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-sm bg-white/10 px-4 py-1.5 rounded-full inline-block mb-3"
//             >
//               MTAT TECHNOLOGIES — {brand.title.toUpperCase()}
//             </p>

//             <h1
//               data-hero-content
//               className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
//             >
//               {subcategory.title}
//             </h1>

//             <p
//               data-hero-content
//               className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
//             >
//               Advanced {subcategory.title} by {brand.title} engineered for high performance, precision machining, and industrial reliability. Distributed and supported across India by MTAT Technologies.
//             </p>

//             <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
//               <Link
//                 data-hero-content
//                 href="/contact"
//                 className="inline-flex items-center gap-3 rounded-full bg-[#467B23] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#39631b]"
//               >
//                 Enquire About This Machine <FaArrowRight className="text-xs" />
//               </Link>
//               <a
//                 data-hero-content
//                 href="/brochure.pdf"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 backdrop-blur-md px-6 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#01193B]"
//               >
//                 <FaFileDownload /> Download Specifications
//               </a>
//             </div>
//           </div>

//           <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:block">
//             Engineering Precision · Powering Progress
//           </div>
//         </div>
//       </section>

//       {/* Series Showcase Grid */}
//       <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 bg-slate-50">
//         <div className="max-w-7xl mx-auto" data-animate>
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#467B23] block mb-2">
//               JYOTI CNC TURNING & TURN-MILL PORTFOLIO
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-bold text-[#01193B]">
//               Advanced Turning Solutions & Series
//             </h2>
//             <p className="mt-3 text-slate-600 text-base">
//               From compact linear tooling lathes to heavy-duty vertical turning and automated twin-spindle systems.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {jyotiTurningSeries.map((item, index) => (
//               <div 
//                 key={index}
//                 className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
//               >
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#467B23]/10 text-[#467B23]">
//                       {item.category}
//                     </span>
//                     <FaCog className="text-slate-300 group-hover:text-[#467B23] transition-colors text-lg" />
//                   </div>
//                   <h3 className="text-xl font-bold text-[#01193B] group-hover:text-[#467B23] transition-colors mb-3">
//                     {item.title}
//                   </h3>
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6">
//                     {item.desc}
//                   </p>
                  
//                   <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
//                     {item.features.map((feat, fIdx) => (
//                       <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
//                         <FaCheckCircle className="text-[#467B23] shrink-0" />
//                         <span>{feat}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-slate-100">
//                   <Link
//                     href="/contact"
//                     className="w-full rounded-xl bg-slate-900 py-3 px-4 text-xs font-semibold text-white transition hover:bg-[#467B23] flex items-center justify-center gap-2 shadow-sm"
//                   >
//                     Request Quote for {item.title} <FaArrowRight className="text-[10px]" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Main Product Showcase & Details */}
//       <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 bg-white">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" data-animate>
          
//           <div className="lg:col-span-6">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
//               <img
//                 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=80"
//                 alt={subcategory.title}
//                 className="w-full h-[400px] sm:h-[480px] object-cover transition duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
//               <div className="absolute bottom-6 left-6 right-6 text-white">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-[#fdeb44]">Precision Engineering</span>
//                 <h3 className="text-xl font-bold mt-1">{brand.title} — {subcategory.title}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-6 space-y-6">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#467B23]">
//               ADVANCED TECHNOLOGY
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-bold text-[#01193B] tracking-tight">
//               Designed for Maximum Productivity & Accuracy
//             </h2>
//             <p className="text-slate-600 text-base leading-relaxed">
//               The <strong className="text-slate-900">{subcategory.title}</strong> by <strong className="text-slate-900">{brand.title}</strong> represents state-of-the-art engineering within our {category.title} portfolio. Built to meet stringent industrial tolerances, it guarantees repeatability, high thermal stability, and robust structural rigidity.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//               {[
//                 "High Rigidity Structure",
//                 "Advanced CNC Control Integration",
//                 "Optimized Chip & Coolant Management",
//                 "Energy Efficient Operation",
//                 "Low Maintenance & High Uptime",
//                 "Comprehensive Spares & Service Support"
//               ].map((feat, idx) => (
//                 <div key={idx} className="flex items-start gap-3">
//                   <FaCheckCircle className="text-[#467B23] mt-1 shrink-0" />
//                   <span className="text-sm font-medium text-slate-800">{feat}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4 flex items-center gap-4">
//               <Link
//                 href="/contact"
//                 className="rounded-xl bg-[#01193B] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#00224d]"
//               >
//                 Request Quote
//               </Link>
//               <Link
//                 href={`/brands/${brand.slug}`}
//                 className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
//               >
//                 Explore Brand ({brand.title})
//               </Link>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* Technical Specifications Table */}
//       <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 bg-slate-50">
//         <div className="max-w-5xl mx-auto" data-animate>
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#467B23] block mb-2">
//               TECHNICAL EXCELLENCE
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-[#01193B]">
//               Specifications & Performance Highlights
//             </h2>
//             <p className="mt-3 text-slate-600 text-sm md:text-base">
//               Detailed technical parameters designed to match your heavy-duty production requirements.
//             </p>
//           </div>

//           <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
//               <div className="p-6 sm:p-8 space-y-4">
//                 <h3 className="text-lg font-bold text-[#01193B] border-b border-slate-200 pb-3 flex items-center gap-2">
//                   <FaTools className="text-[#467B23]" /> Machine Capacity & Build
//                 </h3>
//                 <ul className="space-y-3 text-sm text-slate-700">
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Machine Type:</span> <span className="font-semibold text-slate-900">{subcategory.title}</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Brand Partner:</span> <span className="font-semibold text-slate-900">{brand.title}</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Category:</span> <span className="font-semibold text-slate-900">{category.title}</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Build Quality:</span> <span className="font-semibold text-slate-900">Heavy-duty Meehanite Cast Iron</span></li>
//                 </ul>
//               </div>

//               <div className="p-6 sm:p-8 space-y-4">
//                 <h3 className="text-lg font-bold text-[#01193B] border-b border-slate-200 pb-3 flex items-center gap-2">
//                   <FaTools className="text-[#467B23]" /> Support & Warranty
//                 </h3>
//                 <ul className="space-y-3 text-sm text-slate-700">
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Installation:</span> <span className="font-semibold text-slate-900">Turnkey Setup by MTAT Engineers</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Spare Parts:</span> <span className="font-semibold text-slate-900">Readily Available in India</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Service Support:</span> <span className="font-semibold text-slate-900">24/7 Technical Assistance</span></li>
//                   <li className="flex justify-between"><span className="font-medium text-slate-500">Warranty:</span> <span className="font-semibold text-slate-900">Standard Manufacturer Warranty</span></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Related Subcategories in Same Brand */}
//       <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 bg-white">
//         <div className="max-w-7xl mx-auto" data-animate>
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
//             <div>
//               <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#467B23] block mb-2">
//                 MORE FROM {brand.title.toUpperCase()}
//               </span>
//               <h2 className="text-3xl font-bold text-[#01193B]">Related Machine Solutions</h2>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {brand.subcategories
//               .filter((sub) => sub.slug !== subcategory.slug)
//               .slice(0, 3)
//               .map((sub) => (
//                 <Link
//                   key={sub.slug}
//                   href={`/products/${category.slug}/${brand.slug}/${sub.slug}`}
//                   className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
//                 >
//                   <div>
//                     <span className="text-xs font-bold uppercase tracking-wider text-[#467B23]">{brand.title}</span>
//                     <h3 className="text-lg font-bold text-[#01193B] group-hover:text-[#467B23] transition-colors mt-1 mb-2">
//                       {sub.title}
//                     </h3>
//                     <p className="text-xs text-slate-500 leading-relaxed">
//                       Precision engineered for high throughput and consistent industrial quality.
//                     </p>
//                   </div>
//                   <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#01193B] group-hover:text-[#467B23]">
//                     Explore Model <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
//                   </div>
//                 </Link>
//               ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }