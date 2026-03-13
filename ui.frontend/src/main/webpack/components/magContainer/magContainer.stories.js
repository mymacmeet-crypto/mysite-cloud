/* eslint-disable max-len */
import { MagContainer } from "./magContainer";

export default {
  title: "Components/MagContainer",
};

/** Default — Boxed container with medium padding */
export const Default = {
  render: () =>
    MagContainer({
      title: "Welcome to Our Magazine",
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-medium",
      horizontalPadding: "mag-container-horizontal-medium",
      backgroundColor: "white",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #3d3d3d;'>This is a flexible container component that can hold any content. Authors can configure the width, padding, background color, and borders to create varied layouts throughout the site.</p>",
    }),
};

/** Full Width — No horizontal padding */
export const FullWidth = {
  render: () =>
    MagContainer({
      title: "Full Width Section",
      containerWidth: "mag-container-width-full",
      verticalPadding: "mag-container-padding-large",
      horizontalPadding: "mag-container-horizontal-none",
      backgroundColor: "light-gray",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #3d3d3d; padding: 0 48px;'>This container spans the full width of the viewport. Perfect for hero sections or full-bleed designs.</p>",
    }),
};

/** Narrow — Centered narrow content */
export const Narrow = {
  render: () =>
    MagContainer({
      title: "Focused Content",
      containerWidth: "mag-container-width-narrow",
      verticalPadding: "mag-container-padding-medium",
      horizontalPadding: "mag-container-horizontal-medium",
      backgroundColor: "white",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #3d3d3d;'>This narrow container is perfect for article content, making it easier to read by limiting line length.</p>",
    }),
};

/** Dark Background */
export const DarkBackground = {
  render: () =>
    MagContainer({
      title: "Dark Theme Section",
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-large",
      horizontalPadding: "mag-container-horizontal-large",
      backgroundColor: "black",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #f0f0f0;'>This container uses a dark background with light text. The title automatically adapts to use white color for better contrast.</p>",
    }),
};

/** With Borders */
export const WithBorders = {
  render: () =>
    MagContainer({
      title: "Section with Borders",
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-medium",
      horizontalPadding: "mag-container-horizontal-medium",
      backgroundColor: "white",
      topBorder: true,
      bottomBorder: true,
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #3d3d3d;'>This container has both top and bottom borders to create clear visual separation between sections.</p>",
    }),
};

/** Small Padding */
export const SmallPadding = {
  render: () =>
    MagContainer({
      title: "Compact Section",
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-small",
      horizontalPadding: "mag-container-horizontal-small",
      backgroundColor: "light-gray",
      content:
        "<p style='font-size: 1rem; line-height: 1.8; color: #3d3d3d;'>A container with minimal padding for tighter layouts.</p>",
    }),
};

/** No Title */
export const NoTitle = {
  render: () =>
    MagContainer({
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-medium",
      horizontalPadding: "mag-container-horizontal-medium",
      backgroundColor: "white",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #3d3d3d;'>This container has no title, allowing the content to speak for itself without a heading.</p>",
    }),
};

/** Primary Color Background */
export const PrimaryBackground = {
  render: () =>
    MagContainer({
      title: "Featured Content",
      containerWidth: "mag-container-width-boxed",
      verticalPadding: "mag-container-padding-large",
      horizontalPadding: "mag-container-horizontal-medium",
      backgroundColor: "primary",
      topBorder: true,
      bottomBorder: true,
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; color: #f0f0f0;'>This container uses the primary brand color as background, perfect for highlighting important content or calls-to-action.</p>",
    }),
};
