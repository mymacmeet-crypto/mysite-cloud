import template from "./image.hbs";
import "./image.scss";

export const Image = (args) => {
  const {
    src = "https://via.placeholder.com/400x300",
    alt = "Image",
    width = "auto",
    height = "auto",
    radius = "none",
    isZoomed = false,
    disableSkeleton = false,
  } = args;

  // Create the HTML string
  const htmlString = template({
    src,
    alt,
    width,
    height,
    radius,
    isZoomed,
    disableSkeleton,
  });

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const imageWrapper = temp.firstElementChild;

  // Handle image loading and skeleton
  if (!disableSkeleton) {
    const img = imageWrapper.querySelector(".image-element");
    const skeleton = imageWrapper.querySelector(".image-skeleton");

    if (img && skeleton) {
      img.addEventListener("load", function () {
        skeleton.style.display = "none";
        img.style.opacity = "1";
      });

      img.addEventListener("error", function () {
        skeleton.style.display = "none";
        img.style.opacity = "1";
      });
    }
  }

  return imageWrapper;
};
