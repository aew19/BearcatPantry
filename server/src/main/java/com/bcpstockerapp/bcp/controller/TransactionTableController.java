package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.TransactionTable;
import com.bcpstockerapp.bcp.repository.TransactionRepository;
import com.bcpstockerapp.bcp.model.transactionProdJoin;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Calendar;

@CrossOrigin
@RestController
public class TransactionTableController {

    @Autowired
    private TransactionRepository transactionRepository;

    // mapping to create transaction.
    // please see TransactionTable model to understand the itemIn flag. 
    @PostMapping("/transaction")
    public @ResponseBody String createTransaction(@RequestParam String _barcodeId, Integer _quantity, Boolean _isItemIn){
        TransactionTable tran = new TransactionTable();
        tran.setItemsIn(_isItemIn);
        tran.setBarcodeId(_barcodeId);
        tran.setQuantity(_quantity);
        LocalDate today = LocalDate.now();
        tran.setDate(today);
        transactionRepository.save(tran);
        
        return "Saved!";
    }

    @RequestMapping(value = "/transactionQuery", method = RequestMethod.POST)
    public @ResponseBody List<transactionProdJoin> getTransactions(@RequestParam String fromDate, String toDate, String prodType, boolean itemsIn){
        // create other query in repository -> items in date range as transProdJoin object though
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fromDay = LocalDate.parse(fromDate, dtf);
        LocalDate toDay = LocalDate.parse(toDate, dtf);

        List<transactionProdJoin> mainList = transactionRepository.dateRangeJoin(fromDay, toDay);
        List<transactionProdJoin> retList = new ArrayList<transactionProdJoin>();

        for (transactionProdJoin elem: mainList){
            if((prodType.equals("All") || elem.getProductType().equals(prodType)) && elem.getItemsIn()==itemsIn){
                retList.add(elem);;
            }
        }

        return retList;
    }
}