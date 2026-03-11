import template from "./sidebar.hbs";
import "./sidebar.scss";

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

export const Sidebar = (args) => {
  const {
    variant = "sidebar",
    collapsible = "offcanvas",
    defaultOpen = true,
    menuGroups = [],
    headerContent = "",
    footerContent = "",
    mainContent = "",
  } = args;

  const state = defaultOpen ? "expanded" : "collapsed";

  const htmlString = template({
    state,
    variant,
    collapsible,
    menuGroups,
  });

  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const layout = temp.firstElementChild;

  // Inject slot content (Card placeholder pattern)
  injectContent(layout.querySelector(".sidebar__header"), headerContent);
  injectContent(layout.querySelector(".sidebar__footer"), footerContent);
  injectContent(layout.querySelector(".sidebar-main__content"), mainContent);

  // Toggle via trigger button
  const trigger = layout.querySelector(".sidebar-trigger");
  if (trigger) {
    trigger.addEventListener("click", () => toggleSidebar(layout));
  }

  // Toggle via rail
  const rail = layout.querySelector(".sidebar__rail");
  if (rail) {
    rail.addEventListener("click", () => toggleSidebar(layout));
  }

  // Close via overlay (mobile)
  const overlay = layout.querySelector(".sidebar-layout__overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      layout.setAttribute("data-state", "collapsed");
    });
  }

  // Keyboard shortcut: Ctrl+B / Cmd+B
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "b") {
      e.preventDefault();
      toggleSidebar(layout);
    }
  });

  return layout;
};
