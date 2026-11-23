"use client";

import { useEffect, useState } from "react";

import HeroBanner from "../../components/HeroBanner";
import ServicesSection from "../../components/ServicesSection";
import CompanyStorySection from "../../components/CompanyStorySection";
import WhyUsSection from "../../components/Whyussection";
import TestimonialSection from "../../components/TestimonialSection";
import EnquirySection from "../../components/EnquirySection";

import { getPublicHomepage } from "../app/lib/publicApi";
import VideoFrame from "../../components/VideoFrame";

export default function Home() {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomepage() {
      try {
        const data = await getPublicHomepage();
        setHomepage(data);
      } catch (error) {
        console.error("Homepage fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomepage();
  }, []);

  if (loading) {
    return <div className="min-h-screen" />;
  }

  if (!homepage) {
    return <div className="min-h-screen flex items-center justify-center">
      Unable to load homepage content.
    </div>;
  }

  return (
    <main>
      {homepage.hero?.enabled !== false && (
        <HeroBanner data={homepage.hero} />
      )}
   <VideoFrame />
      {homepage.services?.enabled !== false && (
        <ServicesSection data={homepage.services} />
      )}

      {homepage.companyStory?.enabled !== false && (
        <CompanyStorySection data={homepage.companyStory} />
      )}

      {homepage.whyUs?.enabled !== false && (
        <WhyUsSection data={homepage.whyUs} />
      )}

      {homepage.testimonialsSection?.enabled !== false && (
        <TestimonialSection data={homepage.testimonialsSection} />
      )}

      {homepage.enquiry?.enabled !== false && (
        <EnquirySection data={homepage.enquiry} />
      )}
    </main>
  );
}


// "use client"
// import HeroBanner from "../../components/HeroBanner";
// import ServicesSection from "../../components/ServicesSection";
// import CompanyStorySection from "../../components/CompanyStorySection";
// import WhyUsSection from "../../components/Whyussection";
// import VideoFrame from "../../components/VideoFrame";
// import TestimonialSection from "../../components/TestimonialSection";
// import EnquirySection from "../../components/EnquirySection";

// export default function Home() {
//   return (
//    <div>
//       <HeroBanner />
//       <ServicesSection />
//       <CompanyStorySection />
//       <WhyUsSection />
//       {/* <VideoFrame /> */}
//       <TestimonialSection />
//       <EnquirySection />
//    </div>
//   );
// }
