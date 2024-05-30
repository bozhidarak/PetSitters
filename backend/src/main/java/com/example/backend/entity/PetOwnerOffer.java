package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name="pet_owner_offer")
public class PetOwnerOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @OneToMany(mappedBy = "petOwnerOffer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Picture> pictures;
    @OneToMany(mappedBy = "petOwnerOffer", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Pet> pets;

    public PetOwnerOffer(){}
}