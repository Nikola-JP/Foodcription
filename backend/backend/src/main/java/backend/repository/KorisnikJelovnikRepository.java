package backend.repository;

import backend.model.KorisnikJelovnik;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface KorisnikJelovnikRepository extends JpaRepository<KorisnikJelovnik, Long> {
    List<KorisnikJelovnik> findByKorisnikId(Long korisnikId);
    void deleteByKorisnikId(Long korisnikId);
    Optional<KorisnikJelovnik> findByKorisnikIdAndDan(Long korisnikId, String dan);
    void deleteByKorisnikIdAndDan(Long korisnikId, String dan);
}
