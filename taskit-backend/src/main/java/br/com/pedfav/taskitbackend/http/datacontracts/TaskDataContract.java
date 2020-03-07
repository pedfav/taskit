package br.com.pedfav.taskitbackend.http.datacontracts;

import br.com.pedfav.taskitbackend.enums.Urgency;
import lombok.Data;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class TaskDataContract {

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

    @NotNull
    private Urgency urgency;
}
