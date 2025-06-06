package backend.service;

import backend.dto.KorisnikPretplataDTO;
import backend.model.Korisnik;
import backend.model.Pretplata;
import backend.model.PretplataPoKorisniku;
import backend.repository.KorisnikRepository;
import backend.repository.PretplataPoKorisnikuRepository;
import backend.repository.PretplataRepository;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;
    private final PretplataPoKorisnikuRepository pretplataPoKorisnikuRepo;
    private final PretplataRepository pretplataRepository;
    private final PasswordEncoder passwordEncoder;

    public KorisnikService(
            KorisnikRepository korisnikRepository,
            PretplataPoKorisnikuRepository pretplataPoKorisnikuRepo,
            PretplataRepository pretplataRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.korisnikRepository = korisnikRepository;
        this.pretplataPoKorisnikuRepo = pretplataPoKorisnikuRepo;
        this.pretplataRepository = pretplataRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Korisnik register(Korisnik korisnik) {
        korisnik.setEmailKorisnika(korisnik.getEmailKorisnika().toLowerCase());

        if (korisnikRepository.findByEmailKorisnika(korisnik.getEmailKorisnika()).isPresent()) {
            throw new IllegalArgumentException("Email se već koristi.");
        }

        korisnik.setLozinkaKorisnika(passwordEncoder.encode(korisnik.getLozinkaKorisnika()));
        return korisnikRepository.save(korisnik);
    }

    public Optional<Korisnik> authenticate(String email, String password) {
        return korisnikRepository.findByEmailKorisnika(email.toLowerCase())
                .filter(user -> passwordEncoder.matches(password, user.getLozinkaKorisnika()));
    }

    public void changePassword(String email, String oldPassword, String newPassword) {
        Korisnik korisnik = korisnikRepository.findByEmailKorisnika(email.toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Korisnik nije pronađen."));

        if (!passwordEncoder.matches(oldPassword, korisnik.getLozinkaKorisnika())) {
            throw new IllegalArgumentException("Stara lozinka nije točna.");
        }

        korisnik.setLozinkaKorisnika(passwordEncoder.encode(newPassword));
        korisnikRepository.save(korisnik);
    }

    public List<KorisnikPretplataDTO> getAllKorisnikPretplate() {
    List<Korisnik> allUsers = korisnikRepository.findAll();

    return allUsers.stream().map(korisnik -> {
        Optional<PretplataPoKorisniku> pretplataRecordOpt = pretplataPoKorisnikuRepo.findByKorisnik(korisnik);

        String tipPretplate = "";
        String status = "";

        if (pretplataRecordOpt.isPresent()) {
            PretplataPoKorisniku record = pretplataRecordOpt.get();
            tipPretplate = record.getPretplata().getTipPretplate();
            status = record.getStatus();
        }

        return new KorisnikPretplataDTO(
                korisnik.getImeKorisnika(),
                korisnik.getPrezimeKorisnika(),
                korisnik.getEmailKorisnika(),
                tipPretplate,
                status,
                korisnik.getRole().name()
        );
    }).collect(Collectors.toList());
}

    // ✅ Add/update user + subscription + status
    public void updateKorisnikPretplata(String email, String ime, String prezime, String tipPretplate, String status) {
        Korisnik korisnik = korisnikRepository.findByEmailKorisnika(email)
                .orElseThrow(() -> new IllegalArgumentException("Korisnik nije pronađen."));

        korisnik.setImeKorisnika(ime);
        korisnik.setPrezimeKorisnika(prezime);

        Pretplata pretplata = pretplataRepository.findByTipPretplate(tipPretplate)
                .orElseThrow(() -> new IllegalArgumentException("Pretplata nije pronađena."));

        korisnik.setPretplata(pretplata);
        korisnikRepository.save(korisnik);

        PretplataPoKorisniku record = pretplataPoKorisnikuRepo.findByKorisnikAndPretplata(korisnik, pretplata)
                .orElseThrow(() -> new IllegalArgumentException("Zapis pretplate nije pronađen."));

        record.setStatus(status);
        pretplataPoKorisnikuRepo.save(record);
    }
    public void resetUserPassword(String email, String newPassword) {
    Optional<Korisnik> korisnikOpt = korisnikRepository.findByEmailKorisnika(email);

    if (korisnikOpt.isEmpty()) {
        throw new UsernameNotFoundException("Korisnik s emailom " + email + " nije pronađen.");
    }

    Korisnik korisnik = korisnikOpt.get();

    String encodedPassword = passwordEncoder.encode(newPassword);
    korisnik.setLozinkaKorisnika(encodedPassword);

    korisnikRepository.save(korisnik);
}

public void updateUserRole(String email, String newRole) {
    Korisnik korisnik = korisnikRepository.findByEmailKorisnika(email)
        .orElseThrow(() -> new IllegalArgumentException("Korisnik nije pronađen"));

    try {
        Korisnik.Role role = Korisnik.Role.valueOf(newRole.toLowerCase()); // case-insensitive handling
        korisnik.setRole(role);
        korisnikRepository.save(korisnik);
    } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException("Nevažeća rola: " + newRole);
    }
}
}
