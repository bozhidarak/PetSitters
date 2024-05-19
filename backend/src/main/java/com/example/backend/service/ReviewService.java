package com.example.backend.service;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import com.example.backend.entity.UserEntity;
import com.example.backend.mapper.ReviewMapper;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.repository.UserRepository;
import com.sun.jdi.request.InvalidRequestStateException;
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
        return reviewRepository.findByUserId(userId)
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
            return createReview(reviewDTO);
        }
        validateReviewUsersIds(currentReview, reviewDTO);
        Review updatedReview = reviewRepository.save(reviewMapper.mapToEntity(reviewDTO));
        return reviewMapper.mapToDto(updatedReview);
    }

    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

    private void linkReviewToUsers(Review review, Long reviewedUserId, Long authorId) {
        UserEntity reviewedUser = findUser(reviewedUserId);
        review.setReviewedUser(reviewedUser);

        UserEntity reviewAuthor = findUser(authorId);
        review.setAuthor(reviewAuthor);
    }

    private UserEntity findUser(Long userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            throw new ResourceNotFoundException("No user with id: " + userId);
        }
        return user;
    }

    private void validateReviewUsersIds(Review currentReview, ReviewDTO reviewDTO) {
        if(currentReview.getReviewedUser().getId() != reviewDTO.getReviewedUserId()) {
            throw new InvalidParameterException("Cannot alter reviewed user's id of Review");
        }
        if(currentReview.getAuthor().getId() != reviewDTO.getAuthorId()) {
            throw new InvalidParameterException("Cannot alter author's id of Review");
        }
    }
}
