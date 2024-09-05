package com.cmpe202.restaurantfinderapp.services;

import com.cmpe202.restaurantfinderapp.exception.RestaurantNotFoundException;
import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.repository.RestaurantRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.cmpe202.restaurantfinderapp.constants.Constants.IS_FALSE;


@Service
public class AdminService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> findDuplicates() {
        LookupOperation lookupAddress = Aggregation.lookup("address", "address", "_id", "addressDetails");
        UnwindOperation unwindAddress = Aggregation.unwind("addressDetails");

        GroupOperation groupOperation = Aggregation.group(
                "name",
                "ownerId",
                "addressDetails.street",
                "addressDetails.city",
                "addressDetails.state",
                "addressDetails.zip",
                "addressDetails.lat",
                "addressDetails.lng"
        ).count().as("count").push("$_id").as("restaurantIds");

        MatchOperation matchOperation = Aggregation.match(Criteria.where("count").gt(1));

        LookupOperation lookupRestaurants = Aggregation.lookup("restaurants", "restaurantIds", "_id", "duplicateRestaurants");
        UnwindOperation unwindDuplicates = Aggregation.unwind("duplicateRestaurants");

        ReplaceRootOperation replaceRoot = Aggregation.replaceRoot("duplicateRestaurants");

        Aggregation aggregation = Aggregation.newAggregation(
                lookupAddress,
                unwindAddress,
                groupOperation,
                matchOperation,
                lookupRestaurants,
                unwindDuplicates,
                replaceRoot
        );

        return mongoTemplate.aggregate(aggregation, "restaurants", Restaurant.class).getMappedResults();
    }

    public void deleteRestaurant(String restaurantId) {
        // Query by `_id` in MongoDB
        ObjectId objectId = new ObjectId(restaurantId);
        Query query = new Query(Criteria.where("_id").is(objectId));

        boolean exists = mongoTemplate.exists(query, Restaurant.class);

        if (!exists) {
            throw new RestaurantNotFoundException("Restaurant with ID " + restaurantId + " not found.");
        }
        mongoTemplate.remove(query, Restaurant.class);
    }
    public void updateRestaurantById(String restaurantId) {
        // Query by `_id` in MongoDB
        ObjectId objectId = new ObjectId(restaurantId);
        Query query = new Query(Criteria.where("_id").is(objectId));

        boolean exists = mongoTemplate.exists(query, Restaurant.class);

        if (!exists) {
            throw new RestaurantNotFoundException("Restaurant with ID " + restaurantId + " not found.");
        }

        // Update the `isClosed` field to true
        Update update = new Update();
        update.set("isClosed", true); // Mark as closed
        mongoTemplate.updateFirst(query, update, Restaurant.class);
    }



    public List<Restaurant> searchRestaurants(String name, String zipCode, String ownerUserName) {
        Query query = new Query();

        query.addCriteria(Criteria.where("isClosed").is(IS_FALSE));
        // Add Criteria for Name (partial match, case-insensitive)
        if (name != null && !name.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(name, "i")); // Case-insensitive regex
        }

        // Add Criteria for Zipcode
        if (zipCode != null && !zipCode.isEmpty()) {
            query.addCriteria(Criteria.where("zipCode").is(zipCode));
        }

        if (ownerUserName != null && !ownerUserName.isEmpty()) {
            query.addCriteria(Criteria.where("user").is(ownerUserName));
        }

        System.out.println(query);
        // Execute the query and return the result
        return mongoTemplate.find(query, Restaurant.class);
    }




    public List<Restaurant> getAll(){
        return mongoTemplate.findAll(Restaurant.class);
    }


}
