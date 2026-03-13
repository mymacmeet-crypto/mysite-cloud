import template from "./stickyContent.hbs";
import "./stickyContent.scss";

// ─── Init ────────────────────────────────────────────────────

export function initStickyContent(root) {
  const tab = root.querySelector(".sticky-content__tab");
  const panel = root.querySelector(".sticky-content__panel");
  const closeBtn = root.querySelector(".sticky-content__close");

  if (!tab || !panel) return;

  const open = () => {
    panel.classList.add("sticky-content__panel--open");
    panel.setAttribute("aria-hidden", "false");
    tab.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    panel.classList.remove("sticky-content__panel--open");
    panel.setAttribute("aria-hidden", "true");
    tab.setAttribute("aria-expanded", "false");
  };

  tab.addEventListener("click", () => {
    const isOpen = panel.classList.contains("sticky-content__panel--open");
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }
}

// ─── AEM Auto-Init ──────────────────────────────────────────

function initAll() {
  document.querySelectorAll(".sticky-content").forEach((el) => {
    if (!el.dataset.initialized) {
      initStickyContent(el);
      el.dataset.initialized = "true";
    }
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initAll);

  if (document.body) {
    const observer = new MutationObserver(initAll);
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// ─── Storybook Factory ──────────────────────────────────────

export const StickyContent = (args) => {
  const {
    tabText = "SIGN UP FOR 15% OFF",
    heading = "",
    placeholderText = "Email",
    buttonText = "SIGN UP",
  } = args;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template({ tabText, heading, placeholderText, buttonText });
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initStickyContent(root);
  document.body.removeChild(root);

  return root;
};
