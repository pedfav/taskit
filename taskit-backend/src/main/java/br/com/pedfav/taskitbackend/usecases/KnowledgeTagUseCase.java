package br.com.pedfav.taskitbackend.usecases;

import br.com.pedfav.taskitbackend.entities.KnowledgeTag;
import br.com.pedfav.taskitbackend.exception.CouldNotInsertTaskException;
import br.com.pedfav.taskitbackend.exception.KnowledgeExceptionAlreadyExistsException;
import br.com.pedfav.taskitbackend.exception.ResourceNotFoundException;
import br.com.pedfav.taskitbackend.gateways.repositories.KnowledgeTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class KnowledgeTagUseCase {

    private final KnowledgeTagRepository knowledgeTagRepository;

    public KnowledgeTag getById(Long id) {
        return knowledgeTagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Knowledge tag", "Knowledge tag id", id));
    }

    public List<KnowledgeTag> getAllTags() {
        return knowledgeTagRepository.findAll();
    }

    public KnowledgeTag saveKnowledgeTag(KnowledgeTag tag) {

        if (knowledgeTagRepository.existsByName(tag.getName())) {
            throw new KnowledgeExceptionAlreadyExistsException("Knowledge tag already exists!");
        }

        try {
            tag.setCreationDate(LocalDateTime.now());
            return knowledgeTagRepository.save(tag);
        } catch (RuntimeException e) {
            throw new CouldNotInsertTaskException("Could not insert task!");
        }
    }

    public void deleteTag(long id) {

        knowledgeTagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag", "Tag id", id));

        knowledgeTagRepository.deleteById(id);
    }

    public List<KnowledgeTag> findByNameContaining(String namePart) {
        return knowledgeTagRepository.findByNameContaining(namePart);
    }
}
