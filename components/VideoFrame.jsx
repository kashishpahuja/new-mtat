
"use client";

import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 40;
const MOBILE_BREAKPOINT = "(max-width: 767px)";

const VideoFrame = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(-1);

  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  // Detect device size
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  // Load device-specific frames
  useEffect(() => {
    if (isMobile === null) return;

    let cancelled = false;
    let loadedCount = 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(false);
    currentFrameRef.current = -1;
    imagesRef.current = [];

    const folder = isMobile ? "/mobile" : "/desktop";

    const images = Array.from({ length: TOTAL_FRAMES }, (_, index) => {
      const image = new Image();

      image.src = `${folder}/ezgif-frame-${String(index + 1).padStart(
        3,
        "0"
      )}.jpg`;

      const handleComplete = () => {
        if (cancelled) return;

        loadedCount++;

        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };

      image.onload = handleComplete;

      image.onerror = () => {
        console.error("Frame failed to load:", image.src);
        handleComplete();
      };

      return image;
    });

    imagesRef.current = images;

    return () => {
      cancelled = true;

      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [isMobile]);

  // Canvas rendering and scroll animation
  useEffect(() => {
    if (!loaded) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!section || !sticky || !canvas || !ctx) return;

    let rafId = null;

const renderFrame = (frameIndex) => {
  const image = imagesRef.current[frameIndex];

  if (!image?.complete || !image.naturalWidth) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const width = Math.round(rect.width * dpr);
  const height = Math.round(rect.height * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  // Desktop: show complete frame.
  // Mobile: fill the viewport.
  const scale = isMobile
    ? Math.max(
        rect.width / image.naturalWidth,
        rect.height / image.naturalHeight
      )
    : Math.min(
        rect.width / image.naturalWidth,
        rect.height / image.naturalHeight
      );

  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  const x = (rect.width - drawWidth) / 2;
  const y = (rect.height - drawHeight) / 2;

  ctx.drawImage(image, x, y, drawWidth, drawHeight);

  currentFrameRef.current = frameIndex;
};

    const updateAnimation = () => {
      rafId = null;

      const rect = section.getBoundingClientRect();

      const scrollDistance = section.offsetHeight - sticky.offsetHeight;

      const progress =
        scrollDistance > 0
          ? Math.max(0, Math.min(1, -rect.top / scrollDistance))
          : 0;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * (TOTAL_FRAMES - 1))
      );

      if (frameIndex !== currentFrameRef.current) {
        renderFrame(frameIndex);
      }
    };

    const requestUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateAnimation);
      }
    };

    // Initial frame
    renderFrame(0);
    requestUpdate();

    // Scroll handling
    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    // Responsive resizing
    const handleResize = () => {
      currentFrameRef.current = -1;
      requestUpdate();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Observe canvas size changes
    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(canvas);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      resizeObserver.disconnect();

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative m-0 bg-[#8D9391] h-[300vh] w-full max-w-none p-0"
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      {/* Fixed viewport animation */}
<div
  ref={stickyRef}
  className="sticky top-0 m-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden p-0"
  style={{
    height: "100dvh",
    minHeight: "100dvh",
    margin: 0,
    padding: 0,
  }}
>
        {/* Scroll animation canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 m-0 block h-full w-full p-0"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Loading screen */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-gray-700 border-t-cyan-400" />

              <p className="text-xs tracking-[0.25em] text-gray-500">
                LOADING EXPERIENCE...
              </p>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
<div className="pointer-events-none absolute bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 text-center">
  <p className="mb-3 whitespace-nowrap text-[9px] uppercase tracking-[0.25em] text-white sm:text-[10px] sm:tracking-[0.3em]">
    Scroll to explore
  </p>

  <div className="mx-auto h-1 w-20 overflow-hidden rounded-full bg-white/30 sm:w-28">
    <div
      className="h-full bg-white transition-[width] duration-100"
      style={{
        width: loaded ? "100%" : "0%",
      }}
    />
  </div>
</div>
      </div>
    </section>
  );
};

export default VideoFrame;
