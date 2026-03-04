import template from "./magTab.hbs";
import "./magTab.scss";

const STORAGE_KEY_PREFIX = "mag-tab-active-";

// ── Auto-generate tabs from card categories ───────────────────────────────────
// Tab 0 is always "ALL". Subsequent tabs are one-per-unique-category in order.
function buildTabsFromCards(cards) {
  const tabs = [{ label: "ALL", category: "all" }];
  const seen = new Set();
  (cards || []).forEach((card) => {
    if (card.category && !seen.has(card.category)) {
      seen.add(card.category);
      tabs.push({ label: card.category, category: card.category });
    }
  });
  return tabs;
}

// ── Core initialisation ────────────────────────────────────────────────────────
export function initMagTab(root) {
  if (!root) {
    return;
  }

  const buttons = Array.from(root.querySelectorAll(".mag-tab-button"));
  const panels = Array.from(root.querySelectorAll(".mag-tab-panel"));

  if (!buttons.length || !panels.length) {
    return;
  }

  // Parse cards from data attribute (set before initMagTab is called)
  let cardsData = [];
  try {
    if (root.dataset.cards) {
      cardsData = JSON.parse(root.dataset.cards);
    }
  } catch (e) {
    console.error("MagTab: failed to parse cards data", e);
  }

  const storageKey = `${STORAGE_KEY_PREFIX}${root.dataset.componentId || "default"}`;

  // ── Render ──────────────────────────────────────────────────────────────────

  function renderCardsForCategory(panel, category) {
    const grid = panel.querySelector(".mag-tab-grid");
    if (!grid) {
      return;
    }

    const filtered =
      category.toLowerCase() === "all"
        ? cardsData
        : cardsData.filter((c) => c.category === category);

    // Build all card nodes before touching the DOM (avoids observer thrashing)
    const fragment = document.createDocumentFragment();
    filtered.forEach((card) => fragment.appendChild(createCardElement(card)));

    grid.innerHTML = "";
    grid.appendChild(fragment);
  }

  function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "mag-tab-card";

    let html = "";

    if (card.fileReference) {
      html += `<div class="mag-tab-card-image">
        <img src="${card.fileReference}" alt="${card.title || ""}" loading="lazy" />
      </div>`;
    }

    html += `<div class="mag-tab-card-body">`;
    if (card.title) {
      html += `<h3 class="mag-tab-card-title">${card.title}</h3>`;
    }
    if (card.text) {
      html += `<div class="mag-tab-card-text">${card.text}</div>`;
    }

    const hasMeta = card.category || card.comments || card.views;
    if (hasMeta) {
      html += `<div class="mag-tab-card-meta">`;
      if (card.category) {
        html += `<span class="mag-tab-badge">${card.category}</span>`;
      }
      if (card.comments) {
        html += `<span class="mag-tab-meta-stat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>${card.comments}</span>`;
      }
      if (card.views) {
        html += `<span class="mag-tab-meta-stat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>${card.views}</span>`;
      }
      html += `</div>`;
    }
    html += `</div>`;

    cardDiv.innerHTML = html;

    if (card.link) {
      cardDiv.style.cursor = "pointer";
      cardDiv.addEventListener("click", () => {
        window.location.href = card.link;
      });
    }

    return cardDiv;
  }

  // ── Tab switching ────────────────────────────────────────────────────────────

  function switchTab(index) {
    buttons.forEach((btn, i) =>
      btn.classList.toggle("mag-tab-active", i === index),
    );
    panels.forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle("mag-tab-panel-active", active);
      if (active) {
        renderCardsForCategory(panel, buttons[i].dataset.category);
      }
    });
    try {
      localStorage.setItem(storageKey, String(index));
    } catch (_) {}
  }

  buttons.forEach((btn, i) =>
    btn.addEventListener("click", () => switchTab(i)),
  );

  // Restore saved tab or default to 0
  let activeIndex = 0;
  try {
    const saved = parseInt(localStorage.getItem(storageKey), 10);
    if (!isNaN(saved) && saved >= 0 && saved < buttons.length) {
      activeIndex = saved;
    }
  } catch (_) {}

  switchTab(activeIndex);
}

// ── Storybook factory ──────────────────────────────────────────────────────────
// NOTE: querySelectorAll works on detached nodes — no body.appendChild needed.
// Removing that pattern eliminates the MutationObserver re-initialisation race
// that caused cards to be wiped before they could be displayed.
export const MagTab = (args) => {
  const generatedTabs = buildTabsFromCards(args.cards);

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template({ ...args, tabs: generatedTabs });
  const root = wrapper.firstElementChild;

  if (args.cards) {
    root.dataset.cards = JSON.stringify(args.cards);
  }
  if (args.parentPath) {
    root.dataset.parentPath = args.parentPath;
  }
  root.dataset.componentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  // Mark as initialised NOW so the MutationObserver (fired when Storybook
  // appends this element) does not run initMagTab a second time.
  root.dataset.initialized = "true";

  initMagTab(root); // ← works fine on a detached node

  return root;
};

// ── AEM initialisation ─────────────────────────────────────────────────────────
function initAllTabs() {
  document.querySelectorAll(".mag-tab").forEach((tab) => {
    if (!tab.dataset.initialized) {
      initMagTab(tab);
      tab.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllTabs);

// AEM Author: re-init after dynamic component drops
const observer = new MutationObserver(initAllTabs);
observer.observe(document.body, { childList: true, subtree: true });
