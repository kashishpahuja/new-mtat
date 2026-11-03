"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.from("[data-hero-content]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Section animations
      gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your enquiry API here to actually send the form data.
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#f7f9fc] text-slate-700"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 15%, rgba(0, 77, 163, 0.35) 0%, transparent 28%),
          radial-gradient(circle at 90% 75%, rgba(70, 123, 35, 0.05) 0%, transparent 30%),
          repeating-linear-gradient(
            0deg,
            rgba(1, 25, 59, 0.018) 0px,
            rgba(1, 25, 59, 0.018) 1px,
            transparent 1px,
            transparent 32px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(1, 25, 59, 0.018) 0px,
            rgba(1, 25, 59, 0.018) 1px,
            transparent 1px,
            transparent 32px
          )
        `,
      }}
    >
      {/* Hero Banner */}
      <section className="relative">
        <div className="relative flex min-h-125 items-center justify-center overflow-hidden bg-[#01193B] sm:min-h-[540px] lg:min-h-[650px]">
          <img
            src="/Images/contact.webp"
            alt="Industrial machinery and manufacturing environment"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#01193B]/65" />

          {/* Subtle industrial grid texture */}
          <div
            className="absolute inset-0 opacity-[0.13]"
            // style={{
            //   backgroundImage: `
            //     linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            //     linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
            //   `,
            //   backgroundSize: "55px 55px",
            // }}
          />

          {/* Soft radial lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,77,163,0.22),transparent_55%)]" />

          <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white">
            <h1
              data-hero-content
              className="text-5xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              One Stop Solution
              <br />
              Providers.
            </h1>

            <p
              data-hero-content
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
            >
              Connect with our team for precision machinery, sales, service,
              and spare parts assistance.
            </p>

            <a
              data-hero-content
              href="#contact-section"
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-white hover:bg-white hover:text-[#01193B]"
            >
              Get In Touch
              <FaArrowRight className="text-xs" />
            </a>
          </div>

          <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
            Engineering Precision · Powering Progress
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#01193B]/40 to-transparent" />
        </div>
      </section>

      {/* Main Contact Section */}
      <section
        id="contact-section"
        className="gsap-fade-up relative px-4 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-24 xl:px-40"
      >
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#004DA3]/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#467B23]/[0.05] blur-3xl" />

        <div className="relative mx-auto grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Information */}
          <div className="space-y-8 rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-900/[0.04] backdrop-blur-sm sm:p-10 lg:col-span-5">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                CONTACT US
              </p>

              <h2 className="text-3xl tracking-tight text-[#01193B]">
                Get In Touch
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Reach out directly via phone or email, or connect with our team
                to discuss your machinery and technical requirements.
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                <FaPhoneAlt className="h-5 w-5" />
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Phone Numbers
                </h3>

                <p className="text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]">
                  <a href="tel:01604624748">0160-4624748</a>
                </p>

                <p className="mt-0.5 text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]">
                  <a href="tel:01604635748">0160-4635748</a>
                </p>

                <p className="mt-0.5 text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]">
                  <a href="tel:01604634748">0160-4634748</a>
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                <FaEnvelope className="h-5 w-5" />
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </h3>

                <a
                  href="mailto:info@mtaindia.in"
                  className="text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]"
                >
                  info@mtaindia.in
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </h3>

                <p className="text-sm font-medium leading-relaxed text-slate-700">
                  Ludhiana, Punjab, India
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Quick Links
              </h3>

              <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                <li>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about#our-journey"
                    className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                    Strength
                  </Link>
                </li>

                <li>
                  <Link
                    href="/our-presence"
                    className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                    Our Presence
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Connect With Us
              </h3>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/people/MTAT-Technologies-Private-Limited/61562506565764/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-[#004DA3] hover:text-white"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>

                <a
                  href="https://www.instagram.com/mtattpl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-[#004DA3] hover:text-white"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-[#004DA3] hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>

                <a
                  href="https://www.youtube.com/@mtatpl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-[#004DA3] hover:text-white"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Map */}
          <div className="space-y-8 lg:col-span-7">
            {/* Contact Form */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-900/[0.04] backdrop-blur-sm sm:p-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                SEND AN ENQUIRY
              </p>

              <h2 className="mb-6 text-3xl tracking-tight text-[#01193B]">
                Let&apos;s Discuss Your Requirements
              </h2>

              {submitted ? (
                <div className="rounded-2xl border border-[#004DA3]/30 bg-[#004DA3]/10 p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-[#004DA3]">
                    Thank You!
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-700">
                    Your message has been received. Our team will get back to
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Your Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      Message / Requirements
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the machinery or services you need..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#004DA3] py-4 text-sm font-semibold text-white shadow-lg shadow-[#004DA3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003b82]"
                  >
                    Submit Enquiry
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

            {/* Google Map */}
            <div className="h-[350px] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.04]">
              <iframe
                src="https://www.google.com/maps?q=MTAT+Technologies+Ludhiana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="MTAT Technologies Location Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}