package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class OrdersTable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderID;

    private String orderItems;
    private String quantities;
    private Date orderDate;
    private boolean delOrPickUp;
    private Date delDate;
    private Integer orderStatus;
    private String mNumber;
    private String address;
    private String email;
    private String phoneNumber;

    //Constructors
    public OrdersTable(){}
    public OrdersTable(Long orderID, String orderItems, String quantities, Date orderDate, boolean delOrPickUp, Date delDate, Integer orderStatus, String mNumber, String address, String email, String phoneNumber){
        this.orderID = orderID;
        this.orderItems = orderItems;
        this.quantities = quantities;
        this.orderDate = orderDate;
        this.delOrPickUp = delOrPickUp;
        this.delDate = delDate;
        this.orderStatus = orderStatus;
        this.mNumber = mNumber;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    //Getters
    public Long getOrderId(){ return this.orderID; }
    public String getOrderItems(){ return this.orderItems; }
    public String getQuantities(){ return this.quantities; }
    public Date getOrderDate(){ return this.orderDate; }
    public boolean getDelOrPickUp(){ return this.delOrPickUp; }
    public Date getDelDate(){ return this.delDate; }
    public Integer getOrderStatus(){ return this.orderStatus; }
    public String getMNumber(){ return this.mNumber; }
    public String getAddress(){ return this.address; }
    public String getEmail(){ return this.email; }
    public String getPhoneNumber(){ return this.phoneNumber; }

    //Setters
    public void setOrderId(Long orderID){ this.orderID = orderID; }
    public void setOrderItems(String orderItems){ this.orderItems = orderItems; }
    public void setQuantities(String quantities){ this.quantities = quantities; }
    public void setOrderDate(Date orderDate){ this.orderDate = orderDate; }
    public void setDelOrPickUp(boolean delOrPickUp){ this.delOrPickUp = delOrPickUp; }
    public void setDelDate(Date delDate){ this.delDate = delDate; }
    public void setOrderStatus(Integer orderStatus){ this.orderStatus = orderStatus; }
    public void setMNumber(String mNumber){ this.mNumber = mNumber; }
    public void setAddress(String address){ this.address = address; }
    public void setEmail(String email){ this.email = email; }
    public void setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; }
}

