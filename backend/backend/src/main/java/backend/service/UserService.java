package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dto.UserProfileDTO;
import backend.model.Korisnik;
import backend.model.Pretplata;
import backend.model.PretplataPoKorisniku;
import backend.repository.KorisnikRepository;
import backend.repository.PretplataPoKorisnikuRepository;
import backend.repository.PretplataRepository;

@Service
public class UserService {
    @Autowired private KorisnikRepository korisnikRepo;
    @Autowired private PretplataRepository pretplataRepo;
    @Autowired private PretplataPoKorisnikuRepository pretplataPoKorisnikuRepo;

    public UserProfileDTO getUserProfile(String email) {
        Korisnik k = korisnikRepo.findByEmailKorisnika(email).orElseThrow();
        List<PretplataPoKorisniku> korisnikPretplate = pretplataPoKorisnikuRepo.findByIdKorisnika(k.getIdKorisnika());
        String tipPretplate = "Basic";

        if (!korisnikPretplate.isEmpty()) {
            Pretplata p = pretplataRepo.findById(korisnikPretplate.get(0).getIdPretplate()).orElseThrow();
            tipPretplate = p.getTipPretplate();
        }

        UserProfileDTO dto = new UserProfileDTO();
        dto.email = k.getEmailKorisnika();
        dto.ime = k.getImeKorisnika();
        dto.prezime = k.getPrezimeKorisnika();
        dto.broj = k.getPhone();
        dto.plan = tipPretplate;
        return dto;
    }

    public void updateUserProfile(String email, UserProfileDTO updated) {
        Korisnik k = korisnikRepo.findByEmailKorisnika(email).orElseThrow();

        if (updated.email != null) k.setEmailKorisnika(updated.email);
        if (updated.ime != null) k.setImeKorisnika(updated.ime);
        if (updated.prezime != null) k.setPrezimeKorisnika(updated.prezime);
        if (updated.broj != null) k.setPhone(updated.broj);
        korisnikRepo.save(k);

        if (updated.plan != null) {
            Pretplata newPlan = pretplataRepo.findByTipPretplate(updated.plan).orElseThrow();
            List<PretplataPoKorisniku> pretplate = pretplataPoKorisnikuRepo.findByIdKorisnika(k.getIdKorisnika());

            if (!pretplate.isEmpty()) {
                PretplataPoKorisniku pp = pretplate.get(0);
                pp.setIdPretplate(newPlan.getIdPretplata());
                pretplataPoKorisnikuRepo.save(pp);
            }
        }
    }

    
}