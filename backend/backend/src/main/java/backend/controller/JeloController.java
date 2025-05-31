package backend.controller;

import backend.model.Jelo;
import backend.repository.JeloRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin(origins = "http://localhost:5173") // Omogući CORS za frontend
public class JeloController {

    private final JeloRepository jeloRepository;

    public JeloController(JeloRepository jeloRepository) {
        this.jeloRepository = jeloRepository;
    }

    // 1. Dohvat svih jela
    @GetMapping
    public List<Jelo> getAllMeals() {
        return jeloRepository.findAll();
    }

    // 2. Dohvat broja jela
    @GetMapping("/count")
    public Map<String, Long> getMealsCount() {
        return Collections.singletonMap("count", jeloRepository.count());
    }

    //3. Dohvat jela po ID-u
    @GetMapping("/{id}")
    public ResponseEntity<Jelo> getMealById(@PathVariable Long id) {
        return jeloRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
}
