import { Card } from "./card";

export default {
  title: "Components/Card",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "shadow", "bordered", "flat"],
      description: "Card variant style",
    },
    imageSrc: {
      control: { type: "text" },
      description: "Image source URL",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Image alt text",
    },
    title: {
      control: { type: "text" },
      description: "Card title",
    },
    description: {
      control: { type: "text" },
      description: "Card description",
    },
    showImage: {
      control: { type: "boolean" },
      description: "Show or hide image",
    },
    imageRadius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "Image border radius",
    },
    isHoverable: {
      control: { type: "boolean" },
      description: "Enable hover lift effect",
    },
    isPressable: {
      control: { type: "boolean" },
      description: "Enable press scale effect",
    },
  },
};

export const Default = {
  args: {
    variant: "default",
    imageSrc: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    imageAlt: "Beautiful landscape",
    title: "Explore Nature",
    description:
      "Discover the beauty of nature through stunning landscapes and breathtaking views from around the world.",
    showImage: true,
    imageRadius: "none",
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const WithShadow = {
  args: {
    variant: "shadow",
    imageSrc: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
    imageAlt: "Modern architecture",
    title: "Modern Architecture",
    description:
      "Experience cutting-edge design and innovation in contemporary architectural masterpieces.",
    showImage: true,
    imageRadius: "none",
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const Bordered = {
  args: {
    variant: "bordered",
    imageSrc: "https://images.unsplash.com/photo-1682687221038-404cb8830901",
    imageAlt: "Urban cityscape",
    title: "Urban Living",
    description:
      "Explore vibrant city life and the dynamic energy of metropolitan areas worldwide.",
    showImage: true,
    imageRadius: "none",
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const Flat = {
  args: {
    variant: "flat",
    imageSrc: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb",
    imageAlt: "Minimalist design",
    title: "Minimalist Design",
    description:
      "Embrace simplicity and elegance with clean, minimal design principles and aesthetics.",
    showImage: true,
    imageRadius: "none",
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const WithRoundedImage = {
  args: {
    variant: "shadow",
    imageSrc: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    imageAlt: "Rounded image card",
    title: "Creative Corners",
    description:
      "Add a touch of softness to your designs with beautifully rounded image corners.",
    showImage: true,
    imageRadius: "lg",
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const Hoverable = {
  args: {
    variant: "shadow",
    imageSrc: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
    imageAlt: "Interactive card",
    title: "Interactive Card",
    description:
      "Hover over this card to see a smooth lift animation that enhances user interaction.",
    showImage: true,
    imageRadius: "none",
    isHoverable: true,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const Pressable = {
  args: {
    variant: "shadow",
    imageSrc: "https://images.unsplash.com/photo-1682687221038-404cb8830901",
    imageAlt: "Clickable card",
    title: "Clickable Card",
    description:
      "Click this card to experience a satisfying press effect with scale animation.",
    showImage: true,
    imageRadius: "none",
    isHoverable: false,
    isPressable: true,
  },
  render: (args) => Card(args),
};

export const HoverableAndPressable = {
  args: {
    variant: "shadow",
    imageSrc: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb",
    imageAlt: "Fully interactive card",
    title: "Fully Interactive",
    description:
      "This card combines both hover lift and press effects for maximum interactivity.",
    showImage: true,
    imageRadius: "md",
    isHoverable: true,
    isPressable: true,
  },
  render: (args) => Card(args),
};

export const WithoutImage = {
  args: {
    variant: "bordered",
    title: "Text Only Card",
    description:
      "Sometimes you don't need an image. This card demonstrates a clean text-only layout that's perfect for simple content.",
    showImage: false,
    isHoverable: false,
    isPressable: false,
  },
  render: (args) => Card(args),
};

export const AllVariants = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns =
      "repeat(auto-fit, minmax(300px, 1fr))";
    container.style.gap = "2rem";
    container.style.padding = "2rem";
    container.style.maxWidth = "1400px";
    container.style.margin = "0 auto";

    const variants = [
      {
        variant: "default",
        imageSrc:
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        imageAlt: "Default variant",
        title: "Default Card",
        description: "Simple card with a border and clean design.",
        showImage: true,
        imageRadius: "none",
        isHoverable: false,
        isPressable: false,
      },
      {
        variant: "shadow",
        imageSrc:
          "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
        imageAlt: "Shadow variant",
        title: "Shadow Card",
        description: "Elevated card with a subtle shadow effect.",
        showImage: true,
        imageRadius: "none",
        isHoverable: false,
        isPressable: false,
      },
      {
        variant: "bordered",
        imageSrc:
          "https://images.unsplash.com/photo-1682687221038-404cb8830901",
        imageAlt: "Bordered variant",
        title: "Bordered Card",
        description: "Card with a prominent border for emphasis.",
        showImage: true,
        imageRadius: "none",
        isHoverable: false,
        isPressable: false,
      },
      {
        variant: "flat",
        imageSrc:
          "https://images.unsplash.com/photo-1682687221080-5cb261c645cb",
        imageAlt: "Flat variant",
        title: "Flat Card",
        description: "Minimalist card with a flat background.",
        showImage: true,
        imageRadius: "none",
        isHoverable: false,
        isPressable: false,
      },
      {
        variant: "shadow",
        imageSrc:
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        imageAlt: "Interactive card",
        title: "Interactive Card",
        description: "Hover and click for smooth animations.",
        showImage: true,
        imageRadius: "md",
        isHoverable: true,
        isPressable: true,
      },
      {
        variant: "bordered",
        title: "Text Only Card",
        description: "Perfect for content that doesn't need imagery.",
        showImage: false,
        isHoverable: true,
        isPressable: false,
      },
    ];

    variants.forEach((variant) => {
      const cardElement = Card(variant);
      container.appendChild(cardElement);
    });

    return container;
  },
};
