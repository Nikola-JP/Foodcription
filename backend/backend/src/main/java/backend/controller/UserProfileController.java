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
        System.out.println("Authorized PUT request to update user: " + email); // ✅ Should print
        userService.updateUserProfile(email, updatedProfile);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{email}/plan")
    public ResponseEntity<Void> updateUserPlan(@PathVariable String email, @RequestBody UserProfileDTO updated) {
        System.out.println("Received request to update plan for: " + email + " -> " + updated.plan);
        userService.updateUserProfile(email, updated);
        return ResponseEntity.noContent().build();
    }

    
}

