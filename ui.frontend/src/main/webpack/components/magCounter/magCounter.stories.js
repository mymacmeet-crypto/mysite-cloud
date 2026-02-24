/* eslint-disable max-len */
import { MagCounter } from "./magCounter";

export default {
  title: "Components/MagCounter",
};

const defaultItems = [
  {
    icon: "https://api.iconify.design/mdi/briefcase.svg?color=white&width=64",
    number: 1000,
    label: "Projects Done",
    suffix: "",
  },
  {
    icon: "https://api.iconify.design/mdi/magnify.svg?color=white&width=64",
    number: 18945,
    label: "Lines of Code",
    suffix: "",
  },
  {
    icon: "https://api.iconify.design/mdi/account.svg?color=white&width=64",
    number: 700,
    label: "Satisfied Customers",
    suffix: "",
  },
  {
    icon: "https://api.iconify.design/mdi/download.svg?color=white&width=64",
    number: 1000,
    label: "Monthly Downloads",
    suffix: "",
  },
];

/** Default — 4 counters with background image */
export const Default = {
  render: () =>
    MagCounter({
      backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
      items: defaultItems,
    }),
};

/** With Plus Suffix */
export const WithSuffix = {
  render: () =>
    MagCounter({
      backgroundImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80",
      items: [
        {
          icon: "https://api.iconify.design/mdi/star.svg?color=white&width=64",
          number: 500,
          label: "5-Star Reviews",
          suffix: "+",
        },
        {
          icon: "https://api.iconify.design/mdi/map-marker.svg?color=white&width=64",
          number: 50,
          label: "Countries Served",
          suffix: "+",
        },
        {
          icon: "https://api.iconify.design/mdi/trophy.svg?color=white&width=64",
          number: 100,
          label: "Awards Won",
          suffix: "+",
        },
        {
          icon: "https://api.iconify.design/mdi/account-group.svg?color=white&width=64",
          number: 10000,
          label: "Active Users",
          suffix: "+",
        },
      ],
    }),
};

/** Three Items Only */
export const ThreeItems = {
  render: () =>
    MagCounter({
      backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
      items: [
        {
          icon: "https://api.iconify.design/mdi/clock.svg?color=white&width=64",
          number: 24,
          label: "Hours Support",
          suffix: "/7",
        },
        {
          icon: "https://api.iconify.design/mdi/flash.svg?color=white&width=64",
          number: 99,
          label: "Uptime",
          suffix: "%",
        },
        {
          icon: "https://api.iconify.design/mdi/rocket.svg?color=white&width=64",
          number: 150,
          label: "Projects Launched",
          suffix: "+",
        },
      ],
    }),
};

/** No Background Image */
export const NoBackground = {
  render: () =>
    MagCounter({
      items: defaultItems,
    }),
};

/** Large Numbers */
export const LargeNumbers = {
  render: () =>
    MagCounter({
      backgroundImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      items: [
        {
          icon: "https://api.iconify.design/mdi/cube.svg?color=white&width=64",
          number: 250000,
          label: "Total Products",
          suffix: "+",
        },
        {
          icon: "https://api.iconify.design/mdi/earth.svg?color=white&width=64",
          number: 1500000,
          label: "Global Reach",
          suffix: "+",
        },
        {
          icon: "https://api.iconify.design/mdi/heart.svg?color=white&width=64",
          number: 98,
          label: "Customer Satisfaction",
          suffix: "%",
        },
        {
          icon: "https://api.iconify.design/mdi/certificate.svg?color=white&width=64",
          number: 45,
          label: "Certifications",
          suffix: "",
        },
      ],
    }),
};
