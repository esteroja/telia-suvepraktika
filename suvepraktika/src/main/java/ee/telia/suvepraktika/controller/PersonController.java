package ee.telia.suvepraktika.controller;

import ee.telia.suvepraktika.entity.PersonEntity;
import ee.telia.suvepraktika.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @GetMapping("people")
    public List<PersonEntity> getPeople() {
        return personRepository.findAll();
    }

    @PostMapping("people")
    public List<PersonEntity> postPerson(@RequestBody PersonEntity personEntity) {
        personRepository.save(personEntity);
        return personRepository.findAll();
    }

}
