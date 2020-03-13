package br.com.pedfav.taskitbackend.entities;

import br.com.pedfav.taskitbackend.enums.Urgency;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDate targetDate;

    @ManyToOne
    @JoinColumn(name = "idDepartment")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "idRequester")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "idResponsible")
    private User responsible;
    private Urgency urgencyLevel;
    private boolean done;
}
