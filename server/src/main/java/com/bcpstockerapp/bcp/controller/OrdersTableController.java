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
    public @ResponseBody ResponseEntity<String> createOrder(@RequestParam Long orderID, Date orderDate, boolean delOrPickUp, Date delDate, String deliveryTime, Integer orderStatus, String mNumber, String address, String address2, String email, String phoneNumber) {
        try{
            OrdersTable order = new OrdersTable();
            order.setOrderDate(orderDate);
            order.setDelOrPickUp(delOrPickUp);
            order.setDelDate(delDate);
            order.setDeliveryTime(deliveryTime);
            order.setOrderStatus(orderStatus);
            order.setMNumber(mNumber);
            order.setAddress(address);
            order.setEmail(email);
            order.setPhoneNumber(phoneNumber);
            ordersTableRepository.save(order);
            return new ResponseEntity<>("Saved!", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/orders/{orderID}")
    public @ResponseBody ResponseEntity<OrdersTable> findByOrderID(@PathVariable(value="orderID") int orderID){
        try{
            OrdersTable item = ordersTableRepository.findByOrderID(orderID);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
