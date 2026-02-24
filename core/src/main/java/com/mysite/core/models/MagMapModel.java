package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.MapLocation;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagMapModel {

    // ── Map Settings ────────────────────────────────────────────────────────

    @ValueMapValue
    private String apiKey;

    @ValueMapValue
    private String mapZoom;

    @ValueMapValue
    private String mapHeight;

    @ValueMapValue
    private String enableScrollZoom;

    @ValueMapValue
    private String enableStreetView;

    @ValueMapValue
    private String mapStyle;

    // ── Locations ────────────────────────────────────────────────────────────

    @ChildResource(name = "mapLocation")
    private List<MapLocation> locations;

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getApiKey() {
        return apiKey;
    }

    public String getMapZoom() {
        return mapZoom != null ? mapZoom : "4";
    }

    public String getMapHeight() {
        return mapHeight != null ? mapHeight : "500px";
    }

    public String getEnableScrollZoom() {
        return enableScrollZoom;
    }

    public String getEnableStreetView() {
        return enableStreetView;
    }

    public String getMapStyle() {
        return mapStyle != null ? mapStyle : "grayscale";
    }

    public List<MapLocation> getLocations() {
        return locations != null ? locations : Collections.emptyList();
    }

    public boolean isEmpty() {
        return (apiKey == null || apiKey.isEmpty()) &&
               (locations == null || locations.isEmpty());
    }
}
