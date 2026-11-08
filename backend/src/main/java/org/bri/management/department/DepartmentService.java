package org.bri.management.department;

import java.util.List;

import org.bri.management.RecordNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<Department> list() {
        return repository.findAll(Sort.by("departmentId"));
    }

    public Department find(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Department", id));
    }

    public Department create(Department department) {
        return repository.save(department);
    }

    @Transactional
    public Department update(int id, Department changes) {
        Department department = find(id);
        department.setDepartmentName(changes.getDepartmentName());
        return department;
    }

    @Transactional
    public void delete(int id) {
        repository.delete(find(id));
    }
}
