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
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const DEFAULT_PAGE = {
  hero: {
    eyebrow: "ENGINEERING PRECISION · POWERING PROGRESS",
    title: "One Stop Solution Providers.",
    description:
      "Connect with our team for precision machinery, sales, service, and spare parts assistance.",
    buttonText: "Get In Touch",
    buttonLink: "#contact-section",
    image: "/Images/contact.webp",
    imageAlt: "Industrial machinery and manufacturing environment",
    overlayOpacity: 65,
  },
  contactInfo: {
    label: "CONTACT US",
    heading: "Get In Touch",
    description:
      "Reach out directly via phone or email, or connect with our team to discuss your machinery and technical requirements.",
    phones: [
      { label: "Phone 1", number: "0160-4624748", href: "tel:01604624748", isActive: true },
      { label: "Phone 2", number: "0160-4635748", href: "tel:01604635748", isActive: true },
      { label: "Phone 3", number: "0160-4634748", href: "tel:01604634748", isActive: true },
    ],
    email: "info@mtaindia.in",
    address: "Ludhiana, Punjab, India",
  },
  quickLinks: [
    { label: "About", url: "/about", isActive: true },
    { label: "Strength", url: "/about#our-journey", isActive: true },
    { label: "Our Presence", url: "/our-presence", isActive: true },
    { label: "Contact", url: "/contact", isActive: true },
  ],
  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/people/MTAT-Technologies-Private-Limited/61562506565764/",
      isActive: true,
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/mtattpl/",
      isActive: true,
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/",
      isActive: true,
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@mtatpl",
      isActive: true,
    },
  ],
  enquiry: {
    eyebrow: "SEND AN ENQUIRY",
    heading: "Let's Discuss Your Requirements",
    buttonText: "Submit Enquiry",
    successTitle: "Thank You!",
    successMessage:
      "Your message has been received. Our team will get back to you shortly.",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    messageLabel: "Message / Requirements",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    messagePlaceholder:
      "Tell us about the machinery or services you need...",
  },
  map: {
    title: "MTAT Technologies Location Map",
    embedUrl:
      "https://www.google.com/maps?q=MTAT+Technologies+Ludhiana&output=embed",
    isVisible: true,
  },
  isPublished: true,
};

function normalizeContactPage(raw) {
  const payload =
    raw?.data?.contactPage ||
    raw?.data ||
    raw?.contactPage ||
    raw?.page ||
    raw ||
    {};

  const rawHero = payload.hero || {};
  const rawContact = payload.contactInfo || {};
  const rawQuickLinks = Array.isArray(payload.quickLinks)
    ? payload.quickLinks
    : Array.isArray(payload.quickLinks?.items)
    ? payload.quickLinks.items
    : DEFAULT_PAGE.quickLinks;

  const rawSocials = Array.isArray(payload.socials)
    ? payload.socials
    : Array.isArray(payload.socials?.items)
    ? payload.socials.items
    : DEFAULT_PAGE.socials;

  const emailsFromArray = Array.isArray(rawContact.emails)
    ? rawContact.emails.filter((e) => e?.isActive !== false && e?.email)
    : [];

  const resolvedEmail =
    rawContact.email ||
    emailsFromArray[0]?.email ||
    DEFAULT_PAGE.contactInfo.email;

  const resolvedAddress =
    rawContact.address ||
    rawContact.location?.address ||
    DEFAULT_PAGE.contactInfo.address;

  const phones = Array.isArray(rawContact.phones)
    ? rawContact.phones
        .filter((p) => p?.isActive !== false && p?.number)
        .map((p) => ({
          label: p.label || "Phone",
          number: p.number,
          href: p.href || `tel:${String(p.number).replace(/[^+\d]/g, "")}`,
        }))
    : DEFAULT_PAGE.contactInfo.phones;

  const overlayNum = Number(rawHero.overlayOpacity);
  const overlayOpacity = Number.isFinite(overlayNum)
    ? Math.min(100, Math.max(0, overlayNum))
    : DEFAULT_PAGE.hero.overlayOpacity;

const heroImage =
  rawHero.image?.trim() ||
  rawHero.backgroundImage?.trim() ||
  DEFAULT_PAGE.hero.image;

  return {
 hero: {
  ...DEFAULT_PAGE.hero,
  ...rawHero,
  image: heroImage,
  backgroundImage: heroImage,
  overlayOpacity,
},
    contactInfo: {
      ...DEFAULT_PAGE.contactInfo,
      ...rawContact,
      email: resolvedEmail,
      emails: emailsFromArray,
      address: resolvedAddress,
      phones,
    },
    quickLinks: rawQuickLinks.filter(
      (item) => item?.isActive !== false && item?.label && item?.url
    ),
    socials: rawSocials.filter(
      (item) => item?.isActive !== false && item?.url
    ),
    enquiry: {
      ...DEFAULT_PAGE.enquiry,
      ...(payload.enquiry || {}),
      buttonText:
        payload.enquiry?.buttonText ||
        payload.enquiry?.submitText ||
        DEFAULT_PAGE.enquiry.buttonText,
    },
    map: {
      ...DEFAULT_PAGE.map,
      ...(payload.map || {}),
      isVisible:
        typeof payload.map?.isVisible === "boolean"
          ? payload.map.isVisible
          : true,
    },
    isPublished:
      typeof payload.isPublished === "boolean"
        ? payload.isPublished
        : DEFAULT_PAGE.isPublished,
  };
}

function getSocialIcon(platform) {
  const key = String(platform || "").toLowerCase();
  if (key.includes("facebook")) return <FaFacebookF className="h-4 w-4" />;
  if (key.includes("instagram")) return <FaInstagram className="h-4 w-4" />;
  if (key.includes("linkedin")) return <FaLinkedinIn className="h-4 w-4" />;
  if (key.includes("youtube")) return <FaYoutube className="h-4 w-4" />;
  return <FaGlobe className="h-4 w-4" />;
}

function formatHeroTitleLines(title) {
  if (!title) return ["One Stop Solution", "Providers."];
  if (title.includes("\n")) return title.split("\n");
  const idx = title.indexOf("Providers.");
  if (idx > 0) {
    return [title.slice(0, idx).trim(), title.slice(idx).trim()];
  }
  return [title];
}

export default function ContactPage() {
  const containerRef = useRef(null);

  const [pageData, setPageData] = useState(DEFAULT_PAGE);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchContactPage() {
      try {
        setLoading(true);
        setUnavailable(false);

const res = await fetch(`${API_BASE_URL}/contact`, {
  method: "GET",
  cache: "no-store",
  headers: {
    Accept: "application/json",
  },
});
        if (res.status === 404) {
          if (active) {
            setUnavailable(true);
          }
          return;
        }

        const json = await res.json();
        console.log("CONTACT API RESPONSE:", json);

        console.log(
          "CONTACT HERO IMAGE:",
          json?.data?.hero?.image ||
          json?.data?.hero?.backgroundImage
        );
        if (!res.ok || json?.success === false) {
          if (res.status === 404 && active) {
            setUnavailable(true);
          }
          return;
        }

        if (active) {
          setPageData(normalizeContactPage(json));
        }
      } catch {
        // Fall back gracefully to DEFAULT_PAGE if backend is unreachable
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchContactPage();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading || unavailable || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-content]", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, unavailable]);


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) return;

  try {
    setSubmitting(true);
    setSubmitError("");

    const response = await fetch(
      `${API_BASE_URL}/contact/enquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message || "Unable to submit your enquiry."
      );
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  } catch (error) {
    console.error("Enquiry submission error:", error);

    setSubmitError(
      error.message || "Something went wrong. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Connect your enquiry API endpoint here if needed
  //   setSubmitted(true);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (unavailable) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f7f9fc] px-6 text-center text-slate-700">
        <h1 className="text-2xl font-semibold text-[#01193B]">
          Contact Page Unavailable
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          This page is currently unpublished. Please check back later.
        </p>
      </div>
    );
  }

  const { hero, contactInfo, quickLinks, socials, enquiry, map } = pageData;
  const titleLines = formatHeroTitleLines(hero.title);
  const activeEmails =
    contactInfo.emails?.length > 0
      ? contactInfo.emails.map((item) => item.email)
      : contactInfo.email
      ? [contactInfo.email]
      : [];

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
        {hero.image && (
  <img
    key={hero.image}
    src={hero.image}
    alt={
      hero.imageAlt ||
      "Industrial machinery and manufacturing environment"
    }
    fetchPriority="high"
    loading="eager"
    decoding="async"
    onError={(e) => {
      console.error("Contact hero image failed:", hero.image);
    }}
    className="absolute inset-0 h-full w-full object-cover"
  />
)}

          {/* Dynamic dark overlay */}
          <div
            className="absolute inset-0 bg-[#01193B]"
            style={{ opacity: hero.overlayOpacity / 100 }}
          />

          {/* Soft radial lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,77,163,0.22),transparent_55%)]" />

          <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center text-white">
            <h1
              data-hero-content
              className="text-5xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {titleLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {hero.description && (
              <p
                data-hero-content
                className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg"
              >
                {hero.description}
              </p>
            )}

            {hero.buttonText && (
              <a
                data-hero-content
                href={hero.buttonLink || "#contact-section"}
                className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-white hover:bg-white hover:text-[#01193B]"
              >
                {hero.buttonText}
                <FaArrowRight className="text-xs" />
              </a>
            )}
          </div>

          {hero.eyebrow && (
            <div className="absolute bottom-6 left-6 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
              {hero.eyebrow}
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#01193B]/40 to-transparent" />
        </div>
      </section>

      {/* Main Contact Section */}
      <section
        id="contact-section"
        className="gsap-fade-up relative px-4 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-24 xl:px-40"
      >
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#004DA3]/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#467B23]/[0.05] blur-3xl" />

        <div className="relative mx-auto grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Information */}
          <div className="space-y-8 rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-900/[0.04] backdrop-blur-sm sm:p-10 lg:col-span-5">
            <div>
              {contactInfo.label && (
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                  {contactInfo.label}
                </p>
              )}

              <h2 className="text-3xl tracking-tight text-[#01193B]">
                {contactInfo.heading}
              </h2>

              {contactInfo.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {contactInfo.description}
                </p>
              )}
            </div>

            {/* Phone Numbers */}
            {contactInfo.phones?.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                  <FaPhoneAlt className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Phone Numbers
                  </h3>

                  {contactInfo.phones.map((phone, index) => (
                    <p
                      key={index}
                      className={`${
                        index > 0 ? "mt-0.5" : ""
                      } text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]`}
                    >
                      <a href={phone.href}>{phone.number}</a>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Email Address */}
            {activeEmails.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                  <FaEnvelope className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </h3>

                  {activeEmails.map((addr, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-0.5" : ""}>
                      <a
                        href={`mailto:${addr}`}
                        className="text-base font-medium text-slate-700 transition-colors hover:text-[#004DA3]"
                      >
                        {addr}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {contactInfo.address && (
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004DA3]/10 text-[#004DA3]">
                  <FaMapMarkerAlt className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </h3>

                  <p className="text-sm font-medium leading-relaxed text-slate-700">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            )}

            <hr className="border-slate-100" />

            {/* Quick Links */}
            {quickLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Quick Links
                </h3>

                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      {link.url.startsWith("http") ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#004DA3]" />
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Links */}
            {socials.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Connect With Us
                </h3>

                <div className="flex items-center gap-3">
                  {socials.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform || "Social link"}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-[#004DA3] hover:text-white"
                    >
                      {getSocialIcon(item.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form & Map */}
          <div className="space-y-8 lg:col-span-7">
            {/* Contact Form */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-900/[0.04] backdrop-blur-sm sm:p-10">
              {enquiry.eyebrow && (
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                  {enquiry.eyebrow}
                </p>
              )}

              <h2 className="mb-6 text-3xl tracking-tight text-[#01193B]">
                {enquiry.heading}
              </h2>

              {submitted ? (
                <div className="rounded-2xl border border-[#004DA3]/30 bg-[#004DA3]/10 p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-[#004DA3]">
                    {enquiry.successTitle}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-700">
                    {enquiry.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        {enquiry.nameLabel}
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={enquiry.namePlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        {enquiry.emailLabel}
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={enquiry.emailPlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      {enquiry.phoneLabel}
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={enquiry.phonePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      {enquiry.messageLabel}
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={enquiry.messagePlaceholder}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#004DA3] focus:ring-2 focus:ring-[#004DA3]/10"
                    />
                  </div>

                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#004DA3] py-4 text-sm font-semibold text-white shadow-lg shadow-[#004DA3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003b82] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending Enquiry..." : enquiry.buttonText}

                    {!submitting && (
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>

                  {/* <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#004DA3] py-4 text-sm font-semibold text-white shadow-lg shadow-[#004DA3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003b82]"
                  >
                    {enquiry.buttonText}
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button> */}
                </form>
              )}
            </div>

            {/* Google Map */}
            {map.isVisible && map.embedUrl && (
              <div className="h-[350px] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.04]">
                <iframe
                  key={map.embedUrl}
                  src={map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={map.title || "MTAT Technologies Location Map"}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}