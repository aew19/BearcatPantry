package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.OrdersTable;
import com.bcpstockerapp.bcp.repository.OrdersTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class OrdersTableController {
    @Autowired
    private OrdersTableRepository ordersTableRepository;

    @GetMapping("/orders")
    public @ResponseBody ResponseEntity<List<OrdersTable>> getAllOrders(){
        try{
            List<OrdersTable> orders = ordersTableRepository.findAll();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/orders")
    public @ResponseBody ResponseEntity<String> createOrder(@RequestParam List<Int> orderItems, List<Int> quantites, Date orderDate, boolean delOrPickUp, Date delDate, Int orderStatus, String mNumber, String address, String email, String phoneNumber) {
        try{
            OrdersTable item = new OrdersTable();
            item.setOrderItems(orderItems);
            item.setQuantities(quantites);
            item.setOrderDate(orderDate);
            item.setDelOrPickUp(delOrPickUp);
            item.setDelDate(delDate);
            item.setOrderStatus(orderStatus);
            item.setMNumber(mNumber);
            item.setAddress(address);
            item.setEmail(email);
            item.setPhoneNumber(phoneNumber);
            ordersTableRepository.save(item);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/orders/{orderID}")
    public @ResponseBody ResponseEntity<OrdersTable> findByOrderID(@PathVariable(value="orderID") Int orderID){
        try{
            OrdersTable item = ordersTableRepository.findByOrderID(orderID);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
