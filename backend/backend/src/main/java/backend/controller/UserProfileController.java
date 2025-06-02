package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.UserProfileDTO;
import backend.service.UserService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173") // adjust if deployed
public class UserProfileController {
    @Autowired private UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserProfileDTO> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @PutMapping("/{email}")
    public ResponseEntity<Void> updateUser(@PathVariable String email, @RequestBody UserProfileDTO updatedProfile) {
        userService.updateUserProfile(email, updatedProfile);
        return ResponseEntity.noContent().build();
    }
}

