"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

  const whatsappMessage = encodeURIComponent(
    "Hello MTAT Technologies, I would like to know more about your machine tools and industrial solutions."
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact MTAT Technologies on WhatsApp"
        title="Chat with us on WhatsApp"
        className="fixed bottom-6 right-3 z-100 flex h-14 w-14 items-center justify-center transition-all duration-300 hover:scale-110 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
      >
        <Image
          src="/Images/whatsapp.gif"
          alt="WhatsApp"
          width={40}
          height={40}
          unoptimized
          className="h-full w-full object-contain"
        />
      </a>

      {/* Scroll to Top Button */}
       <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className={`fixed bottom-24 right-5 z-100 flex h-11 w-11 items-center justify-center rounded-full border border-[#01193B]/15 bg-white text-[#01193B] shadow-lg transition-all duration-500 hover:bg-[#01193B] hover:text-white sm:bottom-28 sm:right-8 sm:h-12 sm:w-12 ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <FaArrowUp className="text-lg" />
      </button> 
    </>
  );
}