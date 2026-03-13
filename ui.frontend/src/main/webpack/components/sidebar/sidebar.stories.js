import { Sidebar } from "./sidebar";

// ─── Sample items ────────────────────────────────────────────
const sampleItems = [
  { label: "Dashboard", url: "#", isActive: true },
  { label: "Inbox", url: "#" },
  { label: "Calendar", url: "#" },
  { label: "Search", url: "#" },
  { label: "Profile", url: "#" },
  { label: "Bookmarks", url: "#" },
  { label: "Help", url: "#" },
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
      options: ["offcanvas", "none"],
      description: "Collapse behavior",
    },
    defaultOpen: {
      control: "boolean",
      description: "Start expanded or collapsed",
    },
    items: {
      control: "object",
      description:
        'Sidebar menu items — edit to add/remove (e.g. [{"label":"Item 1","url":"#"},{"label":"Item 2","url":"#","isActive":true}])',
    },
  },
  args: {
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: true,
    items: sampleItems,
  },
  parameters: {
    layout: "fullscreen",
  },
};

// ─── Stories ─────────────────────────────────────────────────

export const Default = {
  render: (args) =>
    Sidebar({
      ...args,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const CollapsedOffcanvas = {
  name: "Collapsed — Offcanvas",
  args: {
    defaultOpen: false,
  },
  render: (args) =>
    Sidebar({
      ...args,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const FloatingVariant = {
  name: "Floating Variant",
  args: {
    variant: "floating",
  },
  render: (args) =>
    Sidebar({
      ...args,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const InsetVariant = {
  name: "Inset Variant",
  args: {
    variant: "inset",
  },
  render: (args) =>
    Sidebar({
      ...args,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};

export const Playground = {
  args: {
    items: [
      { label: "Dashboard", url: "#", isActive: true },
      { label: "Inbox", url: "#" },
      { label: "Item 2", url: "#" },
    ],
  },
  render: (args) =>
    Sidebar({
      ...args,
      headerContent: HEADER_HTML,
      footerContent: FOOTER_HTML,
      mainContent: MAIN_HTML,
    }),
};
