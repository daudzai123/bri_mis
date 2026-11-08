import RecordsPage from "./RecordsPage";

const fields = [
  { name: "departmentName", label: "Department name", max: 40, required: true },
];

export default function Departments({ data, onChange, working, setWorking }) {
  return (
    <RecordsPage title="Departments" name="department" idField="departmentId"
                 endpoint="departments" fields={fields} rows={data.departments}
                 recordName={(row) => row.departmentName}
                 onChange={onChange} working={working} setWorking={setWorking} />
  );
}
