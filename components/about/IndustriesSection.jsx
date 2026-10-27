import ScrollFloat from '../animations/ScrollFloat';
import RevealImage from '../animations/RevealImage';
import SectionLabel from './SectionLabel';
import { INDUSTRIES, INDUSTRIES_SECTION } from '../../lib/aboutContent';
import { ABOUT_IMAGES } from '../../lib/aboutImages';

const SPANS = [
  'md:col-span-4',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative  py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel>{INDUSTRIES_SECTION.label}</SectionLabel>
        <h2 id="industries-heading" className="mt-8 max-w-4xl">
          <ScrollFloat
            effect="float"
            splitBy="words"
            direction="up"
            scrollStart="top 85%"
            scrollEnd="bottom 55%"
            stagger={0.06}
            distance={80}
            textClassName="text-left text-4xl font-semibold leading-[1.05] tracking-tight text-[#05070A] sm:text-5xl lg:text-7xl"
          >
            {INDUSTRIES_SECTION.heading}
          </ScrollFloat>
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#383a3d] sm:text-lg">
          {INDUSTRIES_SECTION.intro}
        </p>

        <div className="mt-16 grid auto-rows-[340px] gap-4 md:auto-rows-[400px] md:grid-cols-6">
          {INDUSTRIES.map((item, i) => {
            const img = ABOUT_IMAGES[item.image];
            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden ${SPANS[i]}`}
              >
                <RevealImage
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-[1400ms] ease-out md:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/45 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
