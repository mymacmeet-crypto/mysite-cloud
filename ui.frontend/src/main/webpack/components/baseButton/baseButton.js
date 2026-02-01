import template from "./baseButton.hbs";
import "./baseButton.scss";

export const BaseButton = (args) => {
  const html = template(args);

  if (args.onClick) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    const btn = wrapper.querySelector(".base-btn");
    if (btn) {
      btn.addEventListener("click", args.onClick);
    }
    return wrapper.innerHTML;
  }

  return html;
};
