package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    @NotBlank(message = "Username shouldn't be blank")
    private String username;
    @NotBlank(message = "Password shouldn't be blank")
    private String password;
    @NotBlank(message = "Email shouldn't be blank")
    private String email;
    private String location;
    @NotNull(message = "Birth date shouldn't be null")
    private Date birthDate;
    @NotNull(message = "Gender shouldn't be null") // not sure if needed because boolean cant be null
    private boolean gender;
    private String profilePic;
    @NotBlank(message = "The name of the user shouldn't be blank")
    private String name;

    public UserDTO(Long id, String username, String password, String email, String location, Date birthDate, boolean gender, String profilePic, String name) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.location = location;
        this.birthDate = birthDate;
        this.gender = gender;
        this.profilePic = profilePic;
        this.name = name;
  }
}
