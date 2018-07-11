package com.tasks.taskit.controllers;

import com.tasks.taskit.entities.Departament;
import com.tasks.taskit.entities.enums.OperationType;
import com.tasks.taskit.entities.mongoEntities.TrackLog;
import com.tasks.taskit.usecases.DepartmentOperations;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping(value = "/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentOperations operations;

    final MongoTemplate mongoTemplate;

    @ApiOperation("findOne - Search for a department by id")
    @ApiResponses({
            @ApiResponse(code=200,message = "Departament found"),
            @ApiResponse(code=404,message = "Departament not found")
    })
    @GetMapping(
            value = "/{guid}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Departament> findOne(@PathVariable String guid){
        mongoTemplate.save(new TrackLog(OperationType.FIND_ONE, guid));

        try{
            return ResponseEntity.ok().body(operations.findOne(guid));
        } catch (Exception e){
            mongoTemplate.save(new TrackLog(OperationType.FIND_ONE, e.getMessage()));
            return ResponseEntity.notFound().build();
        }
    }

    @ApiOperation("Create an department")
    @ApiResponses({
            @ApiResponse(code=201,message = "Department created")
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Departament departament){
        departament.setGuid(java.util.UUID.randomUUID().toString());
        departament.setCreation(LocalDateTime.now());

        mongoTemplate.save(new TrackLog(OperationType.CREATION, departament));

        try {
            operations.save(departament);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e){
            mongoTemplate.save(new TrackLog(OperationType.ERROR, e.getMessage()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
