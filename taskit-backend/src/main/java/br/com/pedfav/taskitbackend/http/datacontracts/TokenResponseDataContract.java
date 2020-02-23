package br.com.pedfav.taskitbackend.http.datacontracts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDataContract {

    private String token;

}