package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.UsersTable;
import com.bcpstockerapp.bcp.repository.UsersTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
public class UsersTableController {
    @Autowired
    private UsersTableRepository usersTableRepository;

    @GetMapping("/users")
    public @ResponseBody
    List<UsersTable> getAllUsers(){
        return usersTableRepository.findAll();
    }

    @PostMapping("/users")
    public @ResponseBody String createUser (@RequestParam String mNumber, String fname, String lname, Integer permissions, boolean isActive) {
        UsersTable user = new UsersTable();
        user.setmNumber(mNumber);
        user.setFname(fname);
        user.setLname(lname);
        user.setPermissions(permissions);
        user.setIsActive(isActive);
        user.setDateActive(new Date());
        usersTableRepository.save(user);
        return "Saved";
    }
    @PutMapping("/updateUsers/{id}")
    public @ResponseBody String updateUser(@PathVariable(value="id") Long id, @RequestParam Integer permission, String mNumber, boolean isActive, String fname, String lname) {
        UsersTable user = usersTableRepository.findByid(id);
        if (permission != null) {
            user.setPermissions(permission);
        }
        if (lname != null) {
            user.setLname(lname);
        }
        if (fname != null) {
            user.setFname(fname);
        }
        if (mNumber != null) {
            user.setmNumber(mNumber);
        }
        user.setIsActive(isActive);
        usersTableRepository.save(user);
        return "Success!";
    }
    @DeleteMapping("/deleteUser/{id}")
    public @ResponseBody String deleteUser(@PathVariable(value ="id") Long id){
        usersTableRepository.deleteById(id);
        return "Success";

    }

    //Statistic Endpoint
    @GetMapping("/getTotalUsers")
    public @ResponseBody Integer getTotalUsers(){
        List<UsersTable> users = usersTableRepository.findAll();
        return users.size();
    }
}
