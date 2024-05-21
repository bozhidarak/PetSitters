package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;

@Data
public class ReviewDTO {
    @NotNull(message = "Stars of Review are required")
    @Min(value = 1, message = "Stars of Review must be min 1")
    @Max(value = 5, message = "Stars of Review must be max 5")
    private Integer stars;
    private String description;
    @NotNull(message = "The ID of Reviewed User is required")
    private Long reviewedUserId;
    @NotNull(message = "The ID of Review Author is required")
    private Long authorId;
}
