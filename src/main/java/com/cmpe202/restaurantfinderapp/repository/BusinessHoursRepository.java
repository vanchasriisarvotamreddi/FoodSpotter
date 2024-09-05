package com.cmpe202.restaurantfinderapp.repository;

import com.cmpe202.restaurantfinderapp.model.BusinessHours;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BusinessHoursRepository extends MongoRepository<BusinessHours, String> {

}
