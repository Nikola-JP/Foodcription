package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.PretplataPoKorisniku;

@Repository
public interface PretplataPoKorisnikuRepository extends JpaRepository<PretplataPoKorisniku, Long> {
    List<PretplataPoKorisniku> findByIdKorisnika(Long idKorisnika);
}
