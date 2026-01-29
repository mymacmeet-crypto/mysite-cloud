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

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const cardElement = temp.firstElementChild;

  // Create Image component if needed
  if (showImage) {
    const imageElement = Image({
      src: imageSrc,
      alt: imageAlt,
      width: "100%",
      height: "auto",
      radius: imageRadius,
      isZoomed: false,
      disableSkeleton: false,
    });

    const imagePlaceholder = cardElement.querySelector(
      ".card-image-placeholder",
    );
    if (imagePlaceholder) {
      imagePlaceholder.replaceWith(imageElement);
    }
  }

  // Create Typography components for title
  const titleElement = Typography({
    variant: "h3",
    text: title,
  });

  const titlePlaceholder = cardElement.querySelector(".card-title-placeholder");
  if (titlePlaceholder) {
    titlePlaceholder.replaceWith(titleElement);
  }

  // Create Typography components for description
  const descriptionElement = Typography({
    variant: "p",
    text: description,
  });

  const descriptionPlaceholder = cardElement.querySelector(
    ".card-description-placeholder",
  );
  if (descriptionPlaceholder) {
    descriptionPlaceholder.replaceWith(descriptionElement);
  }

  return cardElement;
};
