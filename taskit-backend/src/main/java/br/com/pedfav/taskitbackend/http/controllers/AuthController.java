package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.config.jwt.JwtTokenGenerator;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.exception.AuthenticationException;
import br.com.pedfav.taskitbackend.http.converters.UserConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.TokenRequestDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.TokenResponseDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.UserSignUpDataContract;
import br.com.pedfav.taskitbackend.usecases.UserUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class AuthController {

    private final JwtTokenGenerator jwtTokenGenerator;
    private final AuthenticationManager authenticationManager;
    private final UserUseCase userUseCase;
    private final UserConverter converter;

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody TokenRequestDataContract request)
            throws AuthenticationException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        final String token = jwtTokenGenerator.generateToken(authentication);

        return ResponseEntity.ok(new TokenResponseDataContract(token));
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody UserSignUpDataContract signUpDataContract) {
        User created = userUseCase.saveUserSignedUp(converter.convertUser(signUpDataContract));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(created.getUsername()).toUri();

        return ResponseEntity.created(location).body(created);
    }
}
