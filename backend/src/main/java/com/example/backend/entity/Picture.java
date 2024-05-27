package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filepath;
    @ManyToOne
    @JoinColumn(name = "sitter_offer_id")
    private PetSitterOfferEntity petSitterOffer;
    @ManyToOne
    @JoinColumn(name = "owner_offer_id")
    private PetOwnerOffer petOwnerOffer;
    public Picture(){}
}
