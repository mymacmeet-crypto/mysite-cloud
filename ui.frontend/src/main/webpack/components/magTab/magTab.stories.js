/* eslint-disable max-len */
import { MagTab } from "./magTab";

export default {
  title: "Components/MagTab",
};

const sampleCards = [
  {
    fileReference: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    title: "Modern Office Building Design",
    text: "<p>Contemporary architecture with sustainable materials and innovative workspace solutions.</p>",
    category: "BUILDINGS",
    comments: 12,
    views: 450,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    title: "Corporate Headquarters Renovation",
    text: "<p>Complete transformation of a landmark building with modern amenities.</p>",
    category: "BUILDINGS",
    comments: 8,
    views: 320,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    title: "Minimalist Living Room Concept",
    text: "<p>Clean lines and neutral tones create a peaceful living environment.</p>",
    category: "INTERIOR DESIGN",
    comments: 24,
    views: 780,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    title: "Scandinavian Kitchen Design",
    text: "<p>Functional and beautiful Nordic-inspired culinary space.</p>",
    category: "INTERIOR DESIGN",
    comments: 18,
    views: 620,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80",
    title: "Modern Home Insulation",
    text: "<p>Energy-efficient insulation solutions for contemporary homes.</p>",
    category: "ISOLATION",
    comments: 6,
    views: 210,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    title: "Eco-Friendly Insulation System",
    text: "<p>Sustainable thermal protection using recycled materials.</p>",
    category: "ISOLATION",
    comments: 9,
    views: 340,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80",
    title: "Commercial Plumbing Installation",
    text: "<p>High-efficiency water systems for large-scale buildings.</p>",
    category: "PLUMBING",
    comments: 4,
    views: 180,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80",
    title: "Luxury Bathroom Fixtures",
    text: "<p>Premium plumbing solutions for high-end residential projects.</p>",
    category: "PLUMBING",
    comments: 15,
    views: 530,
  },
  {
    fileReference: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80",
    title: "Ceramic Floor Installation",
    text: "<p>Expert craftsmanship in contemporary tile design and installation.</p>",
    category: "TILING",
    comments: 11,
    views: 410,
  },
];

/** Default — Matching reference image */
export const Default = {
  render: () =>
    MagTab({
      title: "Featured Projects",
      tabs: [
        { label: "ALL PROJECTS", category: "all" },
        { label: "BUILDINGS", category: "BUILDINGS" },
        { label: "INTERIOR DESIGN", category: "INTERIOR DESIGN" },
        { label: "ISOLATION", category: "ISOLATION" },
        { label: "PLUMBING", category: "PLUMBING" },
        { label: "TILING", category: "TILING" },
      ],
      cards: sampleCards,
    }),
};

/** Three Tabs Only */
export const ThreeTabs = {
  render: () =>
    MagTab({
      title: "Our Services",
      tabs: [
        { label: "ALL", category: "all" },
        { label: "DESIGN", category: "INTERIOR DESIGN" },
        { label: "CONSTRUCTION", category: "BUILDINGS" },
      ],
      cards: sampleCards.slice(0, 6),
    }),
};

/** No Title */
export const NoTitle = {
  render: () =>
    MagTab({
      tabs: [
        { label: "ALL PROJECTS", category: "all" },
        { label: "BUILDINGS", category: "BUILDINGS" },
        { label: "INTERIOR DESIGN", category: "INTERIOR DESIGN" },
      ],
      cards: sampleCards.slice(0, 6),
    }),
};

/** Many Tabs (Mobile Scroll Test) */
export const ManyTabs = {
  render: () =>
    MagTab({
      title: "Complete Portfolio",
      tabs: [
        { label: "ALL PROJECTS", category: "all" },
        { label: "ARCHITECTURE", category: "BUILDINGS" },
        { label: "INTERIOR DESIGN", category: "INTERIOR DESIGN" },
        { label: "THERMAL INSULATION", category: "ISOLATION" },
        { label: "PLUMBING SYSTEMS", category: "PLUMBING" },
        { label: "TILE WORK", category: "TILING" },
        { label: "LANDSCAPING", category: "LANDSCAPE" },
        { label: "ELECTRICAL", category: "ELECTRICAL" },
      ],
      cards: sampleCards,
    }),
};

/** Minimal Cards */
export const MinimalCards = {
  render: () =>
    MagTab({
      title: "Recent Work",
      tabs: [
        { label: "ALL", category: "all" },
        { label: "RESIDENTIAL", category: "RESIDENTIAL" },
        { label: "COMMERCIAL", category: "COMMERCIAL" },
      ],
      cards: [
        {
          fileReference: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
          title: "Residential Project Alpha",
          category: "RESIDENTIAL",
        },
        {
          fileReference: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
          title: "Commercial Tower Beta",
          category: "COMMERCIAL",
        },
        {
          fileReference: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
          title: "Home Renovation Gamma",
          category: "RESIDENTIAL",
        },
      ],
    }),
};
