import { notFound } from "next/navigation";
import SubcategoryPageClient from "../../../../../../components/SubcategoryPageClient";
import { getPublicBrand, getPublicItems } from "../../../../lib/publicApi";

export default async function Page({ params }) {
  const { category, brand, subcategory } = await params;

  try {
    // 1. Fetch brand using its database slug
    const brandData = await getPublicBrand(brand);

    if (!brandData || !brandData.isActive) {
      notFound();
    }

    // 2. Find requested subcategory inside the brand
    const currentCategory = (brandData.categories || []).find(
      (item) => item.slug === subcategory && item.isActive,
    );

    if (!currentCategory) {
      notFound();
    }

    // 3. Fetch products using MongoDB relationship IDs
    const products = await getPublicItems({
      brand: brandData._id,
      brandCategory: currentCategory._id,
    });

    // 4. Adapt database fields to the existing frontend layout
    const currentData = {
      hero: {
        bgImage: currentCategory.bannerImage || brandData.heroImage || "",
        title: currentCategory.pageTitle || currentCategory.title,
        description:
          currentCategory.pageDescription || currentCategory.description,
        primaryBtn: "Explore Product Range",
        secondaryBtn: "Enquire Now",
      },

      intro: {
        subtitle: brandData.name,
        heading: currentCategory.title,
        description: currentCategory.description,
      },

      categories: ["All"],
    };

    return (
      // eslint-disable-next-line react-hooks/error-boundaries
      <SubcategoryPageClient
        categorySlug={category}
        brand={brandData}
        currentData={currentData}
        products={products || []}
      />
    );
  } catch (error) {
    if (
      error.message === "Brand not found" ||
      error.message === "Brand is inactive" ||
      error.message === "Brand category not found"
    ) {
      notFound();
    }

    console.error("Subcategory page fetch error:", error);
    throw error;
  }
}

// "use client";

// import { useEffect, useRef, useState, use } from "react";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import catalogData from "../../../../../data/jyotiProducts.json";

// gsap.registerPlugin(ScrollTrigger);

// const ArrowUpRight = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     aria-hidden="true"
//   >
//     <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// export default function SubcategoryPage({ params }) {
//   // Unwrap parameters for [category], [brand], and [subcategory]
//   const resolvedParams = use(params);
//   const brandSlug = resolvedParams?.brand || "jyoti";
//   const subcategorySlug = resolvedParams?.subcategory || "turning-centres";

//   // Access data safely based on brand and subcategory nested structure
//   const brandData = catalogData?.brands?.[brandSlug] || catalogData?.brands?.["jyoti"];
//   const currentData = brandData?.categories?.[subcategorySlug] || brandData?.categories?.["turning-centres"];

//   const [activeCategory, setActiveCategory] = useState("All");
//   const heroRef = useRef(null);
//   const gridRef = useRef(null);
//   const ctaRef = useRef(null);

//   // Reset category filter when subcategory changes via URL
//   useEffect(() => {
//     setActiveCategory("All");
//   }, [subcategorySlug]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".hero-content > *", {
//         y: 30,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: "power3.out",
//       });

//       gsap.from(ctaRef.current, {
//         scrollTrigger: {
//           trigger: ctaRef.current,
//           start: "top 85%",
//         },
//         y: 40,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     });

//     return () => ctx.revert();
//   }, [subcategorySlug]);

//   const productsList = currentData?.products || [];
//   const filteredProducts = activeCategory === "All"
//     ? productsList
//     : productsList.filter(p => p.category === activeCategory);

//   return (
//     <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-[#004DA3] selection:text-white">

//       {/* SECTION 1 — Hero Banner */}
//       <section ref={heroRef} className="relative flex h-[75vh] min-h-[550px] w-full flex-col justify-end overflow-hidden bg-slate-950 pb-16 pt-28">
//         <img
//           src={currentData?.hero?.bgImage || "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1920&q=85"}
//           alt={currentData?.hero?.title || "Machining Solutions"}
//           className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
//         />
//         <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

//         <div className="hero-content relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
//           <h1 className="mt-3 max-w-4xl text-4xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
//             {currentData?.hero?.title}
//           </h1>
//           <p className="mt-4 max-w-xl text-base text-slate-300 md:text-lg">
//             {currentData?.hero?.description}
//           </p>
//           <div className="mt-8 flex flex-wrap items-center gap-4">
//             <a
//               href="#product-grid"
//               className="inline-flex items-center gap-2 rounded-none bg-[#004DA3] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#003b82]"
//             >
//               {currentData?.hero?.primaryBtn || "Explore Product Range"}
//               <ArrowUpRight />
//             </a>
//             <a
//               href="/contact"
//               className="inline-flex items-center gap-2 rounded-none border border-slate-600 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
//             >
//               {currentData?.hero?.secondaryBtn || "Enquire Now"}
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 2 — Introduction */}
//       <section className="border-b border-slate-300 bg-white py-16 md:py-24">
//         <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
//           <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
//             <div>
//               <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#004DA3]">
//                 {currentData?.intro?.subtitle || "Precision Engineering"}
//               </span>
//               <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-slate-900 md:text-4xl">
//                 {currentData?.intro?.heading}
//               </h2>
//             </div>
//             <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-base">
//               <p>
//                 {currentData?.intro?.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 3 — Product Range & Category Filtering */}
//       <section id="product-grid" className="py-20 md:py-28">
//         <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">

//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#004DA3]">
//                 Complete Portfolio
//               </p>
//               <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
//                 Explore Our Product Range
//               </h2>
//             </div>

//             {/* Category Filter Pills */}
//             <div className="flex flex-wrap gap-2">
//               {(currentData?.categories || ["All"]).map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`rounded-full px-4 py-2 text-xs font-medium transition ${
//                     activeCategory === cat
//                       ? "bg-[#004DA3] text-white"
//                       : "bg-slate-200 text-slate-700 hover:bg-slate-300"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Grid */}
//           <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="group relative flex flex-col justify-between overflow-hidden bg-slate-900 h-[380px] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//               >
//                 <Link href={product.href} className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     loading="lazy"
//                     className="absolute inset-0 h-full w-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20" />

//                   <div className="relative z-10 flex justify-between items-start">
//                     <span className="rounded bg-black/60 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-md">
//                       {product.category}
//                     </span>
//                     <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition group-hover:bg-[#004DA3]">
//                       <ArrowUpRight />
//                     </span>
//                   </div>

//                   <div className="relative z-10 pt-10">
//                     <h3 className="text-xl font-medium text-white">
//                       {product.title}
//                     </h3>
//                     <p className="mt-1 text-xs text-slate-300 line-clamp-2">
//                       {product.desc}
//                     </p>
//                     <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white underline underline-offset-4">
//                       View Details
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* SECTION 4 — Enquiry CTA Banner */}
//       <section ref={ctaRef} className="relative w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-60 py-24 bg-slate-950">
//         <div
//           className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
//           style={{ backgroundImage: "url('/Images/banner.webp')" }}
//         />
//         <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/20 via-black/30 to-[#01193B]/60" />

//         <div className="relative z-10 flex flex-col items-center justify-between gap-8 rounded-lg border border-white/15 p-8 shadow-2xl backdrop-blur-md sm:p-12 md:flex-row">
//           <div className="space-y-3">
//             <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
//                Get In Touch
//             </p>
//             <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
//               Looking for the Right Machining Solution?
//             </h2>
//             <p className="max-w-xl text-sm leading-relaxed text-gray-300">
//               Share your machining requirements with our team to discuss suitable machine options, specifications, and applications.
//             </p>
//           </div>

//           <Link
//             href="/contact"
//             className="group inline-flex shrink-0 items-center justify-between rounded-sm border border-white/20 bg-[#004DA3] px-8 py-4 text-xs font-semibold uppercase tracking-[1.2px] text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
//           >
//             <span className="flex items-center gap-3">
//               Enquire Now
//               <span className="flex h-7 w-7 items-center justify-center rounded bg-black/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                 <ArrowUpRight className="h-4 w-4 text-white" />
//               </span>
//             </span>
//           </Link>
//         </div>
//       </section>

//     </div>
//   );
// }
