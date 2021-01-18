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
    private int orderID;

    private String orderItems;
    private String quantities;
    private Date orderDate;
    private boolean delOrPickUp;
    private Date delDate;
    private int orderStatus;
    private String mNumber;
    private String address;
    private String email;
    private String phoneNumber;

    //Constructors
    public OrdersTable(){}
    public OrdersTable(int orderID, String orderItems, String quantities, Date orderDate, boolean delOrPickUp, Date delDate, int orderStatus, String mNumber, String address, String email, String phoneNumber){
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
    public int getOrderId(){ return orderID; }
    public String getOrderItems(){ return orderItems; }
    public String getQuantities(){ return quantities; }
    public Date getOrderDate(){ return orderDate; }
    public boolean getDelOrPickUp(){ return delOrPickUp; }
    public Date getDelDate(){ return delDate; }
    public int getOrderStatus(){ return orderStatus; }
    public String getMNumber(){ return mNumber; }
    public String getAddress(){ return address; }
    public String getEmail(){ return email; }
    public String getPhoneNumber(){ return phoneNumber; }

    //Setters
    public void setOrderId(int orderID){ this.orderID = orderID; }
    public void setOrderItems(String orderItems){ this.orderItems = orderItems; }
    public void setQuantities(String quantities){ this.quantities = quantities; }
    public void setOrderDate(Date orderDate){ this.orderDate = orderDate; }
    public void setDelOrPickUp(boolean delOrPickUp){ this.delOrPickUp = delOrPickUp; }
    public void setDelDate(Date delDate){ this.delDate = delDate; }
    public void setOrderStatus(int orderStatus){ this.orderStatus = orderStatus; }
    public void setMNumber(String mNumber){ this.mNumber = mNumber; }
    public void setAddress(String address){ this.address = address; }
    public void setEmail(String email){ this.email = email; }
    public void setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; }
}

