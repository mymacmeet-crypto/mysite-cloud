/* eslint-disable max-len */
import { MagView } from "./magView";

export default {
  title: "Components/MagView",
};

const sampleItems = [
  {
    fileReference:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=640&q=80",
    title: "The island that swapped donkey rides for offshore wind",
    text: "<p>A small Greek island is pioneering a radical green transition, replacing its famous donkey taxis with offshore wind energy that powers the whole community.</p>",
    category: "Environment",
    date: "3 days ago",
    comments: 12,
    views: 4320,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=640&q=80",
    title: "Politicians react to defense minister's resignation",
    text: "<p>Lawmakers from across the political spectrum weighed in on the shock departure, with some calling it inevitable and others demanding a full parliamentary inquiry.</p>",
    category: "Politics",
    date: "1 week ago",
    comments: 38,
    views: 9104,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=640&q=80",
    title: "Why are some women boycotting Twitter?",
    text: "<p>A growing movement of women is stepping away from the platform after a series of policy changes they say have made it less safe for female voices online.</p>",
    category: "Technology",
    date: "2 days ago",
    comments: 156,
    views: 12450,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80",
    title: "The Reading Habits Of Highly Successful People",
    text: "<p>From Warren Buffett to Oprah Winfrey, the world's top performers share a surprisingly consistent daily ritual — and it starts with a book.</p>",
    category: "Lifestyle",
    date: "5 days ago",
    comments: 67,
    views: 8921,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=640&q=80",
    title: "How Remote Work Changed the Way We Travel",
    text: "<p>Millions of workers are now blending business trips with leisure stays, giving rise to the 'bleisure' traveler and reshaping the global hospitality industry.</p>",
    category: "Travel",
    date: "1 day ago",
    comments: 34,
    views: 5670,
  },
  {
    fileReference:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&q=80",
    title: "Inside the Race to Build the Next AI Supercomputer",
    text: "<p>Tech giants are spending billions on next-generation chips and cooling systems as the competition to train more powerful AI models heats up across continents.</p>",
    category: "Technology",
    date: "4 days ago",
    comments: 89,
    views: 15320,
  },
];

/** Default — Card Grid View (3 columns) */
export const CardView = {
  render: () =>
    MagView({
      sectionTitle: "Most Read",
      viewType: "card",
      items: sampleItems,
    }),
};

/** List View — Vertical Stack */
export const ListView = {
  render: () =>
    MagView({
      sectionTitle: "Latest Articles",
      viewType: "list",
      items: sampleItems,
    }),
};

/** Card View — 3 items only */
export const CardViewThreeItems = {
  render: () =>
    MagView({
      sectionTitle: "Featured Stories",
      viewType: "card",
      items: sampleItems.slice(0, 3),
    }),
};

/** List View — 3 items only */
export const ListViewThreeItems = {
  render: () =>
    MagView({
      sectionTitle: "Editor's Pick",
      viewType: "list",
      items: sampleItems.slice(0, 3),
    }),
};

/** No Section Title — Card View */
export const CardViewNoTitle = {
  render: () =>
    MagView({
      viewType: "card",
      items: sampleItems.slice(0, 3),
    }),
};

/** No Section Title — List View */
export const ListViewNoTitle = {
  render: () =>
    MagView({
      viewType: "list",
      items: sampleItems.slice(0, 3),
    }),
};
