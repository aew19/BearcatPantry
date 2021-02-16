package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.OrderItemsTable;
import com.bcpstockerapp.bcp.repository.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin
@RestController
public class OrderItemsTableController {

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @GetMapping("/orderItems")
    public @ResponseBody ResponseEntity<List<OrderItemsTable>> getAllOrderItems(){
        try{
            List<OrderItemsTable> orderItems = orderItemsRepository.findAll();
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
