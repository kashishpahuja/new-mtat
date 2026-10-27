'use client';

import { useEffect, useRef, useState } from 'react';
import { placeholderDataUri } from '../../lib/aboutImages';

/** Plain <img> with a graceful placeholder if the file is missing. */
export default function AboutImage({
  src,
  alt,
  className = '',
  priority = false,
  position = 'center',
}) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  // Catches images that failed before hydration attached onError.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? placeholderDataUri(src) : src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
