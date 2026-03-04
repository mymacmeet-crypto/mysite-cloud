/* eslint-disable max-len */
import { MagTab } from "./magTab";

export default {
  title: "Components/MagTab",
};

// Tabs are now auto-generated from card categories — no `tabs` prop needed.

const sampleCards = [
  {
    fileReference:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    title: "Modern Office Building Design",
    text: "<p>Contemporary architecture with sustainable materials and innovative workspace solutions.</p>",
    category: "BUILDINGS",
    comments: 12,
    views: 450,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    title: "Corporate Headquarters Renovation",
    text: "<p>Complete transformation of a landmark building with modern amenities.</p>",
    category: "BUILDINGS",
    comments: 8,
    views: 320,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    title: "Minimalist Living Room Concept",
    text: "<p>Clean lines and neutral tones create a peaceful living environment.</p>",
    category: "INTERIOR DESIGN",
    comments: 24,
    views: 780,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    title: "Scandinavian Kitchen Design",
    text: "<p>Functional and beautiful Nordic-inspired culinary space.</p>",
    category: "INTERIOR DESIGN",
    comments: 18,
    views: 620,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80",
    title: "Modern Home Insulation",
    text: "<p>Energy-efficient insulation solutions for contemporary homes.</p>",
    category: "ISOLATION",
    comments: 6,
    views: 210,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    title: "Eco-Friendly Insulation System",
    text: "<p>Sustainable thermal protection using recycled materials.</p>",
    category: "ISOLATION",
    comments: 9,
    views: 340,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80",
    title: "Commercial Plumbing Installation",
    text: "<p>High-efficiency water systems for large-scale buildings.</p>",
    category: "PLUMBING",
    comments: 4,
    views: 180,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80",
    title: "Luxury Bathroom Fixtures",
    text: "<p>Premium plumbing solutions for high-end residential projects.</p>",
    category: "PLUMBING",
    comments: 15,
    views: 530,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80",
    title: "Ceramic Floor Installation",
    text: "<p>Expert craftsmanship in contemporary tile design and installation.</p>",
    category: "TILING",
    comments: 11,
    views: 410,
  },
];

const parentPathCards = [
  {
    fileReference:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    title: "Shared Heritage Library",
    text: "<p>Cards pulled from a shared MagView component via Parent Path.</p>",
    category: "BUILDINGS",
    comments: 31,
    views: 1200,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    title: "Global Innovation Hub",
    text: "<p>A multi-site workspace designed for collaborative research.</p>",
    category: "INTERIOR DESIGN",
    comments: 44,
    views: 2100,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    title: "Green Rooftop Garden Complex",
    text: "<p>Urban farming meets architectural innovation.</p>",
    category: "BUILDINGS",
    comments: 19,
    views: 870,
  },
];

/** Default — tabs auto-generated from card categories */
export const Default = {
  render: () =>
    MagTab({
      title: "Featured Projects",
      cards: sampleCards,
    }),
};

/**
 * ParentPath — simulates MagTabModel resolving parentPath at runtime.
 * The title is supplied directly here (as MagTabModel would pull it from
 * jcr:title); cards come from the simulated parentPathCards array.
 */
export const ParentPath = {
  render: () =>
    MagTab({
      title: "Shared Portfolio",
      parentPath:
        "/content/mysite/en/shared-projects/jcr:content/root/container/magtab",
      cards: parentPathCards,
    }),
};

/** Three categories */
export const ThreeCategories = {
  render: () =>
    MagTab({
      title: "Our Services",
      cards: sampleCards.slice(0, 6),
    }),
};

/** No Title */
export const NoTitle = {
  render: () =>
    MagTab({
      cards: sampleCards.slice(0, 6),
    }),
};

/** Minimal Cards */
export const MinimalCards = {
  render: () =>
    MagTab({
      title: "Recent Work",
      cards: [
        {
          fileReference:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
          title: "Residential Project Alpha",
          category: "RESIDENTIAL",
        },
        {
          fileReference:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
          title: "Commercial Tower Beta",
          category: "COMMERCIAL",
        },
        {
          fileReference:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
          title: "Home Renovation Gamma",
          category: "RESIDENTIAL",
        },
      ],
    }),
};
