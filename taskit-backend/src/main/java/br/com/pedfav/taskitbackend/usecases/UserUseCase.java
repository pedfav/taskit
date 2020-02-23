package br.com.pedfav.taskitbackend.usecases;


import br.com.pedfav.taskitbackend.entities.Role;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.enums.RoleName;
import br.com.pedfav.taskitbackend.exception.RoleNotFoundExecption;
import br.com.pedfav.taskitbackend.exception.UserAlreadyExistsException;
import br.com.pedfav.taskitbackend.gateways.repositories.RoleRepository;
import br.com.pedfav.taskitbackend.gateways.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class UserUseCase {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public User saveUserSignedUp(User user) {
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("User already exists!");
        }

        user.setCreationDate(LocalDateTime.now());

        Role role = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RoleNotFoundExecption("Role not set"));

        user.setRoles(Collections.singleton(role));

        return userRepository.save(user);
    }
}