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
    public @ResponseBody List<OrdersTable> getAllOrders(){
        return  ordersTableRepository.findAll();
    }

    @PostMapping("/orders")
    public @ResponseBody String createOrder(@RequestParam Date orderDate, boolean delOrPickUp, Date delDate, String deliveryTime, Integer orderStatus, String mNumber, String address, String address2, String email, String phoneNumber) {
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
