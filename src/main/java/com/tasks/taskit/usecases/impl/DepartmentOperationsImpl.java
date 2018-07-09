package com.tasks.taskit.usecases.impl;

import com.tasks.taskit.entities.Departament;
import com.tasks.taskit.gateways.DepartmentRepository;
import com.tasks.taskit.usecases.DepartmentOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@RequiredArgsConstructor
public class DepartmentOperationsImpl implements DepartmentOperations {

    final DepartmentRepository repository;

    @Override
    public void save(Departament departament) {
        repository.save(departament);
    }
}
