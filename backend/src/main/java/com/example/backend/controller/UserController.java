package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getByID(@PathVariable Long id){
        UserDTO userDTO = userService.getByID(id);
     return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> editUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        userDTO.setId(id);
        return ResponseEntity.ok(userService.editUser(userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){ // ? - wildcard
        userService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted");
    }

}
