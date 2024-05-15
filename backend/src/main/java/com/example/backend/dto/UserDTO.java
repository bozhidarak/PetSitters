package com.example.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long ID;
    private String username;
    private String email;
    private String location;
    private Date birthDate;
    private Boolean gender; // ili Boolean
    private String profilePic;
    private String name;

    public UserDTO(Long ID, String username, String email, String location, Date birthDate, Boolean gender, String profilePic, String name) {
        this.username = username;
        this.email = email;
        this.location = location;
        this.birthDate = birthDate;
        this.gender = gender;
        this.profilePic = profilePic;
        this.name = name;
    }
}
