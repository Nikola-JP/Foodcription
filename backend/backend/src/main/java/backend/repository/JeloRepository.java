package backend.repository;

import backend.model.Jelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JeloRepository extends JpaRepository<Jelo, Long> {
}
