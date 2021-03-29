package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.ShibbolethData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.List;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class ShibbolethController {
    @Autowired
    private HttpServletRequest request;

    public static void ShibbolethController() {
        
    }

    @GetMapping("/mail")
    public @ResponseBody String getAllHeaders(){
        String mail = request.getHeader("mail");
        System.out.println(mail);
        return mail;
    }

    @GetMapping("/shibtest")
    public @ResponseBody Map getRequestHeaderValues() {
        Map map = new HashMap();
                // get header values from request object
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
            System.out.println(key + " - " + value);
        }
        
        return map;
    }

    public Map getHVTest() {
        Map map = new HashMap();
                // get header values from request object
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
            System.out.println(key + " - " + value);
        }
        
        return map;
    }
}
