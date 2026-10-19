
"use client"
import HeroBanner from "../../components/HeroBanner";
import ServicesSection from "../../components/ServicesSection";
import CompanyStorySection from "../../components/CompanyStorySection";
import WhyUsSection from "../../components/Whyussection";
import VideoFrame from "../../components/VideoFrame";
import TestimonialSection from "../../components/TestimonialSection";
import EnquirySection from "../../components/EnquirySection";

export default function Home() {
  return (
   <div>
      <HeroBanner />
      <ServicesSection />
      <CompanyStorySection />
      <WhyUsSection />
      <VideoFrame />
      <TestimonialSection />
      <EnquirySection />
   </div>
  );
}
