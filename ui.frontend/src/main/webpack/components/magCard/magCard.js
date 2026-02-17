import template from "./magCard.hbs";
import "./magCard.scss";

export function initMagCard(root) {
  if (!root) {
    return;
  }

  // Read optional navigation target set by the HBS data-attribute
  const link = root.dataset.href;

  // ── Accessibility ─────────────────────────────────────────────────────────
  root.setAttribute("tabindex", "0");
  root.setAttribute("role", "article");

  // ── Event Listeners ───────────────────────────────────────────────────────

  root.addEventListener("click", () => {
    if (link) {
      window.location.href = link;
    }
  });

  // Keyboard: Enter / Space trigger navigation
  root.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (link) {
        window.location.href = link;
      }
    }
  });
}

export const MagCard = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  if (args.link) {
    root.dataset.href = args.link;
  }

  // Attach to a hidden node so any dimension-dependent logic can measure
  // even before Storybook inserts the element into the page.
  document.body.appendChild(root);
  initMagCard(root);
  document.body.removeChild(root);

  // Return the live element — Storybook will re-attach it to the canvas.
  return root;
};
