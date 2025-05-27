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
        return korisnikRepository.findByEmailKorisnika(email)
                .filter(user -> user.getLozinkaKorisnika().equals(password));
    }

    public Korisnik register(Korisnik korisnik) {
        return korisnikRepository.save(korisnik);
    }
}
