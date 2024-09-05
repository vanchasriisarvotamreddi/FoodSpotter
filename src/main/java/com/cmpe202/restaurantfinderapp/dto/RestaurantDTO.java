package com.cmpe202.restaurantfinderapp.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

import static com.cmpe202.restaurantfinderapp.constants.Constants.defaultPhoto;


//@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDTO {


//    @NotBlank(message = "Name cannot be blank.")
//    @Size(max = 100, message = "Name must not exceed 100 characters.")
    private String name;  // Custom check for duplicates in the service layer

//    @NotBlank(message = "Address cannot be blank.")
    private AddressDTO address;

//    @NotEmpty(message = "At least one category must be specified.")
//    @Size(max = 3, message = "A maximum of 3 categories is allowed.")
    //@ValidCategories  // Custom validation for predefined categories (Veg, Vegan, Non-Veg)
    private List<String> dietary;   //Vegan

//    @NotEmpty(message = "At least one cuisine must be specified.")
//    @Size(max = 5, message = "A maximum of 5 cuisines is allowed.")
    //@ValidCuisines  // Custom validation for predefined cuisines
    private List<String> cuisine; //Italian

//    @NotBlank(message = "Price range cannot be blank.")
//    @Pattern(regexp = "low|medium|high", message = "Price range must be 'low', 'medium', or 'high'.")
    private String priceRange; //1,2,3 (high)

//    @NotBlank(message = "Hours cannot be blank.")
    private BusinessHoursDTO hours;  //List<String>

//    @Size(max = 5, message = "A maximum of 5 photos is allowed.")
    private List<String> photos; //Cahneg to string, keep a default image if string is empty

//    @NotBlank(message = "Description cannot be blank.")
//    @Size(min = 20, max = 500, message = "Description must be between 20 and 500 characters.")
    private String description;

    private String ownerId;

    private boolean closed;


    public String getName() {
        return name;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public List<String> getDietary() {
        return dietary;
    }

    public List<String> getCuisine() {
        return cuisine;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public BusinessHoursDTO getHours() {
        return hours;
    }

    public String getPriceRange() {
        return priceRange;
    }


    public List<String> getPhotos() {
        return photos;
    }

    public String getDescription() {
        return description;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public boolean getClosed() {return closed;}

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDietary(List<String> dietary) {
        this.dietary = dietary;
    }

    public void setCuisine(List<String> cuisine) {
        this.cuisine = cuisine;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }

    public void setHours(BusinessHoursDTO hours) {
        this.hours = hours;
    }


    public void setPhotos(List<String> photos) {
        if (photos == null || photos.isEmpty()) {
            this.photos = List.of(defaultPhoto);  // defaultPhoto should be a constant or URL
        } else {
            this.photos = photos;
        }
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

