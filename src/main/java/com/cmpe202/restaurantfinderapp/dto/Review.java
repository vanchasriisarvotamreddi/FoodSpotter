package com.cmpe202.restaurantfinderapp.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor


public class Review{
//    @NotBlank(message = "User ID cannot be blank")
    private String userId;

//    @Min(value = 1, message = "Rating must be at least 1")
//    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;

//    @NotBlank(message = "Review cannot be blank")
//    @Size(max = 500, message = "Review cannot exceed 500 characters")
    private String comment;

    private String date;




    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
