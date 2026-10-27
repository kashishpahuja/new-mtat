'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import AboutImage from '../about/AboutImage';

/**
 * Image with a clip-path reveal and (desktop only) gentle parallax.
 * `className` must set positioning/size, e.g. "relative aspect-[4/5]" or
 * "absolute inset-0".
 */
export default function RevealImage({
  src,
  alt,
  className = 'relative',
  imgClassName = '',
  parallax = 6, // % of the inner layer; keep <= 7 (layer is 116% tall)
  reveal = 'up', // 'up' | 'inset' | 'none'
  priority = false,
  position = 'center',
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 768px)',
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions;
        if (!motion) return;

        if (reveal !== 'none') {
          gsap.fromTo(
            wrap,
            {
              clipPath:
                reveal === 'inset'
                  ? 'inset(12% 8% 12% 8%)'
                  : 'inset(0% 0% 100% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.3,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
            }
          );
        }

        if (parallax && desktop) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
    );

    return () => mm.revert();
  }, [reveal, parallax]);

  return (
    <div ref={wrapRef} className={`overflow-hidden bg-[#0B1522] ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
      >
        <AboutImage
          src={src}
          alt={alt}
          priority={priority}
          position={position}
          className={imgClassName}
        />
      </div>
    </div>
  );
}
