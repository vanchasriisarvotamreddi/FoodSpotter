package com.cmpe202.restaurantfinderapp.repository;

import com.cmpe202.restaurantfinderapp.model.Address;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AddressRepository extends MongoRepository<Address, ObjectId> {
}
