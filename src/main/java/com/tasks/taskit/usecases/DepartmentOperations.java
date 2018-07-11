package com.tasks.taskit.usecases;

import com.tasks.taskit.entities.Departament;

public interface DepartmentOperations {

    public void save (Departament departament);

    public Departament findOne(String guid);
}
