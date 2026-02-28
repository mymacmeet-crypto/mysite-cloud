import template from "./magTab.hbs";
import "./magTab.scss";

const STORAGE_KEY_PREFIX = "mag-tab-active-";

export function initMagTab(root) {
  if (!root) {
    return;
  }

  const buttons = Array.from(root.querySelectorAll(".mag-tab-button"));
  const panels = Array.from(root.querySelectorAll(".mag-tab-panel"));

  if (!buttons.length || !panels.length) {
    return;
  }

  // Get cards data from dataset
  let cardsData = [];
  try {
    if (root.dataset.cards) {
      cardsData = JSON.parse(root.dataset.cards);
    }
  } catch (e) {
    console.error("Failed to parse cards data", e);
  }

  // Generate unique storage key based on component position
  const storageKey = `${STORAGE_KEY_PREFIX}${root.dataset.componentId || "default"}`;

  // ── Render Cards in Panels ───────────────────────────────────────────────

  function renderCardsForCategory(panel, category) {
    const grid = panel.querySelector(".mag-tab-grid");
    if (!grid) {
        return;
    }

    // Filter cards by category (or show all if category is "all")
    const filteredCards = category.toLowerCase() === "all" 
      ? cardsData 
      : cardsData.filter(card => card.category === category);

    // Clear existing content
    grid.innerHTML = "";

    // Render each card
    filteredCards.forEach(card => {
      const cardElement = createCardElement(card);
      grid.appendChild(cardElement);
    });
  }

  // ── Create Card Element ──────────────────────────────────────────────────

  function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "mag-tab-card";
    if (card.link) {
      cardDiv.dataset.href = card.link;
    }

    let cardHTML = "";

    // Image
    if (card.fileReference) {
      cardHTML += `
        <div class="mag-tab-card-image">
          <img src="${card.fileReference}" alt="${card.title || ''}" />
        </div>
      `;
    }

    // Body
    cardHTML += `<div class="mag-tab-card-body">`;

    // Title
    if (card.title) {
      cardHTML += `<h3 class="mag-tab-card-title">${card.title}</h3>`;
    }

    // Text
    if (card.text) {
      cardHTML += `<div class="mag-tab-card-text">${card.text}</div>`;
    }

    // Meta
    const hasMeta = card.category || card.comments || card.views;
    if (hasMeta) {
      cardHTML += `<div class="mag-tab-card-meta">`;
      
      if (card.category) {
        cardHTML += `<span class="mag-tab-badge">${card.category}</span>`;
      }
      
      if (card.comments) {
        cardHTML += `
          <span class="mag-tab-meta-stat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            ${card.comments}
          </span>
        `;
      }
      
      if (card.views) {
        cardHTML += `
          <span class="mag-tab-meta-stat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            ${card.views}
          </span>
        `;
      }
      
      cardHTML += `</div>`;
    }

    cardHTML += `</div>`; // Close body

    cardDiv.innerHTML = cardHTML;

    // Add click handler
    if (card.link) {
      cardDiv.addEventListener("click", () => {
        window.location.href = card.link;
      });
    }

    return cardDiv;
  }

  // ── Tab Switching ────────────────────────────────────────────────────────

  function switchTab(index) {
    // Update buttons
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("mag-tab-active");
      } else {
        btn.classList.remove("mag-tab-active");
      }
    });

    // Update panels
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.classList.add("mag-tab-panel-active");
        // Render cards for this category
        const category = buttons[i].dataset.category;
        renderCardsForCategory(panel, category);
      } else {
        panel.classList.remove("mag-tab-panel-active");
      }
    });

    // Save to localStorage
    try {
      localStorage.setItem(storageKey, index.toString());
    } catch (e) {
      // localStorage might be disabled
    }
  }

  // ── Event Listeners ──────────────────────────────────────────────────────

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      switchTab(index);
    });
  });

  // ── Initialize ───────────────────────────────────────────────────────────

  // Check localStorage for saved tab
  let activeIndex = 0;
  try {
    const savedIndex = localStorage.getItem(storageKey);
    if (savedIndex !== null) {
      const parsed = parseInt(savedIndex, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < buttons.length) {
        activeIndex = parsed;
      }
    }
  } catch (e) {
    // localStorage might be disabled
  }

  // Activate the saved or default tab
  switchTab(activeIndex);
}

export const MagTab = (args) => {
  // Pass parentPath from args through to dataset for JS inspection
  // (AEM sets this via data-parent-path in HTL; Storybook mirrors it here)
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  // Store cards data for filtering
  if (args.cards) {
    root.dataset.cards = JSON.stringify(args.cards);
  }

  // Mirror the AEM data-parent-path attribute for Storybook inspection
  if (args.parentPath) {
    root.dataset.parentPath = args.parentPath;
  }

  // Generate unique ID for localStorage
  root.dataset.componentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  document.body.appendChild(root);
  initMagTab(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllTabs() {
  document.querySelectorAll(".mag-tab").forEach((tab) => {
    if (!tab.dataset.initialized) {
      initMagTab(tab);
      tab.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllTabs);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllTabs);
observer.observe(document.body, { childList: true, subtree: true });
