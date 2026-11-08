package org.bri.management;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.ServletWebRequest;

@RestControllerAdvice
class ApiErrors {

    @ExceptionHandler(RecordNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Map<String, String> notFound(RecordNotFoundException exception) {
        return Map.of("message", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> invalidInput(MethodArgumentNotValidException exception) {
        var field = exception.getBindingResult().getFieldErrors().get(0);
        return Map.of("message", field.getField() + " " + field.getDefaultMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    Map<String, String> constraintViolation(DataIntegrityViolationException exception, WebRequest request) {
        if (exception.getMostSpecificCause() instanceof SQLException cause
                && "23505".equals(cause.getSQLState())) {
            return Map.of("message", "This phone number or email already exists in this list.");
        }
        if (request instanceof ServletWebRequest servletRequest
                && HttpMethod.DELETE.equals(servletRequest.getHttpMethod())) {
            return Map.of("message", "This record is in use. Update or remove the records that refer to it first.");
        }
        return Map.of("message", "Check that the selected teacher and department still exist.");
    }
}
