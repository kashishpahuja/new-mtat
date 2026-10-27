import ScrollFloat from '../animations/ScrollFloat';
import Reveal from '../animations/Reveal';
import RevealImage from '../animations/RevealImage';
import SectionLabel from './SectionLabel';
import { INTRO } from '../../lib/aboutContent';
import { ABOUT_IMAGES } from '../../lib/aboutImages';

export default function CompanyIntro() {
  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-7 lg:pr-12">
          <Reveal>
            <SectionLabel>{INTRO.label}</SectionLabel>
          </Reveal>

          <h2 id="story-heading" className="mt-8">
            <ScrollFloat
              effect="float"
              splitBy="words"
              direction="up"
              order="start"
              animationDuration={1}
              ease="power3.out"
              scrollStart="top 85%"
              scrollEnd="bottom 55%"
              stagger={0.06}
              distance={80}
              stretch={1.2}
              textClassName="text-left text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
            >
              {INTRO.heading}
            </ScrollFloat>
          </h2>

          <Reveal
            className="mt-10 max-w-xl space-y-6 text-base leading-relaxed  sm:text-lg"
            stagger={0.15}
          >
            {INTRO.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>

        <figure className="relative lg:col-span-5 lg:mt-28">
          <span
            aria-hidden="true"
            className="absolute inset-0 hidden translate-x-4 translate-y-4 border border-[#2563EB]/40 lg:block"
          />
          <RevealImage
            src={ABOUT_IMAGES.intro.src}
            alt={ABOUT_IMAGES.intro.alt}
            className="relative aspect-[4/5]"
          />
          <figcaption className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
            <span aria-hidden="true" className="h-px w-8 bg-[#2563EB]" />
            {INTRO.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
