/*******************************************************************************
 * Analytics Data Layer Listener
 *
 * Listens to Adobe Client Data Layer (ACDL) events and logs them to console.
 * Connect to any component by adding data-cmp-clickable to clickable elements.
 *
 * Public API (window.MySite.analytics):
 *   trackEvent(eventName, eventData) — fire a custom analytics event
 *   setHandler(fn)                   — swap console logging for real analytics
 ******************************************************************************/
(function(document) {
    "use strict";

    var dataLayerEnabled;
    var dataLayerName;
    var dataLayer;

    var EVENTS = ["cmp:click", "cmp:show", "cmp:hide", "cmp:loaded"];
    var LOG_PREFIX = "[MySite Analytics]";

    // Default handler — console logging for local dev. Swap for production.
    var analyticsHandler = function(eventName, eventData) {
        console.group(LOG_PREFIX + " " + eventName);
        console.log("Event:", eventName);
        console.log("Timestamp:", new Date().toISOString());
        console.log("Data:", eventData);

        if (eventData && eventData.eventInfo && eventData.eventInfo.path) {
            console.log("Component Path:", eventData.eventInfo.path);
        }

        console.groupEnd();
    };

    /**
     * Registers a single event listener on the ACDL.
     */
    function registerListener(eventName) {
        if (dataLayer && typeof dataLayer.addEventListener === "function") {
            dataLayer.addEventListener(eventName, function(event) {
                analyticsHandler(eventName, event);
            });
        } else {
            // Data layer may not be fully initialized yet — poll briefly
            var attempts = 0;
            var interval = setInterval(function() {
                attempts++;
                if (window[dataLayerName] && typeof window[dataLayerName].addEventListener === "function") {
                    dataLayer = window[dataLayerName];
                    dataLayer.addEventListener(eventName, function(event) {
                        analyticsHandler(eventName, event);
                    });
                    clearInterval(interval);
                } else if (attempts > 20) {
                    console.warn(LOG_PREFIX, "Data layer not available for:", eventName);
                    clearInterval(interval);
                }
            }, 100);
        }
    }

    /**
     * Auto-binds click tracking to all [data-cmp-clickable] elements.
     * Pushes a cmp:click event with component data when clicked.
     */
    function bindClickableElements() {
        var clickables = document.querySelectorAll("[data-cmp-clickable]");

        for (var i = 0; i < clickables.length; i++) {
            (function(element) {
                element.addEventListener("click", function() {
                    var componentEl = element.closest("[data-cmp-data-layer]");
                    var componentData = {};
                    var componentId = "unknown";

                    if (componentEl && componentEl.dataset.cmpDataLayer) {
                        try {
                            componentData = JSON.parse(componentEl.dataset.cmpDataLayer);
                            componentId = Object.keys(componentData)[0] || componentEl.id;
                        } catch (e) {
                            componentId = componentEl.id || "unknown";
                        }
                    } else {
                        componentId = element.id || element.textContent.trim().substring(0, 30) || "unknown";
                    }

                    if (dataLayer) {
                        dataLayer.push({
                            event: "cmp:click",
                            eventInfo: {
                                path: "component." + componentId
                            }
                        });
                    }
                });
            })(clickables[i]);
        }
    }

    /**
     * Also track dynamically added [data-cmp-clickable] elements
     * (e.g., components loaded in AEM edit mode).
     */
    function observeDynamicElements() {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if (!MutationObserver) {
            return;
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var nodes = [].slice.call(mutation.addedNodes);
                nodes.forEach(function(node) {
                    if (node.querySelectorAll) {
                        var newClickables = [].slice.call(node.querySelectorAll("[data-cmp-clickable]"));
                        if (node.hasAttribute && node.hasAttribute("data-cmp-clickable")) {
                            newClickables.push(node);
                        }
                        newClickables.forEach(function(element) {
                            element.addEventListener("click", function() {
                                var componentEl = element.closest("[data-cmp-data-layer]");
                                var componentId = "unknown";

                                if (componentEl && componentEl.dataset.cmpDataLayer) {
                                    try {
                                        var parsed = JSON.parse(componentEl.dataset.cmpDataLayer);
                                        componentId = Object.keys(parsed)[0] || componentEl.id;
                                    } catch (e) {
                                        componentId = componentEl.id || "unknown";
                                    }
                                }

                                if (dataLayer) {
                                    dataLayer.push({
                                        event: "cmp:click",
                                        eventInfo: {
                                            path: "component." + componentId
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });

        observer.observe(document.body, { subtree: true, childList: true });
    }

    /**
     * Main initialization.
     */
    function init() {
        dataLayerEnabled = document.body.hasAttribute("data-cmp-data-layer-enabled");

        if (!dataLayerEnabled) {
            console.warn(LOG_PREFIX, "Adobe Client Data Layer is not enabled.",
                "Set DataLayerConfig enabled=true in /conf/<site>/_sling_configs.");
            return;
        }

        dataLayerName = document.body.getAttribute("data-cmp-data-layer-name") || "adobeDataLayer";
        dataLayer = window[dataLayerName] = window[dataLayerName] || [];

        // Listen for all standard ACDL events
        for (var i = 0; i < EVENTS.length; i++) {
            registerListener(EVENTS[i]);
        }

        // Bind click tracking to existing elements
        bindClickableElements();

        // Watch for dynamically added elements
        observeDynamicElements();

        console.log(LOG_PREFIX, "Initialized. Listening for events:", EVENTS.join(", "));
    }

    // ---- Public API ----

    /**
     * Track a custom event from any component.
     * Example: window.MySite.analytics.trackEvent("form:submit", { formName: "contact" });
     */
    function trackEvent(eventName, eventData) {
        var payload = {
            event: eventName,
            eventInfo: eventData || {}
        };

        if (dataLayer) {
            dataLayer.push(payload);
        }

        analyticsHandler(eventName, payload);
    }

    /**
     * Swap the handler for production analytics.
     * Example:
     *   window.MySite.analytics.setHandler(function(eventName, data) {
     *       gtag('event', eventName, data);           // Google Analytics 4
     *       // or: s.tl(true, 'o', eventName);        // Adobe Analytics
     *   });
     */
    function setHandler(handler) {
        if (typeof handler === "function") {
            analyticsHandler = handler;
            console.log(LOG_PREFIX, "Handler updated.");
        }
    }

    // Expose public API
    window.MySite = window.MySite || {};
    window.MySite.analytics = {
        trackEvent: trackEvent,
        setHandler: setHandler
    };

    // Bootstrap
    if (document.readyState !== "loading") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }

}(window.document));
