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
    public @ResponseBody ResponseEntity<String> createItem(@RequestParam String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, Date scanDate, int imageId, String imageFileName, String productURL, boolean isActive) {
        try{
            ProductTable item = new ProductTable();
            item.setBarcode(barcodeId);
            item.setName(productTitle);
            item.setType(foodType);
            item.setBrand(brand);
            item.setVegetarian(vegetarian);
            item.setVegan(vegan);
            item.setAddedDate(scanDate);
            item.setImageId(imageId);
            item.setImageFileName(imageFileName);
            item.setProductURL(productURL);
            item.setActive(isActive);
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
