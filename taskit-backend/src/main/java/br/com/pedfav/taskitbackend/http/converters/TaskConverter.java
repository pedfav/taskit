package br.com.pedfav.taskitbackend.http.converters;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.http.datacontracts.TaskDataContract;
import org.springframework.stereotype.Component;

@Component
public class TaskConverter {

    public Task convertTask(TaskDataContract dataContract) {
        return Task.builder()
                .title(dataContract.getTitle())
                .description(dataContract.getDescription())
                .targetDate(dataContract.getTargetDate())
                .department(Department.builder()
                        .id(dataContract.getDepartmentId())
                        .build())
                .requester(User.builder()
                        .username(dataContract.getRequesterUsername())
                        .build())
                .urgencyLevel(dataContract.getUrgency())
                .build();
    }

    public TaskDataContract convertTask(Task task) {
        return TaskDataContract.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .requesterUsername(task.getRequester().getUsername())
                .targetDate(task.getTargetDate())
                .urgency(task.getUrgencyLevel())
                .build();
    }
}
