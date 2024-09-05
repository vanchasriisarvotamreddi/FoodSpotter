package com.cmpe202.restaurantfinderapp.authentication.model;


import lombok.Data;

@Data
public class LoginResponse {
    private String username;
    private String role;
//    private String token;
    private String name;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LoginResponse() {
    }

    public LoginResponse(String username, String role, String name) {
        this.username = username;
        this.role = role;
        this.name = name;
    }
}
