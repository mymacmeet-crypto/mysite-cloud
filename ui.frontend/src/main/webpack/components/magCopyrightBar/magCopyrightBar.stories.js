/* eslint-disable max-len */
import { MagCopyrightBar } from "./magCopyrightBar";

export default {
  title: "Components/MagCopyrightBar",
};

const defaultFooterLinks = [
  { label: "Privacy & cookie policy", link: "/privacy" },
  { label: "Terms and condition", link: "/terms" },
];

/** Default — Full copyright bar with all elements */
export const Default = {
  render: () =>
    MagCopyrightBar({
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
    MagCopyrightBar({
      copyrightText:
        "Copyright &copy; 2026 Pearl Multipurpose WordPress Theme by StyleMixThemes.",
      footerLinks: defaultFooterLinks,
    }),
};

/** Minimal — Copyright only */
export const Minimal = {
  render: () =>
    MagCopyrightBar({
      copyrightText:
        "Copyright &copy; 2026 Pearl Multipurpose WordPress Theme by StyleMixThemes.",
    }),
};

/** With More Links */
export const WithMoreLinks = {
  render: () =>
    MagCopyrightBar({
      copyrightText: "Copyright &copy; 2026 MyCompany. All rights reserved.",
      footerLinks: [
        { label: "About Us", link: "/about" },
        { label: "Contact", link: "/contact" },
        { label: "Privacy Policy", link: "/privacy" },
        { label: "Terms of Service", link: "/terms" },
      ],
      twitterUrl: "https://twitter.com",
      facebookUrl: "https://facebook.com",
    }),
};
