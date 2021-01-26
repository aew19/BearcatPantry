package com.bcpstockerapp.bcp.model;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class InventoryTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long inventoryId;

    private String barcodeId;
    private Integer quantity;
    private String location;
    private Date dateRecorded;
    private Date expirationDate;

    //Constructors
    public InventoryTable(){}
    public InventoryTable(String barcodeId, Integer quantity, String location, Date dateRecorded, Date expirationDate){
        this.barcodeId = barcodeId;
        this.quantity = quantity;
        this.location = location;
        this.dateRecorded = dateRecorded;
        this.expirationDate = expirationDate;
    }

    //Getters
    public Long getId(){return this.inventoryId;}
    public String getBarcodeIdId(){return this.barcodeId;}
    public Integer getQuantity(){return this.quantity;}
    public String getLocation(){return this.location;}
    public Date getDateRecorded(){return this.dateRecorded;}
    public Date getExpirationDate(){return this.expirationDate;}

    //Setters
    public void setBarcodeId(String barcodeId){this.barcodeId = barcodeId;}
    public void setQuantity(Integer quantity){this.quantity = quantity;}
    public void setLocation(String location){this.location = location;}
    public void setDateRecorded(Date dateRecorded){this.dateRecorded = dateRecorded;}
    public void setExpirationDate(Date expirationDate){this.expirationDate = expirationDate;}


}