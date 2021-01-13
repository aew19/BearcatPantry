package com.bcpstockerapp.bcp.controller;

import com.bcpstockerapp.bcp.model.UsersTable;
import com.bcpstockerapp.bcp.repository.UsersTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@Controller
public class UsersTableController {
    @Autowired
    private UsersTableRepository usersTableRepository;

    @GetMapping("/users")
    public @ResponseBody
    List<UsersTable> getAllUsers(){
        return usersTableRepository.findAll();
    }
    @PostMapping("/users")
    public @ResponseBody  String createUser (@RequestParam Long id, String name, int permissions, boolean isActive, Date dateActive) {
        UsersTable user = new UsersTable();
        user.setId(id);
        user.setName(name);
        user.setPermissions(permissions);
        user.setIsActive(isActive);
        user.setDateActive(dateActive);
        usersTableRepository.save(user);
        return "Saved";
    }
}
