import template from "./magContainer.hbs";
import "./magContainer.scss";

export function initMagContainer(root) {
  if (!root) {
    return;
  }
}

export const MagContainer = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagContainer(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllContainers() {
  document.querySelectorAll(".mag-container").forEach((container) => {
    if (!container.dataset.initialized) {
      initMagContainer(container);
      container.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllContainers);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllContainers);
observer.observe(document.body, { childList: true, subtree: true });
