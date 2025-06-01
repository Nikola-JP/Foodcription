package backend.controller;

import backend.model.Korisnik;
import backend.service.KorisnikService;
import backend.security.JwtUtil; // you need to implement this or use existing JWT utility
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final KorisnikService korisnikService;
    private final JwtUtil jwtUtil;

    public AuthController(KorisnikService korisnikService, JwtUtil jwtUtil) {
        this.korisnikService = korisnikService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    Optional<Korisnik> optionalKorisnik = korisnikService.authenticate(email, password);

    if (optionalKorisnik.isPresent()) {
        Korisnik korisnik = optionalKorisnik.get();
        String token = jwtUtil.generateToken(korisnik.getEmailKorisnika(), korisnik.getRole().name());

        Map<String, Object> response = new HashMap<>();
        response.put("user", korisnik);
        response.put("token", token);

        return ResponseEntity.ok(response);
    } else {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Invalid credentials");
        return ResponseEntity.status(401).body(error);
    }
}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Korisnik korisnik) {
        try {
            if (korisnik.getRole() == null) {
                korisnik.setRole(Korisnik.Role.user);
            }
            return ResponseEntity.ok(korisnikService.register(korisnik));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Greška na serveru: " + e.getMessage());
        }
    }
}
