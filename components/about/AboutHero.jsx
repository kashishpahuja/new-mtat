import ScrollExpand from '../animations/ScrollExpand';
import { ABOUT_IMAGES } from '../../lib/aboutImages';
import { HERO } from '../../lib/aboutContent';

export default function AboutHero() {
  const { src, alt } = ABOUT_IMAGES.hero;

  return (
    <ScrollExpand
      src={src}
      mediaType="image"
      alt={alt}
      title={HERO.title}
      scrollHint="SCROLL TO EXPLORE"
      startWidth={68}
      startHeight={65}
      startRadius={20}
      endRadius={0}
      mediaZoom={1.2}
      scrollDistance={1.1}
      holdDistance={0.2}
      smoothing={0.08}
      overlayScrim={0.45}
      useWindowScroll
    >
      <div className="mx-auto max-w-4xl text-center text-white">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/75">
          {HERO.company}
        </p>
        {/* The h1 lives in ScrollExpand (title). This copy is visual only. */}
        <p
          aria-hidden="true"
          className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl"
        >
          Engineering Precision.
          <br />
          Powering Progress.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {HERO.tagline}
        </p>
      </div>
    </ScrollExpand>
  );
}
