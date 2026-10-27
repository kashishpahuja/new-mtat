'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/**
 * Mount ONCE in app/layout.jsx. One Lenis instance, driven by gsap.ticker
 * (a single requestAnimationFrame loop shared with ScrollTrigger), so Lenis
 * and ScrollTrigger always read the same scroll position.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Reduced motion: keep native scrolling.
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      autoRaf: false, // we drive it from gsap.ticker below
      anchors: true, // #hash links scroll smoothly
      smoothWheel: true, // touch keeps native scrolling by default
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Re-measure triggers once images/fonts have loaded and when the
    // document height changes (debounced).
    let timer;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', onLoad);
    }
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', onLoad);
      ro.disconnect();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // GSAP default
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
