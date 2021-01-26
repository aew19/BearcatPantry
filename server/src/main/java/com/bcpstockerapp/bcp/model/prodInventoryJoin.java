package com.bcpstockerapp.bcp.model;

import java.util.Date;

public class prodInventoryJoin {
    private String barcodeId;
    private Integer quantity;
    private Date bestBuyDate;
    private String productTitle;
    private String foodType;
    private String brand;
    private boolean vegetarian;
    private boolean vegan;

    public prodInventoryJoin(String barcodeId, Integer quantity, Date bestBuyDate, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan) {
        this.barcodeId = barcodeId;
        this.quantity = quantity;
        this.bestBuyDate = bestBuyDate;
        this.productTitle = productTitle;
        this.foodType = foodType;
        this.brand = brand;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
    }

    public String getBarcodeId() {
        return barcodeId;
    }

    public void setBarcodeId(String barcodeId) {
        this.barcodeId = barcodeId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Date getBestBuyDate() {
        return bestBuyDate;
    }

    public void setDateRecorded(Date bestBuyDate) {
        this.bestBuyDate = bestBuyDate;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public boolean isVegan() {
        return vegan;
    }

    public void setVegan(boolean vegan) {
        this.vegan = vegan;
    }
}
