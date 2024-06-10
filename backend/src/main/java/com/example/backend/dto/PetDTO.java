package com.example.backend.dto;

import com.example.backend.enums.PetType;
import lombok.Data;

@Data
public class PetDTO {
    private Long id;
    private PetType petType;
    private Integer numberOfPets;
    private Long sitterOfferId;
    private Long ownerOfferId;

    public PetDTO(Long id,Long sitterOfferId, Long ownerOfferId, PetType petType, Integer numberOfPets) {
        this.id = id;
        this.sitterOfferId = sitterOfferId;
        this.ownerOfferId = ownerOfferId;
        this.petType = petType;
        this.numberOfPets = numberOfPets;
    }
}
