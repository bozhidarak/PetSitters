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
    private PetSitterOffer petSitterOffer;
    @ManyToOne
    @JoinColumn(name = "owner_offer_id")
    private PetOwnerOffer petOwnerOffer;
    public Picture(){}

    @Override
    public String toString() {
        return "Picture{" +
                "id=" + id +
                ", filepath='" + filepath + '\'' +
                ", petSitterOfferId=" + (petSitterOffer != null ? petSitterOffer.getOfferId() : null) +
                ", petOwnerOfferId=" + (petOwnerOffer != null ? petOwnerOffer.getId() : null) +
                '}';
    }
}
