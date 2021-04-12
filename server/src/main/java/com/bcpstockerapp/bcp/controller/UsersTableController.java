package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.UsersTable;
import com.bcpstockerapp.bcp.repository.UsersTableRepository;
import com.bcpstockerapp.bcp.gmail.api.SendEmail;
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
    public @ResponseBody List<UsersTable> getAllUsers(){
        return usersTableRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public @ResponseBody UsersTable getByID(@PathVariable(value="id") Long id){
        UsersTable user = usersTableRepository.findByid(id);
        return user;
    }

    @PostMapping("/users")
    public @ResponseBody String createUser (@RequestParam String mNumber, String fname, String lname, Integer permissions, boolean isActive, String email) {
        UsersTable user = new UsersTable();
        user.setmNumber(mNumber);
        user.setFname(fname);
        user.setLname(lname);
        user.setEmail(email);
        user.setPermissions(permissions);
        user.setIsActive(isActive);
        user.setDateActive(new Date());
        usersTableRepository.save(user);

//        SendEmail Email = new SendEmail();
//        String subject = "BCP & Resource Center Account Activated";
//        String body = "Hello " + fname + ", \n\nWe would like to thank you for volunteering with the BCP &own Resource Center. Your volunteer account has been successfully created. Your username is your 6+2 UC account, and you can test your connection anytime by going to:\n\nhttps://bearcatspantry.uc.edu \n\nYou must complete the Stocker Application training before you are able to begin your volunteer service.\n\nThank you for serving students! \n\n - BCP & Resource Center Team\n\nPlease reach out to BearcatsPantry@ucmail.uc.edu with any questions.";
//        Email.SendEmail(email, subject, body);
        
        return "Success";
    }

    @PutMapping("/updateUsers/{id}")
    public @ResponseBody String updateUser(@PathVariable(value="id") Long id, @RequestParam Integer permission, String mNumber, boolean isActive, String fname, String lname, String email) {
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
        if (email != null) {
            user.setEmail(email);
        }
        user.setIsActive(isActive);
        usersTableRepository.save(user);

//        SendEmail Email = new SendEmail();
//        String subject = "BCP & Resource Center Account Activated";
//        String body = "Hello " + fname + ", \n\nWe would like to thank you for volunteering with the BCP & Resource Center. Your volunteer account has been successfully created. Your username is connected to your UC account, and you can test your connection anytime by going to:\n\nhttps://bearcatspantry.uc.edu\n\nWe ask that you please do not alter any of the pantry settings before you receive the Stocker Application training.\n\nThank you for serving students! \n\n - BCP & Resource Center Team\n\nPlease reach out to BearcatsPantry@ucmail.uc.edu with any questions.";
//        Email.SendEmail(email, subject, body);
        
        ShibbolethController shibTest = new ShibbolethController();
        shibTest.getHVTest();
        return "Successful";
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
