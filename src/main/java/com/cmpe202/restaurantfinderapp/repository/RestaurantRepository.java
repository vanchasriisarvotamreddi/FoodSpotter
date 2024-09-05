package com.cmpe202.restaurantfinderapp.repository;

import com.cmpe202.restaurantfinderapp.model.Restaurant;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, ObjectId> {

//    RestaurantDTO findRestaurantDTOByOwnerId(String ownerId);
//    RestaurantDTO findRestaurantDTOSByRestaurantId(ObjectId id);
//    List<RestaurantDTO> findRestaurantDTOSByNameAndCategoriesAndZipCodeAndCuisineAndPriceRangeAndAverageRating(String name, List<String> categories, String zipCode, List<String> cuisine, String priceRange, Integer averageRating);
}
