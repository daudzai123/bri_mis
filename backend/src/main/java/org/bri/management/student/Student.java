package org.bri.management.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer studentId;

    @NotBlank @Size(max = 130)
    @Column(name = "student_name")
    private String studentName;

    @Size(max = 130)
    private String lastname;

    @NotBlank @Size(max = 130)
    private String fathername;

    @NotBlank @Size(max = 13)
    private String phone;

    @NotBlank @Email @Size(max = 40)
    private String email;

    @Column(name = "teacher_id")
    private Integer teacherId;

    @Column(name = "department_id")
    private Integer departmentId;
}
