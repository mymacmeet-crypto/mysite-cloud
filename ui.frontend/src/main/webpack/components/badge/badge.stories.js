import { Badge } from "./badge";

export default {
  title: "Components/Badge",
  argTypes: {
    label: {
      control: "text",
      description: "Badge label text",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline"],
      description: "Badge variant style",
    },
    isLink: {
      control: "boolean",
      description: "Render as link",
    },
    path: {
      control: "text",
      description: "Link URL (only when isLink is true)",
    },
  },
  parameters: {
    actions: {
      handles: ["click"],
    },
  },
};

export const Primary = {
  args: {
    label: "Primary",
    variant: "primary",
    isLink: false,
  },
  render: (args) => Badge(args),
};

export const Secondary = {
  args: {
    label: "Secondary",
    variant: "secondary",
    isLink: false,
  },
  render: (args) => Badge(args),
};

export const Destructive = {
  args: {
    label: "Destructive",
    variant: "destructive",
    isLink: false,
  },
  render: (args) => Badge(args),
};

export const Outline = {
  args: {
    label: "Outline",
    variant: "outline",
    isLink: false,
  },
  render: (args) => Badge(args),
};

export const PrimaryLink = {
  args: {
    label: "Primary Link",
    variant: "primary",
    isLink: true,
    path: "/dashboard",
  },
  render: (args) => Badge(args),
};

export const SecondaryLink = {
  args: {
    label: "Secondary Link",
    variant: "secondary",
    isLink: true,
    path: "/profile",
  },
  render: (args) => Badge(args),
};

export const Playground = {
  args: {
    label: "Badge",
    variant: "primary",
    isLink: false,
    path: "#",
  },
  render: (args) => Badge(args),
};
