package backend.controller;

import backend.model.Korisnik;
import backend.service.KorisnikService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final KorisnikService korisnikService;

    public AuthController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<Korisnik> korisnik = korisnikService.authenticate(email, password);

        if (korisnik.isPresent()) {
            return ResponseEntity.ok(korisnik.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
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
            e.printStackTrace();  // <--- add this to see full error in server logs
            return ResponseEntity.status(500).body("Greška na serveru: " + e.getMessage());
        }
    }

}
