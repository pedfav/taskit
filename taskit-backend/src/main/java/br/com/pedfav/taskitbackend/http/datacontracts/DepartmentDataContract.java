package br.com.pedfav.taskitbackend.http.datacontracts;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DepartmentDataContract {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private boolean active;
}
