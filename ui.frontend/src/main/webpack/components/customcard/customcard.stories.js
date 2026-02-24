import { CustomCard } from "./customcard";

export default {
  title: "Components/CustomCard",
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    text: {
      control: "text",
      description: "Card description (supports HTML)",
    },
    fileReference: {
      control: "text",
      description: "Image URL or DAM path",
    },
  },
};

export const Default = {
  args: {
    title: "Urban Living",
    text: "Discover the vibrant energy of city life with modern architecture and cultural landmarks.",
    fileReference:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
  },
  render: (args) => CustomCard(args),
};

export const WithoutImage = {
  args: {
    title: "Text Only Card",
    text: "This card has no image, only a title and description text.",
    fileReference: "",
  },
  render: (args) => CustomCard(args),
};

export const WithRichText = {
  args: {
    title: "Rich Text Card",
    text: "<b>Bold text</b> and <i>italic text</i> with a <a href='#'>link</a>.<ul><li>List item 1</li><li>List item 2</li></ul>",
    fileReference:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
  },
  render: (args) => CustomCard(args),
};

export const Playground = {
  args: {
    title: "Card Title",
    text: "Card description goes here.",
    fileReference:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
  },
  render: (args) => CustomCard(args),
};
