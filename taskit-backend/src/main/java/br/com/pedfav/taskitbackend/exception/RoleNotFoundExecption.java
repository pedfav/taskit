package br.com.pedfav.taskitbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class RoleNotFoundExecption extends RuntimeException {
    public RoleNotFoundExecption(String message) {
        super(message);
    }
}
