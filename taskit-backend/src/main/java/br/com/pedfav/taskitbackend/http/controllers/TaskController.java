package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.http.converters.TaskConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.TaskCreatedDataContract;
import br.com.pedfav.taskitbackend.http.datacontracts.TaskDataContract;
import br.com.pedfav.taskitbackend.usecases.TaskUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class TaskController {

    private final TaskUseCase taskUseCase;
    private final TaskConverter taskConverter;

    @PostMapping(value = "/task")
    public ResponseEntity<TaskCreatedDataContract> saveTask(@Valid @RequestBody TaskDataContract task) {

        Task created = taskUseCase.saveTask(taskConverter.convertTask(task));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/tasks/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(location).body(new TaskCreatedDataContract(created.getId()));
    }

    @GetMapping(value = "/task/users-department/{username}")
    public ResponseEntity<List<TaskDataContract>> tasksByUserDepartment(@PathVariable("username") String username) {

        List<TaskDataContract> tasks = taskUseCase.tasksByUserDepartment(username)
                .stream()
                .map(taskConverter::convertTask)
                .collect(Collectors.toList());

        return ResponseEntity.ok(tasks);
    }

    @GetMapping(value = "/task/user-responsible/{username}")
    public ResponseEntity<List<TaskDataContract>> tasksByUserResponsible(@PathVariable("username") String username) {

        List<TaskDataContract> tasks = taskUseCase.tasksByUserResponsible(username)
                .stream()
                .map(taskConverter::convertTask)
                .collect(Collectors.toList());

        return ResponseEntity.ok(tasks);
    }

    @PatchMapping(value = "/task/assign-task/{task-id}/user/{username}")
    public ResponseEntity assignTask(@PathVariable("task-id") Long taskId, @PathVariable("username") String username) {

        taskUseCase.assignTask(taskId, username);

        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "/task/finish-task/{task-id}")
    public ResponseEntity finishTask(@PathVariable("task-id") Long taskId) {

        taskUseCase.finishTask(taskId);

        return ResponseEntity.ok().build();
    }
}
