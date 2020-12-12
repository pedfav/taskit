package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.KnowledgeTag;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.http.converters.UserConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.ChangePasswordDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.KnowledgeTagDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.UserAvailabilityDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.UserDataContract;
import br.com.pedfav.taskitbackend.usecases.UserUseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class UserController {

    private final UserUseCase userUseCase;
    private final UserConverter userConverter;
    private final ObjectMapper mapper;

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

    @GetMapping("/users/{id}")
    public ResponseEntity<User> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userUseCase.findById(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDataContract> updateUsersDepartment(@PathVariable("id") Long id, @RequestBody UserDataContract userDataContract) {

        UserDataContract updated = userConverter.convertUser(userUseCase.updateDepartmentId(id, userDataContract.getIdDepartment()));

        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/users/change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordDataContract dataContract) {

        userUseCase.changePassword(dataContract.getUsername(), dataContract.getOldPassword(), dataContract.getNewPassword());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/users/add-knowledge-tag/{user-id}")
    public ResponseEntity<User> addKnowledgeTag(@PathVariable("user-id") Long userId,
                                                @RequestBody KnowledgeTagDataContract knowledgeTagDataContract) {

        KnowledgeTag knowledgeTag = mapper.convertValue(knowledgeTagDataContract, KnowledgeTag.class);

        User userToReturn = userUseCase.addKnowledgeTag(knowledgeTag, userId);

        return ResponseEntity.ok(userToReturn);

    }
}
