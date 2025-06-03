package backend.controller;

import backend.dto.MenuDayDTO;
import backend.model.KorisnikJelovnik;
import backend.repository.KorisnikJelovnikRepository;
import backend.model.Korisnik;
import backend.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user/meals")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    @Autowired
    private KorisnikJelovnikRepository jelovnikRepo;

    @Autowired
    private KorisnikRepository korisnikRepo;

    @PostMapping
    @Transactional
    public ResponseEntity<?> saveMenu(@RequestBody List<MenuDayDTO> menu, Principal principal) {
        // 1. Pronađi korisnika po emailu iz tokena
        Korisnik korisnik = korisnikRepo.findByEmailKorisnika(principal.getName()).orElseThrow();

        // 2. Obriši stari meni
        jelovnikRepo.deleteByKorisnikId(korisnik.getIdKorisnika());

        // 3. Spremi novi meni
        for (MenuDayDTO day : menu) {
            if (day.mealId != null && day.mealId > 0) { // spremi samo ako postoji valjan mealId
                KorisnikJelovnik kj = new KorisnikJelovnik();
                kj.setKorisnikId(korisnik.getIdKorisnika());
                kj.setDan(day.day);
                kj.setJeloId(day.mealId);
                jelovnikRepo.save(kj);
            }
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<KorisnikJelovnik> getMenu(Principal principal) {
        Korisnik korisnik = korisnikRepo.findByEmailKorisnika(principal.getName()).orElseThrow();
        return jelovnikRepo.findByKorisnikId(korisnik.getIdKorisnika());
    }
}
