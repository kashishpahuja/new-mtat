"use client";

import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
import gsap from "gsap";
import { FaChevronDown } from "react-icons/fa";
import { getPublicNavigation } from "../src/app/lib/publicApi";


function Navbar() {
const [productCategories, setProductCategories] = useState([]);
const [brands, setBrands] = useState([]);

const [menuOpen, setMenuOpen] = useState(false);
const [productMenuOpen, setProductMenuOpen] = useState(false);
const [brandMenuOpen, setBrandMenuOpen] = useState(false);
const [activeCategory, setActiveCategory] = useState("metal-cutting");
const [mobileCategoryOpen, setMobileCategoryOpen] = useState({});
const dropdownRef = useRef(null);

  // Prevent background scrolling when mobile menu is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Close mobile menu on desktop resize.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
        setProductMenuOpen(false);
        setBrandMenuOpen(false);
        setMobileCategoryOpen({});
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch navigation hierarchy from MongoDB

useEffect(() => {
  let isMounted = true;

  async function loadNavigation() {
    try {
      const result = await getPublicNavigation();

      if (!isMounted) return;

      const categories = Array.isArray(result?.categories)
        ? result.categories
        : [];

      setProductCategories(categories);

      const allBrands = categories.flatMap((category) =>
        (category.brands || []).map((brand) => ({
          ...brand,
          categorySlug: category.slug,
        }))
      );

      setBrands(allBrands);

      if (categories.length > 0) {
        setActiveCategory((current) =>
          categories.some((category) => category.slug === current)
            ? current
            : categories[0].slug
        );
      }
    } catch (error) {
      console.error("Navbar navigation fetch error:", error);
    }
  }

  loadNavigation();

  return () => {
    isMounted = false;
  };
}, []);

  // useEffect(() => {
//   let isMounted = true;

//   async function loadNavigation() {
//     try {
//       const result = await getPublicNavigation();

//       if (!isMounted) return;

//       const categories = result?.categories || [];

//       setProductCategories(categories);

//       // Flatten brands for the separate Brands dropdown
//       const allBrands = categories.flatMap((category) =>
//         (category.brands || []).map((brand) => ({
//           ...brand,
//           categorySlug: category.slug,
//         }))
//       );

//       setBrands(allBrands);

//       // Set first available category as active
//       if (categories.length > 0) {
//         setActiveCategory((current) =>
//           categories.some((category) => category.slug === current)
//             ? current
//             : categories[0].slug
//         );
//       }
//     } catch (error) {
//       console.error("Navbar navigation fetch error:", error);
//     }
//   }

//   loadNavigation();

//   return () => {
//     isMounted = false;
//   };
// }, []);


  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const toggleMobileCategory = (slug) => {
    setMobileCategoryOpen((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Animate mobile menu.
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (menuOpen) {
      gsap.killTweensOf(dropdown);
      dropdown.style.display = "flex";

      gsap.fromTo(
        dropdown,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    } else {
      gsap.killTweensOf(dropdown);

      gsap.to(dropdown, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (dropdownRef.current && !menuOpen) {
            dropdownRef.current.style.display = "none";
            setMobileCategoryOpen({});
          }
        },
      });
    }

    return () => {
      gsap.killTweensOf(dropdown);
    };
  }, [menuOpen]);


  const closeMobileMenu = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
    setBrandMenuOpen(false);
    setMobileCategoryOpen({});
  };

  return (
    <>
      <div className="relative z-50 w-full bg-white shadow-sm backdrop-blur-md px-4 sm:px-6 md:px-12 lg:px-24 xl:pl-40">
        <div className="flex h-17.5 items-center justify-between text-black lg:h-[80px]">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex w-fit items-center justify-start gap-2 xl:w-[220px]"
          >
            <img
              src="/Images/logo.webp"
              alt="MTAT India Logo"
              className="h-[60px] w-full object-contain p-2"
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="poppins hidden items-center space-x-7 text-base font-medium text-[#01193B] xl:flex">
            {/* Products dropdown */}
           
{/* Products dropdown */}
<li className="group relative py-6">
  <div className="group relative inline-flex items-center gap-1.5 cursor-pointer">
    <span>Products</span>
    <FaChevronDown className="text-xs text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
  </div>

  {/* Mega Menu */}
  <div className="invisible absolute left-[-150px] top-full z-50 w-[850px] rounded-xl border border-[#467B23]/20 bg-white/95 p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

    <div className="grid grid-cols-12 gap-6">

      {/* LEFT: MAIN CATEGORIES */}
      <div className="col-span-4 border-r border-gray-100 pr-4">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
          Product Categories
        </h3>

        <div className="flex flex-col gap-1">
          {productCategories.map((category) => (
            <button
              key={category._id || category.slug}
              type="button"
              onMouseEnter={() => setActiveCategory(category.slug)}
              onClick={() => setActiveCategory(category.slug)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-all duration-200 ${
                activeCategory === category.slug
                  ? "bg-[#467B23]/10 font-semibold text-[#467B23]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#467B23]"
              }`}
            >
              <span>{category.title}</span>

              <FaChevronDown
                className={`-rotate-90 text-[10px] transition-transform ${
                  activeCategory === category.slug
                    ? "text-[#467B23]"
                    : "text-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: BRANDS AND THEIR CATEGORIES */}
      <div className="col-span-8 max-h-[420px] overflow-y-auto pr-2">

        {productCategories
          .filter((category) => category.slug === activeCategory)
          .map((category) => (
            <div key={category._id || category.slug}>

              {/* <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#01193B]">
                  {category.title}
                </h3>

                {category.desc && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {category.desc}
                  </p>
                )}
              </div> */}

              <div className="flex flex-col gap-5">

                {(category.brands || []).map((brand) => (
                  <div
                    key={brand._id || brand.slug}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >

                    {/* BRAND NAME */}
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#467B23] transition-colors hover:text-[#01193B]"
                    >
                      {brand.name}
                      <span>→</span>
                    </Link>

                    {/* BRAND DESCRIPTION */}
                    {/* {(brand.shortDescription || brand.tagline) && (
                      <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                        {brand.shortDescription || brand.tagline}
                      </p>
                    )} */}

                    {/* BRAND CATEGORIES */}
                    {brand.categories?.length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">

                        {brand.categories.map((sub) => (
                          <Link
                            key={sub._id || sub.slug}
                            href={`/products/${category.slug}/${brand.slug}/${sub.slug}`}
                            className="group/sub rounded-md p-2 transition-colors hover:bg-[#467B23]/10"
                          >
                            <span className="block text-xs font-semibold text-gray-700 transition-colors group-hover/sub:text-[#467B23]">
                              {sub.title}
                            </span>

                            {/* {sub.description && (
                              <span className="mt-1 block line-clamp-2 text-[11px] leading-4 text-gray-400">
                                {sub.description}
                              </span>
                            )} */}
                          </Link>
                        ))}

                      </div>
                    ) : (
                      <p className="mt-2 pl-1 text-xs text-gray-400">
                        Explore specialized systems
                      </p>
                    )}

                  </div>
                ))}

                {(!category.brands || category.brands.length === 0) && (
                  <p className="text-sm text-gray-400">
                    No brands available in this category.
                  </p>
                )}

              </div>
            </div>
          ))}

      </div>
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
      <span className="text-xs font-medium text-gray-400">
        Explore complete catalogue & specifications
      </span>
    </div>

  </div>
</li>




 {/* <li className="group relative py-6">
              <div
                
                className="group relative inline-flex items-center gap-1.5"
              >
                <span>Products</span>
                <FaChevronDown className="text-xs text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
              </div>

              <div className="invisible absolute left-[-150px] top-full z-50 w-[850px] rounded-xl border border-[#467B23]/20 bg-white/95 p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-12 gap-6 text-start">
                 
<div className="col-span-7 pl-2 max-h-95 overflow-y-auto">
  {productCategories
    .filter((cat) => cat.slug === activeCategory)
    .map((cat) => (
      <div key={cat._id || cat.slug} className="flex flex-col gap-4">
        {(cat.brands || []).map((brand) => (
          <div
            key={brand._id || brand.slug}
            className="flex flex-col gap-1.5"
          >
            <Link
              href={`/brands/${brand.slug}`}
              className="text-sm font-bold text-[#467B23] hover:underline"
            >
              {brand.name} →
            </Link>

            {brand.categories?.length > 0 ? (
              <div className="grid grid-cols-2 gap-1.5 pl-2">
                {brand.categories.map((sub) => (
                  <Link
                    key={sub._id || sub.slug}
                    href={`/products/${cat.slug}/${brand.slug}/${sub.slug}`}
                    className="rounded-md p-1.5 text-xs text-gray-600 transition-colors hover:bg-[#467B23]/10 hover:text-[#0b2345]"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 pl-2">
                Explore specialized systems
              </p>
            )}
          </div>
        ))}
      </div>
    ))}
</div>

                  <div className="col-span-7 pl-2 max-h-95 overflow-y-auto">
                    {productCategories
                      .filter((cat) => cat.slug === activeCategory)
                      .map((cat) => (
                        <div key={cat.slug} className="flex flex-col gap-4">
                          {cat.brands.map((brand) => (
                            <div key={brand.slug} className="flex flex-col gap-1.5">
                              <Link
                                href={`/brands/${brand.slug}`}
                                className="text-sm font-bold text-[#467B23] hover:underline"
                              >
                                {brand.title} →
                              </Link>
                              {brand.categories.length > 0 ? (
                                <div className="grid grid-cols-2 gap-1.5 pl-2">
                              {brand.categories?.map((sub) => (
  <Link
    key={sub._id || sub.slug}
    href={`/products/${cat.slug}/${brand.slug}/${sub.slug}`}
    className="rounded-md p-1.5 text-xs text-gray-600 transition-colors hover:bg-[#467B23]/10 hover:text-[#0b2345]"
  >
    {sub.title}
  </Link>
))}
                                </div>
                              ) : (
                                <p className="text-xs text-gray-400 pl-2">
                                  Explore specialized systems
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-medium text-gray-400">
                    Explore complete catalogue & specifications
                  </span>
                 
                </div>
              </div>
            </li> */}

            {/* About */}
            <li className="py-6">
              <Link
                href="/about"
                className="group relative inline-block"
              >
                About Us
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
              </Link>
            </li>

            {/* Brands dropdown */}
            <li className="group relative py-6">
              <button
                type="button"
                className="group relative inline-flex cursor-pointer items-center gap-1.5"
              >
                <span>Brands</span>
                <FaChevronDown className="text-xs text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-[300px] max-h-[400px] overflow-y-auto rounded-xl border border-[#467B23]/20 bg-white/95 p-3 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="flex flex-col gap-1">
{brands.map((brand) => (
  <Link
    key={brand._id || brand.slug}
    href={`/brands/${brand.slug}`}
    className="group/brand rounded-lg p-3 transition-all duration-300 hover:bg-[#467B23]/10"
  >
    <span className="block font-semibold text-[#0b2345] group-hover/brand:text-[#467B23]">
      {brand.name}
    </span>

    <p className="mt-0.5 text-xs text-gray-500">
      {brand.tagline || brand.shortDescription || ""}
    </p>
  </Link>
))}
                </div>
              </div>
            </li>

            {/* Our Presence */}
            <li className="py-6">
              <Link
                href="/our-presence"
                className="group relative inline-block"
              >
                Our Presence
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
              </Link>
            </li>

           

            {/* Contact */}
            <li className="py-6">
              <Link
                href="/contact"
                className="group relative inline-block"
              >
                Contact
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#467B23] transition-[width] duration-300 group-hover:w-full" />
              </Link>
            </li>
          </ul>

          {/* Desktop brochure button */}
          <div className="relative z-20 hidden items-center xl:flex">
            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta inline-flex items-center"
              aria-label="Download Brochure"
            >
              <span>Download Brochure</span>

              <svg
                width="15px"
                height="10px"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M1,5 L11,5" />
                <polyline points="8 1 12 5 8 9" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="cursor-pointer p-2 text-2xl text-[#01193B] xl:hidden"
          >
            {menuOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}
          </button>
        </div>

        {/* Mobile navigation drawer */}
        <ul
          ref={dropdownRef}
          style={{ display: menuOpen ? "flex" : "none" }}
          className="poppins absolute left-0 right-0 top-full z-50 mx-4 max-h-[calc(100vh-100px)] flex-col overflow-y-auto rounded-2xl border border-gray-100 bg-white px-4 py-6 text-start text-base font-medium text-[#01193B] shadow-xl md:mx-8 xl:hidden"
        >
          {/* Mobile products */}
          <li className="mb-2 w-full border-b border-gray-100 pb-2">
            <button
              type="button"
              onClick={() => setProductMenuOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-gray-50"
            >
              <span className="font-semibold text-[#0b2345]">Products</span>
              <FaChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                  productMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                productMenuOpen
                  ? "max-h-[1500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-1 flex flex-col gap-2 rounded-lg bg-gray-50/50 p-2 pl-3">
           {productCategories.map((item) => (
  <div key={item._id || item.slug} className="flex flex-col gap-1">
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-[#467B23]/10">
      <div
        className="text-sm font-semibold text-[#0b2345]"
      >
        {item.title}
      </div>

      <button
        type="button"
        onClick={() => toggleMobileCategory(item.slug)}
        aria-label={`Toggle ${item.title} categories`}
        className="p-1 cursor-pointer"
      >
        <FaChevronDown
          className={`h-3 w-3 text-gray-500 transition-transform duration-300 ${
            mobileCategoryOpen[item.slug] ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>

    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        mobileCategoryOpen[item.slug]
          ? "max-h-[1000px] opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-1 pl-3 border-l border-gray-200 mt-1">
        {(item.brands || []).map((brand) => (
          <div
            key={brand._id || brand.slug}
            className="flex flex-col gap-1 py-1"
          >
            <Link
              href={`/brands/${brand.slug}`}
              onClick={closeMobileMenu}
              className="text-xs font-bold text-[#467B23]"
            >
              {brand.name}
            </Link>

            {brand.categories?.map((sub) => (
              <Link
                key={sub._id || sub.slug}
                href={`/products/${item.slug}/${brand.slug}/${sub.slug}`}
                onClick={closeMobileMenu}
                className="text-xs text-gray-600 hover:text-[#0b2345] py-0.5"
              >
                {sub.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
))}
              </div>
            </div>
          </li>

          {/* Mobile about */}
          <li className="w-full border-b border-gray-100">
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="flex items-center rounded-lg p-3 font-semibold text-[#0b2345] hover:bg-gray-50"
            >
              About Us
            </Link>
          </li>

          {/* Mobile brands */}
          <li className="mb-2 w-full border-b border-gray-100 pb-2">
            <button
              type="button"
              onClick={() => setBrandMenuOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-gray-50"
            >
              <span className="font-semibold text-[#0b2345]">Brands</span>
              <FaChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                  brandMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                brandMenuOpen
                  ? "h-auto opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-1 flex flex-col gap-1 rounded-lg bg-gray-50/50 p-2 pl-3">
{brands.map((brand) => (
  <Link
    key={brand._id || brand.slug}
    href={`/brands/${brand.slug}`}
    onClick={closeMobileMenu}
    className="rounded-md p-2.5 text-sm hover:bg-[#467B23]/10"
  >
    <span className="block font-medium text-[#0b2345]">
      {brand.name}
    </span>

    <span className="text-xs text-gray-500">
      {brand.tagline || brand.shortDescription || ""}
    </span>
  </Link>
))}
              </div>
            </div>
          </li>

          {/* Remaining mobile links */}
          {[
            { title: "Our Presence", href: "/our-presence" },
            { title: "Contact", href: "/contact" },
          ].map((item) => (
            <li key={item.href} className="w-full border-b border-gray-100">
              <Link
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center rounded-lg p-3 font-semibold text-[#0b2345] hover:bg-gray-50"
              >
                {item.title}
              </Link>
            </li>
          ))}

          {/* Mobile brochure CTA */}
          <li className="pt-4">
            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="block w-full rounded-lg bg-[#007747] py-3 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-md"
            >
              Download Brochure
            </a>
          </li>
        </ul>
      </div>

      {/* Ripple animation */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            box-shadow:
              0 0 0 0 rgba(255, 255, 255, 0.1),
              0 0 0 20px rgba(255, 255, 255, 0.1),
              0 0 0 40px rgba(255, 255, 255, 0.1),
              0 0 0 60px rgba(255, 255, 255, 0.1);
          }

          100% {
            box-shadow:
              0 0 0 20px rgba(255, 255, 255, 0.1),
              0 0 0 40px rgba(255, 255, 255, 0.1),
              0 0 0 60px rgba(255, 255, 255, 0.1),
              0 0 0 80px rgba(255, 255, 255, 0);
          }
        }

        .animate-ripple {
          animation: ripple 1.5s infinite;
        }
      `}</style>
    </>
  );
}

export default Navbar;