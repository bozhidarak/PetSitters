package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
@Data
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String location;
    private Date birthDate;
    private Boolean gender;
    private String profilePic;
    private String name;

    public UserEntity(Long id, String username, String password, String email, String location, Date birthDate, Boolean gender, String profilePic, String name) {
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

    public UserEntity() {
    }
}
