package com.cmpe202.restaurantfinderapp.authentication.services;

//import com.compe202.restaurantfinder.authentication.controller.exception.UserNameExistsException;
import com.cmpe202.restaurantfinderapp.authentication.model.ApplicationUser;
import com.cmpe202.restaurantfinderapp.authentication.model.LoginResponse;
import com.cmpe202.restaurantfinderapp.authentication.model.Registration;
import com.cmpe202.restaurantfinderapp.authentication.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {


    @Autowired
    MongoTemplate mongoTemplate;



    public LoginResponse registerUser(Registration registrationDTO) throws Exception {
        String encodedPassword = PasswordUtils.hashPassword(registrationDTO.getPassword());
        // Create a new ApplicationUser object
        ApplicationUser applicationUser = new ApplicationUser(
                registrationDTO.getUsername(),
                encodedPassword,
                registrationDTO.getName(),
                registrationDTO.getRole()
        );

        // Check if the user already exists
        ApplicationUser userExists = mongoTemplate.findById(applicationUser.getUsername(), ApplicationUser.class);
        if (userExists != null) {
            throw new Exception("User already exists");
        }

        // Save the new user
        ApplicationUser user = mongoTemplate.save(applicationUser);

        // Return the response
        return new LoginResponse(user.getUsername(), user.getRole(), user.getName());

    }


    public LoginResponse loginUser(String username, String password) throws Exception {
        // Retrieve the user from the database
        ApplicationUser user = mongoTemplate.findById(username, ApplicationUser.class);

        // Check if the user exists
        if (user == null) {
            throw new Exception("Invalid username or password");
        }


        String hashedInputPassword = PasswordUtils.hashPassword(password);

        // Compare the hashed password with the stored password
        if (!hashedInputPassword.equals(user.getPassword())) {
            throw new Exception("Invalid username or password");
        }

        // Return the login response
        return new LoginResponse(user.getUsername(), user.getRole(), user.getName());
    }

}
