CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
    teacher_id SERIAL PRIMARY KEY,
    firstname VARCHAR(130) NOT NULL,
    lastname VARCHAR(130),
    phone VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    department_id INT REFERENCES departments(department_id)
);

CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(130) NOT NULL,
    lastname VARCHAR(130),
    fathername VARCHAR(130) NOT NULL,
    phone VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    teacher_id INT REFERENCES teachers(teacher_id),
    department_id INT REFERENCES departments(department_id)
);
