package br.com.pedfav.taskitbackend.http.converters;


import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.http.datacontracts.UserDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.UserSignUpDataContract;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConverter {

    private final PasswordEncoder passwordEncoder;

    public User convertUser(UserSignUpDataContract dataContract) {
        return User.builder()
                .name(dataContract.getName())
                .username(dataContract.getUsername())
                .email(dataContract.getEmail())
                .password(passwordEncoder.encode(dataContract.getPassword()))
                .birthday(dataContract.getBirthday())
                .department(Department.builder()
                        .id(dataContract.getIdDepartment())
                        .build())
                .build();
    }

    public UserDataContract convertUser(User user) {
        return UserDataContract.builder()
                .id(user.getId())
                .name(user.getUsername())
                .username(user.getUsername())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .idDepartment(user.getDepartment().getId())
                .build();
    }
}
