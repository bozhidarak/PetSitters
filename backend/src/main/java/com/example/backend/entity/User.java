package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

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
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private PetSitterOffer petSitterOffer;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PetOwnerOffer> petOwnerOffers;
    @OneToMany(mappedBy = "reviewedUser", cascade = CascadeType.ALL)
    private List<Review> reviewsForUser;

    public User() {
    }
}
