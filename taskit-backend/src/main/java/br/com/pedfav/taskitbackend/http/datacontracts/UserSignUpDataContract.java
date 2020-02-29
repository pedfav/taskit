package br.com.pedfav.taskitbackend.http.datacontracts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpDataContract {

    @NotBlank
    @Size(min = 4)
    private String name;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotNull
    private LocalDate birthday;

    @NotNull
    private Long idDepartment;
}