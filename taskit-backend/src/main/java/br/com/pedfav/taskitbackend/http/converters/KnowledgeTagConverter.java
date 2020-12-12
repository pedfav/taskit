package br.com.pedfav.taskitbackend.http.converters;

import br.com.pedfav.taskitbackend.entities.KnowledgeTag;
import br.com.pedfav.taskitbackend.http.datacontracts.KnowledgeTagDataContract;
import org.springframework.stereotype.Component;

@Component
public class KnowledgeTagConverter {

    public KnowledgeTag convertKnowledgeTag(KnowledgeTagDataContract dataContract) {
        return KnowledgeTag.builder()
                .name(dataContract.getName())
                .build();
    }
}
