package org.bri.management.student;

import java.util.List;

import org.bri.management.RecordNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> list() {
        return repository.findAll(Sort.by("studentId"));
    }

    public Student find(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Student", id));
    }

    public Student create(Student student) {
        return repository.save(student);
    }

    @Transactional
    public Student update(int id, Student changes) {
        Student student = find(id);
        student.setStudentName(changes.getStudentName());
        student.setLastname(changes.getLastname());
        student.setFathername(changes.getFathername());
        student.setPhone(changes.getPhone());
        student.setEmail(changes.getEmail());
        student.setTeacherId(changes.getTeacherId());
        student.setDepartmentId(changes.getDepartmentId());
        return student;
    }

    @Transactional
    public void delete(int id) {
        repository.delete(find(id));
    }
}
