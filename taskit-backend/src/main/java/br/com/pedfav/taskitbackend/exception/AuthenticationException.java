package br.com.pedfav.taskitbackend.exception;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

