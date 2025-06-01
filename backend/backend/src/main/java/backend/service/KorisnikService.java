package backend.service;

import backend.model.Korisnik;
import backend.repository.KorisnikRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;
    private final PasswordEncoder passwordEncoder;

    public KorisnikService(KorisnikRepository korisnikRepository, PasswordEncoder passwordEncoder) {
        this.korisnikRepository = korisnikRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register user with hashed password
    public Korisnik register(Korisnik korisnik) {
        korisnik.setEmailKorisnika(korisnik.getEmailKorisnika().toLowerCase());

        if (korisnikRepository.findByEmailKorisnika(korisnik.getEmailKorisnika()).isPresent()) {
            throw new IllegalArgumentException("Email se već koristi.");
        }

        String rawPassword = korisnik.getLozinkaKorisnika();
        String hashedPassword = passwordEncoder.encode(rawPassword);

        System.out.println("Raw password: " + rawPassword);
        System.out.println("Hashed password: " + hashedPassword);

        korisnik.setLozinkaKorisnika(hashedPassword);
        return korisnikRepository.save(korisnik);
    }

    // Authenticate user by comparing raw password with hashed password
    public Optional<Korisnik> authenticate(String email, String password) {
        String normalizedEmail = email.toLowerCase();
        return korisnikRepository.findByEmailKorisnika(normalizedEmail)
                .filter(user -> passwordEncoder.matches(password, user.getLozinkaKorisnika()));
    }
}
