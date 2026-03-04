import template from "./magTab.hbs";
import "./magTab.scss";

const STORAGE_KEY_PREFIX = "mag-tab-active-";

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

export function initMagTab(root) {
  if (!root) {
    return;
  }

  const buttons = Array.from(root.querySelectorAll(".mag-tab-button"));
  const panels = Array.from(root.querySelectorAll(".mag-tab-panel"));

  if (!buttons.length || !panels.length) {
    return;
  }

  let cardsData = [];
  try {
    if (root.dataset.cards) {
      cardsData = JSON.parse(root.dataset.cards);
    }
  } catch (e) {
    console.error("Failed to parse cards data", e);
  }

  const storageKey = `${STORAGE_KEY_PREFIX}${root.dataset.componentId || "default"}`;

  // ── Render Cards ──────────────────────────────────────────────────────────

  function renderCardsForCategory(panel, category) {
    const grid = panel.querySelector(".mag-tab-grid");
    if (!grid) {
      return;
    }

    const filtered =
      category.toLowerCase() === "all"
        ? cardsData
        : cardsData.filter((c) => c.category === category);

    grid.innerHTML = "";
    filtered.forEach((card) => grid.appendChild(createCardElement(card)));
  }

  function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "mag-tab-card";
    if (card.link) {
      cardDiv.dataset.href = card.link;
    }

    let html = "";

    if (card.fileReference) {
      html += `<div class="mag-tab-card-image">
        <img src="${card.fileReference}" alt="${card.title || ""}" />
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
      cardDiv.addEventListener("click", () => {
        window.location.href = card.link;
      });
    }
    return cardDiv;
  }

  // ── Tab Switching ─────────────────────────────────────────────────────────

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
      localStorage.setItem(storageKey, index.toString());
    } catch (e) {}
  }

  buttons.forEach((btn, i) =>
    btn.addEventListener("click", () => switchTab(i)),
  );

  // Restore saved tab or default to 0
  let activeIndex = 0;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < buttons.length) {
        activeIndex = parsed;
      }
    }
  } catch (e) {}

  switchTab(activeIndex);
}

// ── Storybook entry point ─────────────────────────────────────────────────────
// `tabs` are no longer authored manually — they are derived from card categories.
export const MagTab = (args) => {
  // Auto-generate tabs from the cards array
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

  document.body.appendChild(root);
  initMagTab(root);
  document.body.removeChild(root);

  return root;
};

// ── AEM initialization ────────────────────────────────────────────────────────
function initAllTabs() {
  document.querySelectorAll(".mag-tab").forEach((tab) => {
    if (!tab.dataset.initialized) {
      initMagTab(tab);
      tab.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllTabs);
const observer = new MutationObserver(initAllTabs);
observer.observe(document.body, { childList: true, subtree: true });
