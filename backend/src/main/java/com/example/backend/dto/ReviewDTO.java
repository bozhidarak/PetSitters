package com.example.backend.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Integer stars;
    private String description;
    private Long reviewedUserId;
    private Long authorId;
}
