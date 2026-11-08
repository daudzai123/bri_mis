package org.bri.management.teacher;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    @GetMapping
    public List<Teacher> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Teacher find(@PathVariable int id) {
        return service.find(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Teacher create(@Valid @RequestBody Teacher teacher) {
        return service.create(teacher);
    }

    @PutMapping("/{id}")
    public Teacher update(@PathVariable int id, @Valid @RequestBody Teacher teacher) {
        return service.update(id, teacher);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}
