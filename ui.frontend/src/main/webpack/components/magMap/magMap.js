import template from "./magMap.hbs";
import "./magMap.scss";

// ── Map Style Definitions ────────────────────────────────────────────────────

const MAP_STYLES = {
  grayscale: [
    { elementType: "geometry", stylers: [{ saturation: -100 }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#50a5d1" }],
    },
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "poi.place_of_worship", stylers: [{ visibility: "off" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ lightness: 50 }],
    },
  ],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
  ],
  retro: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
  ],
  standard: [],
};

// ── Google Maps Script Loader ─────────────────────────────────────────────────

let googleMapsPromise = null;

function loadGoogleMaps(apiKey) {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }
  if (window.google && window.google.maps) {
    googleMapsPromise = Promise.resolve();
    return googleMapsPromise;
  }
  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return googleMapsPromise;
}

// ── Custom Marker SVG ─────────────────────────────────────────────────────────

function createMarkerIcon() {
  return {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">' +
          '<path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="#3498db"/>' +
          '<circle cx="18" cy="18" r="8" fill="#ffffff"/>' +
          "</svg>",
      ),
    scaledSize: null, // Will be set after google maps loads
    anchor: null,
  };
}

// ── Responsive Visible Count ──────────────────────────────────────────────────

function getVisibleCount() {
  const width = window.innerWidth;
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN INIT FUNCTION
// ══════════════════════════════════════════════════════════════════════════════

export function initMagMap(root) {
  if (!root) return;

  const apiKey = root.dataset.apiKey;
  const canvas = root.querySelector(".mag-map-canvas");
  const cards = Array.from(root.querySelectorAll(".mag-map-location-card"));
  const track = root.querySelector(".mag-map-locations-track");
  const prevBtn = root.querySelector(".mag-map-nav-prev");
  const nextBtn = root.querySelector(".mag-map-nav-next");

  if (!canvas) return;

  // Apply map height
  const mapHeight = root.dataset.mapHeight || "500px";
  canvas.style.height = mapHeight;

  // Parse location data from card data attributes
  const locations = cards.map((card) => ({
    lat: parseFloat(card.dataset.lat),
    lng: parseFloat(card.dataset.lng),
    name:
      card.querySelector(".mag-map-location-name")?.textContent?.trim() || "",
    element: card,
  }));

  // ── Carousel State ────────────────────────────────────────────────────────

  let currentIndex = 0;
  let markers = [];
  let map = null;

  function updateCarousel() {
    if (!track || cards.length === 0) return;

    const visibleCount = getVisibleCount();
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = "translateX(-" + offset + "px)";

    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn)
      nextBtn.disabled = currentIndex >= cards.length - visibleCount;

    // Highlight active cards
    cards.forEach((card, i) => {
      const isVisible = i >= currentIndex && i < currentIndex + visibleCount;
      card.classList.toggle("mag-map-location-card--active", isVisible);
    });

    fitMapToVisibleMarkers();
  }

  function fitMapToVisibleMarkers() {
    if (!map || !window.google) return;

    const visibleCount = getVisibleCount();
    const visibleLocations = locations.slice(
      currentIndex,
      currentIndex + visibleCount,
    );

    if (visibleLocations.length === 0) return;

    if (visibleLocations.length === 1) {
      map.setCenter({
        lat: visibleLocations[0].lat,
        lng: visibleLocations[0].lng,
      });
      map.setZoom(14);
    } else {
      const bounds = new google.maps.LatLngBounds();
      visibleLocations.forEach((loc) =>
        bounds.extend({ lat: loc.lat, lng: loc.lng }),
      );
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    }
  }

  // Carousel navigation
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const visibleCount = getVisibleCount();
      if (currentIndex < cards.length - visibleCount) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // Card click -> center map on that location
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (!map || !window.google) return;
      const loc = locations[i];
      map.setCenter({ lat: loc.lat, lng: loc.lng });
      map.setZoom(14);
      cards.forEach((c) =>
        c.classList.remove("mag-map-location-card--focused"),
      );
      card.classList.add("mag-map-location-card--focused");
    });
  });

  // ── Google Maps Init ──────────────────────────────────────────────────────

  // For Storybook or missing API key, show a styled placeholder
  if (!apiKey || apiKey === "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ" || apiKey === "undefined") {
    canvas.innerHTML =
      '<div class="mag-map-placeholder">' +
      '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5">' +
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>' +
      '<circle cx="12" cy="10" r="3"/>' +
      "</svg>" +
      "<p>Google Maps preview unavailable.<br>Add an API key in the component dialog.</p>" +
      "</div>";
    canvas.style.display = "flex";
    canvas.style.alignItems = "center";
    canvas.style.justifyContent = "center";
    canvas.style.background = "#f0f0f0";
    updateCarousel();
    return;
  }

  loadGoogleMaps(apiKey)
    .then(() => {
      const styleName = root.dataset.mapStyle || "grayscale";
      const styles = MAP_STYLES[styleName] || MAP_STYLES.grayscale;

      map = new google.maps.Map(canvas, {
        zoom: parseInt(root.dataset.zoom, 10) || 4,
        center:
          locations.length > 0
            ? { lat: locations[0].lat, lng: locations[0].lng }
            : { lat: 40, lng: -30 },
        styles: styles,
        scrollwheel: root.dataset.scrollZoom === "true",
        streetViewControl: root.dataset.streetView === "true",
        mapTypeControl: false,
        fullscreenControl: false,
      });

      const markerIconData = createMarkerIcon();
      // Set google maps specific size objects after API is loaded
      markerIconData.scaledSize = new google.maps.Size(36, 48);
      markerIconData.anchor = new google.maps.Point(18, 48);

      markers = locations.map((loc) => {
        return new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.name,
          icon: markerIconData,
        });
      });

      updateCarousel();
    })
    .catch(() => {
      canvas.innerHTML =
        '<div class="mag-map-placeholder">' +
        '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="1.5">' +
        '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>' +
        '<circle cx="12" cy="10" r="3"/>' +
        "</svg>" +
        "<p>Failed to load Google Maps.<br>Please check your API key.</p>" +
        "</div>";
      canvas.style.display = "flex";
      canvas.style.alignItems = "center";
      canvas.style.justifyContent = "center";
      canvas.style.background = "#f0f0f0";
      updateCarousel();
    });

  // Handle resize for responsive carousel
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCarousel();
    }, 250);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  STORYBOOK FACTORY
// ══════════════════════════════════════════════════════════════════════════════

export const MagMap = (args) => {
  const processedArgs = {
    mapZoom: 4,
    mapHeight: "500px",
    mapStyle: "grayscale",
    ...args,
  };

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template(processedArgs);
  const root = wrapper.firstElementChild;

  document.body.appendChild(root);
  initMagMap(root);
  document.body.removeChild(root);

  return root;
};

// ══════════════════════════════════════════════════════════════════════════════
//  AEM INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════════

function initAllMaps() {
  document.querySelectorAll(".mag-map").forEach((el) => {
    if (!el.dataset.initialized) {
      initMagMap(el);
      el.dataset.initialized = "true";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAllMaps);

// Important for AEM Author mode (dynamic re-render)
const observer = new MutationObserver(initAllMaps);
observer.observe(document.body, { childList: true, subtree: true });
