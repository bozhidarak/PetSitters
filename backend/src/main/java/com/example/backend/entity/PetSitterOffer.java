package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@Table(name="pet_sitter_offer")
public class PetSitterOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offerId;
    private String description;
    private Double pricePerDay;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date availableFrom;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date availableUntil;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "petSitterOffer", orphanRemoval = true)
    private List<Picture> pictures = new ArrayList<>(); // if getPets is called the list needs to be at least initialized
    @OneToMany(mappedBy = "petSitterOffer", orphanRemoval = true)
    private List<Pet> pets = new ArrayList<>();

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

    @Override
    public String toString() {
        return "PetSitterOffer{" +
                "offerId=" + offerId +
                ", description='" + description + '\'' +
                ", pricePerDay=" + pricePerDay +
                ", availableFrom=" + availableFrom +
                ", availableUntil=" + availableUntil +
                ", userId=" + (user != null ? user.getId() : null) +
                ", picturesCount=" + (pictures != null ? pictures.size() : 0) +
                ", petsCount=" + (pets != null ? pets.size() : 0) +
                '}';
    }
}
