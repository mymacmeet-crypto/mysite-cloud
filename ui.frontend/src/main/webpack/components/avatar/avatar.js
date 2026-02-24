import template from "./avatar.hbs";
import "./avatar.scss";

const PERSON_PATH =
  "M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" +
  "m0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z";

const FALLBACK_SVG =
  `<svg viewBox="0 0 24 24" fill="currentColor"` +
  ` class="avatar__fallback-svg"><path d="${PERSON_PATH}"/></svg>`;

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

const renderFallback = (el, name) => {
  const initials = getInitials(name);
  if (initials) {
    el.classList.add("avatar__initials");
    el.textContent = initials;
  } else {
    el.classList.add("avatar__icon");
    el.setAttribute("role", "img");
    el.innerHTML = FALLBACK_SVG;
  }
};

export const Avatar = (args) => {
  const {
    src = "",
    name = "",
    alt = "avatar",
    size = "md",
    color = "default",
    radius = "full",
    isBordered = false,
    isDisabled = false,
  } = args;

  const htmlString = template({
    src,
    name,
    alt: alt || name || "avatar",
    size,
    color,
    radius,
    isBordered,
    isDisabled,
  });

  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const avatarWrapper = temp.firstElementChild;

  // If no src — compute initials or show fallback icon via JS
  const fallbackEl = avatarWrapper.querySelector(".avatar__fallback");
  if (fallbackEl) {
    renderFallback(fallbackEl, name);
  }

  // Image error fallback — switch to initials/icon on broken image
  const img = avatarWrapper.querySelector(".avatar__image");
  if (img) {
    img.addEventListener("error", function () {
      const fallback = document.createElement("span");
      fallback.className = "avatar avatar__fallback";
      fallback.setAttribute("aria-label", alt || name || "avatar");
      renderFallback(fallback, name);
      img.replaceWith(fallback);
    });
  }

  return avatarWrapper;
};
