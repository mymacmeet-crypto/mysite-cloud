import template from "./faq.hbs";
import "./faq.scss";
import { Accordion } from "../accordion/accordion";
import { Typography } from "../typography/typography";

export const Faq = (args) => {
  const {
    title = "Frequently asked questions",
    subtitle = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items = [],
    variant = "light",
  } = args;

  // Create the HTML string
  const htmlString = template({
    title,
    subtitle,
  });

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const faqBlock = temp.firstElementChild;

  // Create Typography components for title and subtitle
  const titleElement = Typography({
    variant: "h1",
    text: title,
  });

  const subtitleElement = Typography({
    variant: "p",
    text: subtitle,
  });

  // Replace placeholders with actual components
  const titlePlaceholder = faqBlock.querySelector(".faq-title-placeholder");
  const subtitlePlaceholder = faqBlock.querySelector(
    ".faq-subtitle-placeholder",
  );

  if (titlePlaceholder) {
    titlePlaceholder.replaceWith(titleElement);
  }

  if (subtitlePlaceholder) {
    subtitlePlaceholder.replaceWith(subtitleElement);
  }

  // Create Accordion component
  const accordionElement = Accordion({
    variant: variant,
    items: items,
    showDivider: false,
    defaultSelectedKeys: [],
    selectionMode: "single",
  });

  // Append accordion to the FAQ block
  const accordionContainer = faqBlock.querySelector(".faq-accordion");
  if (accordionContainer) {
    accordionContainer.appendChild(accordionElement);
  }

  return faqBlock;
};
