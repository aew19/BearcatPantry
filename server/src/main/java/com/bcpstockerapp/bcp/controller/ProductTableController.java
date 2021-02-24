package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.ProductTable;
import com.bcpstockerapp.bcp.repository.ProductTableRepository;
import com.bcpstockerapp.bcp.utilities.FileUploadUtil;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class ProductTableController {

    @Autowired
    private ProductTableRepository productTableRepository;

    @GetMapping("/items")
    public @ResponseBody List<ProductTable> getAllItems(){
        return  productTableRepository.findAll();
    }

    @PostMapping("/items")
    public @ResponseBody ProductTable createItem(@RequestParam String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, Date scanDate, String productURL, boolean isActive) {
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
        return productTableRepository.save(item);

    }

    @GetMapping("/items/{barcodeId}")
    public @ResponseBody ProductTable getByBarcode(@PathVariable(value="barcodeId") String barcodeId){
        return productTableRepository.findByBarcodeId(barcodeId);
    }

    @PutMapping("/items/{barcodeId}")
    public @ResponseBody ProductTable updateProduct(@PathVariable(value="barcodeId") String barcodeId, String productTitle, String brand, String foodType, String productURL, boolean vegetarian, boolean vegan){
        ProductTable product = productTableRepository.findByBarcodeId(barcodeId);
        product.setName(productTitle);
        product.setBrand(brand);
        product.setType(foodType);
        product.setProductURL(productURL);
        product.setVegetarian(vegetarian);
        product.setVegan(vegan);
        return productTableRepository.save(product);
    }

    @PutMapping("/addImage/{barcodeId}")
    public @ResponseBody String updateImage(@PathVariable(value="barcodeId") String barcodeId, MultipartFile file) throws ServiceException,IllegalStateException, IOException{
        try{
            if (file.getOriginalFilename() == null){
                return "File name is empty";
            }
            System.out.println(StringUtils.cleanPath(file.getOriginalFilename()));
            //Add Image Reference to Database
            ProductTable product = productTableRepository.findByBarcodeId(barcodeId);
            System.out.println("Product" + product);
            product.setImage(StringUtils.cleanPath(file.getOriginalFilename()));
            productTableRepository.save(product);
            //Save Image In Directory
            String uploadDir = "productPhotos/" + barcodeId;
            FileUploadUtil.saveFile(uploadDir, StringUtils.cleanPath(file.getOriginalFilename()), file);
        }catch (IOException e){
            System.out.println("Error Uploading Image: " + e);
            return "Error Uploading Image";
        }
        return "Success";
    }
    // Api call for statistics
    @GetMapping("/getUniqueItems")
    public @ResponseBody Integer getUniqueItems(){
        List<ProductTable> product = productTableRepository.findAll();
        return product.size();
    }

}