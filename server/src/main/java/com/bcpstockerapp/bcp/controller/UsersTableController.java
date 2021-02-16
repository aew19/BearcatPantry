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
    public @ResponseBody ResponseEntity<List<UsersTable>> getAllUsers(){
        try{
            return new ResponseEntity<>(usersTableRepository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users")
    public @ResponseBody ResponseEntity<String> createUser (@RequestParam String mNumber, String fname, String lname, Integer permissions, boolean isActive) {
        try{
            UsersTable user = new UsersTable();
            user.setmNumber(mNumber);
            user.setFname(fname);
            user.setLname(lname);
            user.setPermissions(permissions);
            user.setIsActive(isActive);
            user.setDateActive(new Date());
            usersTableRepository.save(user);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateUsers/{id}")
    public @ResponseBody ResponseEntity<String> updateUser(@PathVariable(value="id") Long id, @RequestParam Integer permission, String mNumber, boolean isActive, String fname, String lname) {
        try{
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
            return new ResponseEntity<>("Successful", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/deleteUser/{id}")
    public @ResponseBody ResponseEntity<String> deleteUser(@PathVariable(value ="id") Long id){
        try{
            usersTableRepository.deleteById(id);
            return new ResponseEntity<>("Success", HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>("Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Statistic Endpoint
    @GetMapping("/getTotalUsers")
    public @ResponseBody ResponseEntity<Integer> getTotalUsers(){
        try{
            List<UsersTable> users = usersTableRepository.findAll();
            return new ResponseEntity<>(users.size(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
