package com.bcpstockerapp.bcp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class BcpApplication extends SpringBootServletInitializer{

    public static void main(String[] args) {
        SpringApplication.run(BcpApplication.class, args);
    }

}
