package com.example.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String location;
    private Date birthDate;
    private Boolean gender; // ili Boolean
    private String profilePic;
    private String name;

    public UserDTO(Long id, String username,String password, String email, String location, Date birthDate, Boolean gender, String profilePic, String name) {
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
