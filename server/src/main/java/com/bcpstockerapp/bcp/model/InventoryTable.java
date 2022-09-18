package com.bcpstockerapp.bcp.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.Date;

@Entity
public class InventoryTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long inventoryId;

    private String barcodeId;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "classId", nullable = false)
    private ItemClass itemClass;


    //Constructors
    public InventoryTable(){}
    public InventoryTable(String barcodeId, Integer quantity){
        this.barcodeId = barcodeId;
        this.quantity = quantity;
    }

    //Getters
    public Long getId(){return this.inventoryId;}
    public String getBarcodeId(){return this.barcodeId;}
    public Integer getQuantity(){return this.quantity;}
    public ItemClass getItemClass(){return this.itemClass;}


    //Setters
    public void setBarcodeId(String barcodeId){this.barcodeId = barcodeId;}
    public void setQuantity(Integer quantity){this.quantity = quantity;}
    public void setItemClass(ItemClass _itemClass){this.itemClass = _itemClass;}

}
