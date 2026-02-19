import template from "./magHeader.hbs";
import "./magHeader.scss";

export function initMagHeader(root) {
  if (!root) {
    return;
  }

  // ── Query Elements ────────────────────────────────────────────────────────

  const mobileToggle = root.querySelector(".mag-mobile-toggle");
  const mobileMenu = root.querySelector(".mag-mobile-menu");
  const mobileClose = root.querySelector(".mag-mobile-close");
  const submenuToggles = Array.from(
    root.querySelectorAll(".mag-submenu-toggle"),
  );

  if (!mobileToggle || !mobileMenu || !mobileClose) {
    return;
  }

  // ── State ─────────────────────────────────────────────────────────────────

  let isMenuOpen = false;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function openMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add("mag-mobile-menu-open");
    mobileToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Prevent body scroll
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove("mag-mobile-menu-open");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // Restore body scroll
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function toggleSubmenu(button) {
    const parentItem = button.closest(".mag-mobile-nav-item");
    const submenu = parentItem.querySelector(".mag-mobile-submenu");

    if (!submenu) {
      return;
    }

    const isOpen = submenu.classList.contains("mag-submenu-visible");

    if (isOpen) {
      submenu.classList.remove("mag-submenu-visible");
      button.classList.remove("mag-submenu-open");
      button.setAttribute("aria-expanded", "false");
    } else {
      submenu.classList.add("mag-submenu-visible");
      button.classList.add("mag-submenu-open");
      button.setAttribute("aria-expanded", "true");
    }
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  // Mobile menu toggle
  mobileToggle.addEventListener("click", toggleMenu);
  mobileClose.addEventListener("click", closeMenu);

  // Close menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    // Don't close if clicking inside the menu content
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Submenu toggles
  submenuToggles.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSubmenu(button);
    });
  });

  // Close mobile menu on window resize (when switching to desktop)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        closeMenu();
      }
    }, 250);
  });

  // Keyboard: Escape to close mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });
}

export const MagHeader = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  // Attach to a hidden node so any dimension-dependent logic can measure
  // even before Storybook inserts the element into the page.
  document.body.appendChild(root);
  initMagHeader(root);
  document.body.removeChild(root);

  // Return the live element — Storybook will re-attach it to the canvas.
  return root;
};

function initAllHeaders() {
  document.querySelectorAll(".mag-header").forEach((header) => {
    if (!header.dataset.initialized) {
      initMagHeader(header);
      header.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllHeaders);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllHeaders);
observer.observe(document.body, { childList: true, subtree: true });
