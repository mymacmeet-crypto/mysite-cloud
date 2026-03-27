import template from "./magWelcome.hbs";
import "./magWelcome.scss";

export function initMagWelcome(root) {
  if (!root) {
    return;
  }

  // Static intro component — no interactive behavior required.
  // This function serves as the initialization hook for AEM Author mode
  // and future enhancements (e.g., scroll animations).
}

export const MagWelcome = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagWelcome(root);
  document.body.removeChild(root);

  return root;
};

function initAllWelcome() {
  document.querySelectorAll(".mag-welcome").forEach((el) => {
    if (!el.dataset.initialized) {
      initMagWelcome(el);
      el.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllWelcome);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllWelcome);
observer.observe(document.body, { childList: true, subtree: true });
