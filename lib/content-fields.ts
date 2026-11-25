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
    defaultValue: "Choir for hire",
  },
  heroTitle: {
    label: "Hero title",
    type: "text",
    group: "Home page",
    defaultValue: "A choir for your occasion",
  },
  heroSubtitle: {
    label: "Hero subtitle",
    type: "textarea",
    group: "Home page",
    defaultValue:
      "We sing for weddings, celebrations and sacred services. Live voices, ready to book.",
  },
  homeIntro: {
    label: "Home introduction",
    type: "textarea",
    group: "Home page",
    defaultValue:
      "Vivàce is a choir for hire. Pick your occasion, share the date, and we bring live harmony to your day.",
  },
  aboutTitle: {
    label: "About title",
    type: "text",
    group: "About page",
    defaultValue: "Who we are",
  },
  aboutText: {
    label: "About text",
    type: "textarea",
    group: "About page",
    defaultValue:
      "At Vivàce, we believe live voices make an occasion feel complete. We are a choir for hire, built for weddings, celebrations, sacred services and private events.\n\nEvery booking is shaped around your day: the room, the moment, and the music that belongs there. Clear, warm and ready when you need us.",
  },
  rehearsalInfo: {
    label: "Booking note (internal / optional)",
    type: "textarea",
    group: "About page",
    defaultValue:
      "Available for weddings, private celebrations, sacred services, and corporate gatherings.",
  },
  contactEmail: {
    label: "Contact email",
    type: "email",
    group: "Contact",
    defaultValue: "thevivaceinfo@gmail.com",
  },
  contactPhone: {
    label: "Contact phone",
    type: "textarea",
    group: "Contact",
    defaultValue: "+94 70 243 3654\n+94 77 713 5776",
  },
  contactAddress: {
    label: "Address",
    type: "textarea",
    group: "Contact",
    defaultValue: "32/9\n4th Lane, Uyana, Moratuwa",
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
