// ---------------------------------------------------------------------------
// ALL About-page imagery is configured here.
// To use an approved MTAT photograph, either:
//   - drop a file at the `src` path inside /public, or
//   - replace `src` with any full https:// URL (plain <img> is used, so no
//     next.config image domains are needed).
// Update `alt` so it describes the photograph you actually use.
// If a file is missing, a blueprint-style placeholder is shown instead.
// Do not use imagery that suggests MTAT manufactures finished components.
// ---------------------------------------------------------------------------

const BASE =
  "https://images.unsplash.com";

export const ABOUT_IMAGES = {
  hero: {
    src: `${BASE}/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2400&q=90`,
    alt: "Precision CNC machinery in an industrial manufacturing environment",
  },

  intro: {
    src: `${BASE}/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85`,
    alt: "Industrial engineering and manufacturing equipment",
  },

  cutting: {
    src: `${BASE}/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=85`,
    alt: "CNC turning and machining centres in operation",
  },

  forming: {
    src: `${BASE}/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85`,
    alt: "Industrial machinery used in metal forming",
  },

  metrology: {
    src: `${BASE}/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=85`,
    alt: "Precision engineering and industrial inspection",
  },

  toolroom: {
    src: `${BASE}/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85`,
    alt: "Industrial equipment in a machine tool workshop",
  },

  automotive: {
    src: `${BASE}/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1400&q=85`,
    alt: "Automotive engineering and manufacturing",
  },

  agriculture: {
    src: `${BASE}/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1400&q=85`,
    alt: "Agricultural machinery and equipment",
  },

  aerospace: {
    src: `${BASE}/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=85`,
    alt: "Aircraft representing aerospace engineering",
  },

  sheetMetal: {
    src: `${BASE}/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1400&q=85`,
    alt: "Industrial fabrication and metal processing",
  },

  medical: {
    src: `${BASE}/photo-1581093458791-9d42e3c8a3b4?auto=format&fit=crop&w=1400&q=85`,
    alt: "Precision engineering for technical equipment",
  },

  people: {
    src: `${BASE}/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85`,
    alt: "A professional team collaborating at work",
  },

  commitment: {
    src: `${BASE}/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85`,
    alt: "Industrial machinery in a manufacturing environment",
  },
};


// Blueprint-style placeholder (inline SVG data URI, never a broken image).
export function placeholderDataUri(label = 'Replace this image') {
  const safe = String(label).replace(/[<>&"']/g, '');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1522"/><stop offset="1" stop-color="#05070A"/></linearGradient>` +
    `<pattern id="p" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="#2563EB" stroke-opacity=".16"/></pattern></defs>` +
    `<rect width="1600" height="1000" fill="url(#g)"/><rect width="1600" height="1000" fill="url(#p)"/>` +
    `<text x="800" y="505" text-anchor="middle" fill="#A7AFBA" font-family="sans-serif" font-size="26" letter-spacing="5">${safe}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
