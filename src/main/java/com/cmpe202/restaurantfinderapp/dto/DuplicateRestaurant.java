package com.cmpe202.restaurantfinderapp.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class DuplicateRestaurant {
    private Id _id;
    private long count;

    // Nested class for grouped fields
    public static class Id {
        private String name;
        private String zipCode;
        private String user; // Use `user` instead of `userId`

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getZipCode() {
            return zipCode;
        }

        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }

        public String getUser() {
            return user; // Updated getter
        }

        public void setUser(String user) {
            this.user = user; // Updated setter
        }
    }

    // Getters and Setters for `_id` and `count`
    public Id get_id() {
        return _id;
    }

    public void set_id(Id _id) {
        this._id = _id;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}