import { CustomButton } from "../components/customButton/customButton";

export default {
  title: "Components/CustomButton",
};

export const Primary = {
  render: () =>
    CustomButton({
      label: "Primary Button",
      type: "primary",
    }),
};

export const Secondary = {
  render: () =>
    CustomButton({
      label: "Secondary Button",
      type: "secondary",
    }),
};
