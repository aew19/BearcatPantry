package com.bcpstockerapp.bcp.model;

public class ShoppingCart {
    private String itemName;
    private Integer itemBarcode;
    private Integer itemQuantity;

    public ShoppingCart(String itemName, Integer itemBarcode, Integer itemQuantity) {
        this.itemName = itemName;
        this.itemBarcode = itemBarcode;
        this.itemQuantity = itemQuantity;
    }


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getItemBarcode() {
        return itemBarcode;
    }

    public void setItemBarcode(Integer itemBarcode) {
        this.itemBarcode = itemBarcode;
    }

    public Integer getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

}
