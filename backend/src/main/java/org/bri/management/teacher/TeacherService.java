package org.bri.management.teacher;

import java.util.List;

import org.bri.management.RecordNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeacherService {

    private final TeacherRepository repository;

    public TeacherService(TeacherRepository repository) {
        this.repository = repository;
    }

    public List<Teacher> list() {
        return repository.findAll(Sort.by("teacherId"));
    }

    public Teacher find(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Teacher", id));
    }

    public Teacher create(Teacher teacher) {
        return repository.save(teacher);
    }

    @Transactional
    public Teacher update(int id, Teacher changes) {
        Teacher teacher = find(id);
        teacher.setFirstname(changes.getFirstname());
        teacher.setLastname(changes.getLastname());
        teacher.setPhone(changes.getPhone());
        teacher.setEmail(changes.getEmail());
        teacher.setDepartmentId(changes.getDepartmentId());
        return teacher;
    }

    @Transactional
    public void delete(int id) {
        repository.delete(find(id));
    }
}
