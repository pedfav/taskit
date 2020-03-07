package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.http.converters.TaskConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.TaskDataContract;
import br.com.pedfav.taskitbackend.usecases.TaskUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class TaskController {

    private final TaskUseCase taskUseCase;
    private final TaskConverter taskConverter;

    @PostMapping(value = "/task")
    public ResponseEntity<Task> saveTask(@Valid @RequestBody TaskDataContract task) {

        Task created = taskUseCase.saveTask(taskConverter.convertTask(task));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/tasks/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(location).body(created);
    }
}
