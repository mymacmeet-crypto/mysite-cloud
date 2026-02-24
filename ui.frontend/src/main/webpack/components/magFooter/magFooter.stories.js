/* eslint-disable max-len */
import { MagFooter } from "./magFooter";

export default {
  title: "Components/MagFooter",
};

const defaultGalleryImages = [
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&q=80",
    alt: "Airplane",
    link: "/gallery/1",
  },
  {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    alt: "Portrait",
    link: "/gallery/2",
  },
  {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80",
    alt: "Nature",
    link: "/gallery/3",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    alt: "Man",
    link: "/gallery/4",
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
    alt: "City",
    link: "/gallery/5",
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=80",
    alt: "Sunset",
    link: "/gallery/6",
  },
];

const defaultQuickLinks = [
  { label: "Lifestyle", link: "/lifestyle" },
  { label: "Sport", link: "/sport" },
  { label: "Culture", link: "/culture" },
  { label: "Business", link: "/business" },
  { label: "Environment", link: "/environment" },
  { label: "World", link: "/world" },
  { label: "Fashion", link: "/fashion" },
  { label: "Interview", link: "/interview" },
];

const defaultRecentComments = [
  {
    text: "Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id laborum.",
  },
];

/** Default — Full footer with all 4 columns */
export const Default = {
  render: () =>
    MagFooter({
      magazineTitle: "MAGAZINE",
      magazineText:
        "<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>",
      galleryTitle: "GALLERY",
      galleryImages: defaultGalleryImages,
      linksTitle: "QUICK LINKS",
      quickLinks: defaultQuickLinks,
      commentsTitle: "RECENT COMMENTS",
      recentComments: defaultRecentComments,
    }),
};

/** Three Columns — No Gallery */
export const NoGallery = {
  render: () =>
    MagFooter({
      magazineTitle: "ABOUT US",
      magazineText:
        "<p>We are a digital magazine covering technology, business, and lifestyle. Our mission is to bring you the latest news and insights from around the world.</p>",
      linksTitle: "QUICK LINKS",
      quickLinks: defaultQuickLinks,
      commentsTitle: "RECENT COMMENTS",
      recentComments: defaultRecentComments,
    }),
};

/** Minimal — Magazine and Links Only */
export const Minimal = {
  render: () =>
    MagFooter({
      magazineTitle: "MAGAZINE",
      magazineText:
        "<p>Your trusted source for news and stories that matter.</p>",
      linksTitle: "QUICK LINKS",
      quickLinks: [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
        { label: "Contact", link: "/contact" },
        { label: "Privacy", link: "/privacy" },
      ],
    }),
};

/** With More Comments */
export const MoreComments = {
  render: () =>
    MagFooter({
      magazineTitle: "MAGAZINE",
      magazineText:
        "<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      galleryTitle: "GALLERY",
      galleryImages: defaultGalleryImages,
      linksTitle: "QUICK LINKS",
      quickLinks: defaultQuickLinks,
      commentsTitle: "RECENT COMMENTS",
      recentComments: [
        {
          text: "Great article! Really enjoyed reading this perspective on modern design trends.",
        },
        {
          text: "Thanks for sharing. This information was exactly what I was looking for.",
        },
        {
          text: "Interesting take on the subject. Would love to see more content like this.",
        },
      ],
    }),
};
