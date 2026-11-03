import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ScrollFloat from '../animations/ScrollFloat';
import Reveal from '../animations/Reveal';
import RevealImage from '../animations/RevealImage';
import SectionLabel from './SectionLabel';
import { COMMITMENT, ROUTES } from '../../lib/aboutContent';
import { ABOUT_IMAGES } from '../../lib/aboutImages';

export default function CompanyCommitment() {
  return (
    <section
      id="commitment"
      aria-labelledby="commitment-heading"
      className="relative isolate overflow-hidden bg-[#05070A] py-32 sm:py-44"
    >
      <RevealImage
        src={ABOUT_IMAGES.commitment.src}
        alt={ABOUT_IMAGES.commitment.alt}
        reveal="inset"
        parallax={6}
        className="absolute inset-0 -z-10"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#05070A]/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-[#05070A] via-transparent to-[#05070A]"
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionLabel>{COMMITMENT.label}</SectionLabel>
        <h2 id="commitment-heading" className="mt-8">
          <ScrollFloat
            effect="float"
            splitBy="words"
            direction="up"
            scrollStart="top 85%"
            scrollEnd="bottom 70%"
            stagger={0.08}
            distance={90}
            textClassName="text-left text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {COMMITMENT.heading}
          </ScrollFloat>
        </h2>

        <Reveal
          className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-white/80 sm:text-lg"
          stagger={0.15}
        >
          {COMMITMENT.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="mt-14 max-w-2xl border-t border-white/15 pt-8">
          <p className="text-xl font-medium text-white sm:text-2xl">
            {COMMITMENT.slogan}
          </p>
          <Link
            href={ROUTES.contact}
            className="group mt-8 inline-flex items-center gap-3 bg-[#2563EB] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {COMMITMENT.cta}
            <FiArrowRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
