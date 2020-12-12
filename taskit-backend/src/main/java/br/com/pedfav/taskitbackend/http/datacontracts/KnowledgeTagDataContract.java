package br.com.pedfav.taskitbackend.http.datacontracts;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KnowledgeTagDataContract {

    private Long id;

    @NotBlank
    private String name;

    private LocalDateTime creationDate;
}
