package com.cmpe202.restaurantfinderapp.dto;

import com.cmpe202.restaurantfinderapp.model.Address;
import com.cmpe202.restaurantfinderapp.model.ReviewDTO;

import java.util.List;

public class RestaurantResponseDTO {
    private String name;
    private List<String> dietary; //Veg, Vegan, Non-veg
    private List<String> cuisine; //standard 5
    private String priceRange; //low, medium, high standard
    private BusinessHoursDTO hours;
    private List<String> photos;
    private String description;
    private Integer averageRating; //1,2,3,4,5 standard
    private Address address;
    private List<ReviewDTO> reviews;
    private String ownerId;
}
