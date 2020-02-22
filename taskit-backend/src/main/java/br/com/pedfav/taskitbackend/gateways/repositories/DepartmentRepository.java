package br.com.pedfav.taskitbackend.gateways.repositories;

import br.com.pedfav.taskitbackend.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
