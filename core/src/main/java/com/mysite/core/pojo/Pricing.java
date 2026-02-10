package com.mysite.core.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Pricing {

    @JsonProperty("current_price")
    private Double currentPrice;

    @JsonProperty("original_price")
    private Double originalPrice;

    private String currency;

    @JsonProperty("discount_percentage")
    private Double discountPercentage;

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }
}
