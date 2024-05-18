package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PetOwnerOfferDTO {
    private Long id;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long userId;
}