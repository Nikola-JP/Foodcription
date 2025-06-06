package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Korisnik;
import backend.model.Pretplata;
import backend.model.PretplataPoKorisniku;

@Repository
public interface PretplataPoKorisnikuRepository extends JpaRepository<PretplataPoKorisniku, Long> {
    List<PretplataPoKorisniku> findByKorisnik_IdKorisnika(Long idKorisnika);
    Optional<PretplataPoKorisniku> findByKorisnikAndPretplata(Korisnik korisnik, Pretplata pretplata);
    Optional<PretplataPoKorisniku> findByKorisnik(Korisnik korisnik);
}

