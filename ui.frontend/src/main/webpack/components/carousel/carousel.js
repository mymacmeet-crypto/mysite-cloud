import template from "./carousel.hbs";
import "./carousel.scss";

export const Carousel = (args) => {
  const {
    variant = "light",
    items = [],
    slidesPerView = 1,
    gap = 16,
    loop = false,
    height = "auto",
  } = args;

  // Create the HTML string
  const htmlString = template({
    variant,
    items,
    height,
  });

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const carousel = temp.firstElementChild;

  // Get carousel elements
  const track = carousel.querySelector(".carousel-track");
  const carouselItems = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".carousel-btn-prev");
  const nextBtn = carousel.querySelector(".carousel-btn-next");

  // State
  let currentIndex = 0;
  const totalItems = items.length;
  const maxIndex = loop ? totalItems - 1 : Math.max(0, totalItems - slidesPerView);

  // Calculate and set slide widths
  const setSlideWidths = () => {
    const gapTotal = gap * (slidesPerView - 1);
    const slideWidth = `calc((100% - ${gapTotal}px) / ${slidesPerView})`;

    carouselItems.forEach((item, index) => {
      item.style.width = slideWidth;
      item.style.marginRight = index < totalItems - 1 ? `${gap}px` : "0";
    });
  };

  // Update track position
  const updateTrackPosition = () => {
    const gapTotal = gap * (slidesPerView - 1);
    const slideWidthPercent = (100 - (gapTotal / track.parentElement.offsetWidth * 100)) / slidesPerView;
    const gapPerSlide = gap;

    // Calculate offset based on current index
    const offset = currentIndex * (slideWidthPercent + (gapPerSlide / track.parentElement.offsetWidth * 100));
    track.style.transform = `translateX(-${offset}%)`;
  };

  // Update button states
  const updateButtonStates = () => {
    if (!loop) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    } else {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
  };

  // Navigate to previous slide
  const goToPrev = () => {
    if (loop) {
      currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    updateTrackPosition();
    updateButtonStates();
  };

  // Navigate to next slide
  const goToNext = () => {
    if (loop) {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
    }
    updateTrackPosition();
    updateButtonStates();
  };

  // Add event listeners
  prevBtn.addEventListener("click", goToPrev);
  nextBtn.addEventListener("click", goToNext);

  // Initialize
  setSlideWidths();
  updateButtonStates();

  return carousel;
};
