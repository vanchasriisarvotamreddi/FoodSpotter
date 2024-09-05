package com.cmpe202.restaurantfinderapp.controller;


import com.cmpe202.restaurantfinderapp.dto.RestaurantDTO;
import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.services.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/owner")
public class BusinessOwnerController {

    @Autowired
    private RestaurantService restaurantService;

    // Add a new restaurant
    @PostMapping("/add/{username}")
    public ResponseEntity<?> addRestaurant(@Valid @RequestBody RestaurantDTO restaurantDTO, @PathVariable String username, BindingResult result) throws Exception {
        if (result.hasErrors()) {
            // If there are validation errors, return a bad request with the errors
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Restaurant restaurant = restaurantService.convertToRestaurantDTO(restaurantDTO);
        Restaurant savedRestaurant = restaurantService.addRestaurant(restaurant, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurant);
    }

    // Update a restaurant by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRestaurant(
            @PathVariable String id,
            @Valid @RequestBody RestaurantDTO updatedRestaurantDTO,
            BindingResult result) {
        if (result.hasErrors()) {
            // If there are validation errors, return a bad request with the errors
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Restaurant existingRestaurant = restaurantService.getRestaurantById(id);

        if (existingRestaurant == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Not found or unauthorized
        }

        Restaurant updatedRestaurant = restaurantService.convertToRestaurantDTO(updatedRestaurantDTO);// Maintain original owner

        Restaurant savedRestaurant = restaurantService.updateRestaurant(id, updatedRestaurant);
        return ResponseEntity.ok(savedRestaurant); // Return the updated restaurant
    }

    // Get all restaurants owned by the authenticated user
    @GetMapping("/my-restaurants/{username}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByOwner(@PathVariable String username) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByOwner(username);

        if (restaurants.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no restaurants found
        }

        return ResponseEntity.ok(restaurants); // Return the list of restaurants
    }
}
