'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/** Restrained entrance for a block: its direct children rise and fade in once. */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  y = 28,
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const kids = Array.from(el.children);
      gsap.from(kids.length ? kids : el, {
        opacity: 0,
        y,
        duration: 1,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });
    return () => mm.revert();
  }, [y, stagger, delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
