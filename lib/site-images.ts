/** Tracked, compressed brand photos under /public/brand (uploads/ is gitignored). */
export const SITE_IMAGES = {
  hero: "/brand/hero-choir.jpg",
  about: "/brand/site/about.jpg",
  performance: "/brand/site/performance.jpg",
  piano: "/brand/site/piano.jpg",
  squareA: "/brand/site/stage.jpg",
  portrait: "/brand/site/portrait.jpg",
  group: "/brand/site/wedding.jpg",
  candid: "/brand/site/candid.jpg",
  moment: "/brand/site/moment.jpg",
  learning: "/brand/site/learning.jpg",
  livePresence: "/brand/site/live.jpg",
} as const;

export const GALLERY_IMAGES = [
  { src: SITE_IMAGES.squareA, alt: "Vivàce in performance", label: "On stage" },
  { src: SITE_IMAGES.piano, alt: "Vivàce pianist", label: "Finding the melody" },
  { src: SITE_IMAGES.learning, alt: "Vivàce singer in session", label: "Learning together" },
  { src: SITE_IMAGES.candid, alt: "Vivàce members", label: "Shared moments" },
  { src: SITE_IMAGES.livePresence, alt: "Vivàce performing live", label: "Live presence" },
  { src: SITE_IMAGES.moment, alt: "Vivàce celebration", label: "Celebration" },
] as const;
