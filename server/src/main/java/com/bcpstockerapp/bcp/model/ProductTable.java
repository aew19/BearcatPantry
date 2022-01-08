package com.bcpstockerapp.bcp.model;


import javax.persistence.*;
import java.util.Date;


@Entity
public class ProductTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    private String barcodeId;
    private String productTitle;
    private String foodType;
    private String brand;
    private boolean vegetarian;
    private boolean vegan;
    private String image;
    private String productURL;
    private double weight;


    //Constructors
    public ProductTable(){}
    public ProductTable(String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, String image, String productURL, double weight){
        this.barcodeId = barcodeId;
        this.productTitle = productTitle;
        this.foodType = foodType;
        this.brand = brand;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.image = image;
        this.productURL = productURL;
        this.weight = weight;
    }

    //Getters
    public Long getId(){
        return this.productId;
    }
    public String getBarcode(){return this.barcodeId;}
    public String getName(){
        return this.productTitle;
    }
    public String getType(){
        return this.foodType;
    }
    public String getBrand(){
        return this.brand;
    }
    public boolean getVegetarian(){ return this.vegetarian;}
    public boolean getVegan(){ return this.vegan;}
    public String getImage(){return this.image;}
    public String getProductURL(){return this.productURL;}
    public double getWeight(){return this.weight;}


    //Setters
    public void setBarcode(String barcodeId){this.barcodeId = barcodeId;}
    public void setName(String productTitle){this.productTitle = productTitle;}
    public void setType(String foodType){
        this.foodType = foodType;
    }
    public void setBrand(String brand){
        this.brand = brand;
    }
    public void setVegetarian(boolean vegetarian){ this.vegetarian = vegetarian;}
    public void setVegan(boolean vegan){ this.vegan = vegan;}
    public void setImage(String image){this.image = image;}
    public void setProductURL(String productURL){this.productURL = productURL;}
    public void setWeight(double weight){this.weight = weight;}
}

