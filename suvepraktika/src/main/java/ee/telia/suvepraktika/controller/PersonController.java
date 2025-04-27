package ee.telia.suvepraktika.controller;

import ee.telia.suvepraktika.dto.PersonUpdateDTO;
import ee.telia.suvepraktika.entity.PersonEntity;
import ee.telia.suvepraktika.repository.PersonRepository;
import jakarta.validation.Valid;
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
    public List<PersonEntity> postPerson(@RequestBody @Valid PersonUpdateDTO personDTO) {
        PersonEntity person = new PersonEntity();
        getInfo(personDTO, person);
        return personRepository.findAll();
    }

    @DeleteMapping("people/{id}")
    public List<PersonEntity> deletePerson(@PathVariable Long id) {
        personRepository.deleteById(id);
        return personRepository.findAll();
    }

    @PutMapping("people/update/{id}")
    public List<PersonEntity> updatePerson(@PathVariable Long id, @RequestBody @Valid PersonUpdateDTO dto) {
        PersonEntity existingPerson = personRepository.findById(id).orElse(null);
        if (existingPerson != null) {
            getInfo(dto, existingPerson);
        }
        return personRepository.findAll();
    }

    private void getInfo(@RequestBody @Valid PersonUpdateDTO personDTO, PersonEntity person) {
        person.setFirstName(personDTO.getFirstName());
        person.setLastName(personDTO.getLastName());
        person.setBirthDate(personDTO.getBirthDate());
        person.setEmail(personDTO.getEmail());
        person.setPhone(personDTO.getPhone());
        person.setAddress(personDTO.getAddress());

        personRepository.save(person);
    }

}
