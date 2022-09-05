package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.ItemClass;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import com.bcpstockerapp.bcp.repository.ItemClassRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bcpstockerapp.bcp.model.TransactionTable;
import com.bcpstockerapp.bcp.repository.TransactionRepository;
import java.lang.annotation.Annotation;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Enumeration;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.io.Console;
import java.io.File;
import org.hibernate.service.spi.ServiceException;
import com.bcpstockerapp.bcp.utilities.FileUploadUtil;


@CrossOrigin
@RestController
public class ItemClassController {
    @Autowired
    private ItemClassRepository itemClassRepository;
    
    @GetMapping("/itemClass/{className}")
    public @ResponseBody ItemClass getItemClassByName(@PathVariable(value = "className") String className) {
        ItemClass item = itemClassRepository.findByClassName(className);
        System.out.println(item.getClassName());
        return item;
    }

    @GetMapping("/itemClassAll")
    public @ResponseBody List<ItemClass> getAllItemClasses() {
        return itemClassRepository.findAll();
    }

    @PostMapping(value = "/itemClass")
    public @ResponseBody ItemClass createItemClass(@RequestParam String className, String foodType) {
        // check for unique names!
        if(!itemClassRepository.existsByClassName(className)){
            ItemClass newClass = new ItemClass(className, foodType);
            return itemClassRepository.save(newClass);

            //return "Success";
        }
        else{
            return null;
            //return "Class not created. Not a unique class name.";
        }

    }

    // @PathVariable(value="barcodeId") String barcodeId
    @PutMapping("/addClassImage/{classId}")
    public @ResponseBody String updateImage(@PathVariable(value="classId") String classId, MultipartFile file) throws ServiceException,IllegalStateException, IOException{
        try{
            if (file.getOriginalFilename() == null){
                return "File name is empty";
            }
            Long idAsLong = Long.parseLong(classId);
            System.out.println(StringUtils.cleanPath(file.getOriginalFilename()));
            String[] words = StringUtils.cleanPath(file.getOriginalFilename()).split("\\.");
            System.out.println(words[1]);
            //Add Image Reference to Database
            //ProductTable product = productTableRepository.findByBarcodeId(barcodeId);
            ItemClass itemClass = itemClassRepository.findByClassId(idAsLong);
            System.out.println("Item Class" + itemClass);
            itemClass.setImage(idAsLong.toString() + "." + words[1]);
            itemClassRepository.save(itemClass);
            //Save Image In Directory
            String uploadDir = "productPhotos/";
            FileUploadUtil.saveFile(uploadDir, idAsLong.toString() + "." + words[1], file);
        }catch (IOException e){
            System.out.println("Error Uploading Image: " + e);
            return "Error Uploading Image";
        }
        return "Success";
    }

    // METHOD: add child item

    // METHOD: 

    @DeleteMapping("/deleteClass")
    public @ResponseBody String deleteItemClass(@RequestParam String className) {
        // need to move sub items to different class first so products always have a class!!

        ItemClass deleteItem = itemClassRepository.findByClassName(className);
        if (deleteItem == null){ return "No class deleted. Name not found."; }
        if(deleteItem.getQuantity() > 0){ return "Class not deleted. Clear sub-items from class first!"; }
        itemClassRepository.delete(deleteItem);
        return "Success";
    }
}
