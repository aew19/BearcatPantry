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
    private Long id;

    private Long productId;
    private Date dateRecorded;
    private Date expirationDate;

    //Constructors
    public InventoryTable(){}
    public InventoryTable(Long productId, Date dateRecorded, Date expirationDate){
        this.productId = productId;
        this.dateRecorded = dateRecorded;
        this.expirationDate = expirationDate;
    }

    //Getters
    public Long getId(){return this.id;}
    public Long getProductId(){return this.productId;}
    public Date getDateRecorded(){return this.dateRecorded;}
    public Date getExpirationDate(){return this.expirationDate;}

    //Setters
    public void setProductId(Long productId){this.productId = productId;}
    public void setDateRecorded(Date dateRecorded){this.dateRecorded = dateRecorded;}
    public void setExpirationDate(Date expirationDate){this.expirationDate = expirationDate;}


}
