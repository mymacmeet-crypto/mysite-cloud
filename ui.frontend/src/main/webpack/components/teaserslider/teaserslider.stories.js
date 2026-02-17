/* eslint-disable max-len */
import { TeaserSlider } from "./teaserslider";

export default {
  title: "Components/TeaserSlider",
};

const sampleItems = [
  {
    fileReference:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=640&q=80",
    title: "The island that swapped donkey rides for offshore wind",
    text: "<p>A small Greek island is pioneering a radical green transition, replacing its famous donkey taxis with offshore wind energy that powers the whole community.</p>",
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=640&q=80",
    title: "Politicians react to defense minister's resignation",
    text: "<p>Lawmakers from across the political spectrum weighed in on the shock departure, with some calling it inevitable and others demanding a full parliamentary inquiry.</p>",
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=640&q=80",
    title: "Why are some women boycotting Twitter?",
    text: "<p>A growing movement of women is stepping away from the platform after a series of policy changes they say have made it less safe for female voices online.</p>",
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80",
    title: "The Reading Habits Of Highly Successful People",
    text: "<p>From Warren Buffett to Oprah Winfrey, the world's top performers share a surprisingly consistent daily ritual — and it starts with a book.</p>",
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=640&q=80",
    title: "How Remote Work Changed the Way We Travel",
    text: "<p>Millions of workers are now blending business trips with leisure stays, giving rise to the 'bleisure' traveler and reshaping the global hospitality industry.</p>",
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&q=80",
    title: "Inside the Race to Build the Next AI Supercomputer",
    text: "<p>Tech giants are spending billions on next-generation chips and cooling systems as the competition to train more powerful AI models heats up across continents.</p>",
  },
];

/** Default — 6 cards, manual navigation only */
export const Default = {
  render: () =>
    TeaserSlider({
      sectionTitle: "Most Watch",
      customCardList: sampleItems,
      autoplay: "false",
      delay: 5000,
    }),
};

/** Autoplay enabled — slides every 3 s */
export const WithAutoplay = {
  render: () =>
    TeaserSlider({
      sectionTitle: "Most Watch",
      customCardList: sampleItems,
      autoplay: "true",
      delay: 3000,
    }),
};

/** Four items — fills track with no overflow */
export const FourItems = {
  render: () =>
    TeaserSlider({
      sectionTitle: "Featured",
      customCardList: sampleItems.slice(0, 4),
      autoplay: "false",
      delay: 5000,
    }),
};

/** Two items */
export const TwoItems = {
  render: () =>
    TeaserSlider({
      sectionTitle: "Editor's Pick",
      customCardList: sampleItems.slice(0, 2),
      autoplay: "false",
      delay: 5000,
    }),
};
