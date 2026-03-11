/* eslint-disable max-len */
import { ConReveal } from "./conReveal";

export default {
  title: "Components/ConReveal",
};

/** Default — Matching reference image */
export const Default = {
  render: () =>
    ConReveal({
      slides: [
        {
          beforeImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          title: "Meghan Wolf Lost 90 Pounds and 3 Sizes",
          description:
            "<p>Claritas est etiam processus dynamicus, nuiser sequitur mutationem ipsum consuetudium lectorum formas dolor humanitatis per seacula.</p><p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>",
        },
        {
          beforeImage:
            "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
          title: "Transform Your Body in 12 Weeks",
          description:
            "<p>Our proven program has helped thousands achieve their fitness goals through personalized training and nutrition plans.</p><p>Join our community today and start your transformation journey with expert guidance and support every step of the way.</p>",
        },
        {
          beforeImage:
            "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
          title: "Amazing Results in Just 8 Weeks",
          description:
            "<p>See the incredible transformation that's possible with dedication and the right program.</p><p>Our clients consistently achieve remarkable results through our science-based approach to fitness and nutrition.</p>",
        },
      ],
    }),
};

/** Single Slide */
export const SingleSlide = {
  render: () =>
    ConReveal({
      slides: [
        {
          beforeImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          title: "Before and After Transformation",
          description:
            "<p>Discover the power of commitment and see real results that speak for themselves.</p>",
        },
      ],
    }),
};

/** Two Slides */
export const TwoSlides = {
  render: () =>
    ConReveal({
      slides: [
        {
          beforeImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          title: "Client Success Story #1",
          description:
            "<p>From struggling with confidence to becoming the healthiest version of herself. This transformation took dedication and hard work.</p>",
        },
        {
          beforeImage:
            "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
          title: "Client Success Story #2",
          description:
            "<p>Another incredible journey showing what's possible with the right mindset and support system.</p>",
        },
      ],
    }),
};

/** Minimal Content */
export const MinimalContent = {
  render: () =>
    ConReveal({
      slides: [
        {
          beforeImage:
            "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
          title: "Amazing Transformation",
        },
      ],
    }),
};
