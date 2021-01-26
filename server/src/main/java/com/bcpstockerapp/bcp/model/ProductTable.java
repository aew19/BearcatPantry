package com.bcpstockerapp.bcp.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    private Date scanDate;
    private String imageId;
    private String imageFileName;
    private String productURL;
    private boolean isActive;


    //Constructors
    public ProductTable(){}
    public ProductTable(String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, Date scanDate, String imageId, String imageFileName, String productURL, boolean isActive){
        this.barcodeId = barcodeId;
        this.productTitle = productTitle;
        this.foodType = foodType;
        this.brand = brand;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.scanDate = scanDate;
        this.imageId = imageId;
        this.imageFileName = imageFileName;
        this.productURL = productURL;
        this.isActive = isActive;
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
    public Date getAddedDate(){ return this.scanDate; }
    public String getImageId(){return this.imageId;}
    public String getImageFileName(){return this.imageFileName;}
    public String getProductURL(){return this.productURL;}
    public boolean getIsActive(){return this.isActive;}


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
    public void setAddedDate(Date scanDate){this.scanDate = scanDate;}
    public void setImageId(String imageId){this.imageId = imageId;}
    public void setImageFileName(String imageFileName){this.imageFileName = imageFileName;}
    public void setProductURL(String productURL){this.productURL = productURL;}
    public void setActive(boolean isActive){this.isActive = isActive;}
}

