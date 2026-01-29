import { Faq } from "./faq";

export default {
  title: "Components/FAQ",
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Main heading for the FAQ section",
    },
    subtitle: {
      control: { type: "text" },
      description: "Subtitle or description text",
    },
    variant: {
      control: { type: "select" },
      options: ["light", "bordered", "shadow", "splitted"],
      description: "Accordion variant style",
    },
  },
};

const faqItems = [
  {
    key: "1",
    title: "What is a FAQ?",
    content:
      "A FAQ (Frequently Asked Questions) is a list of common questions and answers about a particular topic, product, or service. It helps users quickly find information without having to contact support.",
  },
  {
    key: "2",
    title: "What is the purpose of a FAQ?",
    content:
      "The purpose of a FAQ is to provide quick, accessible answers to common questions, reduce support tickets, improve user experience, and help customers find information independently.",
  },
  {
    key: "3",
    title: "How do I create a FAQ?",
    content:
      "To create an effective FAQ, identify common questions from your customers, organize them by category, write clear and concise answers, and keep the content updated based on user feedback and new questions.",
  },
  {
    key: "4",
    title: "What are the benefits of a FAQ?",
    content:
      "Benefits include reduced support workload, improved customer satisfaction, 24/7 availability of information, better SEO performance, and empowering customers to solve issues independently.",
  },
  {
    key: "5",
    title: "How should I organize my FAQ?",
    content:
      "Organize your FAQ by grouping similar questions together, starting with the most frequently asked questions, using clear categories, and implementing a search function for easy navigation.",
  },
  {
    key: "6",
    title: "How long should FAQ answers be?",
    content:
      "FAQ answers should be concise but complete, typically 2-4 sentences. Provide enough detail to answer the question thoroughly while keeping it scannable and easy to read.",
  },
];

export const Default = {
  args: {
    title: "Frequently asked questions",
    subtitle:
      "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: faqItems,
    variant: "light",
  },
  render: (args) => Faq(args),
};

export const BorderedVariant = {
  args: {
    title: "Frequently asked questions",
    subtitle:
      "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: faqItems,
    variant: "bordered",
  },
  render: (args) => Faq(args),
};

export const ShadowVariant = {
  args: {
    title: "Frequently asked questions",
    subtitle:
      "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: faqItems,
    variant: "shadow",
  },
  render: (args) => Faq(args),
};

export const SplittedVariant = {
  args: {
    title: "Frequently asked questions",
    subtitle:
      "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: faqItems,
    variant: "splitted",
  },
  render: (args) => Faq(args),
};

export const CustomContent = {
  args: {
    title: "Help Center",
    subtitle:
      "Get quick answers to your most pressing questions. Our team is here to help you succeed.",
    items: [
      {
        key: "1",
        title: "How do I get started?",
        content:
          "Getting started is easy! Simply sign up for an account, verify your email, and follow our onboarding guide to set up your profile and preferences.",
      },
      {
        key: "2",
        title: "What payment methods do you accept?",
        content:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
      },
      {
        key: "3",
        title: "Can I cancel my subscription anytime?",
        content:
          "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
      },
    ],
    variant: "light",
  },
  render: (args) => Faq(args),
};
