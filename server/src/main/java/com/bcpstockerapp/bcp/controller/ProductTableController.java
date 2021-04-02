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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.io.File;

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
    public @ResponseBody ProductTable createItem(@RequestParam String barcodeId, String productTitle, String foodType, String brand, boolean vegetarian, boolean vegan, String productURL) {
        ProductTable item = new ProductTable();
        item.setBarcode(barcodeId);
        item.setName(productTitle);
        item.setType(foodType);
        item.setBrand(brand);
        item.setVegetarian(vegetarian);
        item.setVegan(vegan);
        item.setProductURL(productURL);
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

    @GetMapping("/getPath")
    public @ResponseBody String getFilePath(){
        String uploadPath = Paths.get("productPhotos/").toString();
        return uploadPath;
    }

    //Deletes image in folder if image is changing
    @DeleteMapping("/deleteImage/{barcodeId}")
    public @ResponseBody String deleteImage(@PathVariable(value="barcodeId") String barcodeId) throws IOException{
        if (!Files.exists(Paths.get("productPhotos/"+barcodeId))){
            return "No Folder for Item";
        }else{
            for (File file: Paths.get("productPhotos/"+barcodeId).toFile().listFiles()){
                file.delete();
            }
            Files.delete(Paths.get("productPhotos/"+barcodeId));
            return "success";
        }
    }

}