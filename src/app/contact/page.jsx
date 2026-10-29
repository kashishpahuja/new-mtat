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
  FaArrowRight 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
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
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="w-full bg-white text-slate-700 overflow-hidden">
      {/* 1. Hero Banner Component matching requested theme */}
      <section className="relative">
        <div className="relative flex items-center justify-center overflow-hidden bg-slate-800 sm:min-h-[540px] lg:min-h-[650px]">
          <img
            src="/Images/contact.webp"
            alt="Industrial machinery and manufacturing environment"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white">
            <h1
              data-hero-content
              className="text-5xl font-medium tracking-tight sm:text-5xl lg:text-6xl text-white"
            >
              One Stop Solution
              <br />
              Providers.
            </h1>

            <p
              data-hero-content
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
            >
              Connect with our team for precision machinery, sales, service, and spare parts assistance.
            </p>

            <a
              data-hero-content
              href="#contact-section"
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#01193B]"
            >
              Get In Touch
              <FaArrowRight className="text-xs" />
            </a>
          </div>

          <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
            Engineering Precision · Powering Progress
          </div>
        </div>
      </section>

      {/* 2. Main Contact Section */}
      <section id="contact-section" className="gsap-fade-up py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 bg-slate-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Info & Quick Links */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3] mb-2">
                CONTACT US
              </p>
              <h2 className="text-3xl text-slate-700 tracking-tight">
                Get In Touch
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Reach out directly via phone or email, or drop by our facility in Patiala.
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#004DA3]/10 text-[#004DA3] flex items-center justify-center shrink-0">
                <FaPhoneAlt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Numbers</h3>
                <p className="text-base font-medium text-slate-700 hover:text-[#004DA3] transition-colors">
                  <a href="tel:01604624748">0160-4624748</a>, <a href="tel:01604635748">4635748</a>
                </p>
                <p className="text-base font-medium text-slate-700 hover:text-[#004DA3] transition-colors mt-0.5">
                  <a href="tel:01604634748">0160-4634748</a>
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#004DA3]/10 text-[#004DA3] flex items-center justify-center shrink-0">
                <FaEnvelope className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</h3>
                <a href="mailto:info@mtaindia.in" className="text-base font-medium text-slate-700 hover:text-[#004DA3] transition-colors">
                  info@mtaindia.in
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#004DA3]/10 text-[#004DA3] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</h3>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  Patiala, Punjab, India
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Links</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                <li>
                  <Link href="/about" className="hover:text-[#004DA3] transition-colors flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" /> About
                  </Link>
                </li>
                <li>
                  <Link href="/about#our-journey" className="hover:text-[#004DA3] transition-colors flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" /> Strength
                  </Link>
                </li>
                <li>
                  <Link href="/our-presence" className="hover:text-[#004DA3] transition-colors flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" /> Our Presence
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#004DA3] transition-colors flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" /> Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Connect With Us</h3>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/people/MTAT-Technologies-Private-Limited/61562506565764/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-[#004DA3] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/accounts/suspended/?next=https%3A%2F%2Fwww.instagram.com%2Fmtattpl%2F%3F__coig_ufac%3D1#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-[#004DA3] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/checkpoint/challenge/AgHSEnKSXj0fBgAAAaGGV9krFCLNabC5ii0CMDbTRSJkypcoJyyUP_bO7_EJjlvqTqVPITeesluvzPQwsPVeit8t9YOCVQ?ut=2DDum3J2hz3cw1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-[#004DA3] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@mtatpl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-[#004DA3] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3] mb-2">
                SEND AN ENQUIRY
              </p>
              <h2 className="text-3xl  text-slate-700 tracking-tight mb-6">
                Let&apos;s Discuss Your Requirements
              </h2>

              {submitted ? (
                <div className="bg-[#004DA3]/10 border border-[#004DA3]/30 p-6 rounded-2xl text-center">
                  <h3 className="text-lg  text-[#004DA3] mb-2">Thank You!</h3>
                  <p className="text-sm text-slate-700">
                    Your message has been successfully sent. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs  text-slate-700 uppercase tracking-wider mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#004DA3] focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs  text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#004DA3] focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs  text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#004DA3] focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs  text-slate-700 uppercase tracking-wider mb-2">Message / Requirements</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the machinery or services you need..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#004DA3] focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#004DA3] text-white font-semibold text-sm shadow-lg hover:bg-[#003b82] transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl h-[350px] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4272.028289594136!2d76.40016067620991!3d30.358740603609967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910291ec53226d3%3A0xd81cade77ecfa8d3!2sDigital%20Paaji!5e1!3m2!1sen!2sin!4v1793259847913!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
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