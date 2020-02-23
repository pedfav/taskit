package br.com.pedfav.taskitbackend.config.jwt.resource;


import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public User convertUser(UserSignUpDataContract dataContract) {
        return User.builder()
                .name(dataContract.getName())
                .username(dataContract.getUsername())
                .email(dataContract.getEmail())
                .password(dataContract.getPassword())
                .birthday(dataContract.getBirthday())
                .idDepartment(Department.builder()
                        .id(dataContract.getIdDepartment())
                        .build())
                .build();
    }
}
