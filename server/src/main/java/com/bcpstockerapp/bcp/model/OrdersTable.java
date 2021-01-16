package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class OrdersTable {
    @orderID
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Int orderID;
    private List<Int> orderItems;
    private List<Int> quantites;
    private Date orderDate;
    private boolean delOrPickUp;
    private Date delDate;
    private Int orderStatus;
    private String mNumber;
    private String address;
    private String email;
    private String phoneNumber;

    //Constructors
    public OrdersTable(){}
    public OrdersTable(Int orderID, List<Int> orderItems, List<Int> quantites, Date orderDate, boolean delOrPickUp, Date delDate, Int orderStatus, String mNumber, String address, String email, String phoneNumber){
        this.orderID = orderID;
        this.orderItems = orderItems;
        this.quantites = quantites;
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
    public Int getOrderId(){ return orderID; }
    public List<Int> getOrderItems(){ return orderItems; }
    public List<Int> getQuantities(){ return quantites; }
    public Date getOrderDate(){ return orderDate; }
    public boolean getDelOrPickUp(){ return delOrPickUp; }
    public Date getDelDate(){ return delDate; }
    public Int getOrderStatus(){ return orderStatus; }
    public String getMNumber(){ return mNumber; }
    public String getAddress(){ return address; }
    public String getEmail(){ return email; }
    public String getPhoneNumber(){ return phoneNumber; }

    //Setters
    public void setOrderId(Int orderID){ this.orderID = orderID; }
    public void setOrderItems(List<Int> orderItems){ this.orderItems = orderItems; }
    public void setQuantities(List<Int> quantites){ this.quantites = quantites; }
    public void setOrderDate(Date orderDate){ this.orderDate = orderDate; }
    public void setDelOrPickUp(boolean delOrPickUp){ this.delOrPickUp = delOrPickUp; }
    public void setDelDate(Date delDate){ this.delDate = delDate; }
    public void setOrderStatus(Int orderStatus){ this.orderStatus = orderStatus; }
    public void setMNumber(String mNumber){ this.mNumber = mNumber; }
    public void setAddress(String address){ this.address = address; }
    public void setEmail(String email){ this.email = email; }
    public void setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; }
}

