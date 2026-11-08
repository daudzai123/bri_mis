import { useState } from "react";

export default function RecordForm({ fields, name, record, editing, saving, onSave, onCancel }) {
  const [values, setValues] = useState(
    () => Object.fromEntries(fields.map((field) => [field.name, record[field.name] ?? ""]))
  );

  function submit(event) {
    event.preventDefault();

    const data = {};
    for (const field of fields) {
      const value = String(values[field.name]).trim();
      if (field.options) {
        data[field.name] = value === "" ? null : Number(value);
      } else {
        data[field.name] = field.required ? value : value || null;
      }
    }
    onSave(data);
  }

  return (
    <form className="record-form" onSubmit={submit}>
      <h2>{editing ? "Edit " : "Add "}{name}</h2>
      <div className="form-grid">
        {fields.map((field) => {
          const input = {
            name: field.name,
            value: values[field.name],
            onChange: (event) => setValues({ ...values, [field.name]: event.target.value }),
            disabled: saving,
            required: field.required,
          };

          return (
            <label key={field.name}>
              {field.label}{field.required && <span aria-hidden="true"> *</span>}
              {field.options ? (
                <select {...input}>
                  <option value="">None</option>
                  {field.options.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input {...input} type={field.type || "text"} maxLength={field.max} />
              )}
            </label>
          );
        })}
      </div>
      <div className="actions">
        <button className="primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <button type="button" disabled={saving} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
