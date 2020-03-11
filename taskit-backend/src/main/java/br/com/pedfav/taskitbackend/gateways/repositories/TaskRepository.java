package br.com.pedfav.taskitbackend.gateways.repositories;


import br.com.pedfav.taskitbackend.entities.Department;
import br.com.pedfav.taskitbackend.entities.Task;
import br.com.pedfav.taskitbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByDepartmentAndResponsibleIsNull(Department department);

    List<Task> findByResponsible(User user);
}
