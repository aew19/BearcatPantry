package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.ProductTable;
import com.bcpstockerapp.bcp.repository.ProductTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class ProductTableController {
    @Autowired
    private ProductTableRepository productTableRepository;

    @GetMapping("/items")
    public @ResponseBody ResponseEntity<List<ProductTable>> getAllItems(){
        try{
            List<ProductTable> product = productTableRepository.findAll();
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/items")
    public @ResponseBody ResponseEntity<String> createItem(@RequestParam String barcode, String name, Integer quantity, String type, String brand, boolean vegetarian, boolean vegan, Date bestBuy, Date addedDate) {
        try{
            ProductTable item = new ProductTable();
            item.setBarcode(barcode);
            item.setName(name);
            item.setQuantity(quantity);
            item.setType(type);
            item.setBrand(brand);
            item.setVegetarian(vegetarian);
            item.setVegan(vegan);
            item.setAddedDate(addedDate);
            productTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/items/{barcode}")
    public @ResponseBody ResponseEntity<ProductTable> findByBarcode(@PathVariable(value="barcode") String barcode){
        try{
            ProductTable item = productTableRepository.findByBarcode(barcode);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
