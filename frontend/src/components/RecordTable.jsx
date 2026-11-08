function cellValue(record, field) {
  const value = record[field.name];
  if (value == null || value === "") return "—";
  if (!field.options) return value;

  return field.options.find((option) => option.id === value)?.label ?? "#" + value;
}

export default function RecordTable({ title, name, idField, fields, rows, disabled, onEdit, onDelete }) {
  if (rows.length === 0) {
    return <p className="empty">No {title.toLowerCase()} yet. Use “Add {name}” to create the first record.</p>;
  }

  return (
    <div className="table-scroll">
      <table aria-label={title}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            {fields.map((field) => <th key={field.name} scope="col">{field.label}</th>)}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[idField]}>
              <td>{row[idField]}</td>
              {fields.map((field) => <td key={field.name}>{cellValue(row, field)}</td>)}
              <td>
                <div className="actions">
                  <button disabled={disabled} onClick={() => onEdit(row)}>Edit</button>
                  <button className="danger" disabled={disabled} onClick={() => onDelete(row)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
