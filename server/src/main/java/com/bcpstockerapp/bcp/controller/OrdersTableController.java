package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.OrdersTable;
import com.bcpstockerapp.bcp.repository.OrdersTableRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class OrdersTableController {

    @Autowired
    private OrdersTableRepository ordersTableRepository;

    @GetMapping("/orders")
    public @ResponseBody List<OrdersTable> getAllOrders(){
        return  ordersTableRepository.findAll();
    }

    @PostMapping("/orders")
    public @ResponseBody String createOrder(@RequestParam boolean delOrPickUp, String delDate, String deliveryTime, Integer orderStatus, String mNumber, String fName, String lName, String address, String address2, String email, String phoneNumber) {
        System.out.println("Delivery Date: "+delDate);
        System.out.println("Delivery Time: " + deliveryTime);
        OrdersTable order = new OrdersTable();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate orderDate = LocalDate.now();
        order.setOrderDate(orderDate);
        order.setDelOrPickUp(delOrPickUp);
        LocalDate deliveryDate = LocalDate.parse(delDate, dtf);
        order.setDelDate(deliveryDate);
        order.setDeliveryTime(deliveryTime);
        order.setOrderStatus(orderStatus);
        order.setMNumber(mNumber);
        order.setFName(fName);
        order.setLName(lName);
        order.setAddress(address);
        order.setAddress2(address2);
        order.setEmail(email);
        order.setPhoneNumber(phoneNumber);
        ordersTableRepository.save(order);
        return "Saved!";
    }

    @GetMapping("/orders/{orderID}")
    public @ResponseBody OrdersTable findByOrderID(@PathVariable(value="orderID") int orderID){
        return ordersTableRepository.findByOrderID(orderID);
    }

    //Statistics API Endpoints
    @GetMapping("/getTotalOrders")
    public @ResponseBody Integer getTotalOrders(){
        List<OrdersTable> orders = ordersTableRepository.findAll();
        return orders.size();
    }

    //TODO: Add logic for uncompleted orders
    @GetMapping("/getTotalUncompletedOrders")
    public @ResponseBody Integer getTotalUncompletedOrders(){
        List<OrdersTable> orders = ordersTableRepository.findAll();
        return orders.size();
    }
}
