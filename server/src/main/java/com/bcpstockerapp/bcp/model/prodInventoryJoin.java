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
    private String image;
    private String productURL;
    private double weight;

    public prodInventoryJoin(String barcodeId, Integer quantity, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, String image, String productURL, double weight) {
        this.barcodeId = barcodeId;
        this.quantity = quantity;
        this.productTitle = productTitle;
        this.foodType = foodType;
        this.brand = brand;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.image = image;
        this.productURL = productURL;
        this.weight = weight;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getProductURL() {
        return productURL;
    }

    public void setProductURL(String productURL) {
        this.productURL = productURL;
    }

    public double getWeight(){
        return weight;
    }

    public void setWeight(double weight){
        this.weight = weight;
    }
}
