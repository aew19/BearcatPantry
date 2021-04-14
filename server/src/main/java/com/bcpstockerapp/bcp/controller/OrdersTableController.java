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
import java.util.Calendar;

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
        SendEmail Email = new SendEmail();
        String subject = "BCP & Resource Center Order Received";
        String body = "Hello " + fName + ", \n\nThank you for placing an order with the BCP & Resource Center. Your order has been received with the following details:\n\n - Name: " + fName + " " + lName + "\n - Delivery Date: " + delDate + "\n - Delivery Time: " + deliveryTime + "\n - Method: " + method + "\n - Address: " + address + "\n - Email: " + email + "\n - Phone Number: " + phoneNumber + "\n\nOur volunteers are currently processing your order and you will receive a confirmation email when it is complete. If you have any questions or changes to your order, contact the BCP at BearcatsPantry@ucmail.uc.edu.\n\n Thank you for utilizing the BCP & Resource Center! \n\n - BCP & Resource Center Team\n\nPlease reach out to BearcatsPantry@ucmail.uc.edu with any questions or concerns.";
        Email.SendEmail(email, subject, body);

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
//            //Remove from inventory
//            InventoryTable inventory = inventoryTableRepository.findByBarcodeId(barcodePair.getBarcode());
//            Integer currentQuantity = inventory.getQuantity();
//            if (currentQuantity == 1) {
//                inventoryTableRepository.delete(inventory);
//            } else {
//                inventory.setQuantity(currentQuantity - 1);
//                inventoryTableRepository.save(inventory);
//            }
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
        OrdersTable order = ordersTableRepository.findByOrderID(orderID);
        String email = order.getEmail();
        ordersTableRepository.delete(order);
        SendEmail Email = new SendEmail();
        String subject = "BCP & Resource Center Order Cancelled";
        String body = "Hello, \n\nYour order with the BCP & Resource Center has been cancelled due to unforeseen circumstances. Our volunteers will be emailing you shortly with more information.\n\nIn the interim, please reach out to BearcatsPantry@ucmail.uc.edu with any questions or concerns. Thank you for utilizing the BCP & Resource Center. \n\n - BCP & Resource Center Team";
        Email.SendEmail(email, subject, body);
        
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

    @GetMapping("/getTotalUncompletedOrders")
    public @ResponseBody List<OrdersTable> getTotalUncompletedOrders(){
        List<OrdersTable> orders = ordersTableRepository.findAll();
        List<OrdersTable> uncompletedOrders = new ArrayList<OrdersTable>();
        orders.forEach((OrdersTable item) -> {
            if (item.getOrderStatus() == 0 || item.getOrderStatus() == 1) {
                uncompletedOrders.add(item);
            } 
        });

        return uncompletedOrders;
    }

    @GetMapping("/getTotalUncompletedOrdersCount")
    public @ResponseBody Integer getTotalUncompletedOrdersCount(){
        List<OrdersTable> orders = ordersTableRepository.findAll();
        List<OrdersTable> uncompletedOrders = new ArrayList<OrdersTable>();
        orders.forEach((OrdersTable item) -> {
            if (item.getOrderStatus() == 0 || item.getOrderStatus() == 1) {
                uncompletedOrders.add(item);
            } 
        });

        return uncompletedOrders.size();
    }

    @GetMapping("/emailStudent/{orderID}")
    public @ResponseBody String emailStudentAboutOrder(@PathVariable(value="orderID") Long orderID){
        OrdersTable order = ordersTableRepository.findByOrderID(orderID);
        String email = order.getEmail();
        SendEmail Email = new SendEmail();
        String subject = "BCP & Resource Center Order Delayed";
        String body = "Hello, \n\nThank you again for utilizing the BCP & Resource Center. We are currently facing difficulties fulfilling your order and there might be a delay. Our volunteers will be emailing you shortly with more information.\n\nIn the interim, please reach out to BearcatsPantry@ucmail.uc.edu with any questions or concerns. Thank you for your patience. \n\n - BCP & Resource Center Team";
        Email.SendEmail(email, subject, body);

        return "Success";
    }

    @GetMapping("/getVisitorsData")
    public @ResponseBody List<Integer> getVisitorData(){
        List<OrdersTable> orders = ordersTableRepository.findAll();
        Integer currentYear = Calendar.getInstance().get(Calendar.YEAR);
        Integer JanCount = 0;Integer FebCount = 0;Integer MarCount = 0;
        Integer AprCount = 0;Integer MayCount = 0;Integer JunCount = 0;
        Integer JulCount = 0;Integer AugCount = 0;Integer SepCount = 0;
        Integer OctCount = 0;Integer NovCount = 0;Integer DecCount = 0;

        for (OrdersTable order : orders) {
            String orderDate = (order.getOrderDate()).toString();
            Integer orderYear = Integer.parseInt(orderDate.split("-")[0]);
            Integer orderMonth = Integer.parseInt(orderDate.split("-")[1]);
            if (orderYear.intValue() == currentYear.intValue()) {
                if      (orderMonth == 1) { JanCount++; }
                else if (orderMonth == 2) { FebCount++; }
                else if (orderMonth == 3) { MarCount++; }
                else if (orderMonth == 4) { AprCount++; }
                else if (orderMonth == 5) { MayCount++; }
                else if (orderMonth == 6) { JunCount++; }
                else if (orderMonth == 7) { JulCount++; }
                else if (orderMonth == 8) { AugCount++; }
                else if (orderMonth == 9) { SepCount++; }
                else if (orderMonth == 10) { OctCount++; }
                else if (orderMonth == 11) { NovCount++; }
                else if (orderMonth == 12) { DecCount++; }
            }
        };

        List<Integer> visitorMonths = new ArrayList<Integer>();
        visitorMonths.add(JanCount); visitorMonths.add(FebCount);
        visitorMonths.add(MarCount); visitorMonths.add(AprCount);
        visitorMonths.add(MayCount); visitorMonths.add(JunCount);
        visitorMonths.add(JulCount); visitorMonths.add(AugCount);
        visitorMonths.add(SepCount); visitorMonths.add(OctCount);
        visitorMonths.add(NovCount); visitorMonths.add(DecCount);

        return visitorMonths;
    }
}
