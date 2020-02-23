package br.com.pedfav.taskitbackend.config.jwt.resource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpDataContract {

    private String name;
    private String username;
    private String email;
    private String password;
    private LocalDate birthday;
    private long idDepartment;
}