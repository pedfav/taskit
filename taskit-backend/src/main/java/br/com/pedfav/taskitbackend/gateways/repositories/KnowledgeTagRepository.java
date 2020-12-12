package br.com.pedfav.taskitbackend.gateways.repositories;

import br.com.pedfav.taskitbackend.entities.KnowledgeTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KnowledgeTagRepository extends JpaRepository<KnowledgeTag, Long> {

    Optional<KnowledgeTag> findByName(String name);

    boolean existsByName(String name);

    List<KnowledgeTag> findByNameContaining(String name);

}
