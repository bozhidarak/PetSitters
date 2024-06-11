package com.example.backend.entity;

import com.example.backend.enums.PetType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private PetType petType;
    private Integer numberOfPets;
    @ManyToOne
    @JoinColumn(name = "sitter_offer_id")
    private PetSitterOffer petSitterOffer;
    @ManyToOne
    @JoinColumn(name = "owner_offer_id")
    private PetOwnerOffer petOwnerOffer;

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", petType=" + petType +
                ", numberOfPets=" + numberOfPets +
                ", petSitterOfferId=" + (petSitterOffer != null ? petSitterOffer.getOfferId() : null) +
                ", petOwnerOfferId=" + (petOwnerOffer != null ? petOwnerOffer.getId() : null) +
                '}';
    }
}
