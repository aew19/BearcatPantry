package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
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
}
