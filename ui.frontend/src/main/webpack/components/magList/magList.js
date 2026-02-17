import template from "./magList.hbs";
import "./magList.scss";

export function initMagList(root) {
  if (!root) {
    return;
  }

  // Keyboard accessibility
  root.setAttribute("tabindex", "0");
  root.setAttribute("role", "article");

  root.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const link = root.dataset.href;
      if (link) {
        window.location.href = link;
      }
    }
  });

  root.addEventListener("click", () => {
    const link = root.dataset.href;
    if (link) {
      window.location.href = link;
    }
  });
}

export const MagList = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  if (args.link) {
    root.dataset.href = args.link;
  }

  document.body.appendChild(root);
  initMagList(root);
  document.body.removeChild(root);

  return root;
};
