package com.bcpstockerapp.bcp.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;


@Entity
public class PantryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private Integer quantity;
    private String type;
    private String brand;
    private String vegVegan;
    private Date bestBuy;
    private Date expiration;

    //Constructors
    public PantryItem(){}
    public PantryItem(Long id, String name, Integer quantity, String type, String brand, String vegVegan, Date bestBuy, Date expiration){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.type = type;
        this.brand = brand;
        this.vegVegan = vegVegan;
        this.bestBuy = bestBuy;
        this.expiration = expiration;
    }

    //Getters
    public Long getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public Integer getQuantity(){
        return quantity;
    }
    public String getType(){
        return type;
    }
    public String getBrand(){
        return brand;
    }
    public String getVegVegan(){
        return vegVegan;
    }
    public Date getBestBuy(){ return bestBuy; }
    public Date getExpiration(){ return expiration;}

    //Setters
    public void setId(Long id){
        this.id = id;
    }
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
    public void setVegVegan(String vegVegan){
        this.vegVegan = vegVegan;
    }
    public void setBestBuy(Date bestBuy){this.bestBuy = bestBuy;}
    public void setExpiration(Date expiration){this.expiration = expiration;}
}

