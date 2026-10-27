'use client';

import { Children, Fragment, useEffect, useMemo, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const DIRECTION = {
  up: { y: 1 }, // text travels up into place
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
};

const getText = (children) =>
  Children.toArray(children)
    .filter((c) => typeof c === 'string' || typeof c === 'number')
    .join('');

export default function ScrollFloat({
  children,
  scrollContainerRef,
  effect = 'float', // 'float' | 'slide' | 'blur' | 'fade'
  splitBy = 'words', // 'words' | 'chars' | 'lines'
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  order = 'start', // 'start' | 'center' | 'end' | 'edges' | 'random'
  fromColor = 'currentColor',
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top 85%',
  scrollEnd = 'bottom 45%',
  stagger = 0.06,
  distance = 80,
  stretch = 1.2,
  smoothing = 0, // 0 = scrub:true, >0 = seconds of scrub smoothing
  containerClassName = '',
  textClassName = '',
}) {
  const containerRef = useRef(null);
  const text = useMemo(() => getText(children), [children]);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const lines = useMemo(
    () => text.split('\n').map((l) => l.trim()).filter(Boolean),
    [text]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const units = el.querySelectorAll('.sf-unit');
    if (!units.length) return undefined;

    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const travel = window.innerWidth < 640 ? distance * 0.5 : distance;
        const vec = DIRECTION[direction] || DIRECTION.up;
        const from = { opacity: 0 };

        if (effect === 'float') {
          if (vec.y) {
            from.y = vec.y * travel;
            from.scaleY = stretch;
            from.transformOrigin = vec.y > 0 ? '50% 0%' : '50% 100%';
          } else {
            from.x = vec.x * travel;
            from.scaleX = stretch;
            from.transformOrigin = vec.x > 0 ? '0% 50%' : '100% 50%';
          }
        } else if (effect === 'slide') {
          from.x = (vec.x || 0) * travel;
          from.y = (vec.y || 0) * travel;
        } else if (effect === 'blur') {
          from.filter = 'blur(14px)';
          from.y = (vec.y || 0) * travel * 0.25;
        }
        // 'fade' animates opacity only.

        if (fromColor && fromColor !== 'currentColor') from.color = fromColor;

        gsap.from(units, {
          ...from,
          duration: animationDuration,
          ease,
          stagger: { each: stagger, from: order },
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current || window,
            start: scrollStart,
            end: scrollEnd,
            scrub: smoothing > 0 ? smoothing : true,
          },
        });
      },
      el
    );

    return () => mm.revert();
  }, [
    text,
    splitBy,
    effect,
    direction,
    order,
    fromColor,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    distance,
    stretch,
    smoothing,
    scrollContainerRef,
  ]);

  return (
    <span ref={containerRef} className={`block ${containerClassName}`}>
      {/* Screen readers get the plain text once; the split spans are hidden. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`block ${textClassName}`}>
        {splitBy === 'lines'
          ? lines.map((line, i) => (
              <span key={i} className="sf-unit block">
                {line}
              </span>
            ))
          : words.map((word, i) => (
              <Fragment key={i}>
                {splitBy === 'chars' ? (
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((ch, ci) => (
                      <span key={ci} className="sf-unit inline-block">
                        {ch}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="sf-unit inline-block">{word}</span>
                )}
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
      </span>
    </span>
  );
}
