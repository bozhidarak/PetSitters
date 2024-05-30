package com.example.backend.mapper;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "reviewedUser.id", target="reviewedUserId")
    @Mapping(source = "author.id", target="authorId")
    ReviewDTO mapToDto(Review review);
    Review mapToEntity(ReviewDTO reviewDTO);
    List<ReviewDTO> mapToDto(List<Review> reviews);
}
