package com.cmpe202.restaurantfinderapp.controller;


import com.cmpe202.restaurantfinderapp.dto.Review;
import com.cmpe202.restaurantfinderapp.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")

@RestController
@RequestMapping("/review")  //users
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<String> createReview(
            @Valid @RequestBody Review review,
            @RequestParam String restaurantId) {

        if (restaurantId == null || restaurantId.isBlank()) {
            return ResponseEntity.badRequest().body("restaurantId is required.");
        }

        reviewService.createReview(review, restaurantId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully.");
    }
}
