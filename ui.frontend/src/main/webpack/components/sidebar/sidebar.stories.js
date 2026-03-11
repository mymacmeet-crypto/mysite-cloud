import { Sidebar } from "./sidebar";

// ─── Lucide-style SVG icon helper ───────────────────────────
const icon = (d) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"` +
  ` stroke="currentColor" stroke-width="2" stroke-linecap="round"` +
  ` stroke-linejoin="round">${d}</svg>`;

const ICONS = {
  home: icon(
    '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' +
      '<polyline points="9 22 9 12 15 12 15 22"/>'
  ),
  inbox: icon(
    '<rect x="3" y="3" width="18" height="13" rx="2"/>' +
      '<polyline points="3 8 12 13 21 8"/>'
  ),
  calendar: icon(
    '<rect width="18" height="18" x="3" y="4" rx="2"/>' +
      '<line x1="16" x2="16" y1="2" y2="6"/>' +
      '<line x1="8" x2="8" y1="2" y2="6"/>' +
      '<line x1="3" x2="21" y1="10" y2="10"/>'
  ),
  search: icon(
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'
  ),
  user: icon(
    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>' +
      '<circle cx="12" cy="7" r="4"/>'
  ),
  bell: icon(
    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
      '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
  ),
  bookmark: icon(
    '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'
  ),
  help: icon(
    '<circle cx="12" cy="12" r="10"/>' +
      '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>' +
      '<path d="M12 17h.01"/>'
  ),
};

// ─── Sample menu data ───────────────────────────────────────
const sampleMenuGroups = [
  {
    label: "Application",
    items: [
      { icon: ICONS.home, label: "Dashboard", url: "#", isActive: true },
      { icon: ICONS.inbox, label: "Inbox", url: "#" },
      { icon: ICONS.calendar, label: "Calendar", url: "#" },
      { icon: ICONS.search, label: "Search", url: "#" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: ICONS.user, label: "Profile", url: "#" },
      { icon: ICONS.bookmark, label: "Bookmarks", url: "#" },
      { icon: ICONS.help, label: "Help", url: "#" },
    ],
  },
];

const menuGroupsWithBadges = [
  {
    label: "Application",
    items: [
      { icon: ICONS.home, label: "Dashboard", url: "#", isActive: true },
      { icon: ICONS.inbox, label: "Inbox", url: "#", badge: "12" },
      { icon: ICONS.calendar, label: "Calendar", url: "#", badge: "3" },
      { icon: ICONS.search, label: "Search", url: "#" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: ICONS.user, label: "Profile", url: "#" },
      { icon: ICONS.bell, label: "Notifications", url: "#", badge: "99+" },
      { icon: ICONS.help, label: "Help", url: "#" },
    ],
  },
];

const HEADER_HTML =
  '<div style="display:flex;align-items:center;gap:8px;">' +
  '<div style="width:28px;height:28px;background:#18181b;border-radius:6px;' +
  'display:flex;align-items:center;justify-content:center;color:#fff;' +
  'font-size:12px;font-weight:700;">A</div>' +
  '<span style="font-size:14px;font-weight:600;color:#18181b;">Acme Inc</span>' +
  "</div>";

const FOOTER_HTML =
  '<div style="display:flex;align-items:center;gap:8px;">' +
  '<div style="width:28px;height:28px;background:#e4e4e7;border-radius:9999px;' +
  'display:flex;align-items:center;justify-content:center;color:#71717a;' +
  'font-size:11px;font-weight:600;">JD</div>' +
  '<span style="font-size:13px;color:#3f3f46;">Jane Doe</span>' +
  "</div>";

const MAIN_HTML =
  '<div style="font-family:sans-serif;color:#71717a;">' +
  "<h2 style=\"color:#18181b;margin:0 0 8px;\">Welcome back</h2>" +
  '<p style="margin:0;font-size:14px;">Select an item from the sidebar to get started. ' +
  "Try the toggle button or press <kbd>Ctrl+B</kbd> to collapse/expand.</p></div>";

// ─── Story configuration ────────────────────────────────────
export default {
  title: "Components/Sidebar",
  argTypes: {
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual style variant",
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Collapse behavior",
    },
    defaultOpen: {
      control: "boolean",
      description: "Start expanded or collapsed",
    },
  },
  args: {
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};

// ─── Stories ─────────────────────────────────────────────────

export const Default = {
  args: {
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: sampleMenuGroups,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const CollapsedOffcanvas = {
  name: "Collapsed — Offcanvas",
  args: {
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: false,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: sampleMenuGroups,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const IconMode = {
  name: "Icon Mode",
  args: {
    variant: "sidebar",
    collapsible: "icon",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: sampleMenuGroups,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent:
        '<div style="font-family:sans-serif;color:#71717a;">' +
        "<h2 style=\"color:#18181b;margin:0 0 8px;\">Icon Mode</h2>" +
        '<p style="margin:0;font-size:14px;">Click the toggle or press ' +
        "<kbd>Ctrl+B</kbd> to collapse to icons only.</p></div>",
    }),
};

export const FloatingVariant = {
  name: "Floating Variant",
  args: {
    variant: "floating",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: sampleMenuGroups,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const InsetVariant = {
  name: "Inset Variant",
  args: {
    variant: "inset",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: sampleMenuGroups,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const WithBadges = {
  name: "With Badges",
  args: {
    variant: "sidebar",
    collapsible: "icon",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: menuGroupsWithBadges,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const Playground = {
  args: {
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
  render: (args) =>
    Sidebar({
      ...args,
      menuGroups: menuGroupsWithBadges,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};
