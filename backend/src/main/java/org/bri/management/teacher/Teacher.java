package org.bri.management.teacher;

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
@Table(name = "teachers")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer teacherId;

    @NotBlank @Size(max = 130)
    private String firstname;

    @Size(max = 130)
    private String lastname;

    @NotBlank @Size(max = 13)
    private String phone;

    @NotBlank @Email @Size(max = 40)
    private String email;

    @Column(name = "department_id")
    private Integer departmentId;
}
