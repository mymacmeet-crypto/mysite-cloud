import { Avatar } from "./avatar";

export default {
  title: "Components/Avatar",
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    name: {
      control: "text",
      description: "Full name (used for initials fallback)",
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Avatar size",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
      description: "Color variant",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius",
    },
    isBordered: {
      control: "boolean",
      description: "Show border ring around avatar",
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    src: "",
    name: "",
    alt: "avatar",
    size: "md",
    color: "default",
    radius: "full",
    isBordered: false,
    isDisabled: false,
  },
};

// ─── Image stories ──────────────────────────────────────────

export const WithImage = {
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    alt: "Jane Doe",
    size: "md",
    color: "default",
  },
  render: (args) => Avatar(args),
};

export const WithImageLarge = {
  name: "With Image — Large",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    alt: "John Smith",
    size: "lg",
    color: "primary",
  },
  render: (args) => Avatar(args),
};

// ─── Initials stories ───────────────────────────────────────

export const WithInitials = {
  args: {
    name: "Jane Doe",
    size: "md",
    color: "primary",
  },
  render: (args) => Avatar(args),
};

export const WithInitialsSingleName = {
  name: "Initials — Single Name",
  args: {
    name: "Jane",
    size: "md",
    color: "secondary",
  },
  render: (args) => Avatar(args),
};

// ─── Fallback icon story ────────────────────────────────────

export const FallbackIcon = {
  name: "Fallback Icon",
  args: {
    size: "md",
    color: "default",
  },
  render: (args) => Avatar(args),
};

// ─── Size stories ───────────────────────────────────────────

export const Small = {
  args: {
    name: "Alice Brown",
    size: "sm",
    color: "primary",
  },
  render: (args) => Avatar(args),
};

export const Medium = {
  args: {
    name: "Alice Brown",
    size: "md",
    color: "primary",
  },
  render: (args) => Avatar(args),
};

export const Large = {
  args: {
    name: "Alice Brown",
    size: "lg",
    color: "primary",
  },
  render: (args) => Avatar(args),
};

// ─── Color stories ──────────────────────────────────────────

export const ColorDefault = {
  name: "Color — Default",
  args: { name: "Jane Doe", size: "md", color: "default" },
  render: (args) => Avatar(args),
};

export const ColorPrimary = {
  name: "Color — Primary",
  args: { name: "Jane Doe", size: "md", color: "primary" },
  render: (args) => Avatar(args),
};

export const ColorSecondary = {
  name: "Color — Secondary",
  args: { name: "Jane Doe", size: "md", color: "secondary" },
  render: (args) => Avatar(args),
};

export const ColorSuccess = {
  name: "Color — Success",
  args: { name: "Jane Doe", size: "md", color: "success" },
  render: (args) => Avatar(args),
};

export const ColorWarning = {
  name: "Color — Warning",
  args: { name: "Jane Doe", size: "md", color: "warning" },
  render: (args) => Avatar(args),
};

export const ColorDanger = {
  name: "Color — Danger",
  args: { name: "Jane Doe", size: "md", color: "danger" },
  render: (args) => Avatar(args),
};

// ─── Bordered stories ───────────────────────────────────────

export const Bordered = {
  args: {
    src: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    alt: "Bordered avatar",
    size: "md",
    color: "primary",
    isBordered: true,
  },
  render: (args) => Avatar(args),
};

export const BorderedInitials = {
  name: "Bordered — Initials",
  args: {
    name: "John Doe",
    size: "lg",
    color: "success",
    isBordered: true,
  },
  render: (args) => Avatar(args),
};

// ─── Disabled stories ───────────────────────────────────────

export const Disabled = {
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    alt: "Disabled avatar",
    size: "md",
    color: "default",
    isDisabled: true,
  },
  render: (args) => Avatar(args),
};

export const DisabledInitials = {
  name: "Disabled — Initials",
  args: {
    name: "Jane Doe",
    size: "md",
    color: "danger",
    isDisabled: true,
  },
  render: (args) => Avatar(args),
};

// ─── Radius stories ─────────────────────────────────────────

export const RadiusFull = {
  name: "Radius — Full",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: "lg",
    color: "default",
    radius: "full",
  },
  render: (args) => Avatar(args),
};

export const RadiusLarge = {
  name: "Radius — Large",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: "lg",
    color: "default",
    radius: "lg",
  },
  render: (args) => Avatar(args),
};

export const RadiusMedium = {
  name: "Radius — Medium",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: "lg",
    color: "default",
    radius: "md",
  },
  render: (args) => Avatar(args),
};

export const RadiusSmall = {
  name: "Radius — Small",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: "lg",
    color: "default",
    radius: "sm",
  },
  render: (args) => Avatar(args),
};

export const RadiusNone = {
  name: "Radius — None",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: "lg",
    color: "default",
    radius: "none",
  },
  render: (args) => Avatar(args),
};

// ─── Gallery stories ────────────────────────────────────────

export const AllColors = {
  name: "Gallery — All Colors",
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "12px";
    container.style.alignItems = "center";
    container.style.padding = "20px";

    const colors = [
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
    ];
    colors.forEach((color) => {
      container.appendChild(Avatar({ name: "Jane Doe", size: "md", color }));
    });

    return container;
  },
};

export const AllSizes = {
  name: "Gallery — All Sizes",
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "12px";
    container.style.alignItems = "center";
    container.style.padding = "20px";

    const sizes = ["sm", "md", "lg"];
    sizes.forEach((size) => {
      container.appendChild(
        Avatar({
          src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          size,
          color: "default",
        })
      );
    });

    return container;
  },
};

export const AllRadii = {
  name: "Gallery — All Radii",
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "12px";
    container.style.alignItems = "center";
    container.style.padding = "20px";

    const radii = ["none", "sm", "md", "lg", "full"];
    radii.forEach((radius) => {
      container.appendChild(
        Avatar({
          src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          size: "lg",
          color: "default",
          radius,
        })
      );
    });

    return container;
  },
};

// ─── Playground ─────────────────────────────────────────────

export const Playground = {
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Jane Doe",
    alt: "Jane Doe",
    size: "md",
    color: "default",
    radius: "full",
    isBordered: false,
    isDisabled: false,
  },
  render: (args) => Avatar(args),
};
