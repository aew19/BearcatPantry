package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.ProductTable;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import com.bcpstockerapp.bcp.repository.ProductTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class InventoryTableController {
    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @GetMapping("/inventory")
    public @ResponseBody ResponseEntity<List<InventoryTable>> getAllInventory(){
        try{
            List<InventoryTable> inventory = inventoryTableRepository.findAll();
            return new ResponseEntity<>(inventory, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/inventory")
    public @ResponseBody ResponseEntity<String> createInventory(@RequestParam String barcodeId, Integer quantity, String location, Date dateRecorded, Date expirationDate) {
        try{
            InventoryTable item = new InventoryTable();
            item.setBarcodeId(barcodeId);
            item.setQuantity(quantity);
            item.setDateRecorded(dateRecorded);
            item.setLocation(location);
            item.setExpirationDate(expirationDate);
            inventoryTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/inventoryTable")
    public ResponseEntity<List<prodInventoryJoin>> joinTable(){
        try{
            List<prodInventoryJoin> inventory = inventoryTableRepository.join();
            return new ResponseEntity<>(inventory, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/updateInventory/{barcodeId}")
    public @ResponseBody String updateQuantity(@PathVariable(value="barcodeId") String barcodeId,@RequestParam Integer quantity){
        InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
        inventory.setQuantity(quantity);
        inventoryTableRepository.save(inventory);
        return "Success!";

    }
}
