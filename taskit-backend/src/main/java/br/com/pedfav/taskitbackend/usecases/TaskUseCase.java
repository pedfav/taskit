package br.com.pedfav.taskitbackend.usecases;

import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.exception.CouldNotInsertTaskException;
import br.com.pedfav.taskitbackend.gateways.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class TaskUseCase {

    private final TaskRepository taskRepository;
    private final UserUseCase userUseCase;

    public Task saveTask(Task task) {

        try {
            task.setCreationDate(LocalDateTime.now());
            User requester = userUseCase.getUserByUsername(task.getRequester().getUsername());
            task.setRequester(requester);
            return taskRepository.save(task);
        } catch (RuntimeException e) {
            throw new CouldNotInsertTaskException("Could not insert task!");
        }

    }
}
