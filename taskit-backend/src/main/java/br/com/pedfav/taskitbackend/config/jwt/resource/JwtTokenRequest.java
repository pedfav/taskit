package br.com.pedfav.taskitbackend.config.jwt.resource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenRequest{

    private String username;
    private String password;
}

