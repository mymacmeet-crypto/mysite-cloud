import template from "./magTable.hbs";
import "./magTable.scss";

// ── Core Init ─────────────────────────────────────────────────────────────────

export function initMagTable(root) {
  const table = root.querySelector(".mag-table");
  if (!table) {
    return;
  }

  const thead = table.querySelector("thead");
  const tbody = table.querySelector(".mag-table-body");

  // Single global dropdown lives in .mag-table-wrapper (outside overflow scroll)
  const dropdown = root.querySelector(".mag-col-dropdown");
  const submenu = dropdown.querySelector(".mag-submenu");
  if (!dropdown) {
    return;
  }

  // The column whose menu is currently open
  let activeCol = null;

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function getColumns() {
    return Array.from(thead.querySelectorAll(".mag-table-th"));
  }

  function getBodyCells(colIndex) {
    return Array.from(tbody.querySelectorAll(".mag-table-row")).map(
      (row) => row.querySelectorAll(".mag-table-td")[colIndex],
    );
  }

  // ── Dropdown Position & Visibility ───────────────────────────────────────────

  function openDropdown(th) {
    if (activeCol) {
      closeDropdown();
    }

    activeCol = th;

    const btn = th.querySelector(".mag-col-menu-btn");
    const btnRect = btn.getBoundingClientRect();
    const wrapperRect = root.getBoundingClientRect();

    // Position relative to .mag-table-wrapper (position:relative)
    let top = btnRect.bottom - wrapperRect.top + 2;
    let left = btnRect.left - wrapperRect.left;

    // Tentatively show so we can measure width
    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;
    dropdown.classList.add("mag-open");
    dropdown.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");

    // Flip left if the dropdown overflows the right edge of the viewport
    const dropRect = dropdown.getBoundingClientRect();
    if (dropRect.right > window.innerWidth - 8) {
      left = btnRect.right - wrapperRect.left - dropdown.offsetWidth;
      dropdown.style.left = `${Math.max(0, left)}px`;
    }

    updateMoveStates(th);
    buildColumnsSubmenu();
  }

  function closeDropdown() {
    dropdown.classList.remove("mag-open");
    dropdown.setAttribute("aria-hidden", "true");
    submenu.classList.remove("mag-open");

    if (activeCol) {
      activeCol
        .querySelector(".mag-col-menu-btn")
        ?.setAttribute("aria-expanded", "false");
    }
    activeCol = null;
  }

  // ── Move Button States ────────────────────────────────────────────────────────

  function updateMoveStates(th) {
    const cols = getColumns();
    const idx = cols.indexOf(th);
    const btnLeft = dropdown.querySelector("[data-action='move-left']");
    const btnRight = dropdown.querySelector("[data-action='move-right']");

    const isFirst = idx === 0;
    const isLast = idx === cols.length - 1;

    btnLeft.disabled = isFirst;
    btnLeft.classList.toggle("mag-disabled", isFirst);
    btnRight.disabled = isLast;
    btnRight.classList.toggle("mag-disabled", isLast);
  }

  // ── Columns Submenu ───────────────────────────────────────────────────────────

  function buildColumnsSubmenu() {
    submenu.innerHTML = "";
    getColumns().forEach((col) => {
      const key = col.dataset.colKey;
      const label = col.querySelector(".mag-col-label").textContent.trim();
      const isVisible = !col.classList.contains("mag-col-hidden");

      const item = document.createElement("label");
      item.className = "mag-submenu-item";
      item.innerHTML = `
        <input type="checkbox" class="mag-submenu-checkbox" data-col-key="${key}" ${isVisible ? "checked" : ""}>
        <span>${label}</span>
      `;
      item.querySelector("input").addEventListener("change", (e) => {
        e.stopPropagation();
        setColumnVisibility(key, e.target.checked);
      });
      submenu.appendChild(item);
    });
  }

  // ── Sort ──────────────────────────────────────────────────────────────────────

  function sortColumn(th, direction) {
    const cols = getColumns();
    const colIdx = cols.indexOf(th);
    const rows = Array.from(tbody.querySelectorAll(".mag-table-row"));

    cols.forEach((c) => c.classList.remove("mag-sort-asc", "mag-sort-desc"));
    th.classList.add(direction === "asc" ? "mag-sort-asc" : "mag-sort-desc");

    rows.sort((a, b) => {
      const aText = (
        a.querySelectorAll(".mag-table-td")[colIdx]?.textContent || ""
      ).trim();
      const bText = (
        b.querySelectorAll(".mag-table-td")[colIdx]?.textContent || ""
      ).trim();

      const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
      const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === "asc" ? aNum - bNum : bNum - aNum;
      }
      return direction === "asc"
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });

    rows.forEach((row) => tbody.appendChild(row));
  }

  // ── Pin ───────────────────────────────────────────────────────────────────────

  function pinColumn(th, side) {
    const cols = getColumns();
    const colIdx = cols.indexOf(th);

    // Toggle: clicking the active pin side again unpins
    const alreadyPinned = th.getAttribute("data-pinned") === side;
    const targetSide = alreadyPinned ? null : side;

    th.classList.remove("mag-pin-left", "mag-pin-right");
    th.removeAttribute("data-pinned");
    getBodyCells(colIdx).forEach((td) => {
      if (td) {
        td.classList.remove("mag-pin-left", "mag-pin-right");
      }
    });

    if (targetSide) {
      th.classList.add(`mag-pin-${targetSide}`);
      th.setAttribute("data-pinned", targetSide);
      getBodyCells(colIdx).forEach((td) => {
        if (td) {
          td.classList.add(`mag-pin-${targetSide}`);
        }
      });
    }

    recalcStickyOffsets();
  }

  function recalcStickyOffsets() {
    const cols = getColumns();
    let leftOff = 0;
    let rightOff = 0;

    cols.forEach((th, idx) => {
      if (th.classList.contains("mag-pin-left")) {
        th.style.left = `${leftOff}px`;
        getBodyCells(idx).forEach((td) => {
          if (td) {
            td.style.left = `${leftOff}px`;
          }
        });
        leftOff += th.offsetWidth;
      } else {
        th.style.left = "";
        getBodyCells(idx).forEach((td) => {
          if (td) {
            td.style.left = "";
          }
        });
      }
    });

    [...cols].reverse().forEach((th) => {
      const idx = cols.indexOf(th);
      if (th.classList.contains("mag-pin-right")) {
        th.style.right = `${rightOff}px`;
        getBodyCells(idx).forEach((td) => {
          if (td) {
            td.style.right = `${rightOff}px`;
          }
        });
        rightOff += th.offsetWidth;
      } else {
        th.style.right = "";
        getBodyCells(idx).forEach((td) => {
          if (td) {
            td.style.right = "";
          }
        });
      }
    });
  }

  // ── Move ──────────────────────────────────────────────────────────────────────

  function moveColumn(th, direction) {
    const cols = getColumns();
    const idx = cols.indexOf(th);
    const targetIdx = direction === "left" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= cols.length) {
      return;
    }

    const headRow = thead.querySelector(".mag-table-head-row");
    const targetTh = cols[targetIdx];

    if (direction === "left") {
      headRow.insertBefore(th, targetTh);
    } else {
      headRow.insertBefore(targetTh, th);
    }

    tbody.querySelectorAll(".mag-table-row").forEach((row) => {
      const cells = row.querySelectorAll(".mag-table-td");
      const cell = cells[idx];
      const targetCell = cells[targetIdx];
      if (!cell || !targetCell) {
        return;
      }
      if (direction === "left") {
        row.insertBefore(cell, targetCell);
      } else {
        row.insertBefore(targetCell, cell);
      }
    });
  }

  // ── Column Visibility ─────────────────────────────────────────────────────────

  function setColumnVisibility(key, visible) {
    const cols = getColumns();
    const th = cols.find((c) => c.dataset.colKey === key);
    if (!th) {
      return;
    }
    const colIdx = cols.indexOf(th);
    th.classList.toggle("mag-col-hidden", !visible);
    getBodyCells(colIdx).forEach((td) => {
      if (td) {
        td.classList.toggle("mag-col-hidden", !visible);
      }
    });
  }

  // ── Dropdown Action Handlers ──────────────────────────────────────────────────

  dropdown.addEventListener("click", (e) => e.stopPropagation());

  dropdown.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!activeCol) {
        return;
      }
      const action = btn.dataset.action;

      switch (action) {
        case "sort-asc":
          sortColumn(activeCol, "asc");
          closeDropdown();
          break;
        case "sort-desc":
          sortColumn(activeCol, "desc");
          closeDropdown();
          break;
        case "pin-left":
          pinColumn(activeCol, "left");
          closeDropdown();
          break;
        case "pin-right":
          pinColumn(activeCol, "right");
          closeDropdown();
          break;
        case "move-left":
          if (!btn.disabled) {
            moveColumn(activeCol, "left");
            closeDropdown();
          }
          break;
        case "move-right":
          if (!btn.disabled) {
            moveColumn(activeCol, "right");
            closeDropdown();
          }
          break;
        case "columns":
          e.stopPropagation();
          submenu.classList.toggle("mag-open");
          break;
        case "hide":
          setColumnVisibility(activeCol.dataset.colKey, false);
          closeDropdown();
          break;
      }
    });
  });

  // ── Column Menu Button Listeners ──────────────────────────────────────────────

  getColumns().forEach((th) => {
    th.querySelector(".mag-col-menu-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeCol === th && dropdown.classList.contains("mag-open")) {
        closeDropdown();
      } else {
        openDropdown(th);
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      dropdown.classList.contains("mag-open") &&
      !dropdown.contains(e.target)
    ) {
      closeDropdown();
    }
  });

  // ── Content Fragment Data Loading (AEM mode) ──────────────────────────────────

  const cfEndpoint = root.dataset.cfEndpoint;
  if (cfEndpoint) {
    fetch(cfEndpoint)
      .then((res) => res.json())
      .then((res) => {
        const items = res?.data?.tableItemList?.items || [];
        if (items.length) {
          renderCfData(items);
        }
      })
      .catch((err) => console.error("MagTable: CF data load failed", err));
  }

  function renderCfData(items) {
    tbody.innerHTML = "";
    const cols = getColumns();
    items.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "mag-table-row";
      cols.forEach((col) => {
        const td = document.createElement("td");
        td.className = "mag-table-td";
        const value = item[col.dataset.colKey];
        if (Array.isArray(value)) {
          value.forEach((badge) => {
            const span = document.createElement("span");
            span.className = "mag-badge";
            span.textContent = badge;
            td.appendChild(span);
          });
        } else {
          td.textContent = value ?? "";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
}

// ── Storybook Export ──────────────────────────────────────────────────────────

export const MagTable = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagTable(root);
  document.body.removeChild(root);

  return root;
};

// ── AEM Auto-Init ─────────────────────────────────────────────────────────────

function initAllTables() {
  document.querySelectorAll(".mag-table-wrapper").forEach((el) => {
    if (!el.dataset.initialized) {
      initMagTable(el);
      el.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllTables);

const mutationObserver = new MutationObserver(initAllTables);
mutationObserver.observe(document.body, { childList: true, subtree: true });
