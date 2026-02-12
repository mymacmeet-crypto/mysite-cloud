import { CustomCardList } from "./customcardlist";

export default {
  title: "Components/CustomCardList",
  argTypes: {
    items: {
      control: "object",
      description: "Array of card items with title, text, and fileReference",
    },
  },
};

const sampleItems = [
  {
    title: "Urban Living",
    text: "Discover the vibrant energy of city life with modern architecture and cultural landmarks.",
    fileReference:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
  },
  {
    title: "Nature Escape",
    text: "Explore the beauty of untouched wilderness and find peace in the great outdoors.",
    fileReference:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
  },
  {
    title: "Tech Innovation",
    text: "Stay ahead of the curve with the latest in <b>technology</b> and <i>innovation</i>.",
    fileReference:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },
];

export const Default = {
  args: {
    items: sampleItems,
  },
  render: (args) => CustomCardList(args),
};

export const SingleCard = {
  args: {
    items: [sampleItems[0]],
  },
  render: (args) => CustomCardList(args),
};

export const EmptyList = {
  args: {
    items: [],
  },
  render: (args) => CustomCardList(args),
};

export const Playground = {
  args: {
    items: sampleItems,
  },
  render: (args) => CustomCardList(args),
};
