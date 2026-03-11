import template from "./container.hbs";
import "./container.scss";

export const Container = (args) => {
  const { variant = "constrainedPadded", content = "" } = args;

  const htmlString = template({ variant });

  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const containerWrapper = temp.firstElementChild;

  const contentSlot = containerWrapper.querySelector(".container-content");
  if (contentSlot) {
    if (typeof content === "string") {
      contentSlot.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      contentSlot.appendChild(content);
    }
  }

  return containerWrapper;
};
