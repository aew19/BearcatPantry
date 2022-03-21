package com.bcpstockerapp.bcp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public class transactionProdJoin{
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

    private String barcodeId;
    private Integer quantity;
    private boolean itemsIn;
    private String productName;
    private double weight;
    private String productType;

    public transactionProdJoin(LocalDate _date, String _barcode, Integer _quantity, boolean _itemsIn, String _prodName, double _weight, String _type){
        this.date = _date;
        this.barcodeId = _barcode;
        this.quantity = _quantity;
        this.itemsIn = _itemsIn;
        this.productName = _prodName;
        this.weight = _weight;
        this.productType = _type;
    }

    public void setDate(LocalDate _date){
        this.date = _date;
    }
    public LocalDate getDate(){
        return this.date;
    }

    public void setBarcode(String _barcode){
        this.barcodeId = _barcode;
    }
    public String getBarcode(){
        return this.barcodeId;
    }

    public void setQuantity(Integer _quantity){
        this.quantity = _quantity;
    }
    public Integer getQuantity(){
        return this.quantity;
    }

    public void setItemsIn(boolean _itemsIn){
        this.itemsIn = _itemsIn;
    }
    public boolean getItemsIn(){
        return this.itemsIn;
    }

    public void setProductName(String _name){
        this.productName = _name;
    }
    public String getProductName(){
        return this.productName;
    }

    public void setWeight(double _weight){
        this.weight = _weight;
    }
    public double getWeight(){
        return this.weight;
    }

    public void setProductType(String _type){
        this.productType = _type;
    }
    public String getProductType(){
        return this.productType;
    }
}