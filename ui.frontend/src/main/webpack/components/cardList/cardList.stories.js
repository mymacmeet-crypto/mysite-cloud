import { CardList } from "./cardList";

export default {
  title: "Components/CardList",
  argTypes: {
    items: {
      control: "object",
      description: "Array of card items with title, text, and fileReference",
    },
  },
};

const sampleItems = [
  {
    title: "Explore Nature",
    text: "Discover the beauty of nature through stunning landscapes and breathtaking views.",
    fileReference:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
  },
  {
    title: "Modern Architecture",
    text: "Experience cutting-edge design and innovation in contemporary architectural masterpieces.",
    fileReference:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
  },
  {
    title: "Urban Living",
    text: "Explore vibrant city life and the dynamic energy of <b>metropolitan</b> areas worldwide.",
    fileReference:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },
];

export const Default = {
  args: {
    items: sampleItems,
  },
  render: (args) => CardList(args),
};

export const SingleCard = {
  args: {
    items: [sampleItems[0]],
  },
  render: (args) => CardList(args),
};

export const EmptyList = {
  args: {
    items: [],
  },
  render: (args) => CardList(args),
};
