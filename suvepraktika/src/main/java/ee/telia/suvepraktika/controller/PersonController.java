package ee.telia.suvepraktika.controller;

import ee.telia.suvepraktika.dto.PersonUpdateDTO;
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

    @PutMapping("people/update/{id}")
    public List<PersonEntity> updatePerson(@PathVariable Long id, @RequestBody PersonUpdateDTO dto) {
        PersonEntity existingPerson = personRepository.findById(id).orElse(null);

        if (existingPerson != null) {
            if (dto.getFirstName() != null) existingPerson.setFirstName(dto.getFirstName());
            if (dto.getLastName() != null) existingPerson.setLastName(dto.getLastName());
            if (dto.getBirthDate() != null) existingPerson.setBirthDate(dto.getBirthDate());
            if (dto.getEmail() != null) existingPerson.setEmail(dto.getEmail());
            if (dto.getPhone() != null) existingPerson.setPhone(dto.getPhone());
            if (dto.getAddress() != null) existingPerson.setAddress(dto.getAddress());

            personRepository.save(existingPerson);
        }

        return personRepository.findAll();
    }

}
