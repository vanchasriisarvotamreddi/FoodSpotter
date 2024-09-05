package com.cmpe202.restaurantfinderapp.model;

import com.cmpe202.restaurantfinderapp.authentication.model.ApplicationUser;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

import static com.cmpe202.restaurantfinderapp.constants.Constants.defaultPhoto;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String restaurantId;
    private String name;
    private List<String> dietary; //Veg, Vegan, Non-veg
    private List<String> cuisine; //standard 5
    private String priceRange; //low, medium, high standard
    private List<String> photos;
    private String description;
    private Boolean closed = false;
    private Double averageRating = 0.0; //1,2,3,4,5 standard
    @DocumentReference
    private BusinessHours hours;
    @DocumentReference
    private Address address;
    @DocumentReference
    private List<ReviewDTO> reviews;
    @DocumentReference
    private ApplicationUser ownerId;


    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ApplicationUser getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(ApplicationUser ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }





    public List<String> getCuisine() {
        return cuisine;
    }

    public void setCuisine(List<String> cuisine) {
        this.cuisine = cuisine;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }

    public BusinessHours getHours() {
        return hours;
    }

    public void setHours(BusinessHours hours) {
        this.hours = hours;
    }



    public List<String> getPhotos() {
        return photos;
    }
    public void setPhotos(List<String> photos) {
        if(photos == null || photos.isEmpty())
            this.photos.add(defaultPhoto);
        else
            this.photos = photos;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ReviewDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewDTO> reviews) {
        this.reviews = reviews;
    }

    public List<String> getDietary() {
        return dietary;
    }

    public void setDietary(List<String> dietary) {
        this.dietary = dietary;
    }

}

