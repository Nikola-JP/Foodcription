package backend.controller;

import backend.dto.UserProfileUpdateDTO;
import backend.model.Korisnik;
import backend.model.Pretplata;
import backend.repository.KorisnikRepository;
import backend.repository.PretplataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private KorisnikRepository korisnikRepository;
    @Autowired
    private PretplataRepository pretplataRepository;

    @PatchMapping("/profile")
    public ResponseEntity<UserProfileUpdateDTO> updateProfile(@RequestBody UserProfileUpdateDTO dto) {
        Korisnik korisnik = korisnikRepository.findByEmailKorisnika(dto.email)
                .orElse(null);
        if (korisnik == null) {
            return ResponseEntity.notFound().build();
        }

        korisnik.setImeKorisnika(dto.ime);
        korisnik.setPrezimeKorisnika(dto.prezime);
        korisnik.setPhone(dto.broj); // <-- OVO je setter koji trebaš koristiti!
        // getter je getPhone()

        if (dto.plan != null) {
            Optional<Pretplata> optionalPretplata = pretplataRepository.findByTipPretplate(dto.plan);
            Pretplata novaPretplata = optionalPretplata.orElseThrow(() -> new RuntimeException("Pretplata nije pronađena"));
            korisnik.setPretplata(novaPretplata);
        }

        korisnikRepository.save(korisnik);

        UserProfileUpdateDTO updated = new UserProfileUpdateDTO();
        updated.email = korisnik.getEmailKorisnika();
        updated.ime = korisnik.getImeKorisnika();
        updated.prezime = korisnik.getPrezimeKorisnika();
        updated.broj = korisnik.getPhone(); // <-- getter koji vraća broj mobitela
        updated.plan = korisnik.getPretplata() != null ? korisnik.getPretplata().getTipPretplate() : null;

        return ResponseEntity.ok(updated);
    }

    @PutMapping("/profile/{email}/plan")
    public String updateUserPlan(@PathVariable String email, @RequestBody Map<String, String> body) {
        Korisnik korisnik = korisnikRepository.findByEmailKorisnika(email).orElse(null);
        if (korisnik == null) return "Korisnik nije pronađen!";
        String plan = body.get("plan");
        if (plan == null) return "Plan nije poslan!";
        Optional<Pretplata> optionalPretplata = pretplataRepository.findByTipPretplate(plan);
        Pretplata novaPretplata = optionalPretplata.orElseThrow(() -> new RuntimeException("Pretplata nije pronađena"));
        korisnik.setPretplata(novaPretplata);
        korisnikRepository.save(korisnik);
        return "OK";
    }

    @PatchMapping("/plan") // <-- makni /user
    public ResponseEntity<?> updatePlan(@RequestBody Map<String, String> req, Principal principal) {
        String email = principal.getName();
        String plan = req.get("plan"); // "basic" ili "premium"
        Korisnik korisnik = korisnikRepository.findByEmailKorisnika(email)
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));
        Pretplata pretplata = pretplataRepository.findByTipPretplate(plan)
                .orElseThrow(() -> new RuntimeException("Pretplata nije pronađena"));
        korisnik.setPretplata(pretplata);
        korisnikRepository.save(korisnik);
        return ResponseEntity.ok(Map.of("plan", plan));
    }
}
