import template from "./magModal.hbs";
import "./magModal.scss";

export function initMagModal(root) {
  if (!root) {
    return;
  }

  const trigger = root.querySelector(".mag-modal-trigger");
  const overlay = root.querySelector(".mag-modal-overlay");
  const modal = root.querySelector(".mag-modal");
  const closeBtn = root.querySelector(".mag-modal-close");

  if (!overlay || !modal) {
    return;
  }

  // ── Open Modal ────────────────────────────────────────────────────────────

  function openModal() {
    overlay.classList.add("mag-modal-open");
    document.body.classList.add("mag-modal-active");

    // Focus trap - focus first focusable element
    setTimeout(() => {
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 100);
  }

  // ── Close Modal ───────────────────────────────────────────────────────────

  function closeModal() {
    overlay.classList.remove("mag-modal-open");
    document.body.classList.remove("mag-modal-active");

    // Return focus to trigger button
    if (trigger) {
      trigger.focus();
    }
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  // Open on trigger button click
  if (trigger) {
    trigger.addEventListener("click", openModal);
  }

  // Close on close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on overlay click (outside modal)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("mag-modal-open")) {
      closeModal();
    }
  });
}

export const MagModal = (args) => {
  // Generate unique ID if not provided
  if (!args.modalId) {
    args.modalId = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagModal(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllModals() {
  document.querySelectorAll(".mag-modal-wrapper").forEach((modalWrapper) => {
    if (!modalWrapper.dataset.initialized) {
      initMagModal(modalWrapper);
      modalWrapper.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllModals);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllModals);
observer.observe(document.body, { childList: true, subtree: true });
