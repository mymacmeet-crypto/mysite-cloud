import template from "./conReveal.hbs";
import "./conReveal.scss";

/**
 * initConReveal
 * Before/after image reveal slider with diamond dot navigation.
 *
 * @param {HTMLElement} root – the .con-reveal element
 */
export function initConReveal(root) {
  if (!root) {
    return;
  }

  const slides = Array.from(root.querySelectorAll(".con-reveal-slide"));
  const dots = Array.from(root.querySelectorAll(".con-reveal-dot"));
  const track = root.querySelector(".con-reveal-track");

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;

  // ── Apply Background Images ──────────────────────────────────────────────

  slides.forEach((slide) => {
    const beforeEl = slide.querySelector(".con-reveal-before");
    const afterEl = slide.querySelector(".con-reveal-after");

    if (beforeEl && beforeEl.dataset.before) {
      beforeEl.style.backgroundImage = `url('${beforeEl.dataset.before}')`;
    }

    if (afterEl && afterEl.dataset.after) {
      afterEl.style.backgroundImage = `url('${afterEl.dataset.after}')`;
    }
  });

  // ── Initialize Before/After Sliders ───────────────────────────────────────

  slides.forEach((slide) => {
    initBeforeAfterSlider(slide);
  });

  // ── Before/After Slider Logic ─────────────────────────────────────────────

  function initBeforeAfterSlider(slide) {
    const wrapper = slide.querySelector(".con-reveal-image-wrapper");
    const divider = slide.querySelector(".con-reveal-divider");
    const afterImage = slide.querySelector(".con-reveal-after");

    if (!wrapper || !divider || !afterImage) {
      return;
    }

    let isDragging = false;

    function updatePosition(clientX) {
      const rect = wrapper.getBoundingClientRect();
      let x = clientX - rect.left;

      // Constrain to wrapper bounds
      x = Math.max(0, Math.min(x, rect.width));

      const percentage = (x / rect.width) * 100;

      // Update divider position
      divider.style.left = `${percentage}%`;

      // Update after image clip
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }

    function onStart(e) {
      isDragging = true;
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      updatePosition(clientX);
    }

    function onMove(e) {
      if (!isDragging) {
        return;
      }
      e.preventDefault();
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      updatePosition(clientX);
    }

    function onEnd() {
      isDragging = false;
    }

    // Mouse events
    divider.addEventListener("mousedown", onStart);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);

    // Touch events
    divider.addEventListener("touchstart", onStart, { passive: false });
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
  }

  // ── Slide Navigation ──────────────────────────────────────────────────────

  function updateTrackHeight() {
    const activeSlide = slides[currentIndex];
    if (activeSlide && track) {
      // Get the actual height of the active slide
      const slideHeight = activeSlide.scrollHeight;
      track.style.minHeight = `${slideHeight}px`;
    }
  }

  function goToSlide(index) {
    if (index === currentIndex) {
      return;
    }

    // Remove active class from all slides and dots
    slides.forEach((slide) =>
      slide.classList.remove("con-reveal-slide-active"),
    );
    dots.forEach((dot) => dot.classList.remove("con-reveal-dot-active"));

    // Add active class to current
    currentIndex = index;
    slides[currentIndex].classList.add("con-reveal-slide-active");
    if (dots.length > 0 && dots[currentIndex]) {
      dots[currentIndex].classList.add("con-reveal-dot-active");
    }

    // Update track height to match active slide
    setTimeout(() => {
      updateTrackHeight();
    }, 50);
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });
  }

  // ── Initialize ────────────────────────────────────────────────────────────

  // Check if first slide already has active class (from server-side render)
  const hasActiveSlide = slides.some((slide) =>
    slide.classList.contains("con-reveal-slide-active"),
  );

  if (!hasActiveSlide) {
    goToSlide(0);
  } else {
    // Find which slide is active
    const activeIndex = slides.findIndex((slide) =>
      slide.classList.contains("con-reveal-slide-active"),
    );
    if (activeIndex !== -1) {
      currentIndex = activeIndex;
    }
  }

  // Set initial track height
  updateTrackHeight();

  // Update height on window resize
  window.addEventListener("resize", updateTrackHeight);
}

/**
 * ConReveal factory – renders the HBS template with the given args and
 * bootstraps interactive behaviour before returning the live element.
 *
 * @param {object} args
 * @param {Array}   args.slides  – Slide objects with beforeImage, afterImage, title, description
 * @returns {HTMLElement}
 */
export const ConReveal = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initConReveal(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllReveals() {
  document.querySelectorAll(".con-reveal").forEach((reveal) => {
    if (!reveal.dataset.initialized) {
      initConReveal(reveal);
      reveal.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllReveals);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllReveals);
observer.observe(document.body, { childList: true, subtree: true });
