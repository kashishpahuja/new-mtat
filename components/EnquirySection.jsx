import React from "react";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

export default function EnquirySection() {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-60 py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('/Images/banner.webp')" }}
      />

      {/* Industrial Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black/80 via-black/60 to-[#01193B]/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-8 rounded-lg border border-white/15 p-8 shadow-2xl backdrop-blur-md sm:p-12 md:flex-row">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#98b2cf]">
            Let&apos;s Talk Manufacturing
          </p>

          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
            Looking for the Right Machine?
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-gray-300">
            Explore precision machine tools and manufacturing technologies
            suited to your production needs. Connect with our team to discuss
            your requirements and find the right solution for your business.
          </p>
        </div>

        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center justify-between rounded-sm border border-white/20 bg-[#004DA3] px-8 py-4 text-xs font-semibold uppercase tracking-[1.2px] text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
        >
          <span className="flex items-center gap-3">
            Enquire Now
            <span className="flex h-7 w-7 items-center justify-center rounded bg-black/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <BsArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
