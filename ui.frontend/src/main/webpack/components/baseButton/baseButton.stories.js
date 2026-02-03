import { BaseButton } from "./baseButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/BaseButton",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "destructive"],
      description: "Visual style of the button",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the button",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Native HTML button type attribute",
    },
    label: {
      control: { type: "text" },
      description: "Button label text",
    },
    onClick: {
      action: "clicked",
      description: "Click handler — logged in the Actions panel",
    },
  },
  // Default args shared across all stories
  args: {
    label: "BaseButton",
    variant: "primary",
    size: "md",
    disabled: false,
    type: "button",
    onClick: action("clicked"),
  },
};

const renderBaseButton = (args) => {
  const container = document.createElement("div");
  container.innerHTML = BaseButton({ ...args, onClick: null }); // let HBS produce clean HTML
  const btn = container.querySelector(".base-btn");
  if (btn && args.onClick) {
    btn.addEventListener("click", args.onClick);
  }
  return container.firstElementChild;
};

// ─── Stories ────────────────────────────────────────────────

export const Primary = {
  args: {
    label: "Primary",
    variant: "primary",
  },
  render: (args) => renderBaseButton(args),
};

export const Secondary = {
  args: {
    label: "Secondary",
    variant: "secondary",
  },
  render: (args) => renderBaseButton(args),
};

export const Outline = {
  args: {
    label: "Outline",
    variant: "outline",
  },
  render: (args) => renderBaseButton(args),
};

export const Destructive = {
  args: {
    label: "Destructive",
    variant: "destructive",
  },
  render: (args) => renderBaseButton(args),
};

// ─── Size stories ───────────────────────────────────────────

export const Small = {
  args: {
    label: "Small",
    variant: "primary",
    size: "sm",
  },
  render: (args) => renderBaseButton(args),
};

export const Medium = {
  args: {
    label: "Medium",
    variant: "primary",
    size: "md",
  },
  render: (args) => renderBaseButton(args),
};

export const Large = {
  args: {
    label: "Large",
    variant: "primary",
    size: "lg",
  },
  render: (args) => renderBaseButton(args),
};

// ─── Disabled states ────────────────────────────────────────

export const DisabledPrimary = {
  name: "Disabled — Primary",
  args: {
    label: "Disabled",
    variant: "primary",
    disabled: true,
  },
  render: (args) => renderBaseButton(args),
};

export const DisabledOutline = {
  name: "Disabled — Outline",
  args: {
    label: "Disabled",
    variant: "outline",
    disabled: true,
  },
  render: (args) => renderBaseButton(args),
};

// ─── Type variants ──────────────────────────────────────────

export const SubmitButton = {
  name: "Type — Submit",
  args: {
    label: "Submit",
    variant: "primary",
    type: "submit",
  },
  render: (args) => renderBaseButton(args),
};

export const ResetButton = {
  name: "Type — Reset",
  args: {
    label: "Reset",
    variant: "secondary",
    type: "reset",
  },
  render: (args) => renderBaseButton(args),
};
