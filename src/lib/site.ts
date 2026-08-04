export const SITE = {
  name: "Precise Wolf Digital",
  shortName: "Precise Wolf",
  url: "https://www.precisewolf.com",
  city: "Denver, CO",
  founderYearsExperience: 10,
  yearsInBusiness: 2.5,
  phone: "303.927.8228",
  phoneHref: "+13039278228",
  email: "Ted@PreciseWolf.com",
  addressLine: "Denver, Colorado",
  calLink: "precisewolf/30min",
};

export const AUTHOR = {
  name: "Ted Martinez",
  photo: "/headshot/Ted-Martinez-Headshot-Precise-Wolf-Digital.png",
};

export const PODCAST_PLATFORMS = [
  {
    name: "YouTube",
    icon: "/podcast/icons/youtube.png",
    href: "https://www.youtube.com/playlist?list=PL8V1pLWolwwUEMH7MC0_cMQhmqiTGv6Md",
  },
  {
    name: "Apple Podcasts",
    icon: "/podcast/icons/apple-music.png",
    href: "https://podcasts.apple.com/us/podcast/inside-the-attorneys-mind/id1893727741",
  },
  {
    name: "Spotify",
    icon: "/podcast/icons/spotify.png",
    href: "https://open.spotify.com/show/3gJ0zO2b5wyk3WhbRpFdvh",
  },
  {
    name: "Amazon Music",
    icon: "/podcast/icons/amazon-music.png",
    href: "https://music.amazon.com/podcasts/181bfe9b-ba79-44c8-9c49-c297c8c01313/inside-the-attorney's-mind",
  },
] as const;

export type NavLink = {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  {
    key: "services",
    href: "/services",
    children: [
      { key: "webDesign", href: "/services/web-design" },
      { key: "seo", href: "/services/seo" },
      { key: "ecommerce", href: "/services/ecommerce" },
    ],
  },
  { key: "portfolio", href: "/portfolio" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "pricing", href: "/pricing" },
  {
    key: "resources",
    href: "/blog",
    children: [
      { key: "about", href: "/about" },
      { key: "blog", href: "/blog" },
      { key: "podcast", href: "/podcast" },
      { key: "whitePaper", href: "/white-paper" },
    ],
  },
  { key: "contact", href: "/contact" },
];
