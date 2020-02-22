package br.com.pedfav.taskitbackend.usecases;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.gateways.repositories.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DepartmentUseCase {

    private final DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
