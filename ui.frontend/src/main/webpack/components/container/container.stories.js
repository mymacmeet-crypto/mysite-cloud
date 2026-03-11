import { Container } from "./container";

const DEMO_CONTENT = `
  <div style="background: #f4f4f5; border: 1px dashed #a1a1aa; border-radius: 8px; padding: 24px; text-align: center; font-family: sans-serif; color: #52525b;">
    <p style="margin: 0 0 8px; font-weight: 600;">Container Content</p>
    <p style="margin: 0; font-size: 14px;">Resize the browser to see how padding and max-width change across breakpoints.</p>
  </div>
`;

export default {
  title: "Components/Container",
  argTypes: {
    variant: {
      control: "select",
      options: [
        "narrowConstrainedPadded",
        "constrainedPadded",
        "fullMobileConstrainedPadded",
        "breakpointPadded",
        "fullMobileBreakpointPadded",
      ],
      description: "Layout variant controlling max-width and padding strategy",
    },
    content: {
      control: "text",
      description: "HTML content inside the container",
    },
  },
  args: {
    variant: "constrainedPadded",
    content: DEMO_CONTENT,
  },
};

// ─── Individual variant stories ─────────────────────────────

export const NarrowConstrainedPadded = {
  name: "Narrow Constrained Padded",
  args: {
    variant: "narrowConstrainedPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};

export const ConstrainedPadded = {
  name: "Constrained Padded",
  args: {
    variant: "constrainedPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};

export const FullMobileConstrainedPadded = {
  name: "Full Mobile Constrained Padded",
  args: {
    variant: "fullMobileConstrainedPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};

export const BreakpointPadded = {
  name: "Breakpoint Padded",
  args: {
    variant: "breakpointPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};

export const FullMobileBreakpointPadded = {
  name: "Full Mobile Breakpoint Padded",
  args: {
    variant: "fullMobileBreakpointPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};

// ─── Gallery — All Variants ─────────────────────────────────

export const AllVariants = {
  name: "Gallery — All Variants",
  render: () => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "24px";
    wrapper.style.fontFamily = "sans-serif";

    const variants = [
      "narrowConstrainedPadded",
      "constrainedPadded",
      "fullMobileConstrainedPadded",
      "breakpointPadded",
      "fullMobileBreakpointPadded",
    ];

    variants.forEach((variant) => {
      const label = document.createElement("p");
      label.style.margin = "0 0 4px 16px";
      label.style.fontSize = "12px";
      label.style.fontWeight = "600";
      label.style.color = "#71717a";
      label.style.textTransform = "uppercase";
      label.style.letterSpacing = "0.05em";
      label.textContent = variant;
      wrapper.appendChild(label);

      const outline = document.createElement("div");
      outline.style.border = "1px solid #e4e4e7";

      const el = Container({
        variant,
        content: `<div style="background: #f4f4f5; border: 1px dashed #a1a1aa; border-radius: 8px; padding: 16px; text-align: center; color: #52525b; font-size: 14px;">${variant}</div>`,
      });
      outline.appendChild(el);
      wrapper.appendChild(outline);
    });

    return wrapper;
  },
};

// ─── Playground ─────────────────────────────────────────────

export const Playground = {
  args: {
    variant: "constrainedPadded",
    content: DEMO_CONTENT,
  },
  render: (args) => Container(args),
};
