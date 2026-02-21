import template from "./magFooter.hbs";
import "./magFooter.scss";

export function initMagFooter(root) {
  if (!root) {
    return;
  }
}

export const MagFooter = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagFooter(root);
  document.body.removeChild(root);

  return root;
};

function initAllFooters() {
  document.querySelectorAll(".mag-footer").forEach((footer) => {
    if (!footer.dataset.initialized) {
      initMagFooter(footer);
      footer.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllFooters);

const observer = new MutationObserver(initAllFooters);
observer.observe(document.body, { childList: true, subtree: true });
