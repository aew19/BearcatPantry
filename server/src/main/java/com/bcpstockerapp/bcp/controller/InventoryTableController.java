package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;
import java.util.ArrayList;


@CrossOrigin
@RestController
public class InventoryTableController {

    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @GetMapping("/inventory")
    public @ResponseBody List<InventoryTable> getAllInventory(){
        return inventoryTableRepository.findAll();

    }

    @PostMapping(value="/inventory")
    public @ResponseBody InventoryTable createInventory(@RequestParam String barcodeId, Integer quantity) {
        InventoryTable item = new InventoryTable();
        item.setBarcodeId(barcodeId);
        item.setQuantity(quantity);
        return inventoryTableRepository.save(item);
    }

    @GetMapping("/inventoryTable")
    public @ResponseBody List<prodInventoryJoin> joinTable(){
        return inventoryTableRepository.join();
    }

    
    @GetMapping(value="/inventoryTable/{foodType}")
    public @ResponseBody List<prodInventoryJoin> joinTableByType(@PathVariable(value="foodType") String foodType){
        List<prodInventoryJoin> allItems = inventoryTableRepository.join();
        List<prodInventoryJoin> returnList = new ArrayList<prodInventoryJoin>();
        for (prodInventoryJoin elem : allItems){
            if(elem.getFoodType().equals(foodType)){
                returnList.add(elem);
            }
        }
        return returnList;
    }

    @PutMapping("/increaseInventory")
    public @ResponseBody String increaseInventory(@RequestParam String[] barcodeIds){
        for (String barcodeId : barcodeIds) {
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
            if (inventory == null){
                //If not in inventory table add it to the table
                InventoryTable item = new InventoryTable();
                item.setBarcodeId(barcodeId);
                item.setQuantity(1);
                inventoryTableRepository.save(item);
            }else{
                //Otherwise increase current inventory by 1
                Integer currentQuantity = inventory.getQuantity();
                inventory.setQuantity(currentQuantity + 1);
                inventoryTableRepository.save(inventory);
            }

        }
        return "done";
    }

    @PutMapping("/decreaseInventory")
    public @ResponseBody String decreaseInventory(@RequestParam String[] barcodeIds){
        for (String barcodeId : barcodeIds) {
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
            Integer currentQuantity = inventory.getQuantity();
            if (currentQuantity == 1) {
                inventoryTableRepository.delete(inventory);
            } else {
                inventory.setQuantity(currentQuantity - 1);
                inventoryTableRepository.save(inventory);
            }

        }
        return "done";
    }


    @PutMapping("/updateInventory/{barcodeId}")
    public @ResponseBody InventoryTable updateQuantity(@PathVariable(value="barcodeId") String barcodeId,@RequestParam Integer quantity){
        InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
        inventory.setQuantity(quantity);
        return inventoryTableRepository.save(inventory);
    }

    @DeleteMapping("/deleteInventory/{barcodeId}")
    public @ResponseBody String deleteInventory(@PathVariable(value="barcodeId") String barcodeId){
        InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
        inventoryTableRepository.delete(inventory);
        return "Success";

    }

    //Statistics API Endpoints
    @GetMapping("/getTotalInventory")
    public @ResponseBody Integer getTotalInventory() {
        List<InventoryTable> inventoryCount = inventoryTableRepository.findAll();
        int totalInv = 0;
        for (InventoryTable inventoryTable : inventoryCount) {
            totalInv += inventoryTable.getQuantity();
        }
        return totalInv;
    }
}
