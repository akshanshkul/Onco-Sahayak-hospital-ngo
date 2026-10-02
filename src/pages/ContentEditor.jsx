import React, { useEffect, useState } from "react";
import { api, authHeaders } from "../services/api";
import { Input } from "../components/FormFields";

const arrayValue = (value) => Array.isArray(value) ? value : [];

export default function ContentEditor({ organization, mode, onSaved }) {
  const isHospital = mode === "hospital";
  const fields = isHospital
    ? [["facilities", "Facilities"], ["schemes", "Government schemes"]]
    : [["coverage", "Support coverage"], ["eligibility", "Eligibility"], ["documents", "Required documents"], ["howToApply", "How to apply"]];
  const [details, setDetails] = useState(organization.details || {});
  const [costs, setCosts] = useState(arrayValue(organization.details?.costs));
  const [message, setMessage] = useState("");
  useEffect(() => {
    setDetails(organization.details || {});
    setCosts(arrayValue(organization.details?.costs));
  }, [organization]);
  const updateList = (key, index, value) => setDetails((current) => ({ ...current, [key]: arrayValue(current[key]).map((item, itemIndex) => itemIndex === index ? value : item) }));
  const addList = (key) => setDetails((current) => ({ ...current, [key]: [...arrayValue(current[key]), ""] }));
  const removeList = (key, index) => setDetails((current) => ({ ...current, [key]: arrayValue(current[key]).filter((_, itemIndex) => itemIndex !== index) }));
  const save = async (event) => {
    event.preventDefault();
    try {
      const nextDetails = { ...details, ...(isHospital ? { costs: costs.filter((item) => item.label?.trim() || item.value?.trim()) } : {}) };
      const data = await api("/organizations/profile", { method: "PATCH", headers: authHeaders(), body: JSON.stringify({ ...organization, details: nextDetails }) });
      onSaved(data.organization);
      setMessage("Published changes to the Onco Sahayak app. Users will see them after refreshing the catalogue.");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return <section className="panel-card editor">
    <div className="panel-heading"><div><h2>{isHospital ? "Medical services & support" : "Support programmes"}</h2><p>Manage the information families see in the mobile catalogue.</p></div></div>
    {message && <div className="success">{message}</div>}
    <form onSubmit={save}>
      {fields.map(([key, label]) => <div className="content-list-editor" key={key}><div className="editor-subheading"><h3>{label}</h3><button className="outline" type="button" onClick={() => addList(key)}>Add</button></div>{arrayValue(details[key]).length === 0 && <p className="empty-inline">No {label.toLowerCase()} published yet. Use Add to create the first entry.</p>}{arrayValue(details[key]).map((item, index) => <div className="list-editor-row" key={`${key}-${index}`}><Input label={`${label} ${index + 1}`} value={item} onChange={(value) => updateList(key, index, value)} /><button className="remove-button" type="button" onClick={() => removeList(key, index)}>Remove</button></div>)}</div>)}
      {isHospital && <div className="content-list-editor"><div className="editor-subheading"><h3>Treatment costs</h3><button className="outline" type="button" onClick={() => setCosts((current) => [...current, { label: "", value: "", note: "" }])}>Add</button></div>{costs.length === 0 && <p className="empty-inline">No treatment costs published yet. Use Add to create the first estimate.</p>}{costs.map((cost, index) => <div className="cost-editor-row" key={`cost-${index}`}><Input label="Treatment" value={cost.label} onChange={(value) => setCosts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: value } : item))} /><Input label="Estimated cost" value={cost.value} onChange={(value) => setCosts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value } : item))} /><Input label="Note" value={cost.note} onChange={(value) => setCosts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, note: value } : item))} /><button className="remove-button" type="button" onClick={() => setCosts((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></div>)}</div>}
      <button className="primary compact" type="submit">Save and publish</button>
    </form>
  </section>;
}
