package backend.service;

import backend.model.Korisnik;
import backend.repository.KorisnikRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KorisnikService {
    private final KorisnikRepository korisnikRepository;

    public KorisnikService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
    }

    public Optional<Korisnik> authenticate(String email, String password) {
        String normalizedEmail = email.toLowerCase();
        return korisnikRepository.findByEmailKorisnika(normalizedEmail)
                .filter(user -> user.getLozinkaKorisnika().equals(password));
    }

    public Korisnik register(Korisnik korisnik) {
        korisnik.setEmailKorisnika(korisnik.getEmailKorisnika().toLowerCase());

        if (korisnikRepository.findByEmailKorisnika(korisnik.getEmailKorisnika()).isPresent()) {
            throw new IllegalArgumentException("Email se već koristi.");
        }
        return korisnikRepository.save(korisnik);
    }
}
