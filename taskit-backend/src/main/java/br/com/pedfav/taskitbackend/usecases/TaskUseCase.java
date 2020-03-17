package br.com.pedfav.taskitbackend.usecases;

import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.exception.CouldNotInsertTaskException;
import br.com.pedfav.taskitbackend.exception.ResourceNotFoundException;
import br.com.pedfav.taskitbackend.gateways.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

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
            task.setDone(false);
            return taskRepository.save(task);
        } catch (RuntimeException e) {
            throw new CouldNotInsertTaskException("Could not insert task!");
        }

    }

    public List<Task> tasksByUserDepartment(String username) {

        try {
            User user = userUseCase.getUserByUsername(username);

            return taskRepository.findByDepartmentAndResponsibleIsNull(user.getDepartment());

        } catch (RuntimeException e) {
            throw new ResourceNotFoundException("Tasks", "username", username);
        }
    }

    public List<Task> tasksByResponsibleUser(String username) {

        try {

            User user = userUseCase.getUserByUsername(username);

            return taskRepository.findByResponsible(user);

        } catch (RuntimeException e) {
            throw new ResourceNotFoundException("Tasks", "username", username);
        }
    }

    public List<Task> tasksByRequesterUser(String username) {

        try {
            User user = userUseCase.getUserByUsername(username);

            return taskRepository.findByRequester(user);

        } catch (RuntimeException e) {
            throw new ResourceNotFoundException("Tasks", "username", username);
        }
    }

    public Task assignTask(Long taskId, String username) {
        try {
            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new ResourceNotFoundException("Task", "Task id", taskId));

            User user = userUseCase.getUserByUsername(username);

            task.setResponsible(user);

            return taskRepository.save(task);
        } catch (RuntimeException e) {
            throw new CouldNotInsertTaskException("Could not update task!");
        }
    }

    public Task finishTask(Long taskId) {
        try {
            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new ResourceNotFoundException("Task", "Task id", taskId));

            task.setDone(true);

            return taskRepository.save(task);
        } catch (RuntimeException e) {
            throw new CouldNotInsertTaskException("Could not update task!");
        }
    }
}
