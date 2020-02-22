package br.com.pedfav.taskitbackend.config.jwt.resource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

