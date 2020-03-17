package br.com.pedfav.taskitbackend.http.converters;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.entities.User;
import br.com.pedfav.taskitbackend.http.datacontracts.TaskDataContract;
import org.springframework.stereotype.Component;

import java.util.Objects;

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

        TaskDataContract.TaskDataContractBuilder taskDataContract = TaskDataContract.builder();

        if (!Objects.isNull(task.getResponsible())) {
            taskDataContract.responsibleUsername(task.getResponsible().getUsername());
        }

        return taskDataContract
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .requesterUsername(task.getRequester().getUsername())
                .targetDate(task.getTargetDate())
                .urgency(task.getUrgencyLevel())
                .done(task.isDone())
                .build();
    }
}
