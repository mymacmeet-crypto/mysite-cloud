import { NewCustomTextComponent } from "./newCustomTextComponent";

export default {
  title: "Components/NewCustomTextComponent",
  argTypes: {
    title: {
      control: "text",
      description: "Title text",
    },
  },
};

export const Default = {
  args: {
    title: "Hello World",
  },
  render: (args) => NewCustomTextComponent(args),
};
