
import AboutHero from "../../../components/about/AboutHero";
import CompanyIntro from "../../../components/about/CompanyIntro";
import CompanyTimeline from "../../../components/about/CompanyTimeline";
import TechnologyExpertise from "../../../components/about/TechnologyExpertise";
import TechnologyPartners from "../../../components/about/TechnologyPartners";
import IndustriesSection from "../../../components/about/IndustriesSection";
import CompanyCommitment from "../../../components/EnquirySection";

import { getPublicAbout } from "../../app/lib/publicApi";

const DEFAULT_TITLE =
  "About MTAT Technologies | Engineering Precision, Powering Progress";

const DEFAULT_DESCRIPTION =
  "Discover MTAT Technologies Private Limited, its journey since 1995, machine-tool technology portfolio, industry partnerships, and commitment to manufacturing progress.";

export async function generateMetadata() {
  try {
    const content = await getPublicAbout();
    const seo = content?.seo || {};

    const title = seo.title || DEFAULT_TITLE;
    const description = seo.description || DEFAULT_DESCRIPTION;

    return {
      title: { absolute: title },
      description,
      openGraph: {
        title: seo.ogTitle || title,
        description: seo.ogDescription || description,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: { absolute: DEFAULT_TITLE },
      description: DEFAULT_DESCRIPTION,
    };
  }
}

export default async function AboutPage() {
  let content = null;

  try {
    content = await getPublicAbout();
  } catch (error) {
    console.error("About page API error:", error.message);
  }

  if (!content) {
    return (
      <main
        id="main-content"
        className="flex min-h-[60vh] items-center justify-center px-6 text-center"
      >
        <p className="text-slate-500">
          Unable to load About page content. Please try again later.
        </p>
      </main>
    );
  }

  return (
    <main id="main-content" className="text-[#05070A]">
      {content.hero && <AboutHero data={content.hero} />}
      {content.intro && <CompanyIntro data={content.intro} />}
      {content.timeline && <CompanyTimeline data={content.timeline} />}
      {content.expertise && (
        <TechnologyExpertise data={content.expertise} />
      )}
      {content.partners && (
        <TechnologyPartners data={content.partners} />
      )}
      {content.industries && (
        <IndustriesSection data={content.industries} />
      )}
      {content.cta && <CompanyCommitment data={content.cta} />}
    </main>
  );
}


// import AboutHero from '../../../components/about/AboutHero';
// import CompanyIntro from '../../../components/about/CompanyIntro';
// import CompanyTimeline from '../../../components/about/CompanyTimeline';
// import TechnologyExpertise from '../../../components/about/TechnologyExpertise';
// import TechnologyPartners from '../../../components/about/TechnologyPartners';
// import IndustriesSection from '../../../components/about/IndustriesSection';
// import CompanyCommitment from '../../../components/EnquirySection';

// const TITLE = 'About MTAT Technologies | Engineering Precision, Powering Progress';
// const DESCRIPTION =
//   'Discover MTAT Technologies Private Limited, its journey since 1995, machine-tool technology portfolio, industry partnerships, and commitment to manufacturing progress.';

// export const metadata = {
//   title: { absolute: TITLE }, // `absolute` avoids a layout title template doubling the brand
//   description: DESCRIPTION,
//   openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
// };

// export default function AboutPage() {
//   return (
//     <main id="main-content" className="text-[#05070A] ">
//       <AboutHero />
//       <CompanyIntro />
//       <CompanyTimeline />
//       <TechnologyExpertise />
//       <TechnologyPartners />
      
//       <IndustriesSection />

//       <CompanyCommitment />
//     </main>
//   );
// }
