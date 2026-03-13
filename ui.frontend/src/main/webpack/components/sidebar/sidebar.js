import template from "./sidebar.hbs";
import "./sidebar.scss";

// ─── Helpers ─────────────────────────────────────────────────

const injectContent = (container, content) => {
  if (!content || !container) return;
  if (typeof content === "string") {
    container.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    container.appendChild(content);
  }
};

const toggleSidebar = (layout) => {
  const current = layout.getAttribute("data-state");
  layout.setAttribute(
    "data-state",
    current === "expanded" ? "collapsed" : "expanded"
  );
};

// ─── AEM Auto-Init ──────────────────────────────────────────

function initSidebar(layout) {
  const trigger = layout.querySelector(".sidebar-trigger");
  if (trigger) {
    trigger.addEventListener("click", () => toggleSidebar(layout));
  }

  const rail = layout.querySelector(".sidebar__rail");
  if (rail) {
    rail.addEventListener("click", () => toggleSidebar(layout));
  }

  const overlay = layout.querySelector(".sidebar-layout__overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      layout.setAttribute("data-state", "collapsed");
    });
  }
}

function initAllSidebars() {
  document.querySelectorAll(".sidebar-layout").forEach((layout) => {
    if (!layout.dataset.initialized) {
      initSidebar(layout);
      layout.dataset.initialized = "true";
    }
  });
}

// Run on page load
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initAllSidebars);

  // MutationObserver for AEM Author mode (re-init on component refresh)
  if (document.body) {
    const observer = new MutationObserver(initAllSidebars);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Global keyboard shortcut: Ctrl+B / Cmd+B
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "b") {
      const layout = document.querySelector(".sidebar-layout");
      if (layout) {
        e.preventDefault();
        toggleSidebar(layout);
      }
    }
  });
}

// ─── Storybook Factory ──────────────────────────────────────

export const Sidebar = (args) => {
  const {
    variant = "sidebar",
    collapsible = "offcanvas",
    defaultOpen = true,
    items = [],
    headerContent = "",
    footerContent = "",
    mainContent = "",
  } = args;

  const state = defaultOpen ? "expanded" : "collapsed";

  const htmlString = template({
    state,
    variant,
    collapsible,
    items,
  });

  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const layout = temp.firstElementChild;

  // Inject slot content
  injectContent(layout.querySelector(".sidebar__header"), headerContent);
  injectContent(layout.querySelector(".sidebar__footer"), footerContent);
  injectContent(layout.querySelector(".sidebar-main__content"), mainContent);

  // Initialize toggle interactions
  initSidebar(layout);

  return layout;
};
