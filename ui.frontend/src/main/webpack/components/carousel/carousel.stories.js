import { Carousel } from "./carousel";

export default {
  title: "Components/Carousel",
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["light", "bordered", "shadow"],
      description: "Visual style variant of the carousel",
    },
    slidesPerView: {
      control: { type: "number", min: 1, max: 5 },
      description: "Number of slides visible at once",
    },
    gap: {
      control: { type: "number", min: 0, max: 48 },
      description: "Gap between slides in pixels",
    },
    loop: {
      control: { type: "boolean" },
      description: "Enable infinite loop navigation",
    },
    height: {
      control: { type: "text" },
      description: "Height of carousel items (e.g., '200px', '300px', 'auto')",
    },
  },
};

const sampleItems = [
  {
    key: "1",
    content: "<h3>Slide 1</h3><p>This is the first slide content with some descriptive text.</p>",
  },
  {
    key: "2",
    content: "<h3>Slide 2</h3><p>This is the second slide content with more information.</p>",
  },
  {
    key: "3",
    content: "<h3>Slide 3</h3><p>This is the third slide content showcasing different data.</p>",
  },
  {
    key: "4",
    content: "<h3>Slide 4</h3><p>This is the fourth slide content with additional details.</p>",
  },
  {
    key: "5",
    content: "<h3>Slide 5</h3><p>This is the fifth slide content wrapping up the carousel.</p>",
  },
];

// Using real images from picsum.photos (Lorem Picsum)
const imageItems = [
  {
    key: "1",
    content: '<img src="https://picsum.photos/seed/slide1/600/300" alt="Nature landscape" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />',
  },
  {
    key: "2",
    content: '<img src="https://picsum.photos/seed/slide2/600/300" alt="Mountain view" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />',
  },
  {
    key: "3",
    content: '<img src="https://picsum.photos/seed/slide3/600/300" alt="Ocean sunset" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />',
  },
  {
    key: "4",
    content: '<img src="https://picsum.photos/seed/slide4/600/300" alt="Forest path" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />',
  },
  {
    key: "5",
    content: '<img src="https://picsum.photos/seed/slide5/600/300" alt="City skyline" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />',
  },
];

// Images with captions
const imageWithCaptionItems = [
  {
    key: "1",
    content: `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <img src="https://picsum.photos/seed/nature1/600/250" alt="Beautiful Nature" style="width: 100%; flex: 1; object-fit: cover; border-radius: 8px 8px 0 0;" />
        <div style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
          <h4 style="margin: 0 0 4px 0;">Beautiful Nature</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Explore the wonders of nature</p>
        </div>
      </div>
    `,
  },
  {
    key: "2",
    content: `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <img src="https://picsum.photos/seed/mountain1/600/250" alt="Mountain Adventure" style="width: 100%; flex: 1; object-fit: cover; border-radius: 8px 8px 0 0;" />
        <div style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
          <h4 style="margin: 0 0 4px 0;">Mountain Adventure</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Reach new heights</p>
        </div>
      </div>
    `,
  },
  {
    key: "3",
    content: `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <img src="https://picsum.photos/seed/ocean1/600/250" alt="Ocean Vibes" style="width: 100%; flex: 1; object-fit: cover; border-radius: 8px 8px 0 0;" />
        <div style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
          <h4 style="margin: 0 0 4px 0;">Ocean Vibes</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Feel the waves</p>
        </div>
      </div>
    `,
  },
  {
    key: "4",
    content: `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <img src="https://picsum.photos/seed/city1/600/250" alt="City Life" style="width: 100%; flex: 1; object-fit: cover; border-radius: 8px 8px 0 0;" />
        <div style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
          <h4 style="margin: 0 0 4px 0;">City Life</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Urban exploration</p>
        </div>
      </div>
    `,
  },
];

export const Default = {
  args: {
    variant: "light",
    items: sampleItems,
    slidesPerView: 1,
    gap: 16,
    loop: false,
    height: "auto",
  },
  render: (args) => Carousel(args),
};

export const WithMultipleSlides = {
  args: {
    variant: "light",
    items: sampleItems,
    slidesPerView: 3,
    gap: 16,
    loop: false,
    height: "auto",
  },
  render: (args) => Carousel(args),
};

export const WithLoop = {
  args: {
    variant: "light",
    items: sampleItems,
    slidesPerView: 2,
    gap: 16,
    loop: true,
    height: "auto",
  },
  render: (args) => Carousel(args),
};

export const Bordered = {
  args: {
    variant: "bordered",
    items: sampleItems,
    slidesPerView: 2,
    gap: 16,
    loop: false,
    height: "auto",
  },
  render: (args) => Carousel(args),
};

export const Shadow = {
  args: {
    variant: "shadow",
    items: sampleItems,
    slidesPerView: 2,
    gap: 16,
    loop: false,
    height: "auto",
  },
  render: (args) => Carousel(args),
};

export const ImageCarousel = {
  args: {
    variant: "light",
    items: imageItems,
    slidesPerView: 1,
    gap: 16,
    loop: true,
    height: "300px",
  },
  render: (args) => Carousel(args),
};

export const MultipleImageSlides = {
  args: {
    variant: "light",
    items: imageItems,
    slidesPerView: 3,
    gap: 16,
    loop: true,
    height: "200px",
  },
  render: (args) => Carousel(args),
};

export const ImageWithCaption = {
  args: {
    variant: "shadow",
    items: imageWithCaptionItems,
    slidesPerView: 3,
    gap: 20,
    loop: true,
    height: "320px",
  },
  render: (args) => Carousel(args),
};
