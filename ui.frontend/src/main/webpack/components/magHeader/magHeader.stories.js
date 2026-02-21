/* eslint-disable max-len */
import { MagHeader } from "./magHeader";

export default {
  title: "Components/MagHeader",
};

const defaultNavItems = [
  {
    label: "POSTS",
    link: "/posts",
  },
  {
    label: "NEWS",
    link: "/news",
    submenu: [
      { label: "NEWS – LIST VIEW", link: "/news/list" },
      { label: "NEWS – GRID VIEW", link: "/news/grid" },
    ],
  },
  {
    label: "SPORT",
    link: "/sport",
  },
  {
    label: "CULTURE",
    link: "/culture",
  },
  {
    label: "BUSINESS",
    link: "/business",
  },
  {
    label: "LIFESTYLE",
    link: "/lifestyle",
  },
  {
    label: "ELEMENTS",
    link: "/elements",
  },
];

/** Default — Full header with all features */
export const Default = {
  render: () =>
    MagHeader({
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      logoLink: "/",
      logoAlt: "Pearl Magazine",
      twitterUrl: "https://twitter.com",
      facebookUrl: "https://facebook.com",
      youtubeUrl: "https://youtube.com",
      subscribeUrl: "/subscribe",
      weatherText: "5° in California",
      aaButtonUrl: "/accessibility",
      navItems: defaultNavItems,
    }),
};

/** No Social Links */
export const NoSocialLinks = {
  render: () =>
    MagHeader({
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      logoLink: "/",
      logoAlt: "Pearl Magazine",
      subscribeUrl: "/subscribe",
      weatherText: "5° in California",
      aaButtonUrl: "/accessibility",
      navItems: defaultNavItems,
    }),
};

/** Simple Navigation — No dropdowns */
export const SimpleNav = {
  render: () =>
    MagHeader({
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      logoLink: "/",
      logoAlt: "Pearl Magazine",
      twitterUrl: "https://twitter.com",
      facebookUrl: "https://facebook.com",
      youtubeUrl: "https://youtube.com",
      subscribeUrl: "/subscribe",
      weatherText: "12° in London",
      aaButtonUrl: "/accessibility",
      navItems: [
        { label: "HOME", link: "/" },
        { label: "ABOUT", link: "/about" },
        { label: "ARTICLES", link: "/articles" },
        { label: "CONTACT", link: "/contact" },
      ],
    }),
};

/** Multiple Dropdowns */
export const MultipleDropdowns = {
  render: () =>
    MagHeader({
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      logoLink: "/",
      logoAlt: "Pearl Magazine",
      twitterUrl: "https://twitter.com",
      facebookUrl: "https://facebook.com",
      youtubeUrl: "https://youtube.com",
      subscribeUrl: "/subscribe",
      weatherText: "18° in Sydney",
      aaButtonUrl: "/accessibility",
      navItems: [
        {
          label: "NEWS",
          link: "/news",
          submenu: [
            { label: "World News", link: "/news/world" },
            { label: "Local News", link: "/news/local" },
            { label: "Breaking News", link: "/news/breaking" },
          ],
        },
        {
          label: "SPORT",
          link: "/sport",
          submenu: [
            { label: "Football", link: "/sport/football" },
            { label: "Basketball", link: "/sport/basketball" },
            { label: "Tennis", link: "/sport/tennis" },
          ],
        },
        {
          label: "LIFESTYLE",
          link: "/lifestyle",
          submenu: [
            { label: "Food & Drink", link: "/lifestyle/food" },
            { label: "Travel", link: "/lifestyle/travel" },
            { label: "Health", link: "/lifestyle/health" },
          ],
        },
        { label: "CULTURE", link: "/culture" },
      ],
    }),
};

/** Minimal — Logo and basic nav only */
export const Minimal = {
  render: () =>
    MagHeader({
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      logoLink: "/",
      logoAlt: "Minimal Magazine",
      navItems: [
        { label: "HOME", link: "/" },
        { label: "BLOG", link: "/blog" },
        { label: "ABOUT", link: "/about" },
      ],
    }),
};
