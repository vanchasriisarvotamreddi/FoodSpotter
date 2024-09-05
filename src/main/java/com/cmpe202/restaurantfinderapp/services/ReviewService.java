package com.cmpe202.restaurantfinderapp.services;


import com.cmpe202.restaurantfinderapp.dto.Review;
import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.model.ReviewDTO;
import com.cmpe202.restaurantfinderapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.OptionalDouble;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class ReviewService {
    @Autowired
    RestaurantService restaurantService;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    public void createReview(Review reviewObj, String restaurantId) {

        ReviewDTO reviewDTO = convertToReviewDTO(reviewObj);
        ReviewDTO reviewDTOUpdated = reviewRepository.save(reviewDTO);

        Restaurant restaurantById = restaurantService.getRestaurantById(restaurantId);
        restaurantById.getReviews().add(reviewDTOUpdated);
        List<ReviewDTO> reviews = restaurantById.getReviews();
        OptionalDouble average = reviews.stream()
                .mapToInt(ReviewDTO::getRating)
                .average();
        // Round average to 1 decimal place
        double roundedAverage = average.isPresent()
                ? Math.round(average.getAsDouble() * 10.0) / 10.0
                : 0.0;

        restaurantById.setAverageRating(roundedAverage);
        mongoTemplate.save(restaurantById);
    }

    private ReviewDTO convertToReviewDTO(Review review){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setUsername(review.getUserId());
        reviewDTO.setRating(review.getRating());
        reviewDTO.setComment(review.getComment());
        return reviewDTO;
    }
}
