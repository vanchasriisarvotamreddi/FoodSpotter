package com.cmpe202.restaurantfinderapp.controller;


import com.cmpe202.restaurantfinderapp.exception.RestaurantNotFoundException;
import com.cmpe202.restaurantfinderapp.model.Restaurant;
import com.cmpe202.restaurantfinderapp.services.AdminService;
import com.cmpe202.restaurantfinderapp.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;
    @Autowired
    private RestaurantService restaurantService;


    @GetMapping("/duplicates")
    public ResponseEntity<List<Restaurant>> getDuplicates(){
        List<Restaurant> duplicates = adminService.findDuplicates();
        if (duplicates.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(duplicates);
    }


    @DeleteMapping("/deleteRestaurant")
    public ResponseEntity<String> removeRestaurantById(
                @RequestParam String restaurantId) {

            if (restaurantId == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if not found
            }

        try {
            adminService.deleteRestaurant(restaurantId);
            return ResponseEntity.ok("Restaurant with ID " + restaurantId + " has been deactivated.");
        } catch (RestaurantNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }



    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> searchRestaurants(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String zipCode,
            @RequestParam(required = false) String ownerId) {
        List<Restaurant> restaurants = adminService.searchRestaurants(name, zipCode, ownerId);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/get")
    public void getAll(){
         ResponseEntity.ok(adminService.getAll());
    }
}
