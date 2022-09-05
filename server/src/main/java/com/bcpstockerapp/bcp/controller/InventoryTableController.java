package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.ItemClass;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import com.bcpstockerapp.bcp.repository.ItemClassRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bcpstockerapp.bcp.model.TransactionTable;
import com.bcpstockerapp.bcp.repository.TransactionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Enumeration;

@CrossOrigin
@RestController
public class InventoryTableController {

    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ItemClassRepository itemClassRepository;

    private static final Logger log = LoggerFactory.getLogger(InventoryTableController.class);

    @GetMapping("/inventory")
    public @ResponseBody List<InventoryTable> getAllInventory() {
        return inventoryTableRepository.findAll();

    }

    @GetMapping("/inventory/{barcodeId}")
    public @ResponseBody InventoryTable getInventoryBarcode(@PathVariable(value="barcodeId") String barcodeId) {
        return inventoryTableRepository.findMultipleOfBarcode(barcodeId).get(0);

    }

    @PostMapping(value = "/inventory")
    public @ResponseBody InventoryTable createInventory(@RequestParam String barcodeId, Integer quantity) {
        InventoryTable item = new InventoryTable();
        item.setBarcodeId(barcodeId);
        item.setQuantity(quantity);
        ItemClass inventoryItemClass = itemClassRepository.findByClassName("Test Class");
        item.setItemClass(inventoryItemClass);

        TransactionTable tran = new TransactionTable();

        tran.setItemsIn(true);
        tran.setBarcodeId(barcodeId);
        tran.setQuantity(quantity);
        LocalDate today = LocalDate.now();
        tran.setDate(today);

        transactionRepository.save(tran);

        return inventoryTableRepository.save(item);
    }

    @GetMapping("/inventoryTable")
    public @ResponseBody List<prodInventoryJoin> joinTable() {
        return inventoryTableRepository.join();
    }

    @GetMapping(value = "/inventoryTable/{foodType}")
    public @ResponseBody List<prodInventoryJoin> joinTableByType(@PathVariable(value = "foodType") String foodType) {
        // this mapping only gets items with inventory >0. Used for student page
        List<prodInventoryJoin> allItems = inventoryTableRepository.join();
        List<prodInventoryJoin> returnList = new ArrayList<prodInventoryJoin>();
        for (prodInventoryJoin elem : allItems) {
            if (elem.getQuantity() > 0) {
                if (elem.getFoodType().equals(foodType) || foodType.equals("All")) {
                    returnList.add(elem);
                }
            }
        }
        return returnList;
    }

    @PutMapping("/updateItemClass/{barcodeId}")
    public @ResponseBody String updateItemClass(@PathVariable(value = "barcodeId") String barcodeId, @RequestParam String className) {
        InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
        //ItemClass currentItemClass = inventory.getItemClass();
        ItemClass newItemClass = itemClassRepository.findByClassName(className);

        inventory.setItemClass((newItemClass));
        inventoryTableRepository.save(inventory);

        return "done";
    }

    @PutMapping("/increaseInventory")
    public @ResponseBody String increaseInventory(@RequestParam String[] barcodeIds) {
        for (String barcodeId : barcodeIds) {
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);

            if (inventory == null) {
                // If not in inventory table add it to the table
                InventoryTable item = new InventoryTable();
                item.setBarcodeId(barcodeId);
                item.setQuantity(1);
                inventoryTableRepository.save(item);
            } else {
                // Otherwise increase current inventory by 1
                Integer currentQuantity = inventory.getQuantity();
                inventory.setQuantity(currentQuantity + 1);
                inventoryTableRepository.save(inventory);
            }

            TransactionTable tran = new TransactionTable();

            tran.setItemsIn(true);
            tran.setBarcodeId(barcodeId);
            tran.setQuantity(1);
            LocalDate today = LocalDate.now();
            tran.setDate(today);

            transactionRepository.save(tran);

        }
        return "done";
    }

    @PutMapping("/decreaseInventory")
    public @ResponseBody String decreaseInventory(@RequestParam String[] barcodeIds) {
        // needed for transactions. totals quantities of each product being checked out
        // otherwise would create individual transactions of quantity=1 for each instance of same product
        Hashtable<String, Integer> totals = new Hashtable<String, Integer>();

        for (String barcodeId : barcodeIds) {
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
            Integer currentQuantity = inventory.getQuantity();

            if (currentQuantity != 0) {
                inventory.setQuantity(currentQuantity - 1);
                inventoryTableRepository.save(inventory);

                if(totals.containsKey(barcodeId)){
                    totals.put(barcodeId, totals.get(barcodeId) + 1);
                }
                else{
                    totals.put(barcodeId, 1);
                }
            }
            // else: add item to a list of items unable to be checked out? a ret list

            /*
             * if (currentQuantity == 1) {
             * inventoryTableRepository.delete(inventory);
             * } else {
             * inventory.setQuantity(currentQuantity - 1);
             * inventoryTableRepository.save(inventory);
             * }
             */

        /* IDEAS FOR INVENTORY AT 0 OR MORE ITEMS CHECKED OUT THAN INVENTORY QUANTITY
        *    - return a string or another list of barcode strings that couldn't be checked out
        *    - or completely cancel the call, but items are saved as you go through list, some could already be saved before cancelling
        */

        }

        Enumeration<String> e = totals.keys();
        while(e.hasMoreElements()){
            String barcode = e.nextElement();

            TransactionTable tran = new TransactionTable();
            tran.setItemsIn(false);
            tran.setBarcodeId(barcode);
            tran.setQuantity(totals.get(barcode));
            LocalDate today = LocalDate.now();
            tran.setDate(today);
            transactionRepository.save(tran);
        }

        return "done";
    }

    @PutMapping("/updateInventory/{barcodeId}")
    public @ResponseBody InventoryTable updateQuantity(@PathVariable(value = "barcodeId") String barcodeId,
            @RequestParam Integer quantity) {
        InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);

        Integer prevQuantity = inventory.getQuantity();
        inventory.setQuantity(quantity);

        InventoryTable ret = inventoryTableRepository.save(inventory);

        TransactionTable tran = new TransactionTable();
        tran.setBarcodeId(barcodeId);
        LocalDate today = LocalDate.now();
        tran.setDate(today);
        
        // Set item in/out and quanitity depending upon whether quantity increased or decreased
        if (prevQuantity < quantity) {
            tran.setItemsIn(true);
            tran.setQuantity(quantity - prevQuantity);
        }
        else if (prevQuantity > quantity) {
            tran.setItemsIn(false);
            tran.setQuantity(prevQuantity - quantity);
        }
        else{ return ret; } // no change in quantity, dont save transaction

        transactionRepository.save(tran);

        return ret;
    }

    @DeleteMapping("/deleteInventory/{barcodeId}")
    public @ResponseBody String deleteInventory(@PathVariable(value = "barcodeId") String barcodeId) {
        //InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
        List<InventoryTable> inventory = inventoryTableRepository.findMultipleOfBarcode(barcodeId);
        for (InventoryTable inventoryTable : inventory) {
            inventoryTableRepository.delete(inventoryTable);
        }

        //Integer quantity = inventory.getQuantity();

        /*TransactionTable tran = new TransactionTable();
        tran.setItemsIn(false);
        tran.setBarcodeId(barcodeId);
        LocalDate today = LocalDate.now();
        tran.setDate(today);
        tran.setQuantity(quantity);
        transactionRepository.save(tran); */


        //inventoryTableRepository.delete(inventory);
        //Integer testInt = inventory.size();
        return "Success";
    }

    // Statistics API Endpoints
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
