package com.example.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PetSitterOfferDTO {
    private Long offerId;
    private String description;
    private Double pricePerDay;
    private Date availableFrom;
    private Date availableUntil;
    private Long userId; //1to1 relationship;

    public PetSitterOfferDTO() {
    }

    public PetSitterOfferDTO(Long offerId, String description, Double pricePerDay, Date availableFrom, Date availableUntil, Long userId) {
        this.offerId = offerId;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
        this.userId = userId;
    }
}
