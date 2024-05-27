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
    private PetType petType;
    private Integer numberOfPets;

    // 1-to-many for owner offer
    // 1-to-many for sitter offer
}
