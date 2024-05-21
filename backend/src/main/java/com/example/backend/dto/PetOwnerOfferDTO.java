package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PetOwnerOfferDTO {
    private Long id;
    @NotBlank(message = "Location of PetOwnerOffer cannot be blank")
    private String location;
    @NotNull(message = "Start date of PetOwnerOffer is required")
    private LocalDate startDate;
    @NotNull(message = "End date of PetOwnerOffer is required")
    private LocalDate endDate;
    @NotNull(message = "User ID of PetOwnerOffer is required")
    private Long userId;
}