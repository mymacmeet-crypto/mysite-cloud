import template from "./conCarousel.hbs";
import "./conCarousel.scss";

/**
 * initConCarousel
 * Carousel with 3D cube block rotation animation and automatic title highlighting.
 *
 * @param {HTMLElement} root – the .con-carousel element
 */
export function initConCarousel(root) {
  if (!root) {
    return;
  }

  const track = root.querySelector(".con-carousel-track");
  const prevBtn = root.querySelector(".con-carousel-prev");
  const nextBtn = root.querySelector(".con-carousel-next");
  const slides = Array.from(root.querySelectorAll(".con-carousel-slide"));

  if (!track || !slides.length) {
    return;
  }

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayTimer = null;

  // ── Apply Background Images ──────────────────────────────────────────────

  slides.forEach(slide => {
    const bgImage = slide.dataset.background;
    if (bgImage) {
      slide.style.backgroundImage = `url('${bgImage}')`;
    }
  });

  // ── Split Titles (First Word Highlighted) ────────────────────────────────

  slides.forEach(slide => {
    const titleEl = slide.querySelector(".con-carousel-title");
    if (titleEl) {
      const titleText = titleEl.dataset.title;
      if (titleText) {
        const words = titleText.trim().split(/\s+/);
        if (words.length > 0) {
          const firstWord = words[0];
          const restWords = words.slice(1).join(" ");
          
          titleEl.innerHTML = `<span class="con-highlight">${firstWord}</span> ${restWords}`;
        } else {
          titleEl.textContent = titleText;
        }
      }
    }
  });

  // ── 3D Cube Rotation ──────────────────────────────────────────────────────

  function rotateCube(index) {
    if (isAnimating) {return;}
    
    isAnimating = true;
    currentIndex = index;

    // Rotate the entire track (cube) by -90 degrees for each slide
    const angle = -90 * currentIndex;
    track.style.transform = `translateZ(0px) rotateY(${angle}deg)`;

    // Update button states
    if (prevBtn && nextBtn) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === slides.length - 1;
    }

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  function goNext() {
    const nextIndex = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1;
    rotateCube(nextIndex);
  }

  function goPrev() {
    if (currentIndex > 0) {
      rotateCube(currentIndex - 1);
    }
  }

  // ── Autoplay ──────────────────────────────────────────────────────────────

  function startAutoplay() {
    if (slides.length <= 1) {return;}
    
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goNext();
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // ── Event Listeners ───────────────────────────────────────────────────────

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goPrev();
      stopAutoplay();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goNext();
      stopAutoplay();
      startAutoplay();
    });
  }

  // Pause autoplay on hover
  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goPrev();
      stopAutoplay();
      startAutoplay();
    } else if (e.key === "ArrowRight") {
      goNext();
      stopAutoplay();
      startAutoplay();
    }
  });

  // ── Initialize ────────────────────────────────────────────────────────────

  rotateCube(0);
  startAutoplay();
}

/**
 * ConCarousel factory – renders the HBS template with the given args and
 * bootstraps interactive behaviour before returning the live element.
 *
 * @param {object} args
 * @param {Array}   args.slides  – Slide objects with backgroundImage, title, description, buttonText, buttonLink
 * @returns {HTMLElement}
 */
export const ConCarousel = (args) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(args);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initConCarousel(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllCarousels() {
  document.querySelectorAll(".con-carousel").forEach((carousel) => {
    if (!carousel.dataset.initialized) {
      initConCarousel(carousel);
      carousel.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllCarousels);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllCarousels);
observer.observe(document.body, { childList: true, subtree: true });
