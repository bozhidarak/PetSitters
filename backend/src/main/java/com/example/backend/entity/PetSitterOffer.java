package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return this.getOfferId().equals(user.getId()); // Compare only the ID for equality
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.getOfferId()); // Use only ID for hash code
    }
}
