package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class OrderItemsTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderItemID;
    private Long orderId;
    private String barcodeId;
    private Integer itemQuantity;

    //Constructors
    public OrderItemsTable(){};
    public OrderItemsTable(Long orderItemID, Long orderId, String barcodeId, Integer itemQuantity){
        this.orderItemID = orderItemID;
        this.orderId = orderId;
        this.barcodeId = barcodeId;
        this.itemQuantity = itemQuantity;
    }

    //Getters
    public Long getOrderItemID(){return this.orderItemID;}
    public Long getOrderId(){return this.orderId;}
    public String getBarcodeId(){return this.barcodeId;}
    public Integer getItemQuantity(){return this.itemQuantity;}

    //Setters
    public void setOrderId(Long orderId){this.orderId = orderId;}
    public void setBarcodeId(String barcodeId){this.barcodeId = barcodeId;}
    public void setItemQuantity(Integer itemQuantity){this.itemQuantity = itemQuantity;}

}
