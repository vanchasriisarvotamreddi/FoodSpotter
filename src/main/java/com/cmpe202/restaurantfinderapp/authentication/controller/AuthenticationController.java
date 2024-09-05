package com.cmpe202.restaurantfinderapp.authentication.controller;

import com.cmpe202.restaurantfinderapp.authentication.model.Login;
import com.cmpe202.restaurantfinderapp.authentication.model.LoginResponse;
import com.cmpe202.restaurantfinderapp.authentication.model.Registration;
import com.cmpe202.restaurantfinderapp.authentication.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> registerUser(@RequestBody Registration body) throws Exception {
        try {
            LoginResponse loginResponseDTO = authenticationService.registerUser(body);
            return new ResponseEntity<>(loginResponseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody Login body) {
        try {
            LoginResponse loginResponseDTO = authenticationService.loginUser(body.getUsername(), body.getPassword());
            return ResponseEntity.ok(loginResponseDTO);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Object> handleUserNameExistsException(Exception e) {
//        // Create a response body with an appropriate error message
//        Map<String, String> errorBody = new HashMap<>();
//        errorBody.put("error", "Authentication Error");
//        errorBody.put("message", e.getMessage()); // Include the exception's message (optional)
//        // Return the response entity with a 409 Conflict status
//        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBody);
//    }
}
