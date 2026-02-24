import template from "./magCounter.hbs";
import "./magCounter.scss";

export function initMagCounter(root) {
  if (!root) {
    return;
  }

  // Apply background image from data attribute
  const backgroundImage = root.dataset.background;
  if (backgroundImage) {
    root.style.backgroundImage = `url('${backgroundImage}')`;
  }

  const items = Array.from(root.querySelectorAll(".mag-counter-item"));
  
  if (!items.length) {
    return;
  }

  let hasAnimated = false;

  // ── Animation Function ────────────────────────────────────────────────────

  function animateCounter(element, target, suffix) {
    const numberElement = element.querySelector(".mag-counter-number");
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format number with commas and suffix
      const formatted = Math.floor(current).toLocaleString();
      numberElement.textContent = suffix ? `${formatted}${suffix}` : formatted;
    }, stepDuration);
  }

  function animateAllCounters() {
    if (hasAnimated) {
      return;
    }
    
    hasAnimated = true;
    
    items.forEach((item) => {
      const target = parseInt(item.dataset.target, 10) || 0;
      const suffix = item.dataset.suffix || "";
      animateCounter(item, target, suffix);
    });
  }

  // ── Intersection Observer ─────────────────────────────────────────────────

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateAllCounters();
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);

  observer.observe(root);
}

export const MagCounter = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  // Attach to a hidden node so any dimension-dependent logic can measure
  // even before Storybook inserts the element into the page.
  document.body.appendChild(root);
  initMagCounter(root);
  document.body.removeChild(root);

  // Return the live element — Storybook will re-attach it to the canvas.
  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllCounters() {
  document.querySelectorAll(".mag-counter").forEach((counter) => {
    if (!counter.dataset.initialized) {
      initMagCounter(counter);
      counter.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllCounters);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllCounters);
observer.observe(document.body, { childList: true, subtree: true });
