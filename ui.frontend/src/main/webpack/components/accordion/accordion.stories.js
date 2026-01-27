import { Accordion } from "./accordion";

export default {
  title: "Components/Accordion",
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["light", "bordered", "shadow", "splitted"],
      description: "Visual style variant of the accordion",
    },
    showDivider: {
      control: { type: "boolean" },
      description: "Shows dividers between accordion items",
    },
    defaultSelectedKeys: {
      control: { type: "object" },
      description: "Array of keys for initially expanded items",
    },
    selectionMode: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Selection mode: single or multiple items can be expanded",
    },
  },
};

const sampleItems = [
  {
    key: "1",
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.",
  },
  {
    key: "2",
    title: "What is Storybook?",
    content:
      "Storybook is an open-source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient.",
  },
  {
    key: "3",
    title: "What is Handlebars?",
    content:
      "Handlebars is a simple templating language that uses a template and an input object to generate HTML or other text formats.",
  },
];

const itemsWithDisabled = [
  {
    key: "1",
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.",
  },
  {
    key: "2",
    title: "What is Storybook? (Disabled)",
    content:
      "Storybook is an open-source tool for developing UI components in isolation for React, Vue, Angular, and more.",
    isDisabled: true,
  },
  {
    key: "3",
    title: "What is Handlebars?",
    content:
      "Handlebars is a simple templating language that uses a template and an input object to generate HTML or other text formats.",
  },
];

export const Light = {
  args: {
    variant: "light",
    items: sampleItems,
    showDivider: true,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};

export const Bordered = {
  args: {
    variant: "bordered",
    items: sampleItems,
    showDivider: false,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};

export const Shadow = {
  args: {
    variant: "shadow",
    items: sampleItems,
    showDivider: true,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};

export const Splitted = {
  args: {
    variant: "splitted",
    items: sampleItems,
    showDivider: false,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};

export const WithDisabledItem = {
  args: {
    variant: "bordered",
    items: itemsWithDisabled,
    showDivider: true,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};

export const MultipleSelectionMode = {
  args: {
    variant: "bordered",
    items: sampleItems,
    showDivider: true,
    defaultSelectedKeys: ["1", "2"],
    selectionMode: "multiple",
  },
  render: (args) => Accordion(args),
};

export const WithoutDivider = {
  args: {
    variant: "light",
    items: sampleItems,
    showDivider: false,
    defaultSelectedKeys: ["1"],
    selectionMode: "single",
  },
  render: (args) => Accordion(args),
};
