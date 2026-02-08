import template from "./card.hbs";
import "./card.scss";
import { Typography } from "../typography/typography";
import { Image } from "../image/image";

export const Card = (args) => {
  const {
    variant = "default",
    imageSrc = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    imageAlt = "Card image",
    title = "Card Title",
    description = "This is a card description that provides more details about the content.",
    showImage = true,
    imageRadius = "none",
    isHoverable = false,
    isPressable = false,
  } = args;

  // Create the HTML string
  const htmlString = template({
    variant,
    showImage,
    isHoverable,
    isPressable,
  });

  
};
