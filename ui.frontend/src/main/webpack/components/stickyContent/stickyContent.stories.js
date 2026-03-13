import { StickyContent } from "./stickyContent";

export default {
  title: "Components/StickyContent",
  argTypes: {
    tabText: {
      control: "text",
      description: "Text on the vertical tab",
    },
    heading: {
      control: "text",
      description: "Heading inside the panel",
    },
    placeholderText: {
      control: "text",
      description: "Placeholder for the email input",
    },
    buttonText: {
      control: "text",
      description: "Submit button text",
    },
  },
  args: {
    tabText: "SIGN UP FOR 15% OFF",
    heading:
      "Sign up to our newsletter for exclusive previews, style news and 15% OFF your first order",
    placeholderText: "Email",
    buttonText: "SIGN UP",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: (args) => StickyContent(args),
};

export const CustomText = {
  name: "Custom Text",
  args: {
    tabText: "GET 20% OFF",
    heading: "Join our mailing list and get 20% off your next purchase!",
    buttonText: "SUBSCRIBE",
  },
  render: (args) => StickyContent(args),
};
