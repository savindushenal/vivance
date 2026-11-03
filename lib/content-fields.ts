// Safe to import from client components; database access lives in lib/content.ts.

type ContentField = {
  label: string;
  type: "text" | "textarea" | "url" | "email";
  group: "General" | "Home page" | "About page" | "Contact" | "Social links";
  defaultValue: string;
};

export const CONTENT_FIELDS = {
  choirName: {
    label: "Choir name",
    type: "text",
    group: "General",
    defaultValue: "Vivàce",
  },
  tagline: {
    label: "Tagline",
    type: "text",
    group: "General",
    defaultValue: "The Living Tempo",
  },
  heroTitle: {
    label: "Hero title",
    type: "text",
    group: "Home page",
    defaultValue: "Voices for weddings, celebrations & occasions",
  },
  heroSubtitle: {
    label: "Hero subtitle",
    type: "textarea",
    group: "Home page",
    defaultValue:
      "A commercial choir for hire — elegant, polished and present for the moments that deserve live harmony.",
  },
  homeIntro: {
    label: "Home introduction",
    type: "textarea",
    group: "Home page",
    defaultValue:
      "From intimate ceremonies to grand receptions, Vivàce brings a living tempo to your occasion. Hire us for weddings, private events, sacred services and corporate gatherings.",
  },
  aboutTitle: {
    label: "About title",
    type: "text",
    group: "About page",
    defaultValue: "About Vivàce",
  },
  aboutText: {
    label: "About text",
    type: "textarea",
    group: "About page",
    defaultValue:
      "Vivàce is a commercial choir built for occasions that deserve live harmony — weddings, celebrations, sacred services and private events.\n\nOur repertoire spans centuries: Renaissance motets and classical masterworks alongside gospel, spirituals and modern arrangements, shaped to fit the tone of your day.\n\nWhether you need a processional, a ceremony set, or a reception performance, we bring polish, warmth and a living tempo to every booking.",
  },
  rehearsalInfo: {
    label: "Rehearsal info",
    type: "textarea",
    group: "About page",
    defaultValue: "We rehearse every Thursday from 7:00 PM to 9:00 PM at the parish hall.",
  },
  contactEmail: {
    label: "Contact email",
    type: "email",
    group: "Contact",
    defaultValue: "hello@vivancechoir.com",
  },
  contactPhone: {
    label: "Contact phone",
    type: "text",
    group: "Contact",
    defaultValue: "+94 77 123 4567",
  },
  contactAddress: {
    label: "Address",
    type: "textarea",
    group: "Contact",
    defaultValue: "St. Mary's Parish Hall\n12 Church Road\nColombo",
  },
  facebookUrl: {
    label: "Facebook URL",
    type: "url",
    group: "Social links",
    defaultValue: "",
  },
  instagramUrl: {
    label: "Instagram URL",
    type: "url",
    group: "Social links",
    defaultValue: "",
  },
  youtubeUrl: {
    label: "YouTube URL",
    type: "url",
    group: "Social links",
    defaultValue: "",
  },
} satisfies Record<string, ContentField>;

export type ContentKey = keyof typeof CONTENT_FIELDS;
export type SiteContent = Record<ContentKey, string>;

export const CONTENT_KEYS = Object.keys(CONTENT_FIELDS) as ContentKey[];
