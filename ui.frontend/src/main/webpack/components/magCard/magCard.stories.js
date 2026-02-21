/* eslint-disable max-len */
import { MagCard } from "./magCard";

export default {
  title: "Components/MagCard",
};

/** Default — full card matching reference image */
export const Default = {
  render: () =>
    MagCard({
      fileReference:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=640&q=80",
      title: "Politicians react to defense minister`s resignation",
      text: "<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>",
      category: "Business",
      comments: 0,
      views: 1730,
    }),
};

/** No image — body-only card */
export const NoImage = {
  render: () =>
    MagCard({
      title: "Inside the Race to Build the Next AI Supercomputer",
      text: "<p>Tech giants are spending billions on next-generation chips and cooling systems as the competition to train more powerful AI models heats up.</p>",
      category: "Technology",
      comments: 21,
      views: 6850,
    }),
};

/** No meta — image + title + excerpt only */
export const NoMeta = {
  render: () =>
    MagCard({
      fileReference:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=640&q=80",
      title: "How Remote Work Changed the Way We Travel",
      text: "<p>Millions of workers are now blending business trips with leisure stays, giving rise to the 'bleisure' traveler and reshaping the global hospitality industry.</p>",
    }),
};

/** Long headline stress test */
export const LongTitle = {
  render: () =>
    MagCard({
      fileReference:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=640&q=80",
      title:
        "The Small Greek Island That Is Pioneering a Radical Green Transition by Replacing Its Famous Donkey Taxis with Offshore Wind Energy That Powers the Whole Community",
      text: "<p>A small Greek island is pioneering a radical green transition, replacing its famous donkey taxis with offshore wind energy.</p>",
      category: "Environment",
      comments: 12,
      views: 4320,
    }),
};

/** Minimal — title only */
export const TitleOnly = {
  render: () =>
    MagCard({
      title: "Why Are Some Women Boycotting Twitter?",
    }),
};
