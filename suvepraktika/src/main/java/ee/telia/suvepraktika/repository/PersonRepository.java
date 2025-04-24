package ee.telia.suvepraktika.repository;

import ee.telia.suvepraktika.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {
}
