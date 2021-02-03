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
    public @ResponseBody String createUser (@RequestParam String mNumber, String fname, String lname, Integer permissions, boolean isActive, Date dateActive) {
        UsersTable user = new UsersTable();
        user.setmNumber(mNumber);
        user.setFname(fname);
        user.setLname(lname);
        user.setPermissions(permissions);
        user.setIsActive(isActive);
        user.setDateActive(dateActive);
        usersTableRepository.save(user);
        return "Saved";
    }
    @PutMapping("/updateUsers/{mNumber}")
    public @ResponseBody String updateUser(@PathVariable(value="mNumber") String mNumber, @RequestParam Integer permission, boolean isActive, String fname, String lname) {
        UsersTable user = usersTableRepository.findBymNumber(mNumber);
        if (permission != null) {
            user.setPermissions(permission);
        }
        if (lname != null) {
            user.setLname(lname);
        }
        if (fname != null) {
            user.setFname(fname);
        }
        //Because is active won't be null coming in
        user.setIsActive(isActive);
        return "Success!";
    }
    @DeleteMapping("/deleteUser/{id}")
    public @ResponseBody String deleteUser(@PathVariable(value ="id") Long id){
        usersTableRepository.deleteById(id);
        return "Success";

    }
}
