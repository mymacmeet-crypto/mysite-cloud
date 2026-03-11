import template from "./conCarousel.hbs";
import "./conCarousel.scss";

const CUBE_FACES = [
  { rotate: "rotateY(0deg)", show: "rotateY(0deg)" }, // front  → rotates right
  { rotate: "rotateY(90deg)", show: "rotateY(-90deg)" }, // right  → rotates up
  { rotate: "rotateX(-90deg)", show: "rotateX(90deg)" }, // top    → rotates back
  { rotate: "rotateY(180deg)", show: "rotateY(-180deg)" }, // back   → rotates left
  { rotate: "rotateY(-90deg)", show: "rotateY(90deg)" }, // left   → rotates down
  { rotate: "rotateX(90deg)", show: "rotateX(-90deg)" }, // bottom → repeats cycle
];

export function initConCarousel(root) {
  if (!root) {
    return;
  }

  const viewport = root.querySelector(".con-carousel-viewport");
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
  slides.forEach((slide) => {
    const bgImage = slide.dataset.background;
    if (bgImage) {
      slide.style.backgroundImage = `url('${bgImage}')`;
    }
  });

  // ── Split Titles (First Word Highlighted) ────────────────────────────────
  slides.forEach((slide) => {
    const titleEl = slide.querySelector(".con-carousel-title");
    if (!titleEl) {
      return;
    }
    const titleText = titleEl.dataset.title;
    if (!titleText) {
      return;
    }
    const words = titleText.trim().split(/\s+/);
    if (words.length > 0) {
      const firstWord = words[0];
      const restWords = words.slice(1).join(" ");
      titleEl.innerHTML = `<span class="con-highlight">${firstWord}</span>${restWords ? " " + restWords : ""}`;
    } else {
      titleEl.textContent = titleText;
    }
  });

  function getHalfSize() {
    return viewport ? viewport.offsetWidth / 2 : root.offsetWidth / 2;
  }

  function positionFaces() {
    const half = getHalfSize();

    slides.forEach((slide, i) => {
      const face = CUBE_FACES[i % CUBE_FACES.length];
      // Rotate to face position, then push out to the cube surface
      slide.style.transform = `${face.rotate} translateZ(${half}px)`;
    });

    // Push the cube back so front face sits at Z=0 (avoids text fuzziness)
    // Then rotate to the current face
    const face = CUBE_FACES[currentIndex % CUBE_FACES.length];
    track.style.transform = `translateZ(-${half}px) ${face.show}`;
  }

  // ── Rotate Cube to Show a Slide ───────────────────────────────────────────
  function rotateCube(index) {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    currentIndex = index;

    const half = getHalfSize();
    const face = CUBE_FACES[currentIndex % CUBE_FACES.length];

    // translateZ(-half) pushes cube back; face.show rotates it to the target face
    track.style.transform = `translateZ(-${half}px) ${face.show}`;

    // Update button states
    if (prevBtn && nextBtn) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === slides.length - 1;
    }

    setTimeout(() => {
      isAnimating = false;
    }, 900);
  }

  function goNext() {
    const next = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1;
    rotateCube(next);
  }

  function goPrev() {
    if (currentIndex > 0) {
      rotateCube(currentIndex - 1);
    }
  }

  // ── Autoplay ──────────────────────────────────────────────────────────────
  function startAutoplay() {
    if (slides.length <= 1) {
      return;
    }
    stopAutoplay();
    autoplayTimer = setInterval(goNext, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // ── Event Listeners ───────────────────────────────────────────────────────
  prevBtn?.addEventListener("click", () => {
    goPrev();
    stopAutoplay();
    startAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    goNext();
    stopAutoplay();
    startAutoplay();
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goPrev();
      stopAutoplay();
      startAutoplay();
    }
    if (e.key === "ArrowRight") {
      goNext();
      stopAutoplay();
      startAutoplay();
    }
  });

  // Re-position faces on resize (translateZ depends on container width)
  window.addEventListener("resize", () => {
    positionFaces();
  });

  // ── Initialize ────────────────────────────────────────────────────────────
  positionFaces();
  startAutoplay();
}

/**
 * ConCarousel factory – renders the HBS template and bootstraps interaction.
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

const observer = new MutationObserver(initAllCarousels);
observer.observe(document.body, { childList: true, subtree: true });
