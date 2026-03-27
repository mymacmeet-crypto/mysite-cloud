/* eslint-disable max-len */
import { MagWelcome } from "./magWelcome";

export default {
  title: "Components/MagWelcome",
};

/** Default — Full welcome section with background image */
export const Default = {
  render: () =>
    MagWelcome({
      title: "Welcome to Pearl Magazine",
      subtitle: "Your Daily Source of Inspiration",
      description:
        "Discover the latest stories, insights, and trends from around the world. We bring you curated content that matters.",
      backgroundImage:
        "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1400&q=80",
      ctaLabel: "EXPLORE NOW",
      ctaLink: "/articles",
    }),
};

/** Without Background Image */
export const NoBgImage = {
  render: () =>
    MagWelcome({
      title: "Welcome to Pearl Magazine",
      subtitle: "Your Daily Source of Inspiration",
      description:
        "Discover the latest stories, insights, and trends from around the world. We bring you curated content that matters.",
      ctaLabel: "GET STARTED",
      ctaLink: "/start",
    }),
};

/** Minimal — Title only */
export const Minimal = {
  render: () =>
    MagWelcome({
      title: "Welcome to Our Site",
    }),
};

/** With CTA Only */
export const WithCTA = {
  render: () =>
    MagWelcome({
      title: "Ready to Dive In?",
      subtitle: "Join thousands of readers worldwide",
      ctaLabel: "SUBSCRIBE NOW",
      ctaLink: "/subscribe",
    }),
};
