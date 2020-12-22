package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.PantryItem;
import com.bcpstockerapp.bcp.repository.PantryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
public class PantryItemController {
    @Autowired
    private PantryItemRepository pantryItemRepository;

    @GetMapping("/items")
    public @ResponseBody List<PantryItem> getAllItems(){
        return pantryItemRepository.findAll();
    }
    @PostMapping("/items")
    public @ResponseBody  String createItem (@RequestParam Long id, String name, Integer quantity, String type,String brand,String vegVegan,Date bestBuy, Date expiration) {
        PantryItem item = new PantryItem();
        item.setId(id);
        item.setName(name);
        item.setQuantity(quantity);
        item.setType(type);
        item.setBrand(brand);
        item.setVegVegan(vegVegan);
        item.setBestBuy(bestBuy);
        item.setExpiration(expiration);
        pantryItemRepository.save(item);
        return "Saved!!";
    }
}
