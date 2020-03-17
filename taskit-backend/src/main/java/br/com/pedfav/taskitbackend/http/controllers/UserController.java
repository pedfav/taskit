package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.http.converters.UserConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.UserAvailabilityDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.UserDataContract;
import br.com.pedfav.taskitbackend.usecases.UserUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class UserController {

    private final UserUseCase userUseCase;
    private final UserConverter userConverter;

    @GetMapping("/users/username-availability/{username}")
    public UserAvailabilityDataContract checkUsernameAvailability(@PathVariable("username") String username) {
        Boolean isAvailable = userUseCase.checkUsernameAvailability(username);
        return new UserAvailabilityDataContract(isAvailable);
    }

    @GetMapping("/users/email-availability/{email}")
    public UserAvailabilityDataContract checkEmailAvailability(@PathVariable("email") String email) {
        Boolean isAvailable = userUseCase.checkEmailAvailability(email);
        return new UserAvailabilityDataContract(isAvailable);
    }

    @GetMapping("/users/username-or-email/{usernameOrEmail}")
    public ResponseEntity<UserDataContract> findByUsernameOrEmail(@PathVariable("usernameOrEmail") String usernameOrEmail) {

        UserDataContract userDataContract = userConverter.convertUser(userUseCase.getUserByEmailOrUserName(usernameOrEmail));

        return ResponseEntity.ok(userDataContract);
    }
}
