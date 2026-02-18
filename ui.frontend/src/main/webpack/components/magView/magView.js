import template from "./magView.hbs";
import "./magView.scss";

/**
 * initMagView
 * Attaches interactive behaviour to a rendered magView root element.
 * Wires up click handlers for card/list items.
 *
 * @param {HTMLElement} root – the .mag-view element
 */
export function initMagView(root) {
  if (!root) {
    return;
  }

  // Read view type from data-attribute
  const viewType = root.dataset.viewType || "card";

  // Select items based on view type
  const items =
    viewType === "card"
      ? Array.from(root.querySelectorAll(".mag-view-card"))
      : Array.from(root.querySelectorAll(".mag-view-list-item"));

  if (!items.length) {
    return;
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  items.forEach((item, index) => {
    // Accessibility
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "article");
    item.setAttribute("aria-label", `Article ${index + 1}`);

    // Click handler
    item.addEventListener("click", () => {
      const link = item.dataset.href;
      if (link) {
        window.location.href = link;
      }
    });

    // Keyboard: Enter / Space trigger navigation
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const link = item.dataset.href;
        if (link) {
          window.location.href = link;
        }
      }
    });
  });
}

/**
 * MagView factory – renders the HBS template with the given args and
 * bootstraps interactive behaviour before returning the live element.
 *
 * @param {object} args
 * @param {string}   args.sectionTitle   – heading shown above the view
 * @param {string}   [args.viewType]     – "card" or "list" (default: "card")
 * @param {Array}    args.items          – array of article objects
 * @returns {HTMLElement}
 */
export const MagView = (args) => {
  // Default viewType to "card"
  const viewType = args.viewType || "card";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template({ ...args, viewType });
  const root = wrapper.firstElementChild;

  // Attach to a hidden node so any dimension-dependent logic can measure
  // even before Storybook inserts the element into the page.
  document.body.appendChild(root);
  initMagView(root);
  document.body.removeChild(root);

  // Return the live element — Storybook will re-attach it to the canvas.
  return root;
};
