package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Data
@Entity
@Table(name="users")
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

    @OneToOne(mappedBy = "user")
    private PetSitterOfferEntity offer;

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
