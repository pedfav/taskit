package com.tasks.taskit.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Departament {

    @Id
    private String guid;

    private String name;

    private String description;

    private LocalDateTime creation;
}
