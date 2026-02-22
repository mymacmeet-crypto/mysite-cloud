import template from "./magCopyrightBar.hbs";
import "./magCopyrightBar.scss";


export function initMagCopyrightBar(root) {
  if (!root) {
    return;
  }

}

export const MagCopyrightBar = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagCopyrightBar(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllCopyrightBars() {
  document.querySelectorAll(".mag-copyright-bar").forEach((bar) => {
    if (!bar.dataset.initialized) {
      initMagCopyrightBar(bar);
      bar.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllCopyrightBars);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllCopyrightBars);
observer.observe(document.body, { childList: true, subtree: true });
