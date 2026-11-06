'use client';

import { useEffect, useRef, useState } from 'react';
import AboutImage from '../about/AboutImage';

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

function getScrollParent(node) {
  let p = node ? node.parentElement : null;
  while (p) {
    const oy = getComputedStyle(p).overflowY;
    if (oy === 'auto' || oy === 'scroll') return p;
    p = p.parentElement;
  }
  return window;
}

export default function ScrollExpand({
  src,
  mediaType = 'image', // 'image' | 'video'
  poster,
  alt = '',
  title,
  scrollHint = 'SCROLL TO EXPLORE',
  startWidth = 68, // % of viewport width at the start
  startHeight = 65, // % of viewport height at the start
  startRadius = 20,
  endRadius = 0,
  mediaZoom = 1.2, // media starts zoomed in and settles to 1
  scrollDistance = 1.1, // expansion length, in viewport heights
  holdDistance = 0.2, // extra hold at full size, in viewport heights
  smoothing = 0.08, // 0..1 per-frame easing (1 = no smoothing)
  overlayScrim = 0.45, // final darkness of the scrim (0..1)
  useWindowScroll = true,
  enabled = true,
  children,
  className = '',
  style,
}) {
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const frameRef = useRef(null);
  const zoomRef = useRef(null);
  const scrimRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const hintRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  const isStatic = !enabled || reduced;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (isStatic) return undefined;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return undefined;

    const scroller = useWindowScroll ? window : getScrollParent(track);
    const total = scrollDistance + holdDistance;
    const share = total > 0 ? scrollDistance / total : 1;
    const k0 = clamp(smoothing, 0.001, 1);

    let sw = startWidth;
    let sh = startHeight;
    let current = 0;
    let target = 0;
    let raf = 0;
    let last = 0;

    const setSizes = () => {
      const small = window.innerWidth < 768;
      sw = small ? Math.max(startWidth, 88) : startWidth;
      sh = small ? Math.max(startHeight, 62) : startHeight;
    };

    const readTarget = () => {
      const rect = track.getBoundingClientRect();
      const viewH = sticky.offsetHeight;
      const top =
        scroller === window
          ? rect.top
          : rect.top - scroller.getBoundingClientRect().top;
      const range = rect.height - viewH;
      if (range <= 0) return 1;
      const p = clamp(-top / range);
      return share > 0 ? clamp(p / share) : 1;
    };

    const paint = (e) => {
      const w = lerp(sw, 100, e);
      const h = lerp(sh, 100, e);
      const ix = (100 - w) / 2;
      const iy = (100 - h) / 2;
      const r = lerp(startRadius, endRadius, e);
      if (frameRef.current) {
        frameRef.current.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
      }
      if (zoomRef.current) {
        zoomRef.current.style.transform = `scale(${lerp(mediaZoom, 1, e)})`;
      }
      if (scrimRef.current) {
        scrimRef.current.style.opacity = String(lerp(0.2, 1, e));
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(1 - clamp(e / 0.4));
        titleRef.current.style.transform = `translate3d(0, ${-24 * e}px, 0)`;
      }
      if (bodyRef.current) {
        const b = clamp((e - 0.7) / 0.3);
        bodyRef.current.style.opacity = String(b);
        bodyRef.current.style.transform = `translate3d(0, ${lerp(32, 0, b)}px, 0)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - clamp(e / 0.08));
      }
    };

    // One rAF loop that only runs while the value is still easing.
    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 16.667, 4) : 1;
      last = now;
      target = readTarget();
      const k = 1 - Math.pow(1 - k0, dt);
      current = lerp(current, target, k);
      if (Math.abs(target - current) < 0.0005) current = target;
      paint(current);
      if (current !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const snap = () => {
      setSizes();
      target = readTarget();
      current = target;
      paint(current);
    };

    snap();
    scroller.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', snap);
    const ro = new ResizeObserver(snap);
    ro.observe(track);

    return () => {
      scroller.removeEventListener('scroll', kick);
      window.removeEventListener('resize', snap);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [
    isStatic,
    useWindowScroll,
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
  ]);

  const media =
    mediaType === 'video' ? (
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!isStatic}
        preload="metadata"
        aria-label={alt}
      />
    ) : (
      <AboutImage src={src} alt={alt} priority />
    );

  // Reduced motion / disabled: full-bleed media, all content visible.
  if (isStatic) {
    return (
      <section
        className={`relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden ${className}`}
        style={style}
      >
        <div className="absolute inset-0 -z-10">{media}</div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: `rgba(5,7,10,${Math.max(overlayScrim, 0.55)})` }}
        />
        {title ? <h1 className="sr-only">{title}</h1> : null}
        <div className="px-6 py-32 text-center">{children}</div>
      </section>
    );
  }

  const iy0 = (100 - startHeight) / 2;
  const ix0 = (100 - startWidth) / 2;

  return (
    <section
      ref={trackRef}
      className={`relative ${className}`}
      style={{
        height: `calc(100svh * ${1 + scrollDistance + holdDistance})`,
        ...style,
      }}
    >
      <noscript>
        <style>{'.se-body{opacity:1!important}'}</style>
      </noscript>
      <div
        ref={stickyRef}
        className="sticky top-0 h-svh w-full overflow-hidden bg-[#05070A]"
      >
        <div
          ref={frameRef}
          className="absolute inset-0"
          style={{
            clipPath: `inset(${iy0}% ${ix0}% ${iy0}% ${ix0}% round ${startRadius}px)`,
          }}
        >
          <div
            ref={zoomRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: `scale(${mediaZoom})` }}
          >
            {media}
          </div>
          <div
            ref={scrimRef}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `rgba(5,7,10,${overlayScrim})`, opacity: 0.2 }}
          />
        </div>

        {title ? (
          <h1
            ref={titleRef}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 mx-auto max-w-5xl -translate-y-1/2 px-6 text-center text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
        ) : null}

        <div
          ref={bodyRef}
          className="se-body absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
          style={{ opacity: 0 }}
        >
          {children}
        </div>

        {scrollHint ? (
          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70"
          >
            <span>{scrollHint}</span>
            <span
              aria-hidden="true"
              className="about-scroll-hint-line block h-10 w-px bg-white/60"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
