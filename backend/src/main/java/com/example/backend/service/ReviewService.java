package com.example.backend.service;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import com.example.backend.entity.User;
import com.example.backend.mapper.ReviewMapper;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;
    @Autowired
    public ReviewService(ReviewRepository reviewRepository,
                         UserRepository userRepository, ReviewMapper reviewMapper)
    {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.reviewMapper = reviewMapper;
    }

    public ReviewDTO getById(Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if(review == null) {
            throw new ResourceNotFoundException("No review with id: " + id);
        }
        return reviewMapper.mapToDto(review);
    }

    public List<ReviewDTO> getAllReviewsForUser(Long userId) {
        return reviewRepository.findByReviewedUserId(userId)
                .stream()
                .map(reviewMapper::mapToDto)
                .toList();
    }

    public List<ReviewDTO> getAllByStars(Integer stars) {
        return reviewRepository.findByStars(stars)
                .stream()
                .map(reviewMapper::mapToDto)
                .toList();
    }

    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Review newReview = reviewMapper.mapToEntity(reviewDTO);
        linkReviewToUsers(newReview, reviewDTO.getReviewedUserId(), reviewDTO.getAuthorId());
        Review savedReview = reviewRepository.save(newReview);
        return reviewMapper.mapToDto(savedReview);
    }

    public ReviewDTO updateReview(Long reviewId, ReviewDTO reviewDTO) {
        Review currentReview = reviewRepository.findById(reviewId).orElse(null);
        if(currentReview == null){
            throw new ResourceNotFoundException("Review for update not found");
        }
        validateReviewUsersIds(currentReview, reviewDTO);
        Review updatedReview = reviewRepository.save(reviewMapper.mapToEntity(reviewDTO));
        return reviewMapper.mapToDto(updatedReview);
    }

    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

    private void linkReviewToUsers(Review review, Long reviewedUserId, Long authorId) {
        User reviewedUser = findUser(reviewedUserId);
        review.setReviewedUser(reviewedUser);

        User reviewAuthor = findUser(authorId);
        review.setAuthor(reviewAuthor);
    }

    private User findUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            throw new ResourceNotFoundException("No user with id: " + userId);
        }
        return user;
    }

    private void validateReviewUsersIds(Review currentReview, ReviewDTO reviewDTO) {
        if (reviewDTO.getReviewedUserId() != null &&
            currentReview.getReviewedUser().getId().equals(reviewDTO.getReviewedUserId()))
        {
            throw new InvalidParameterException("Cannot alter reviewed user's id of Review");
        }
        if (reviewDTO.getAuthorId() != null &&
            currentReview.getAuthor().getId().equals(reviewDTO.getAuthorId()))
        {
            throw new InvalidParameterException("Cannot alter author's id of Review");
        }
    }
}
