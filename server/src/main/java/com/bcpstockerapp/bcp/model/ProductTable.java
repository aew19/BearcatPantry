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
    private Long id;
    private String barcode;
    private String name;
    private Integer quantity;
    private String type;
    private String brand;
    private boolean vegetarian;
    private boolean vegan;
    private Date addedDate;

    //TODO: IMAGE STORAGE!!!!!!!



    //Constructors
    public ProductTable(){}
    public ProductTable(String barcode, String name, Integer quantity, String type, String brand, boolean vegetarian, boolean vegan, Date addedDate){
        this.barcode = barcode;
        this.name = name;
        this.quantity = quantity;
        this.type = type;
        this.brand = brand;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.addedDate = addedDate;
    }

    //Getters
    public Long getId(){
        return this.id;
    }
    public String getBarcode(){return this.barcode;}
    public String getName(){
        return this.name;
    }
    public Integer getQuantity(){
        return this.quantity;
    }
    public String getType(){
        return this.type;
    }
    public String getBrand(){
        return this.brand;
    }
    public boolean getVegetarian(){ return this.vegetarian;}
    public boolean getVegan(){ return this.vegan;}
    public Date getAddedDate(){ return this.addedDate; }


    //Setters
    public void setBarcode(String barcode){this.barcode = barcode;}
    public void setName(String name){this.name = name;}
    public void setQuantity(Integer quantity){
        this.quantity = quantity;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setBrand(String brand){
        this.brand = brand;
    }
    public void setVegetarian(boolean vegetarian){ this.vegetarian = vegetarian;}
    public void setVegan(boolean vegan){ this.vegan = vegan;}
    public void setAddedDate(Date addedDate){this.addedDate = addedDate;}
}

