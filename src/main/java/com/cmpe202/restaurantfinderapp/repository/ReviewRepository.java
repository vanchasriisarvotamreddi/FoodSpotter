package com.cmpe202.restaurantfinderapp.repository;

import com.cmpe202.restaurantfinderapp.model.ReviewDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<ReviewDTO,ObjectId> {
    List<ReviewDTO> findReviewDTOById(String restaurantId);

//    Review insert(Review reviewObj);
}



