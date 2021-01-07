package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@Controller
public class InventoryTableController {
    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @GetMapping("/items")
    public @ResponseBody ResponseEntity<List<InventoryTable>> getAllItems(){
        try{
            List<InventoryTable> inventory = inventoryTableRepository.findAll();
            return new ResponseEntity<>(inventory, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/items")
    public @ResponseBody ResponseEntity<String> createItem(@RequestParam Long id, String barcode, String name, Integer quantity, String type, String brand, boolean vegetarian, boolean vegan, Date bestBuy, Date expiration) {
        try{
            InventoryTable item = new InventoryTable();
            item.setId(id);
            item.setBarcode(barcode);
            item.setName(name);
            item.setQuantity(quantity);
            item.setType(type);
            item.setBrand(brand);
            item.setVegetarian(vegetarian);
            item.setVegan(vegan);
            item.setBestBuy(bestBuy);
            item.setExpiration(expiration);
            inventoryTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/items/{barcode}")
    public @ResponseBody ResponseEntity<InventoryTable> findByBarcode(@PathVariable(value="barcode") String barcode){
        try{
            InventoryTable item = inventoryTableRepository.findByBarcode(barcode);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
