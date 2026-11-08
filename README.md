# BRI Management System

A local classroom project for Bayzid Rokhan Institute. Use the React interface to add, list, edit, and delete departments, teachers, and students. The app opens directly to the records screen and requires no sign-in.

## Run locally

You need Java 17 or newer, Maven, PostgreSQL, and Node.js 20 or newer with npm.

1. Start PostgreSQL and create an empty database named `bri_management` if it does not already exist. Use pgAdmin or run this command if PostgreSQL's command-line tools are on your PATH.

   ```powershell
   createdb -U postgres bri_management
   ```

2. Check the PostgreSQL connection settings in [application.properties](backend/src/main/resources/application.properties). The defaults use database `bri_management` on port 5432 and user `postgres`. Set your PostgreSQL password as an environment variable, then start Spring Boot from the project root.

   ```powershell
   $env:DB_PASSWORD = "your-postgresql-password"
   cd backend
   mvn spring-boot:run
   ```

   Spring Boot runs [schema.sql](backend/src/main/resources/schema.sql) at startup and creates any missing tables. In pgAdmin, refresh **Databases → bri_management → Schemas → public → Tables** to see them.

3. Open a second terminal at the project root and start React.

   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd start
   ```

4. Open [the BRI interface](http://127.0.0.1:3000). Start by adding a department, then a teacher, then a student if you want to try the relationship dropdowns. The dropdowns are optional. To delete a record referenced by another row, first clear or change that reference.

The React development server uses esbuild to serve JavaScript and CSS from memory. It does not generate a cache or output folder.

## Follow one request

When you save a department, React sends its name to `POST /api/departments` on port 8080. [DepartmentController.java](backend/src/main/java/org/bri/management/department/DepartmentController.java) accepts the request and [DepartmentService.java](backend/src/main/java/org/bri/management/department/DepartmentService.java) calls `save` on [DepartmentRepository.java](backend/src/main/java/org/bri/management/department/DepartmentRepository.java). Spring Data JPA supplies the repository methods. PostgreSQL assigns the ID and the API returns the saved [Department.java](backend/src/main/java/org/bri/management/department/Department.java) entity.

The `department`, `teacher`, and `student` Java packages each contain those four layers. In React, `Departments.jsx`, `Teachers.jsx`, and `Students.jsx` define their fields and use the shared form and table components in [frontend/src/components](frontend/src/components).

The same five operations are available under `/api/departments`, `/api/teachers`, and `/api/students`.

| Method | Path suffix | Operation |
| --- | --- | --- |
| GET | | List records |
| GET | `/{id}` | Read one record |
| POST | | Create a record |
| PUT | `/{id}` | Update a record |
| DELETE | `/{id}` | Delete a record |
