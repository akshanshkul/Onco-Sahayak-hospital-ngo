import React, { useState } from "react";
import { api, authHeaders } from "../../services/api";
import { Input, TextArea } from "../../components/FormFields";

export default function Settings({ organization, onSaved }) {
  const [form, setForm] = useState(organization);
  const [message, setMessage] = useState("");
  const details = form.details || {};
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateDetail = (key, value) => update("details", { ...(form.details || {}), [key]: value });
  const save = async (event) => {
    event.preventDefault();
    try {
      const data = await api("/organizations/profile", { method: "PATCH", headers: authHeaders(), body: JSON.stringify(form) });
      setForm(data.organization);
      onSaved(data.organization);
      setMessage("Your public profile was updated.");
    } catch (error) {
      setMessage(error.message);
    }
  };
  const isHospital = form.type === "hospital";
  return <section className="panel-card editor"><div className="panel-heading"><div><h2>Profile & contact</h2><p>Families will see these details in the Onco Sahayak app.</p></div></div>{message && <div className="success">{message}</div>}<form onSubmit={save}><div className="form-grid"><Input label="Display name" value={form.display_name} onChange={(value) => update("display_name", value)} /><Input label="Legal name" value={form.legal_name} onChange={(value) => update("legal_name", value)} /><Input label="Public phone" value={form.phone} onChange={(value) => update("phone", value)} /><Input label="Public email" value={details.contactEmail} onChange={(value) => updateDetail("contactEmail", value)} /><Input label="Website" value={form.website} onChange={(value) => update("website", value)} /><Input label="State" value={form.state} onChange={(value) => update("state", value)} /><Input label="District" value={form.district} onChange={(value) => update("district", value)} /><Input label="PIN code" value={form.pin_code} onChange={(value) => update("pin_code", value)} /><Input label="Banner image URL" value={details.bannerUrl} onChange={(value) => updateDetail("bannerUrl", value)} />{isHospital && <><Input label="Emergency phone" value={details.emergencyPhone} onChange={(value) => updateDetail("emergencyPhone", value)} /><Input label="Opening hours" value={details.hours} onChange={(value) => updateDetail("hours", value)} /><Input label="Speciality" value={details.specialty} onChange={(value) => updateDetail("specialty", value)} /><Input label="Tagline" value={details.tagline} onChange={(value) => updateDetail("tagline", value)} /><Input label="Years of service" value={details.years} onChange={(value) => updateDetail("years", value)} /></>}</div><TextArea label="Address" value={form.address} onChange={(value) => update("address", value)} /><TextArea label="About organisation" value={form.description} onChange={(value) => update("description", value)} /><button className="primary compact" type="submit">Save updates</button></form></section>;
}
