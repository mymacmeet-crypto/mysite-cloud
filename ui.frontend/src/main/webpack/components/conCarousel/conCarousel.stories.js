/* eslint-disable max-len */
import { ConCarousel } from "./conCarousel";

export default {
  title: "Components/ConCarousel",
};

/** Default — Matching reference image */
export const Default = {
  render: () =>
    ConCarousel({
      slides: [
        {
          backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
          title: "Renovating Homes and Offices",
          description: "Our promise as a contractor is to build community value into every project while delivering professional expertise.",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
        {
          backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
          title: "Building Modern Spaces",
          description: "We specialize in creating contemporary designs that combine functionality with aesthetic excellence.",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
        {
          backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
          title: "Commercial Construction Excellence",
          description: "From concept to completion, we deliver high-quality commercial construction projects on time and within budget.",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
      ],
    }),
};

/** Single Slide */
export const SingleSlide = {
  render: () =>
    ConCarousel({
      slides: [
        {
          backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
          title: "Transform Your Vision",
          description: "Expert contractors bringing your dreams to life with precision and care.",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
      ],
    }),
};

/** Two Slides */
export const TwoSlides = {
  render: () =>
    ConCarousel({
      slides: [
        {
          backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
          title: "Residential Expertise",
          description: "Creating beautiful, functional homes that reflect your lifestyle and personality.",
          buttonText: "PROJECTS",
          buttonLink: "/residential",
        },
        {
          backgroundImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80",
          title: "Commercial Solutions",
          description: "Innovative commercial spaces designed for productivity and growth.",
          buttonText: "PROJECTS",
          buttonLink: "/commercial",
        },
      ],
    }),
};

/** Long Title Test */
export const LongTitle = {
  render: () =>
    ConCarousel({
      slides: [
        {
          backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
          title: "Transforming Commercial and Residential Properties With Excellence",
          description: "Our comprehensive approach ensures every project meets the highest standards of quality and craftsmanship.",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
      ],
    }),
};

/** Minimal Content */
export const MinimalContent = {
  render: () =>
    ConCarousel({
      slides: [
        {
          backgroundImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
          title: "Quality Construction",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
        {
          backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
          title: "Expert Renovations",
          buttonText: "PROJECTS",
          buttonLink: "/projects",
        },
      ],
    }),
};
