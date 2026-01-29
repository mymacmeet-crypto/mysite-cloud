import { Typography } from "./typography";

export default {
  title: "Components/Typography",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "list",
        "inline-code",
        "lead",
      ],
      description: "Typography variant",
    },
    text: {
      control: { type: "text" },
      description: "Text content to display",
    },
  },
};

export const Heading1 = {
  args: {
    variant: "h1",
    text: "The Ultimate Guide to Web Typography",
  },
  render: (args) => Typography(args),
};

export const Heading2 = {
  args: {
    variant: "h2",
    text: "Understanding Typography Fundamentals",
  },
  render: (args) => Typography(args),
};

export const Heading3 = {
  args: {
    variant: "h3",
    text: "Best Practices for Web Fonts",
  },
  render: (args) => Typography(args),
};

export const Heading4 = {
  args: {
    variant: "h4",
    text: "Choosing the Right Font Size",
  },
  render: (args) => Typography(args),
};

export const Paragraph = {
  args: {
    variant: "p",
    text: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.",
  },
  render: (args) => Typography(args),
};

export const Lead = {
  args: {
    variant: "lead",
    text: "This is a lead paragraph that introduces the main topic. It's slightly larger and more prominent than regular body text, making it perfect for introductions and summaries.",
  },
  render: (args) => Typography(args),
};

export const Blockquote = {
  args: {
    variant: "blockquote",
    text: "Good typography is invisible. Bad typography is everywhere.",
  },
  render: (args) => Typography(args),
};

export const List = {
  args: {
    variant: "list",
  },
  render: (args) => Typography(args),
};

export const InlineCode = {
  args: {
    variant: "inline-code",
    text: "const typography = 'awesome'",
  },
  render: (args) => Typography(args),
};

export const AllVariants = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.style.margin = "0 auto";
    container.style.padding = "2rem";

    const variants = [
      { variant: "h1", text: "Heading 1 - Main Title" },
      { variant: "h2", text: "Heading 2 - Section Title" },
      { variant: "h3", text: "Heading 3 - Subsection Title" },
      { variant: "h4", text: "Heading 4 - Minor Heading" },
      {
        variant: "lead",
        text: "Lead paragraph - Introduction text that stands out from regular body copy.",
      },
      {
        variant: "p",
        text: "Regular paragraph - This is standard body text used for the main content. It has comfortable line height and spacing for optimal readability.",
      },
      {
        variant: "blockquote",
        text: "Blockquote - A notable quote or excerpt that deserves special attention.",
      },
      { variant: "inline-code", text: "npm install typography" },
      { variant: "list" },
    ];

    variants.forEach((item, index) => {
      const element = Typography(item);
      container.appendChild(element);

      // Add spacing between elements
      if (index < variants.length - 1) {
        const spacer = document.createElement("div");
        spacer.style.marginBottom = "2rem";
        container.appendChild(spacer);
      }
    });

    return container;
  },
};
