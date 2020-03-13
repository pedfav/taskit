package br.com.pedfav.taskitbackend.usecases;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.exception.ResourceNotFoundException;
import br.com.pedfav.taskitbackend.gateways.repositories.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DepartmentUseCase {

    private final DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }


    public List<Department> getAllActiveDepartments() {
        return departmentRepository.findByActiveIsTrue();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "Department id", id));
    }

    public Department createDepartment(Department department) {
        department.setCreationTime(LocalDateTime.now());
        return departmentRepository.save(department);
    }
}
