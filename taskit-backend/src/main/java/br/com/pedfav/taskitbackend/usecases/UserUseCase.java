package br.com.pedfav.taskitbackend.usecases;


import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.Role;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.enums.RoleName;
import br.com.pedfav.taskitbackend.exception.ResourceNotFoundException;
import br.com.pedfav.taskitbackend.exception.RoleNotFoundExecption;
import br.com.pedfav.taskitbackend.exception.UserAlreadyExistsException;
import br.com.pedfav.taskitbackend.gateways.repositories.RoleRepository;
import br.com.pedfav.taskitbackend.gateways.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class UserUseCase {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentUseCase departmentUseCase;
    private final PasswordEncoder passwordEncoder;

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

    public Boolean checkUsernameAvailability(String username) {
        return !userRepository.existsByUsername(username);
    }

    public Boolean checkEmailAvailability(String email) {
        return !userRepository.existsByEmail(email);
    }

    public User getUserByEmailOrUserName(String emailOrUsername) {
        return userRepository.findByUsernameOrEmail(emailOrUsername, emailOrUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Username or email", emailOrUsername));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Username", username));
    }

    public User updateDepartmentId(Long id, Long departmentId) {
        User userToBeUpdated = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Id", id));

        Department department = departmentUseCase.getDepartmentById(departmentId);

        userToBeUpdated.setDepartment(department);

        return userRepository.save(userToBeUpdated);
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Username", username));

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
        } else {
            throw new ResourceNotFoundException("User", "Username", username);
        }

        userRepository.save(user);
    }
}