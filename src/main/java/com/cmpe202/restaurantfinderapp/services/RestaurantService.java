package com.cmpe202.restaurantfinderapp.services;

import com.cmpe202.restaurantfinderapp.authentication.model.ApplicationUser;
import com.cmpe202.restaurantfinderapp.dto.AddressDTO;
import com.cmpe202.restaurantfinderapp.dto.BusinessHoursDTO;
import com.cmpe202.restaurantfinderapp.dto.RestaurantDTO;
import com.cmpe202.restaurantfinderapp.model.Address;
import com.cmpe202.restaurantfinderapp.model.BusinessHours;
import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.repository.AddressRepository;
import com.cmpe202.restaurantfinderapp.repository.ApplicationUserRepository;
import com.cmpe202.restaurantfinderapp.repository.BusinessHoursRepository;
import com.cmpe202.restaurantfinderapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BusinessHoursRepository businessHoursRepository;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    //Adding a restaurant
    public Restaurant addRestaurant(Restaurant restaurant, String username) throws Exception {
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        if(user==null){
            throw new Exception("User not found");
        }
        restaurant.setOwnerId(user);
        return mongoTemplate.save(restaurant);
    }

    public void deleteRestaurant(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("restaurantId").is(id)); // Correct the field name here
        mongoTemplate.remove(query, Restaurant.class); // Remove the document matching the query
    }


    public Restaurant getRestaurantById(String id) {
        return mongoTemplate.findById(id, Restaurant.class);
    }
    public Restaurant updateRestaurant(String id, Restaurant updatedRestaurant) {
        Query query = new Query();
        query.addCriteria(Criteria.where("restaurantId").is(id));  // Ensure that the field is 'restaurantId'

        Update update = new Update();

        // Update the fields if the corresponding values are non-null
        if (updatedRestaurant.getName() != null) update.set("name", updatedRestaurant.getName());
        if (updatedRestaurant.getAddress() != null) update.set("address", updatedRestaurant.getAddress());
        if (updatedRestaurant.getDietary() != null) update.set("categories", updatedRestaurant.getDietary());
        if (updatedRestaurant.getCuisine() != null) update.set("cuisine", updatedRestaurant.getCuisine());
        if (updatedRestaurant.getPriceRange() != null) update.set("priceRange", updatedRestaurant.getPriceRange());
        if (updatedRestaurant.getHours() != null) update.set("hours", updatedRestaurant.getHours());
        if (updatedRestaurant.getPhotos() != null) update.set("photos", updatedRestaurant.getPhotos());
        if (updatedRestaurant.getDescription() != null) update.set("description", updatedRestaurant.getDescription());
        if (updatedRestaurant.getAverageRating() != null) update.set("averageRating", updatedRestaurant.getAverageRating());
        if (updatedRestaurant.getReviews() != null) update.set("reviews", updatedRestaurant.getReviews());

        // Perform the update and fetch the updated restaurant
        mongoTemplate.updateFirst(query, update, Restaurant.class);

        // Return the updated restaurant
        return mongoTemplate.findById(id, Restaurant.class);
    }
    public List<Restaurant> getRestaurantsByOwner(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("ownerId.username").is(username)); // Match by user's username
        return mongoTemplate.find(query, Restaurant.class);
    }


    //Retrieving all restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> getAllActiveRestaurants() {

        Criteria criteria = Criteria.where("closed").is(false);
        Query query = new Query();
        return mongoTemplate.find(query, Restaurant.class);
    }

    //Retrieving restaurant by ownerId
//    public RestaurantDTO getRestaurantByID(String ownerId) {
//        return restaurantRepository.findRestaurantDTOByOwnerId(ownerId);
//    }

    public List<Restaurant> searchRestaurants(String name, List<String> category, String zipCode, List<String> cuisine, String priceRange, Integer averageRating) {

        // Create the match criteria for restaurants
        List<AggregationOperation> operations = new ArrayList<>();

        // Join the Address collection
        operations.add(Aggregation.lookup("address", "address", "_id", "addressDetails"));

        // Unwind the joined Address details
        operations.add(Aggregation.unwind("addressDetails"));

        // Match Criteria for Restaurants
        Criteria criteria = Criteria.where("closed").is(false);

        // Add Criteria for Name (partial match, case-insensitive)
        if (name != null && !name.isEmpty()) {
            criteria.and("name").regex(name, "i"); // Case-insensitive regex
        }

        // Add Criteria for Category (e.g., Vegan, Vegetarian, Non-Veg)
        if (category != null && !category.isEmpty()) {
            criteria.and("categories").in(category);
        }

        // Add Criteria for Cuisine (e.g., Italian, Mexican, etc.)
        if (cuisine != null && !cuisine.isEmpty()) {
            criteria.and("cuisine").in(cuisine);
        }

        // Add Criteria for Price Range (e.g., low, medium, high)
        if (priceRange != null) {
            criteria.and("priceRange").is(priceRange);
        }

        // Add Criteria for Average Rating (e.g., 1, 2, 3, 4, 5)
        if (averageRating != null) {
            criteria.and("averageRating").gte(averageRating); // Greater than or equal to
        }

        // Match Criteria for ZipCode in Address
        if (zipCode != null && !zipCode.isEmpty()) {
            criteria.and("addressDetails.zip").is(zipCode);
        }

        operations.add(Aggregation.match(criteria));

        // Build the aggregation pipeline
        Aggregation aggregation = Aggregation.newAggregation(operations);

        // Execute the aggregation and return results
        return mongoTemplate.aggregate(aggregation, "restaurants", Restaurant.class).getMappedResults();
    }

    public String getRestaurantIdByCriteria(String name, String zipCode) {
        Query query = new Query();

        // Add criteria for matching restaurant name (case-insensitive)
        query.addCriteria(Criteria.where("name").regex(name, "i"));

        // Add criteria for matching zip code
        query.addCriteria(Criteria.where("zipCode").is(zipCode));


        // Fetch the restaurant
        Restaurant restaurant = mongoTemplate.findOne(query, Restaurant.class);

        // Return the _id if a restaurant is found, otherwise return null
        return restaurant != null ? restaurant.getRestaurantId() : null;
    }





    public Restaurant convertToRestaurantDTO(RestaurantDTO restaurantDTO) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantDTO.getName());
        restaurant.setAddress(getAddressFromDTO(restaurantDTO.getAddress()));
        restaurant.setDietary(restaurantDTO.getDietary());
        restaurant.setCuisine(restaurantDTO.getCuisine());
        restaurant.setPriceRange(restaurantDTO.getPriceRange());
        restaurant.setHours(getBusinessHoursFromDTO(restaurantDTO.getHours()));
        restaurant.setPhotos(restaurantDTO.getPhotos());
        restaurant.setDescription(restaurantDTO.getDescription());
        restaurant.setAverageRating(0.0);
        restaurant.setOwnerId(getApplicationUser(restaurantDTO.getOwnerId()));
        restaurant.setClosed(restaurantDTO.getClosed());
        return restaurant;
    }

//    public Restaurant convertToEditRestaurantDTO(RestaurantDTO restaurantDTO) {
//        Restaurant restaurant = new Restaurant();
//        restaurant.setName(restaurantDTO.getName());
//        restaurant.setAddress(getAddressFromDTO(restaurantDTO.getAddress()));
//        restaurant.setDietary(restaurantDTO.getDietary());
//        restaurant.setCuisine(restaurantDTO.getCuisine());
//        restaurant.setPriceRange(restaurantDTO.getPriceRange());
//        restaurant.setHours(getBusinessHoursFromDTO(restaurantDTO.getHours()));
//        restaurant.setPhotos(restaurantDTO.getPhotos());
//        restaurant.setDescription(restaurantDTO.getDescription());
//        restaurant.setAverageRating(0.0);
//        restaurant.setOwnerId(getApplicationUser(restaurantDTO.getOwnerId()));
//        return restaurant;
//    }


    public ApplicationUser getApplicationUser(String ownerId) {

       return mongoTemplate.findById(ownerId, ApplicationUser.class);

    }
    public Address getAddressFromDTO(AddressDTO addressDTO){
        Address address = new Address();
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setStreet(addressDTO.getStreet());
        address.setZip(addressDTO.getZip());
        addressRepository.save(address);
        addressRepository.save(address);
        return address;
    }
    public BusinessHours getBusinessHoursFromDTO(BusinessHoursDTO businessHoursDTO){
        BusinessHours businessHours = new BusinessHours();
        businessHours.setFriday(businessHoursDTO.getFriday());
        businessHours.setMonday(businessHoursDTO.getMonday());
        businessHours.setTuesday(businessHoursDTO.getTuesday());
        businessHours.setWednesday(businessHoursDTO.getWednesday());
        businessHours.setThursday(businessHoursDTO.getThursday());
        businessHours.setSaturday(businessHoursDTO.getSaturday());
        businessHours.setSunday(businessHoursDTO.getSunday());
        businessHoursRepository.save(businessHours);
        return businessHours;
    };

}