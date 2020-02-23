package br.com.pedfav.taskitbackend.gateways.repositories;

import br.com.pedfav.taskitbackend.entities.Role;
import br.com.pedfav.taskitbackend.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}