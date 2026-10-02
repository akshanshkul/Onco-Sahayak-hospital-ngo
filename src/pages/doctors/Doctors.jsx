import React, { useMemo, useState } from "react";
import { api, authHeaders } from "../../services/api";
import { Input } from "../../components/FormFields";
import DemoNotice from "../../components/common/DemoNotice";

export default function Doctors({ organization, onSaved, onSettings }) {
  const initialDoctors = Array.isArray(organization.details?.doctors) ? organization.details.doctors : [];
  const [doctors, setDoctors] = useState(initialDoctors);
  const [message, setMessage] = useState("");
  const hasRealDoctors = initialDoctors.length > 0;
  const update = (index, key, value) => setDoctors((current) => current.map((doctor, itemIndex) => itemIndex === index ? { ...doctor, [key]: value } : doctor));
  const add = () => setDoctors((current) => [...current, { name: "", role: "", exp: "" }]);
  const remove = (index) => setDoctors((current) => current.filter((_, itemIndex) => itemIndex !== index));
  const save = async (event) => {
    event.preventDefault();
    try {
      const details = { ...(organization.details || {}), doctors };
      const data = await api("/organizations/profile", { method: "PATCH", headers: authHeaders(), body: JSON.stringify({ ...organization, details }) });
      onSaved(data.organization);
      setMessage("Doctor team updated. Mobile hospital details will use these records after refresh.");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return <section className="panel-card editor">
    <div className="panel-heading"><div><h2>Doctors & team</h2><p>This is the same team shown in the hospital details screen in the mobile app.</p></div><button className="outline" type="button" onClick={add}>Add doctor</button></div>
    {!hasRealDoctors && <DemoNotice>No saved doctors were found yet. Add your real hospital team below.</DemoNotice>}
    {message && <div className="success">{message}</div>}
    <form onSubmit={save}>{doctors.length === 0 ? <div className="empty-inline">No doctors added yet. Add your first doctor to publish the team.</div> : doctors.map((doctor, index) => <div className="doctor-editor-card" key={`${index}-${doctor.name}`}><div className="doctor-editor-title"><strong>Doctor {index + 1}</strong><button className="remove-button" type="button" onClick={() => remove(index)}>Remove</button></div><div className="form-grid"><Input label="Doctor name" value={doctor.name} onChange={(value) => update(index, "name", value)} /><Input label="Specialisation / role" value={doctor.role} onChange={(value) => update(index, "role", value)} /><Input label="Experience" value={doctor.exp} onChange={(value) => update(index, "exp", value)} /></div></div>)}<button className="primary compact" type="submit">Save doctor team</button></form>
  </section>;
}
