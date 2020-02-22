package br.com.pedfav.taskitbackend.config.jwt.resource;

import br.com.pedfav.taskitbackend.config.jwt.JwtTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    private final JwtTokenGenerator jwtTokenGenerator;
    private final AuthenticationManager authenticationManager;

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JwtTokenRequest request)
            throws AuthenticationException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        final String token = jwtTokenGenerator.generateToken(authentication);

        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}
