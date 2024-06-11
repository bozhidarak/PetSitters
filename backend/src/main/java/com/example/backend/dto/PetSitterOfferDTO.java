package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PetSitterOfferDTO {
    private Long offerId;
    @NotBlank(message = "The description of pet sitter offer shouldn't be blank")
    private String description;
    @NotNull(message = "The price of the pet sitter offer shouldn't be null")
    private Double pricePerDay;
    @NotNull(message = "The date from which the pet sitter is available shouldn't be null")
    private Date availableFrom;
    @NotNull(message = "The date until the pet sitter is available shouldn't be null")
    private Date availableUntil;
    @NotNull(message = "The id of the user that the offer belongs to shouldn't be null")
    private Long userId; //1to1 relationship;

    private List<String> picturePaths;
    private List<PetDTO> pets;

    public PetSitterOfferDTO() {
    }

}
