import template from "./avatar.hbs";
import "./avatar.scss";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
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

  const initials = name ? getInitials(name) : "";

  const context = {
    src,
    initials: src ? "" : initials,
    alt: alt || name || "avatar",
    size,
    color,
    radius,
    isBordered,
    isDisabled,
  };

  const htmlString = template(context);

  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const avatarWrapper = temp.firstElementChild;

  // Graceful image error fallback
  if (src) {
    const img = avatarWrapper.querySelector(".avatar__image");
    if (img) {
      img.addEventListener("error", function () {
        const fallbackHTML = initials
          ? `<span class="avatar avatar__initials" aria-label="${alt || name}">${initials}</span>`
          : `<span class="avatar avatar__icon" role="img" aria-label="${alt || "avatar"}">
              <svg viewBox="0 0 24 24" fill="currentColor" class="avatar__fallback-svg">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/>
              </svg>
            </span>`;
        img.outerHTML = fallbackHTML;
      });
    }
  }

  return avatarWrapper;
};
