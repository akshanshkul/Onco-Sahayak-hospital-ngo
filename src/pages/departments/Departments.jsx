import React, { useState } from "react";
import { api, authHeaders } from "../../services/api";
import { Input } from "../../components/FormFields";
import DemoNotice from "../../components/common/DemoNotice";

export default function Departments({ organization, onSaved }) {
  const initialDepartments = Array.isArray(organization.details?.departments) ? organization.details.departments : [];
  const [departments, setDepartments] = useState(initialDepartments);
  const [message, setMessage] = useState("");
  const update = (index, value) => setDepartments((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  const add = () => setDepartments((current) => [...current, ""]);
  const remove = (index) => setDepartments((current) => current.filter((_, itemIndex) => itemIndex !== index));
  const save = async (event) => {
    event.preventDefault();
    try {
      const details = { ...(organization.details || {}), departments: departments.map((item) => item.trim()).filter(Boolean) };
      const data = await api("/organizations/profile", { method: "PATCH", headers: authHeaders(), body: JSON.stringify({ ...organization, details }) });
      onSaved(data.organization);
      setMessage("Departments updated. The mobile hospital catalogue will use these after refresh.");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return <section className="panel-card editor">
    <div className="panel-heading"><div><h2>Departments</h2><p>Manage the departments families see in your hospital profile.</p></div><button className="outline" type="button" onClick={add}>Add department</button></div>
    {initialDepartments.length === 0 && <DemoNotice>No saved departments were found yet. Add the hospital departments you want to publish.</DemoNotice>}
    {message && <div className="success">{message}</div>}
    <form onSubmit={save}>{departments.length === 0 ? <div className="empty-inline">No departments added yet.</div> : departments.map((department, index) => <div className="list-editor-row" key={`${index}-${department}`}><Input label={`Department ${index + 1}`} value={department} onChange={(value) => update(index, value)} /><button className="remove-button" type="button" onClick={() => remove(index)}>Remove</button></div>)}<button className="primary compact" type="submit">Save departments</button></form>
  </section>;
}
