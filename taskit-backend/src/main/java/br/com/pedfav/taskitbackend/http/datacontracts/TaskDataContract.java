package br.com.pedfav.taskitbackend.http.datacontracts;

import br.com.pedfav.taskitbackend.enums.Urgency;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDataContract {

    private Long id;

    @NotBlank
    @Size(max = 50)
    private String title;

    @NotBlank
    private String description;

    @Future
    private LocalDate targetDate;

    @NotNull
    private Long departmentId;

    @NotBlank
    private String requesterUsername;

    private String responsibleUsername;

    @NotNull
    private Urgency urgency;

    private boolean done;
}
