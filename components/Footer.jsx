import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => (
  <footer className="border-t border-slate-300 bg-slate-100 px-4 py-10 sm:px-6 md:px-12 lg:px-24 xl:px-40">
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">

      {/* Column 1: Logo & Description */}
      <div className="flex flex-col items-start gap-4">
        <Link href="/">
          <img
            src="/Images/logo.webp"
            alt="MTAT Technologies Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <p className="max-w-md text-sm leading-7 text-slate-600">
          One Stop Solution Providers. Advanced CNC machinery, automated
          tooling solutions, and precision manufacturing for global
          industries.
        </p>
      </div>

      {/* Column 2: Quick Links */}
      <nav className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm text-slate-700">
        {[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: "Solutions", href: "/solutions" },
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-[#467B23]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Column 3: Contact & Social Links */}
      <div className="flex flex-col items-start gap-5 text-sm text-slate-700">

        <a
          href="mailto:info@mtaindia.in"
          className="flex items-center gap-2 transition-colors hover:text-[#004DA3]"
        >
          <FaEnvelope className="shrink-0 text-[#004DA3]" />
          info@mtaindia.in
        </a>

        <div className="flex items-start gap-2">
          <FaPhoneAlt className="mt-1 shrink-0 text-[#004DA3]" />
          <div>
            <a
              href="tel:01604624748"
              className="transition-colors hover:text-[#004DA3]"
            >
              0160-4624748
            </a>
            <br />
            <a
              href="tel:01604635748"
              className="transition-colors hover:text-[#004DA3]"
            >
              0160-4635748
            </a>
            <p className="mt-1 text-xs text-slate-500">
              Fax: 0160-4634748
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-2 flex items-center gap-4">
          <a
            href="https://www.facebook.com/people/MTAT-Technologies-Private-Limited/61562506565764/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-slate-500 transition-colors hover:text-[#1877F2]"
          >
            <FaFacebookF className="h-5 w-5" />
          </a>

          <a
            href="https://www.instagram.com/mtattpl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-slate-500 transition-colors hover:text-pink-600"
          >
            <FaInstagram className="h-5 w-5" />
          </a>

          <a
            href="https://in.linkedin.com/company/mtat-technologies-private-limited"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 transition-colors hover:text-[#0077B5]"
          >
            <FaLinkedinIn className="h-5 w-5" />
          </a>

          <a
            href="https://www.youtube.com/@mtatpl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-slate-500 transition-colors hover:text-red-600"
          >
            <FaYoutube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>


{/* Bottom Bar */}
<div className="mt-12 border-t border-slate-300 font-medium pt-8 text-center text-xs text-slate-500">
  <p className="text-[#467B23] ">
    &copy; {new Date().getFullYear()} MTAT Technologies Private Limited.
    All Rights Reserved.
  </p>

 
  <p className="mt-3">
    Designed & Developed by{" "}
    <a
      href="https://digitalpaaji.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-[#467B23] transition-colors hover:text-[#004DA3] hover:underline"
    >
      Digital Paaji
    </a>
  </p>


</div>

  </footer>
);

export default Footer;
