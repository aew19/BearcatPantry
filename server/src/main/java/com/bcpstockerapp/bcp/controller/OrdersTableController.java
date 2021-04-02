package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.OrderItemsTable;
import com.bcpstockerapp.bcp.model.OrdersTable;
import com.bcpstockerapp.bcp.repository.InventoryTableRepository;
import com.bcpstockerapp.bcp.repository.OrdersTableRepository;
import com.bcpstockerapp.bcp.repository.OrderItemsRepository;
import com.bcpstockerapp.bcp.utilities.orders;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.bcpstockerapp.bcp.gmail.api.SendEmail;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class OrdersTableController {

    @Autowired
    private OrdersTableRepository ordersTableRepository;
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private InventoryTableRepository inventoryTableRepository;

    @GetMapping("/orders")
    public @ResponseBody List<OrdersTable> getAllOrders(){
        return ordersTableRepository.findAll();
    }

    @GetMapping("/orderItems")
    public @ResponseBody List<OrderItemsTable> getAllOrderItems(){ return orderItemsRepository.findAll(); }

    @GetMapping("/orderItems/{orderId}")
    public @ResponseBody List<OrderItemsTable> getOrdersById(@PathVariable(value="orderId") Long orderId){
        return orderItemsRepository.findOrderItemsTableByOrderId(orderId);
    }

    @PostMapping("/orders")
    public @ResponseBody String createOrder(@RequestParam boolean delOrPickUp, String delDate, String deliveryTime, Integer orderStatus, String mNumber, String fName, String lName, String address, String address2, String email, String phoneNumber, String[] barcodes) {
        //Add user information to orders table
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
        OrdersTable currOrder = ordersTableRepository.save(order);

        String method;
        if (delOrPickUp) {
            method = "Delivery";
        }
        else {
            method = "Pickup";
        }
//        SendEmail Email = new SendEmail();
//        String subject = "BCP Pantry & Resource Center Order Received";
//        String body = "Hello " + fName + ", \n\nThank you for placing an order with the BCP Pantry and Resource Center. Your order has been recieved with the following details:\n\n - Name: " + fName + " " + lName + "\n - Delivery Date: " + delDate + "\n - Delivery Time: " + deliveryTime + "\n - Method: " + method + "\n - Address: " + address + "\n - Email: " + email + "\n - Phone Number: " + phoneNumber + "\n\nOur volunteers are currently processing your order and you should recieve a confirmation email shortly.\n\n Thank you for utilizing the BCP Pantry and Resource Center! \n\n - BCP Pantry and Resource Center Team\n\nPlease reach out to BearcatsPantry@ucmail.uc.edu with any questions or concerns.";
//        Email.SendEmail(email, subject, body);

        //Get order id to relate both tables
        Long orderId = currOrder.getOrderId();
        ArrayList<orders> barcodesAndQuantities = orders.getUniqueBarcodesAndQuantities(barcodes);
        for (orders barcodePair : barcodesAndQuantities){
            //Add to order items table
            OrderItemsTable item = new OrderItemsTable();
            item.setBarcodeId(barcodePair.getBarcode());
            item.setOrderId(orderId);
            item.setItemQuantity(barcodePair.getQuantity());
            orderItemsRepository.save(item);
            //Remove from inventory
            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodePair.getBarcode());
            Integer currentQuantity = inventory.getQuantity();
            if (currentQuantity == 1) {
                inventoryTableRepository.delete(inventory);
            } else {
                inventory.setQuantity(currentQuantity - 1);
                inventoryTableRepository.save(inventory);
            }
        }

        return "Saved!";
    }

    @PutMapping("/orders/{orderID}")
    public @ResponseBody String updateOrderStatus(@PathVariable(value="orderID") Long orderID, int newStatus){
        OrdersTable orders = ordersTableRepository.findByOrderID(orderID);
        orders.setOrderStatus(newStatus);
        ordersTableRepository.save(orders);
        return "Success";
    }

    @DeleteMapping("/orders/{orderID}")
    public @ResponseBody String removeOrder(@PathVariable(value="orderID") Long orderID){
        ordersTableRepository.removeOrdersTableByOrderID(orderID);
        return "Success";
    }

    @GetMapping("/orders/{orderID}")
    public @ResponseBody OrdersTable findByOrderID(@PathVariable(value="orderID") Long orderID){
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
