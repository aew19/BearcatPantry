package com.bcpstockerapp.bcp.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class TransactionTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long transactionID;
    @Column
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;
    private String barcodeId;
    private Integer quantity;
    private boolean itemsIn;    // IMPORTANT: bool used as flag for: True = item going in, False = item going out

    // constructors
    public TransactionTable(){}

    // getters
    public Long getID(){return transactionID;}
    public LocalDate getDate(){return date;}
    public String getBarcodeId(){return barcodeId;}
    public Integer getQuantity(){return quantity;}
    public boolean getItemsIn(){return itemsIn;}

    // setters
    public void setDate(LocalDate _date){this.date = _date;}
    public void setBarcodeId(String _barcode){this.barcodeId = _barcode;}
    public void setQuantity(Integer _quantity){this.quantity = _quantity;}
    public void setItemsIn(boolean _itemsIn){this.itemsIn = _itemsIn;}
}
