/* eslint-disable max-len */
import { MagFooter } from "./magFooter";

export default {
  title: "Components/MagFooter",
};

const defaultFooterLinks = [
  { label: "Privacy & cookie policy", link: "/privacy" },
  { label: "Terms and condition", link: "/terms" },
];

/** Default — Full footer matching the Pearl theme */
export const Default = {
  render: () =>
    MagFooter({
      copyrightText:
        "Copyright &copy; 2026 Pearl Multipurpose WordPress Theme by StyleMixThemes.",
      footerLinks: defaultFooterLinks,
      twitterUrl: "https://twitter.com",
      facebookUrl: "https://facebook.com",
    }),
};

/** No Social Icons */
export const NoSocialIcons = {
  render: () =>
    MagFooter({
      copyrightText:
        "Copyright &copy; 2026 Pearl Multipurpose WordPress Theme by StyleMixThemes.",
      footerLinks: defaultFooterLinks,
    }),
};

/** Minimal — Copyright only */
export const Minimal = {
  render: () =>
    MagFooter({
      copyrightText:
        "Copyright &copy; 2026 Pearl Multipurpose WordPress Theme by StyleMixThemes.",
    }),
};
