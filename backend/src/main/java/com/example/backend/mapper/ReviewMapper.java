package com.example.backend.mapper;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "author.name", target="authorName")
    @Mapping(source = "author.profilePic", target="authorProfilePic")
    @Mapping(source = "reviewedUser.id", target="reviewedUserId")
    @Mapping(source = "author.id", target="authorId")
    ReviewDTO mapToDto(Review review);
    @Mapping(source = "reviewedUserId", target="reviewedUser.id")
    @Mapping(source = "authorId", target="author.id")
    Review mapToEntity(ReviewDTO reviewDTO);
    List<ReviewDTO> mapToDto(List<Review> reviews);
}
