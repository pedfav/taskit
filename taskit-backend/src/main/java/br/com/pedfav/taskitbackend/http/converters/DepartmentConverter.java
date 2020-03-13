package br.com.pedfav.taskitbackend.http.converters;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.http.datacontracts.DepartmentDataContract;
import org.springframework.stereotype.Component;

@Component
public class DepartmentConverter {

    public Department convertTask(DepartmentDataContract dataContract) {
        return Department.builder()
                .name(dataContract.getName())
                .description(dataContract.getDescription())
                .active(dataContract.isActive())
                .build();
    }
}
