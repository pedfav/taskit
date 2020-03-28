package br.com.pedfav.taskitbackend.http.datacontracts;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDataContract {

    @NotBlank
    private String username;

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}
