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

@CrossOrigin
@RestController
public class ShibbolethController {
    @Autowired
    private HttpServletRequest request;

    @GetMapping("/mail")
    public @ResponseBody String getAllHeaders(){
        String mail = request.getHeader("mail");
        System.out.println(mail);
        return mail;
    }
}
