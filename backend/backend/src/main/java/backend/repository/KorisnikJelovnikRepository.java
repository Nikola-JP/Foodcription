package backend.repository;

import backend.model.KorisnikJelovnik;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KorisnikJelovnikRepository extends JpaRepository<KorisnikJelovnik, Long> {
    List<KorisnikJelovnik> findByKorisnikId(Long korisnikId);
    void deleteByKorisnikId(Long korisnikId);
}
