package br.com.pedfav.taskitbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CouldNotUpdateTaskException extends RuntimeException {
    public CouldNotUpdateTaskException(String message) {
        super(message);
    }
}
