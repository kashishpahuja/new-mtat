import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import ScrollFloat from '../animations/ScrollFloat';
import Reveal from '../animations/Reveal';
import RevealImage from '../animations/RevealImage';
import SectionLabel from './SectionLabel';
import {
  EXPERTISE,
  EXPERTISE_SECTION,
  ROUTES,
} from '../../lib/aboutContent';
import { ABOUT_IMAGES } from '../../lib/aboutImages';

// Asymmetrical 12-column rhythm (kept here so Tailwind sees the classes).
const SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-12',
];

export default function TechnologyExpertise() {
  return (
    <section
      id="our-expertise"
      aria-labelledby="expertise-heading"
      className="relative bg-[#05070A] px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-60 py-24"
    >
      <div className="mx-auto">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel className='text-[#dbe2e7]'>{EXPERTISE_SECTION.label}</SectionLabel>
            <h2 id="expertise-heading" className="mt-8">
              <ScrollFloat
                effect="float"
                splitBy="words"
                direction="up"
                scrollStart="top 85%"
                scrollEnd="bottom 55%"
                stagger={0.06}
                distance={80}
                textClassName="text-left text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {EXPERTISE_SECTION.heading}
              </ScrollFloat>
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:pt-14">
            <p className="text-base leading-relaxed text-[#A7AFBA] sm:text-lg">
              {EXPERTISE_SECTION.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:grid-cols-12">
          {EXPERTISE.map((item, i) => {
            const img = ABOUT_IMAGES[item.image] || {
              src: ABOUT_IMAGES.intro.src,
              alt: item.title,
            };
            return (
              <article key={item.id} className={`group ${SPANS[i]}`}>
                <RevealImage
                  src={img.src}
                  alt={img.alt}
                  className="relative aspect-[4/3] md:aspect-[16/11]"
                  imgClassName="transition-transform duration-[1200ms] ease-out md:group-hover:scale-105"
                />
                <Reveal className="mt-8" stagger={0.1}>
                  <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-[#A7AFBA]">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.items.map((t) => (
                      <li
                        key={t}
                        className="border border-white/12 px-3 py-1.5 text-sm text-white/80"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {ROUTES.products ? (
                    <Link
                      href={ROUTES.products}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      Explore {item.title} products
                      <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  ) : null}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
