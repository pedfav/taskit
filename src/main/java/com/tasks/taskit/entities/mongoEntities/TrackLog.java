package com.tasks.taskit.entities.mongoEntities;

import com.tasks.taskit.entities.enums.OperationType;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.CollectionTable;

@AllArgsConstructor
@Document(collection="trackLog")
public class TrackLog {

    private OperationType operationType;
    private Object object;
}
