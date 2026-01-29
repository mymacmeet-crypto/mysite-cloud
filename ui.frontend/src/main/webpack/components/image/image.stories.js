import { Image } from "./image";

export default {
  title: "Components/Image",
  argTypes: {
    src: {
      control: { type: "text" },
      description: "Image source URL",
    },
    alt: {
      control: { type: "text" },
      description: "Alternative text for the image",
    },
    width: {
      control: { type: "text" },
      description: "Width of the image (e.g., '400px', '100%', 'auto')",
    },
    height: {
      control: { type: "text" },
      description: "Height of the image (e.g., '300px', '100%', 'auto')",
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius of the image",
    },
    isZoomed: {
      control: { type: "boolean" },
      description: "Enable zoom effect on hover",
    },
    disableSkeleton: {
      control: { type: "boolean" },
      description: "Disable loading skeleton",
    },
  },
};

export const Default = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Beautiful landscape",
    width: "400px",
    height: "300px",
    radius: "none",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const WithRadiusSmall = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Beautiful landscape",
    width: "400px",
    height: "300px",
    radius: "sm",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const WithRadiusMedium = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Beautiful landscape",
    width: "400px",
    height: "300px",
    radius: "md",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const WithRadiusLarge = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Beautiful landscape",
    width: "400px",
    height: "300px",
    radius: "lg",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const CircularImage = {
  args: {
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    alt: "Profile picture",
    width: "200px",
    height: "200px",
    radius: "full",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const WithZoomEffect = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Beautiful landscape with zoom",
    width: "400px",
    height: "300px",
    radius: "md",
    isZoomed: true,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const ResponsiveImage = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Responsive image",
    width: "100%",
    height: "auto",
    radius: "lg",
    isZoomed: false,
    disableSkeleton: false,
  },
  render: (args) => Image(args),
};

export const WithoutSkeleton = {
  args: {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Image without skeleton",
    width: "400px",
    height: "300px",
    radius: "md",
    isZoomed: false,
    disableSkeleton: true,
  },
  render: (args) => Image(args),
};

export const AllVariants = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns =
      "repeat(auto-fit, minmax(250px, 1fr))";
    container.style.gap = "2rem";
    container.style.padding = "2rem";
    container.style.maxWidth = "1200px";
    container.style.margin = "0 auto";

    const variants = [
      {
        src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        alt: "No Radius",
        width: "100%",
        height: "200px",
        radius: "none",
        isZoomed: false,
      },
      {
        src: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae",
        alt: "Small Radius",
        width: "100%",
        height: "200px",
        radius: "sm",
        isZoomed: false,
      },
      {
        src: "https://images.unsplash.com/photo-1682687221038-404cb8830901",
        alt: "Medium Radius",
        width: "100%",
        height: "200px",
        radius: "md",
        isZoomed: false,
      },
      {
        src: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb",
        alt: "Large Radius",
        width: "100%",
        height: "200px",
        radius: "lg",
        isZoomed: true,
      },
    ];

    variants.forEach((variant) => {
      const wrapper = document.createElement("div");
      const label = document.createElement("p");
      label.textContent = variant.alt;
      label.style.marginBottom = "0.5rem";
      label.style.fontWeight = "600";
      label.style.fontSize = "14px";

      const imageElement = Image(variant);

      wrapper.appendChild(label);
      wrapper.appendChild(imageElement);
      container.appendChild(wrapper);
    });

    return container;
  },
};
