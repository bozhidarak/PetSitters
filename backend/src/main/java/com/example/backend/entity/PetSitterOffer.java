package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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

@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //1to1 relationship;

    // 1 to many with Picture
    //1 to many with Pet

    public PetSitterOffer() {
    }

}