package br.com.pedfav.taskitbackend.http.controllers;

import br.com.pedfav.taskitbackend.enums.Urgency;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross-origin.front-end}")
public class UrgencyController {

    @GetMapping("/urgency")
    public List<Urgency> getAllDepartments() {
        return Arrays.asList(Urgency.values());
    }
}
