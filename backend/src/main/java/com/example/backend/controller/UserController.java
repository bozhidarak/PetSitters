package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.service.UserService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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
        try{
        UserDTO userDTO = userService.getByID(id);
     return ResponseEntity.ok(userDTO);
        }
        catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> editUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
          userDTO.setId(id);
          try {
              return ResponseEntity.ok(userService.editUser(userDTO));
          }
          catch (ResourceNotFoundException e){
              System.out.println(e.getMessage());
              return ResponseEntity.notFound().build();
          }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){ // ? - wildcard
        try{
        userService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted");
        }
        catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }

    }

}
