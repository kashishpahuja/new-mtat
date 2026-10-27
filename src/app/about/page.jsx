import AboutHero from '../../../components/about/AboutHero';
import CompanyIntro from '../../../components/about/CompanyIntro';
import CompanyTimeline from '../../../components/about/CompanyTimeline';
import TechnologyExpertise from '../../../components/about/TechnologyExpertise';
import TechnologyPartners from '../../../components/about/TechnologyPartners';
import IndustriesSection from '../../../components/about/IndustriesSection';
import CompanyCommitment from '../../../components/EnquirySection';

const TITLE = 'About MTAT Technologies | Engineering Precision, Powering Progress';
const DESCRIPTION =
  'Discover MTAT Technologies Private Limited, its journey since 1995, machine-tool technology portfolio, industry partnerships, and commitment to manufacturing progress.';

export const metadata = {
  title: { absolute: TITLE }, // `absolute` avoids a layout title template doubling the brand
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="text-[#05070A] ">
      <AboutHero />
      <CompanyIntro />
      <CompanyTimeline />
      <TechnologyExpertise />
      <TechnologyPartners />
      
      <IndustriesSection />

      <CompanyCommitment />
    </main>
  );
}
