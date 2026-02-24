import template from "./magPieChart.hbs";
import "./magPieChart.scss";

// Predefined color palette (supports up to 5 segments)
const COLOR_PALETTE = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
];

export function initMagPieChart(root) {
  if (!root) {
    return;
  }

  const svg = root.querySelector(".mag-pie-chart-svg");
  const tooltip = root.querySelector(".mag-pie-chart-tooltip");
  const legendItems = Array.from(root.querySelectorAll(".mag-pie-chart-legend-item"));

  if (!svg) {
    return;
  }

  // Apply colors from data attributes to legend
  legendItems.forEach(item => {
    const colorSpan = item.querySelector(".mag-pie-chart-legend-color");
    const color = colorSpan.dataset.color;
    if (color) {
      colorSpan.style.backgroundColor = color;
    }
  });

  // Extract data from legend items
  const segments = legendItems.map((item, index) => {
    const label = item.querySelector(".mag-pie-chart-legend-label").textContent.trim();
    const colorSpan = item.querySelector(".mag-pie-chart-legend-color");
    const color = colorSpan.dataset.color || colorSpan.style.backgroundColor;
    // Value will be set from data attribute or parsed from context
    return { label, color, value: 0, index };
  });

  // Wait for data to be available
  if (root.dataset.segments) {
    try {
      const data = JSON.parse(root.dataset.segments);
      data.forEach((item, i) => {
        if (segments[i]) {
          segments[i].value = parseFloat(item.value) || 0;
        }
      });
    } catch (e) {
      console.error("Failed to parse segment data", e);
      return;
    }
  }

  // Calculate total and percentages
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  
  if (total === 0) {
    return;
  }

  segments.forEach(seg => {
    seg.percentage = ((seg.value / total) * 100).toFixed(1);
  });

  // ── Draw Pie Chart ────────────────────────────────────────────────────────

  const centerX = 200;
  const centerY = 200;
  const radius = 150;
  let currentAngle = -90; // Start from top

  segments.forEach((segment, index) => {
    const angle = (segment.value / total) * 360;
    const endAngle = currentAngle + angle;

    let segmentElement;

    // Special case: full circle (single segment with 100%)
    if (angle >= 359.99) {
      segmentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      segmentElement.setAttribute("cx", centerX);
      segmentElement.setAttribute("cy", centerY);
      segmentElement.setAttribute("r", radius);
      segmentElement.setAttribute("fill", segment.color);
      segmentElement.setAttribute("stroke", "#ffffff");
      segmentElement.setAttribute("stroke-width", "2");
    } else {
      // Create path for segment
      const path = createSegmentPath(centerX, centerY, radius, currentAngle, endAngle);
      segmentElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      segmentElement.setAttribute("d", path);
      segmentElement.setAttribute("fill", segment.color);
      segmentElement.setAttribute("stroke", "#ffffff");
      segmentElement.setAttribute("stroke-width", "2");
    }
    
    segmentElement.classList.add("mag-pie-chart-segment");
    segmentElement.dataset.index = index;
    
    // Add delay for staggered animation
    segmentElement.style.animationDelay = `${index * 0.15}s`;

    // Hover events
    segmentElement.addEventListener("mouseenter", (e) => {
      showTooltip(e, segment, tooltip);
    });

    segmentElement.addEventListener("mousemove", (e) => {
      updateTooltipPosition(e, tooltip);
    });

    segmentElement.addEventListener("mouseleave", () => {
      hideTooltip(tooltip);
    });

    // Legend hover sync
    if (legendItems[index]) {
      legendItems[index].addEventListener("mouseenter", () => {
        segmentElement.style.opacity = "0.85";
      });
      
      legendItems[index].addEventListener("mouseleave", () => {
        segmentElement.style.opacity = "1";
      });
    }

    svg.appendChild(segmentElement);
    currentAngle = endAngle;
  });
}

/**
 * createSegmentPath
 * Creates an SVG path for a pie chart segment.
 */
function createSegmentPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", cx, cy,
    "L", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
}

/**
 * polarToCartesian
 * Converts polar coordinates to cartesian.
 */
function polarToCartesian(cx, cy, r, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return {
    x: cx + (r * Math.cos(radians)),
    y: cy + (r * Math.sin(radians))
  };
}

/**
 * showTooltip
 * Displays tooltip with segment info.
 */
function showTooltip(event, segment, tooltip) {
  const labelEl = tooltip.querySelector(".mag-pie-chart-tooltip-label");
  const valueEl = tooltip.querySelector(".mag-pie-chart-tooltip-value");
  
  labelEl.textContent = segment.label;
  valueEl.textContent = `${segment.value} (${segment.percentage}%)`;
  
  tooltip.classList.add("mag-pie-chart-tooltip-visible");
  updateTooltipPosition(event, tooltip);
}

/**
 * updateTooltipPosition
 * Updates tooltip position to follow cursor.
 */
function updateTooltipPosition(event, tooltip) {
  const container = tooltip.closest(".mag-pie-chart-container");
  const rect = container.getBoundingClientRect();
  
  tooltip.style.left = `${event.clientX - rect.left}px`;
  tooltip.style.top = `${event.clientY - rect.top}px`;
}

/**
 * hideTooltip
 * Hides the tooltip.
 */
function hideTooltip(tooltip) {
  tooltip.classList.remove("mag-pie-chart-tooltip-visible");
}

export const MagPieChart = (args) => {
  // Assign colors from palette if not provided
  const processedArgs = {
    ...args,
    segments: (args.segments || []).map((seg, i) => ({
      ...seg,
      color: seg.color || COLOR_PALETTE[i % COLOR_PALETTE.length]
    }))
  };

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(processedArgs);
  const root = wrapper.firstElementChild;

  // Store segment data for init
  root.dataset.segments = JSON.stringify(processedArgs.segments);

  document.body.appendChild(root);
  initMagPieChart(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

function initAllPieCharts() {
  document.querySelectorAll(".mag-pie-chart").forEach((chart) => {
    if (!chart.dataset.initialized) {
      initMagPieChart(chart);
      chart.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllPieCharts);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllPieCharts);
observer.observe(document.body, { childList: true, subtree: true });
