package backend.controller;

import backend.dto.KorisnikPretplataDTO;
import backend.dto.KorisnikPretplataUpdateRequest;
import backend.model.Korisnik;
import backend.service.KorisnikService;
import backend.security.JwtUtil; // you need to implement this or use existing JWT utility

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
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
            korisnik.setRole(Korisnik.Role.user); // Defaultna uloga
        }

        // 1. Registriraj korisnika u bazi
        Korisnik savedUser = korisnikService.register(korisnik);

        // 2. Generiraj token (koristi email + rolu, kao i u loginu)
        String token = jwtUtil.generateToken(savedUser.getEmailKorisnika(), savedUser.getRole().name());

        // 3. Pripremi response za frontend (isti format kao kod login)
        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", token);

        return ResponseEntity.ok(response);

    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Greška na serveru: " + e.getMessage());
    }
}

@PutMapping("/{email}/password")
    public ResponseEntity<?> changePassword(@PathVariable String email, @RequestBody Map<String, String> passwords) {
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");

        try {
            korisnikService.changePassword(email, oldPassword, newPassword);
            return ResponseEntity.ok("Lozinka promijenjena.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // log za debug
            return ResponseEntity.status(500).body("Greška pri promjeni lozinke.");
        }  
    }
@PutMapping("/{email}/password/reset")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> resetPassword(@PathVariable String email, @RequestBody Map<String, String> body) {
    String newPassword = body.get("newPassword");
    korisnikService.resetUserPassword(email, newPassword);
    return ResponseEntity.ok("Lozinka promijenjena.");
}

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{email}/role")
public ResponseEntity<?> updateUserRole(@PathVariable String email, @RequestBody Map<String, String> request) {
    String newRole = request.get("role");
    try {
        korisnikService.updateUserRole(email, newRole);
        return ResponseEntity.ok("Uloga korisnika uspješno promijenjena.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Greška: " + e.getMessage());
    }
}

@GetMapping("/pretplate")
    public ResponseEntity<List<KorisnikPretplataDTO>> getAllKorisniciPretplate() {
        return ResponseEntity.ok(korisnikService.getAllKorisnikPretplate());
    
}

@PostMapping("/pretplate/update")
public ResponseEntity<String> updateKorisnikPretplata(@RequestBody KorisnikPretplataUpdateRequest request) {
    korisnikService.updateKorisnikPretplata(
        request.getEmail(),
        request.getIme(),
        request.getPrezime(),
        request.getTipPretplate(),
        request.getStatus()
    );
    return ResponseEntity.ok("Podaci uspješno ažurirani.");
}

}
