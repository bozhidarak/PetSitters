package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    @NotBlank(message = "Password shouldn't be blank")
    private String password;
    @NotBlank(message = "Email shouldn't be blank")
    private String email;
    private String location;
    private String profilePic;
    @NotBlank(message = "The name of the user shouldn't be blank")
    private String name;

    public UserDTO(Long id, String password, String email, String location, String profilePic, String name) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.location = location;
        this.profilePic = profilePic;
        this.name = name;
  }
}
