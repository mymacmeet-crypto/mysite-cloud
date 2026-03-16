import { MagTable } from "./magTable";

export default {
  title: "Components/MagTable",
};

// ── Column Definitions ────────────────────────────────────────────────────────

const columns = [
  { key: "item", label: "Item" },
  { key: "type", label: "Type" },
  { key: "sku", label: "SKU" },
  { key: "inStock", label: "In Stock" },
  { key: "price", label: "Price" },
  { key: "availableIn", label: "Available In" },
];

// ── Inline SVG Icons for Type Column ─────────────────────────────────────────

// eslint-disable-next-line max-len
const ICON_CLOTHING = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 3.5L4.5 2L6 4C6.5 4.8 7.2 5 8 5C8.8 5 9.5 4.8 10 4L11.5 2L15 3.5L13 7.5L11 6.5V14H5V6.5L3 7.5L1 3.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

// eslint-disable-next-line max-len
const ICON_ELECTRONICS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3" width="13" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 14H11M8 11V14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="7" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>`;

// eslint-disable-next-line max-len
const ICON_ACCESSORIES = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M8 2.5V4M8 12V13.5M2.5 8H4M12 8H13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;

// ── Sample Rows ───────────────────────────────────────────────────────────────

const rows = [
  {
    cells: [
      { value: "Wool Sweater" },
      { icon: ICON_CLOTHING, text: "Clothing" },
      { value: "WS-003" },
      { value: "Yes" },
      { value: "$168.27" },
      { badges: ["In store"] },
    ],
  },
  {
    cells: [
      { value: "Winter Jacket" },
      { icon: ICON_CLOTHING, text: "Clothing" },
      { value: "WJ-007" },
      { value: "Yes" },
      { value: "$148.06" },
      { badges: ["In store"] },
    ],
  },
  {
    cells: [
      { value: "Wireless Earbuds" },
      { icon: ICON_ELECTRONICS, text: "Electronics" },
      { value: "WE-004" },
      { value: "Yes" },
      { value: "$107.75" },
      { badges: ["In store", "Online"] },
    ],
  },
  {
    cells: [
      { value: "Tablet Case" },
      { icon: ICON_ACCESSORIES, text: "Accessories" },
      { value: "TC-001" },
      { value: "Yes" },
      { value: "$83.24" },
      { badges: ["In store", "Online"] },
    ],
  },
  {
    cells: [
      { value: "Smart Watch" },
      { icon: ICON_ELECTRONICS, text: "Electronics" },
      { value: "SW-002" },
      { value: "Yes" },
      { value: "$246.27" },
      { badges: ["In store", "Online"] },
    ],
  },
  {
    cells: [
      { value: "Sunglasses" },
      { icon: ICON_ACCESSORIES, text: "Accessories" },
      { value: "SG-010" },
      { value: "Yes" },
      { value: "$60.17" },
      { badges: ["In store"] },
    ],
  },
  {
    cells: [
      { value: "Running Shoes" },
      { icon: ICON_CLOTHING, text: "Clothing" },
      { value: "RS-006" },
      { value: "Yes" },
      { value: "$208.26" },
      { badges: ["In store"] },
    ],
  },
  {
    cells: [
      { value: "Phone Case" },
      { icon: ICON_ACCESSORIES, text: "Accessories" },
      { value: "PC-008" },
      { value: "Yes" },
      { value: "$298.08" },
      { badges: ["In store", "Online"] },
    ],
  },
  {
    cells: [
      { value: "Laptop Sleeve" },
      { icon: ICON_ELECTRONICS, text: "Electronics" },
      { value: "LS-005" },
      { value: "Yes" },
      { value: "$248.02" },
      { badges: ["In store", "Online"] },
    ],
  },
  {
    cells: [
      { value: "Fitness Tracker" },
      { icon: ICON_ELECTRONICS, text: "Electronics" },
      { value: "FT-009" },
      { value: "Yes" },
      { value: "$222.09" },
      { badges: ["In store"] },
    ],
  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default table — all columns, full dataset */
export const Default = {
  render: () =>
    MagTable({
      tableTitle: "Data Table with Column Controls",
      tableSubtitle:
        "A data table with comprehensive column controls including sorting, pinning, moving, and visibility management",
      cfEndpoint: "",
      columns,
      rows,
    }),
};

/** Fewer columns */
export const MinimalColumns = {
  render: () =>
    MagTable({
      tableTitle: "Products",
      tableSubtitle: "Simple product list with essential columns only",
      cfEndpoint: "",
      columns: [
        { key: "item", label: "Item" },
        { key: "sku", label: "SKU" },
        { key: "price", label: "Price" },
        { key: "inStock", label: "In Stock" },
      ],
      rows: rows.map((r) => ({
        cells: [r.cells[0], r.cells[2], r.cells[4], r.cells[3]],
      })),
    }),
};

/** Small dataset — 3 rows */
export const FewRows = {
  render: () =>
    MagTable({
      tableTitle: "Featured Items",
      tableSubtitle: "",
      cfEndpoint: "",
      columns,
      rows: rows.slice(0, 3),
    }),
};

/** No subtitle */
export const NoSubtitle = {
  render: () =>
    MagTable({
      tableTitle: "Inventory",
      tableSubtitle: "",
      cfEndpoint: "",
      columns,
      rows,
    }),
};
