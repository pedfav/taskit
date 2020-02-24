package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.usecases.DepartmentUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class DepartmentController {

    private final DepartmentUseCase departmentUseCase;

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentUseCase.getAllDepartments();
    }

}
