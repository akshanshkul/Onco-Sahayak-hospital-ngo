import React, { useEffect, useMemo, useState } from "react";
import { api, authHeaders } from "../services/api";

const definitions = {
  patients: { title: "Patients", fields: [["name", "Patient name"], ["phone", "Phone"], ["diagnosis", "Diagnosis"], ["cancer_stage", "Cancer stage"], ["status", "Status"], ["notes", "Notes"]] },
  appointments: { title: "Appointments", fields: [["doctor_name", "Doctor"], ["appointment_at", "Date and time"], ["type", "Appointment type"], ["status", "Status"], ["notes", "Notes"]] },
  events: { title: "Events & camps", fields: [["title", "Event title"], ["description", "Description"], ["starts_at", "Start date and time"], ["location", "Location"], ["banner_url", "Banner URL"], ["status", "Status"]] },
  documents: { title: "Documents", fields: [["name", "Document name"], ["storage_key", "Storage key"], ["category", "Category"], ["expires_at", "Expiry date"], ["status", "Status"]] },
  announcements: { title: "Announcements", fields: [["title", "Title"], ["message", "Message"], ["published_at", "Publish date"], ["status", "Status"]] },
  staff: { title: "Staff", fields: [["name", "Name"], ["email", "Email"], ["role", "Role"], ["phone", "Phone"], ["status", "Status"]] },
};

export default function PartnerRecords({ resource }) {
  const definition = definitions[resource] || definitions.patients;
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const fields = useMemo(() => definition.fields, [definition]);
  const load = () => api(`/partner/${resource}`, { headers: authHeaders() }).then((data) => setRecords(data.records || [])).catch((error) => setMessage(error.message));
  useEffect(() => { load(); }, [resource]);
  const save = async (event) => {
    event.preventDefault();
    try {
      await api(`/partner/${resource}`, { method: "POST", headers: authHeaders(), body: JSON.stringify(form) });
      setForm({});
      setMessage("Saved successfully.");
      load();
    } catch (error) { setMessage(error.message); }
  };
  const remove = async (id) => {
    try { await api(`/partner/${resource}/${id}`, { method: "DELETE", headers: authHeaders() }); setRecords((current) => current.filter((record) => record.id !== id)); } catch (error) { setMessage(error.message); }
  };
  return <section className="panel-card editor">
    <div className="panel-heading"><div><h2>{definition.title}</h2><p>This information is stored for your organization and is no longer demo-only.</p></div></div>
    {message && <div className="success">{message}</div>}
    <form onSubmit={save}><div className="form-grid">{fields.map(([key, label]) => <label className="field" key={key}><span>{label}</span><input type={key.includes("at") ? "datetime-local" : key.includes("date") ? "date" : "text"} value={form[key] || ""} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} /></label>)}</div><button className="primary compact" type="submit">Save {definition.title.replace(/s$/, "")}</button></form>
    <div className="demo-table-wrap records-table"><table><thead><tr>{fields.slice(0, 4).map(([, label]) => <th key={label}>{label}</th>)}<th>Action</th></tr></thead><tbody>{records.map((record) => <tr key={record.id}>{fields.slice(0, 4).map(([key]) => <td key={key}>{record[key] || "—"}</td>)}<td><button className="remove-button" onClick={() => remove(record.id)}>Remove</button></td></tr>)}</tbody></table>{!records.length && <div className="empty-inline">No records saved yet.</div>}</div>
  </section>;
}
