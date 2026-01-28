import template from "./accordion.hbs";
import "./accordion.scss";

export const Accordion = (args) => {
  const {
    variant = "light",
    defaultSelectedKeys = [],
    showDivider = false,
    items = [],
    selectionMode = "single", // single or multiple
  } = args;

  // Set isSelected based on defaultSelectedKeys
  const processedItems = items.map((item) => ({
    ...item,
    isSelected: defaultSelectedKeys.includes(item.key),
    isDisabled: item.isDisabled || false,
  }));

  // Create the HTML string
  const htmlString = template({
    variant,
    showDivider,
    items: processedItems,
  });

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const accordion = temp.firstElementChild;

  // Set proper max-height for animation after a brief delay to ensure content is rendered
  setTimeout(() => {
    const contentElements = accordion.querySelectorAll(".accordion-content");
    contentElements.forEach((content, index) => {
      if (processedItems[index].isSelected) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }, 0);

  // Add click event listeners
  const headers = accordion.querySelectorAll(".accordion-header");
  headers.forEach((header, index) => {
    header.addEventListener("click", function () {
      const item = this.closest(".accordion-item");
      const content = item.querySelector(".accordion-content");
      const isActive = item.classList.contains("active");
      const itemData = processedItems[index];

      // Check if this item is disabled
      if (itemData.isDisabled) {
        return;
      }

      if (selectionMode === "single") {
        // Close all other items
        const allItems = accordion.querySelectorAll(".accordion-item");
        const allContents = accordion.querySelectorAll(".accordion-content");

        allItems.forEach((otherItem, otherIndex) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            allContents[otherIndex].style.maxHeight = "0px";
          }
        });
      }

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = "0px";
      } else {
        item.classList.add("active");
        // Use setTimeout to ensure proper height calculation
        setTimeout(() => {
          content.style.maxHeight = content.scrollHeight + "px";
        }, 0);
      }
    });
  });

  return accordion;
};
