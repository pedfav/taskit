package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.http.converters.DepartmentConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.DepartmentDataContract;
import br.com.pedfav.taskitbackend.usecases.DepartmentUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class DepartmentController {

    private final DepartmentUseCase departmentUseCase;
    private final DepartmentConverter departmentConverter;

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentUseCase.getAllDepartments();
    }

    @GetMapping("/active-departments")
    public List<Department> getAllActiveDepartments() {
        return departmentUseCase.getAllActiveDepartments();
    }

    @GetMapping("/departments/{id}")
    public Department getDepartmentById(@PathVariable("id") Long id) {
        return departmentUseCase.getDepartmentById(id);
    }

    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@Valid @RequestBody DepartmentDataContract department) {

        Department created = departmentUseCase.createDepartment(departmentConverter.convertTask(department));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/departments/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(location).body(created);
    }
}
