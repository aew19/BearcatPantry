package com.bcpstockerapp.bcp;


import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BcpController {
    @GetMapping(value="/")
    public String hello(){
        return "Hello World!";
    }
    
}
