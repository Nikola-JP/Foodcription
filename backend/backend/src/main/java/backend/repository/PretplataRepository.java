package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Pretplata;

@Repository
public interface PretplataRepository extends JpaRepository<Pretplata, Long> {
    Optional<Pretplata> findByTipPretplate(String tipPretplate);
}
