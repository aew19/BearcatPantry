package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
public class InventoryTableController {
    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @GetMapping("/items")
    public @ResponseBody List<InventoryTable> getAllItems(){
        return inventoryTableRepository.findAll();
    }
    @PostMapping("/items")
    public @ResponseBody  String createItem (@RequestParam Long id, String barcode, String name, Integer quantity, String type, String brand, boolean vegetarian, boolean vegan, Date bestBuy, Date expiration) {
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
        return "Saved!!";
    }
}
