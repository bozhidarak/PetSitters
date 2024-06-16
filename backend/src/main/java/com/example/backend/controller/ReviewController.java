package com.example.backend.controller;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        try{
            ReviewDTO reviewDTO = reviewService.getById(id);
            return new ResponseEntity<>(reviewDTO, HttpStatus.OK);
        }
        catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getAllReviewsForUser(@PathVariable Long userId) {
        return new ResponseEntity<>(reviewService.getAllReviewsForUser(userId), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getReviewsByStars(@RequestParam Long userId,
                                                             @RequestParam Integer stars) {
        if(stars == null || userId == null || stars < 1 || stars > 5) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        try {
            return new ResponseEntity<>(reviewService.getAllByStarsForUser(userId, stars), HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewDTO newReviewDTO) {
        try {
            ReviewDTO savedReviewDto = reviewService.createReview(newReviewDTO);
            return new ResponseEntity<>(savedReviewDto, HttpStatus.CREATED);
        }
        catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(
            @PathVariable Long id, @Valid @RequestBody ReviewDTO reviewDTO) {
        try {
            ReviewDTO updatedReviewDto = reviewService.updateReview(id, reviewDTO);
            return new ResponseEntity<>(updatedReviewDto, HttpStatus.OK);
        }
        catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        catch (InvalidParameterException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<HttpStatus> deleteReviewById(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
