package ee.telia.suvepraktika.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Getter
@Setter

public class PersonUpdateDTO {
    @NotBlank(message = "Eesnimi on kohustuslik")
    private String firstName;

    @NotBlank(message = "Perekonnanimi on kohustuslik")
    private String lastName;

    @NotNull(message = "Sünnikuupäev on kohustuslik")
    private LocalDate birthDate;

    @NotBlank(message = "E-mail on kohustuslik")
    @Email(message = "Ebakorrektne e-mail")
    private String email;

    @NotBlank(message = "Telefoninumber on kohustuslik")
    @Pattern(regexp = "\\d+", message = "Ebakorrektne telefoninumber")
    private String phone;

    @NotBlank(message = "Aadress on kohustuslik")
    private String address;
}
