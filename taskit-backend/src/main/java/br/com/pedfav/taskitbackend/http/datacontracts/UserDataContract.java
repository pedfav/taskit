package br.com.pedfav.taskitbackend.http.datacontracts;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDataContract {

    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private LocalDate birthday;
    private Long idDepartment;
}