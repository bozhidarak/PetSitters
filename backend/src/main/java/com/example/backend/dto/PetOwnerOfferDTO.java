package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PetOwnerOfferDTO {
    private Long id;
    @NotBlank(message = "description of PetOwnerOffer cannot be blank")
    private String description;
    @NotBlank(message = "Location of PetOwnerOffer cannot be blank")
    private String location;
    @NotNull(message = "Start date of PetOwnerOffer is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @NotNull(message = "End date of PetOwnerOffer is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    @NotNull(message = "User ID of PetOwnerOffer is required")
    private Long userId;
    private List<String> picturePaths;
    private List<PetDTO> pets;

    private String userName;
    private String userEmail;
    private String userProfilePic;
}