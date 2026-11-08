import RecordsPage from "./RecordsPage";

export default function Students({ data, onChange, working, setWorking }) {
  const teachers = data.teachers.map((teacher) => ({
    id: teacher.teacherId,
    label: [teacher.firstname, teacher.lastname].filter(Boolean).join(" "),
  }));
  const departments = data.departments.map((department) => ({
    id: department.departmentId,
    label: department.departmentName,
  }));
  const fields = [
    { name: "studentName", label: "Student name", max: 130, required: true },
    { name: "lastname", label: "Last name", max: 130 },
    { name: "fathername", label: "Father's name", max: 130, required: true },
    { name: "phone", label: "Phone", type: "tel", max: 13, required: true },
    { name: "email", label: "Email", type: "email", max: 40, required: true },
    { name: "teacherId", label: "Teacher", options: teachers },
    { name: "departmentId", label: "Department", options: departments },
  ];

  return (
    <RecordsPage title="Students" name="student" idField="studentId"
                 endpoint="students" fields={fields} rows={data.students}
                 recordName={(row) => [row.studentName, row.lastname].filter(Boolean).join(" ")}
                 onChange={onChange} working={working} setWorking={setWorking} />
  );
}
