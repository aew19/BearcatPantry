package com.bcpstockerapp.bcp.utilities;

import java.util.*;

public class orders {
    private String barcode;
    private Integer quantity;

    public orders(String barcode, Integer quantity){
        this.barcode = barcode;
        this.quantity = quantity;
    }

    public String getBarcode() {
        return barcode;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public static ArrayList<orders> getUniqueBarcodesAndQuantities(String[] barcodes){
        ArrayList <orders> barcodesAndQuantity = new ArrayList<orders>();
        //get array of unique barcodes
        Set<String> uniqueBarcode = new TreeSet<>();
        uniqueBarcode.addAll(Arrays.asList(barcodes));
        //get quantity of each
        for (String uniBarcode : uniqueBarcode){
            int quantity = 0;
            for (String barcode: barcodes){
                if (uniBarcode.equals(barcode)){
                    quantity ++;
                }
            }
            orders temp = new orders(uniBarcode,quantity);
            barcodesAndQuantity.add(temp);
        }
        return barcodesAndQuantity;
    }
}
