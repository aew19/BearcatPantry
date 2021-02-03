package com.bcpstockerapp.bcp.model;

import java.util.Date;

public class prodInventoryJoin {
    private String barcodeId;
    private Integer quantity;
    private String productTitle;
    private String foodType;
    private String brand;
    private boolean vegetarian;
    private boolean vegan;

    public prodInventoryJoin(String barcodeId, Integer quantity, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan) {
        this.barcodeId = barcodeId;
        this.quantity = quantity;
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
