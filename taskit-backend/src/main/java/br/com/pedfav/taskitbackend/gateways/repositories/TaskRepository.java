package br.com.pedfav.taskitbackend.gateways.repositories;


import br.com.pedfav.taskitbackend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
