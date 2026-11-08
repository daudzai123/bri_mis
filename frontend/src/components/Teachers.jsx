import RecordsPage from "./RecordsPage";

export default function Teachers({ data, onChange, working, setWorking }) {
  const departments = data.departments.map((department) => ({
    id: department.departmentId,
    label: department.departmentName,
  }));
  const fields = [
    { name: "firstname", label: "First name", max: 130, required: true },
    { name: "lastname", label: "Last name", max: 130 },
    { name: "phone", label: "Phone", type: "tel", max: 13, required: true },
    { name: "email", label: "Email", type: "email", max: 40, required: true },
    { name: "departmentId", label: "Department", options: departments },
  ];

  return (
    <RecordsPage title="Teachers" name="teacher" idField="teacherId"
                 endpoint="teachers" fields={fields} rows={data.teachers}
                 recordName={(row) => [row.firstname, row.lastname].filter(Boolean).join(" ")}
                 onChange={onChange} working={working} setWorking={setWorking} />
  );
}
