/** Curated public gallery from /public/uploads/Photos */
export const SITE_IMAGES = {
  hero: "/brand/hero-choir.jpg",
  about: "/uploads/Photos/1794422625686.jpg",
  performance: "/uploads/Photos/1794422693594.jpg",
  piano: "/uploads/Photos/1794422578141.jpg",
  squareA: "/uploads/Photos/1794422589499.jpg",
  squareB: "/uploads/Photos/1794422604289.jpg",
  portrait: "/uploads/Photos/1794422616649.jpg",
  group: "/uploads/Photos/1794422613210.jpg",
  candid: "/uploads/Photos/1794422584674.jpg",
  moment: "/uploads/Photos/1794422715490.jpg",
  learning: "/uploads/Photos/1794422729672.jpg",
  livePresence: "/uploads/Photos/1794422580715.jpg",
} as const;

export const GALLERY_IMAGES = [
  { src: SITE_IMAGES.squareA, alt: "Vivàce in performance", label: "On stage" },
  { src: SITE_IMAGES.piano, alt: "Vivàce pianist", label: "Finding the melody" },
  { src: SITE_IMAGES.learning, alt: "Vivàce singer in session", label: "Learning together" },
  { src: SITE_IMAGES.candid, alt: "Vivàce members", label: "Shared moments" },
  { src: SITE_IMAGES.livePresence, alt: "Vivàce performing live", label: "Live presence" },
  { src: SITE_IMAGES.moment, alt: "Vivàce celebration", label: "Celebration" },
] as const;
