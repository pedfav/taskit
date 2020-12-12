package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.entities.KnowledgeTag;
import br.com.pedfav.taskitbackend.http.converters.KnowledgeTagConverter;
import br.com.pedfav.taskitbackend.http.datacontracts.KnowledgeTagDataContract;
import br.com.pedfav.taskitbackend.usecases.KnowledgeTagUseCase;
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
public class KnowledgeTagController {

    private final KnowledgeTagUseCase knowledgeTagUseCase;
    private final KnowledgeTagConverter knowledgeTagConverter;

    @GetMapping("/knowledge-tags/{id}")
    public KnowledgeTag getById(@PathVariable("id") Long id) {
        return knowledgeTagUseCase.getById(id);
    }

    @GetMapping("/knowledge-tags")
    public List<KnowledgeTag> getAll() {
        return knowledgeTagUseCase.getAllTags();
    }

    @GetMapping("/knowledge-tags/auto-complete/{name}")
    public List<KnowledgeTag> findByNameContaining(@PathVariable("name") String name) {
        return knowledgeTagUseCase.findByNameContaining(name);
    }

    @PostMapping("/knowledge-tags")
    public ResponseEntity<KnowledgeTag> createDepartment(@Valid @RequestBody KnowledgeTagDataContract knowledgeTagDataContract) {

        KnowledgeTag created = knowledgeTagUseCase.saveKnowledgeTag(knowledgeTagConverter.convertKnowledgeTag(knowledgeTagDataContract));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/knowledge-tags/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(location).body(created);
    }

    @DeleteMapping("/knowledge-tags/{id}")
    public ResponseEntity<Void> deleteTagById(@PathVariable("id") Long id) {
        knowledgeTagUseCase.deleteTag(id);

        return ResponseEntity.ok().build();
    }
}
