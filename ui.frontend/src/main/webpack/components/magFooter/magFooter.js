import template from "./magFooter.hbs";
import "./magFooter.scss";


export function initMagFooter(root) {
  if (!root) {
    return;
  }

}

function splitLinksIntoColumns(links) {
  if (!links || !links.length) {
    return [];
  }

  const midpoint = Math.ceil(links.length / 2);
  return [
    links.slice(0, midpoint),
    links.slice(midpoint)
  ];
}

export const MagFooter = (args) => {
  // Split quick links into 2 columns for balanced display
  const processedArgs = {
    ...args,
    quickLinksColumns: splitLinksIntoColumns(args.quickLinks || [])
  };

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(processedArgs);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagFooter(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllFooters() {
  document.querySelectorAll(".mag-footer").forEach((footer) => {
    if (!footer.dataset.initialized) {
      initMagFooter(footer);
      footer.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllFooters);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllFooters);
observer.observe(document.body, { childList: true, subtree: true });
