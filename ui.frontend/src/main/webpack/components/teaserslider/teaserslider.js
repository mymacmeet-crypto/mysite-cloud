import template from "./teaserslider.hbs";
import "./teaserslider.scss";

export function initTeaserSlider(root) {
  const track = root.querySelector(".ts-track");
  const prevBtn = root.querySelector(".ts-prev");
  const nextBtn = root.querySelector(".ts-next");
  const cards = Array.from(root.querySelectorAll(".ts-card"));

  if (!track || !cards.length) {
    return;
  }

  // Read autoplay config from data-attributes written by HBS
  const autoplay = root.dataset.autoplay === "true";
  const delay = parseInt(root.dataset.delay, 10) || 5000;

  let currentIndex = 0;
  let autoTimer = null;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function getVisibleCount() {
    const w = root.offsetWidth;
    if (w <= 0) {
      return 4;
    } // not yet in DOM — default
    if (w < 640) {
      return 1;
    }
    if (w < 1024) {
      return 2;
    }
    return 4;
  }

  function getCardWidth() {
    // Measure after element is in the DOM so offsetWidth is real
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return cards[0].offsetWidth + gap;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  // ── Slide ─────────────────────────────────────────────────────────────────

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  function goNext() {
    goTo(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
  }

  function goPrev() {
    goTo(currentIndex <= 0 ? maxIndex() : currentIndex - 1);
  }

  // ── Autoplay ──────────────────────────────────────────────────────────────

  function startAutoplay() {
    if (!autoplay) {
      return;
    }
    stopAutoplay();
    autoTimer = setInterval(goNext, delay);
  }

  function stopAutoplay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  prevBtn.addEventListener("click", () => {
    goPrev();
    // Reset autoplay timer on manual interaction
    if (autoplay) {
      stopAutoplay();
      startAutoplay();
    }
  });

  nextBtn.addEventListener("click", () => {
    goNext();
    if (autoplay) {
      stopAutoplay();
      startAutoplay();
    }
  });

  // Pause autoplay when user hovers
  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  const ro = new ResizeObserver(() => {
    goTo(currentIndex); // re-measure and re-position
  });
  ro.observe(root);

  // ── Boot ──────────────────────────────────────────────────────────────────
  goTo(0);
  startAutoplay();
}

export const TeaserSlider = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  // Attach to a hidden node so ResizeObserver can measure dimensions
  // even before Storybook inserts the element into the page.
  document.body.appendChild(root);
  initTeaserSlider(root);
  document.body.removeChild(root);

  // Return the live element — Storybook will re-attach it to the canvas.
  return root;
};


function initAllSliders() {
  document.querySelectorAll(".ts-customcardlist").forEach((slider) => {
    if (!slider.dataset.initialized) {
      initTeaserSlider(slider);
      slider.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllSliders);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllSliders);
observer.observe(document.body, { childList: true, subtree: true });
