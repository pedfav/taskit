package com.tasks.taskit.controllers;

import com.tasks.taskit.entities.Departament;
import com.tasks.taskit.entities.enums.OperationType;
import com.tasks.taskit.entities.mongoEntities.TrackLog;
import com.tasks.taskit.usecases.DepartmentOperations;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping(value = "/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentOperations operations;

    final MongoTemplate mongoTemplate;

    @ApiOperation("Create an department")
    @ApiResponses({
            @ApiResponse(code=201,message = "Department created")
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Departament departament){
        departament.setGuid(java.util.UUID.randomUUID().toString());
        departament.setCreation(LocalDateTime.now());

        mongoTemplate.save(new TrackLog(OperationType.CREATION, departament));
        operations.save(departament);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
