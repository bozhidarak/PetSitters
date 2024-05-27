package com.example.backend.dto;

import com.example.backend.enums.PetType;
import lombok.Data;

@Data
public class PetDTO {
    private Long id;
    private PetType petType;
    private Integer numberOfPets;

    public PetDTO(Long id, PetType petType, Integer numberOfPets) {
        this.id = id;
        this.petType = petType;
        this.numberOfPets = numberOfPets;
    }
}
