package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="pet_sitter_offer")
public class PetSitterOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long offerId;
    private String description;
    private Double pricePerDay;
    private Date availableFrom;
    private Date availableUntil;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "petSitterOffer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Picture> pictures;
    @OneToMany(mappedBy = "petSitterOffer", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Pet> pets;

    public PetSitterOffer() {
    }

}
