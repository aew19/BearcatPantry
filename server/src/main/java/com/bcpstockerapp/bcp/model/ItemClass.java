package com.bcpstockerapp.bcp.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.annotation.Generated;
import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class ItemClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long classId;

    private String className;
    private Integer quantity;
    private String foodType;
    private String image;

    @OneToMany(mappedBy = "itemClass")
    private List<InventoryTable> childItems;

    //constuctors
    public ItemClass(){}
    public ItemClass(String _className){
        this.className = _className;
        this.quantity = 0;
        childItems = new ArrayList<InventoryTable>();
    }
    public ItemClass(String _className, String _foodType){
        this.className = _className;
        this.foodType = _foodType;
        this.quantity = 0;
        childItems = new ArrayList<InventoryTable>();
    }

    // getters
    public Long getClassId() {return this.classId;}
    public String getClassName() {return this.className;}
    public Integer getQuantity() {return this.quantity;}
    public String getFoodType() {return this.foodType;}
    public String getImage() {return this.image;}
    
    // setters
    public void setClassName(String _name) {this.className = _name;}
    public void setQuantity(Integer _quantity){this.quantity = _quantity;}
    public void setFoodType(String _foodType){this.foodType = _foodType;}
    public void setImage(String _image) {this.image = _image;}


}
