/* eslint-disable max-len */
import { MagList } from "./magList";

export default {
  title: "Components/MagList",
};

/** Default — full card with all fields */
export const Default = {
  render: () =>
    MagList({
      fileReference:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80",
      title: "I Was Shut Out By My Mother For Being Depressed At Age 14",
      category: "Lifestyle",
      date: "7 years ago",
      comments: 0,
      views: 1627,
      text: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>",
    }),
};

/** No image */
export const NoImage = {
  render: () =>
    MagList({
      title: "Inside the Race to Build the Next AI Supercomputer",
      category: "Technology",
      date: "2 days ago",
      comments: 21,
      views: 6850,
      text: "<p>Tech giants are spending billions on next-generation chips and cooling systems as the competition to train more powerful AI models heats up across continents.</p>",
    }),
};

/** No badge / meta — title and excerpt only */
export const MinimalCard = {
  render: () =>
    MagList({
      fileReference:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=480&q=80",
      title: "How Remote Work Changed the Way We Travel",
      text: "<p>Millions of workers are now blending business trips with leisure stays, giving rise to the 'bleisure' traveler and reshaping the global hospitality industry.</p>",
    }),
};

/** Long headline stress test */
export const LongTitle = {
  render: () =>
    MagList({
      fileReference:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=480&q=80",
      title:
        "The Small Greek Island That Is Pioneering a Radical Green Transition by Replacing Its Famous Donkey Taxis with Offshore Wind Energy",
      category: "Environment",
      date: "3 days ago",
      comments: 12,
      views: 4320,
      text: "<p>A small Greek island is pioneering a radical green transition, replacing its famous donkey taxis with offshore wind energy that powers the whole community.</p>",
    }),
};
