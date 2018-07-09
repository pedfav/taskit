package com.tasks.taskit.gateways;

import com.tasks.taskit.entities.Departament;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepository extends CrudRepository<Departament, String> {
}
