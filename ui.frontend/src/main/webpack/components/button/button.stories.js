import { Button } from "./button";

export default {
  title: "Components/Button",
};

export const Primary = {
  render: () =>
    Button({
      label: "Primary Button",
      type: "primary",
    }),
};

export const Secondary = {
  render: () =>
    Button({
      label: "Secondary Button",
      type: "secondary",
    }),
};
