package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.google.gson.Gson;
import com.mysite.core.pojo.ChartSegment;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagPieChartModel {

    // Predefined color palette (supports up to 5 segments)
    private static final String[] COLOR_PALETTE = {
        "#3B82F6", // Blue
        "#10B981", // Green
        "#F59E0B", // Amber
        "#EF4444", // Red
        "#8B5CF6"  // Violet
    };

    @ValueMapValue
    private String title;

    @ChildResource(name = "segment")
    private List<ChartSegment> segments;

    private String segmentsJson;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        // Assign colors from palette if not provided
        if (segments != null && !segments.isEmpty()) {
            for (int i = 0; i < segments.size() && i < 5; i++) {
                ChartSegment segment = segments.get(i);
                if (segment.getColor() == null || segment.getColor().isEmpty()) {
                    segment.setColor(COLOR_PALETTE[i % COLOR_PALETTE.length]);
                }
            }
            
            // Limit to maximum 5 segments
            if (segments.size() > 5) {
                segments = segments.subList(0, 5);
            }

            // Create JSON string for JavaScript
            segmentsJson = createSegmentsJson();
        }
    }

    /**
     * Creates a JSON string representation of segments for JavaScript consumption.
     *
     * @return JSON string
     */
    private String createSegmentsJson() {
        if (segments == null || segments.isEmpty()) {
            return "[]";
        }

        List<SegmentData> dataList = new ArrayList<>();
        for (ChartSegment segment : segments) {
            dataList.add(new SegmentData(
                segment.getLabel(),
                segment.getValue(),
                segment.getColor()
            ));
        }

        Gson gson = new Gson();
        return gson.toJson(dataList);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle() {
        return title;
    }

    public List<ChartSegment> getSegments() {
        return segments != null ? segments : Collections.emptyList();
    }

    public String getSegmentsJson() {
        return segmentsJson;
    }

    public boolean isEmpty() {
        return segments == null || segments.isEmpty();
    }

    public boolean hasSegments() {
        return segments != null && !segments.isEmpty();
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  INNER CLASS FOR JSON SERIALIZATION
    // ══════════════════════════════════════════════════════════════════════════

    private static class SegmentData {
        private String label;
        private double value;
        private String color;

        public SegmentData(String label, double value, String color) {
            this.label = label;
            this.value = value;
            this.color = color;
        }

        // Getters required for Gson
        public String getLabel() {
            return label;
        }

        public double getValue() {
            return value;
        }

        public String getColor() {
            return color;
        }
    }
}