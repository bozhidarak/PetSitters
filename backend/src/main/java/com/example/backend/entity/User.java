package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="users") //fix to user?
public class User {

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
    public User() {
    }
}
