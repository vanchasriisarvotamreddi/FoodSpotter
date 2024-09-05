package com.cmpe202.restaurantfinderapp.repository;

import com.cmpe202.restaurantfinderapp.authentication.model.ApplicationUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationUserRepository extends MongoRepository<ApplicationUser, String> {
    ApplicationUser findByUsername(String username);

}
