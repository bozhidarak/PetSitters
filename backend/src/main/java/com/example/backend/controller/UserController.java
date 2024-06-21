package com.example.backend.controller;

import com.amazonaws.services.iot.model.ResourceAlreadyExistsException;
import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
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

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestPart(required = false) MultipartFile profilePic,
                                              @RequestPart @Valid UserDTO userDTO)
    {
        try{
            return ResponseEntity.ok(userService.createUser(userDTO, profilePic));
        } catch (ResourceAlreadyExistsException e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody Map<String, String> loginRequest){
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        try {
            return ResponseEntity.ok(userService.login(email, password));
        }
        catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.ok().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> editUser(@PathVariable Long id,@Valid @RequestBody UserDTO userDTO){
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
