import { useState } from "react";
import { request } from "../api";
import RecordForm from "./RecordForm";
import RecordTable from "./RecordTable";

export default function RecordsPage({
  title, name, idField, fields, recordName, rows, endpoint, onChange, working, setWorking,
}) {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const id = record?.[idField];

  function openForm(row = {}) {
    setError("");
    setRecord(row);
  }

  function closeForm() {
    setRecord(null);
    setError("");
  }

  async function save(values) {
    setWorking(true);
    setError("");

    try {
      if (id == null) {
        const saved = await request(endpoint, "POST", values);
        onChange([...rows, saved]);
      } else {
        const saved = await request(endpoint + "/" + id, "PUT", values);
        onChange(rows.map((row) => row[idField] === id ? saved : row));
      }
      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setWorking(false);
    }
  }

  async function remove(row) {
    if (!window.confirm("Delete " + recordName(row) + "?")) return;

    setWorking(true);
    setError("");
    try {
      await request(endpoint + "/" + row[idField], "DELETE");
      onChange(rows.filter((item) => item[idField] !== row[idField]));
    } catch (error) {
      setError(error.message);
    } finally {
      setWorking(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <h1>{title}</h1>
        <button className="primary" disabled={working || Boolean(record)} onClick={() => openForm()}>
          Add {name}
        </button>
      </div>

      {error && <p className="notice" role="alert">{error}</p>}
      {record && (
        <RecordForm fields={fields} name={name} record={record} editing={id != null}
                    saving={working} onSave={save} onCancel={closeForm} />
      )}
      <RecordTable title={title} name={name} idField={idField} fields={fields} rows={rows}
                   disabled={working || Boolean(record)} onEdit={openForm} onDelete={remove} />
    </section>
  );
}
