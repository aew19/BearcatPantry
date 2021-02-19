package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.ProductTable;
import com.bcpstockerapp.bcp.repository.ProductTableRepository;
import com.bcpstockerapp.bcp.utilities.FileUploadUtil;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    public @ResponseBody ResponseEntity<String> createItem(@RequestParam String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, Date scanDate, String productURL, boolean isActive) {
        try{
            ProductTable item = new ProductTable();
            item.setBarcode(barcodeId);
            item.setName(productTitle);
            item.setType(foodType);
            item.setBrand(brand);
            item.setVegetarian(vegetarian);
            item.setVegan(vegan);
            item.setAddedDate(scanDate);
            item.setProductURL(productURL);
            item.setActive(isActive);
            productTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/items/{barcodeId}")
    public @ResponseBody ResponseEntity<ProductTable> getByBarcode(@PathVariable(value="barcodeId") String barcodeId){
        try{
            return new ResponseEntity<>(productTableRepository.findByBarcodeId(barcodeId), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/items/{barcodeId}")
    public @ResponseBody ResponseEntity<String> updateProduct(@PathVariable(value="barcodeId") String barcodeId, String productTitle, String brand, String foodType, String productURL, boolean vegetarian, boolean vegan){
        try{
            ProductTable product = productTableRepository.findByBarcodeId(barcodeId);
            product.setName(productTitle);
            product.setBrand(brand);
            product.setType(foodType);
            product.setProductURL(productURL);
            product.setVegetarian(vegetarian);
            product.setVegan(vegan);
            productTableRepository.save(product);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/addImage/{barcodeId}")
    public @ResponseBody String updateImage(@PathVariable(value="barcodeId") String barcodeId, @RequestParam("image") MultipartFile file) throws ServiceException,IllegalStateException, IOException{
        System.out.println("HIT!!!");
        ProductTable product = productTableRepository.findByBarcodeId(barcodeId);
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println(fileName);
        product.setImage(fileName);
        productTableRepository.save(product);
        String uploadDir = "productPhotos/" + barcodeId;
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        return "Success";
    }

    // Api call for statistics
    @GetMapping("/getUniqueItems")
    public @ResponseBody ResponseEntity<Integer> getUniqueItems(){
        try{
            List<ProductTable> product = productTableRepository.findAll();
            return new ResponseEntity<>(product.size(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
