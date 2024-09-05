package com.cmpe202.restaurantfinderapp.controller;

import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:5173")

@RestController
@RequestMapping("/restaurants")   //users
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<String> category,
            @RequestParam(required = false) String zipcode,
            @RequestParam(required = false) List<String> cuisine,
            @RequestParam(required = false) String priceRange,
            @RequestParam(required = false) Integer averageRating) { // Ask if multiple selections is available

        List<Restaurant> results = restaurantService.searchRestaurants(name, category, zipcode, cuisine, priceRange, averageRating);
        return ResponseEntity.ok(results);
    }
    @GetMapping("/getid")
    public ResponseEntity<Restaurant> getRestaurantIdByCriteria(
            @RequestParam String restaurantId) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        if (restaurant == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if not found
        }

        return ResponseEntity.ok(restaurant); // Return the restaurant ID if found
    }


    @GetMapping("/get")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> results = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/getActive")
    public ResponseEntity<List<Restaurant>> getAllActiveRestaurants() {
        List<Restaurant> results = restaurantService.getAllActiveRestaurants();
        return ResponseEntity.ok(results);
    }

}


