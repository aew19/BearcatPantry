package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class UsersTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer permissions;
    private boolean isActive;
    private Date dateActive;

    //Constructors
    public UsersTable(){}
    public UsersTable(Long id, String name, Integer permissions, boolean isActive, Date dateActive){
        this.id = id;
        this.name = name;
        this.permissions = permissions;
        this.isActive = isActive;
        this.dateActive = dateActive;
    }

    //Getters
    public Long getId(){return this.id;}
    public String getName(){return this.name;}
    public Integer getPermissions(){return this.permissions;}
    public boolean getIsActive(){return this.isActive;}
    public Date getDateActive(){return this.dateActive;}

    //Setters
    public void setId(Long id){this.id = id;}
    public void setName(String name){this.name = name;}
    public void setPermissions(Integer permissions){this.permissions = permissions;}
    public void setIsActive(boolean isActive){this.isActive = isActive;}
    public void setDateActive(Date dateActive){this.dateActive = dateActive;}


}
