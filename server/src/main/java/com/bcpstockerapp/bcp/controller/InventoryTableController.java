package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
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

    @PostMapping(value="/inventory")
    public @ResponseBody ResponseEntity<String> createInventory(@RequestParam String barcodeId, Integer quantity, String location, Date dateRecorded) {
        try{
            InventoryTable item = new InventoryTable();
            item.setBarcodeId(barcodeId);
            item.setQuantity(quantity);
            item.setDateRecorded(dateRecorded);
            item.setLocation(location);
            inventoryTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/inventoryTable")
    public @ResponseBody ResponseEntity<List<prodInventoryJoin>> joinTable(){
        try{
            List<prodInventoryJoin> inventory = inventoryTableRepository.join();
            return new ResponseEntity<>(inventory, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/updateInventory/{barcodeId}")
    public @ResponseBody ResponseEntity<String> updateQuantity(@PathVariable(value="barcodeId") String barcodeId,@RequestParam Integer quantity){
        try{
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
            inventory.setQuantity(quantity);
            inventoryTableRepository.save(inventory);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteInventory/{barcodeId}")
    public @ResponseBody ResponseEntity<String> deleteInventory(@PathVariable(value="barcodeId") String barcodeId){
        try{
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodeId);
            inventoryTableRepository.delete(inventory);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //Statistics API Endpoints
    @GetMapping("/getTotalInventory")
    public @ResponseBody ResponseEntity<Integer> getTotalInventory(){
        try{
            List<InventoryTable> inventoryCount = inventoryTableRepository.findAll();
            return new ResponseEntity<>(inventoryCount.size(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
