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
    private String location;

    @Column
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateRecorded;



    //Constructors
    public InventoryTable(){}
    public InventoryTable(String barcodeId, Integer quantity, String location, Date dateRecorded){
        this.barcodeId = barcodeId;
        this.quantity = quantity;
        this.location = location;
        this.dateRecorded = dateRecorded;

    }

    //Getters
    public Long getId(){return this.inventoryId;}
    public String getBarcodeId(){return this.barcodeId;}
    public Integer getQuantity(){return this.quantity;}
    public String getLocation(){return this.location;}
    public Date getDateRecorded(){return this.dateRecorded;}


    //Setters
    public void setBarcodeId(String barcodeId){this.barcodeId = barcodeId;}
    public void setQuantity(Integer quantity){this.quantity = quantity;}
    public void setLocation(String location){this.location = location;}
    public void setDateRecorded(Date dateRecorded){this.dateRecorded = dateRecorded;}


}
