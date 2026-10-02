import React, { useState } from "react";
import { api } from "../../services/api";
import { Input, TextArea } from "../../components/FormFields";
import { emptyForm } from "../../data/portal";
import Icon from "../../components/Icon";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [type, setType] = useState("hospital");
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value, type }));
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await api(mode === "login" ? "/organizations/login" : "/organizations/register", {
        method: "POST",
        body: JSON.stringify(mode === "login" ? { email: form.email, password: form.password } : form),
      });
      localStorage.setItem("organization_token", data.token);
      onLogin(data);
    } catch (requestError) {
      setError(requestError.message);
    }
  };
  return <main className="auth-layout">
    <section className="auth-brand">
      <div className="auth-brand-top"><img className="brand-logo-image" src="/onco-sahayak-logo.png" alt="Onco Sahayak" /><span className="brand-context">Care partner portal</span></div>
      <div className="auth-brand-copy"><span className="eyebrow">A BETTER WAY TO SUPPORT FAMILIES</span><h1>Help people find the right care, at the right time.</h1><p>Keep your hospital or organisation information clear, trusted and easy to find in the Onco Sahayak app.</p><div className="brand-points"><span><Icon name="check" size={15} /> Keep your public profile current</span><span><Icon name="check" size={15} /> Share doctors, services and support</span><span><Icon name="check" size={15} /> Connect families to your team</span></div></div>
      <div className="auth-brand-footer">Together, we make cancer care easier to navigate.</div>
    </section>
    <section className="auth-card">
      <div className="auth-card-head"><span className="auth-icon"><Icon name="hospital" size={22} /></span><div><p className="eyebrow">{mode === "login" ? "PARTNER SIGN IN" : "NEW PARTNER"}</p><h2>{mode === "login" ? "Welcome back" : "Create your partner profile"}</h2></div></div>
      <p className="auth-intro">{mode === "login" ? "Sign in to keep your hospital or organisation information up to date." : "Tell us about your organisation so families can find and trust your services."}</p>
      <div className="switch"><button className={type === "hospital" ? "active" : ""} onClick={() => { setType("hospital"); update("type", "hospital"); }}>Hospital</button><button className={type === "ngo" ? "active" : ""} onClick={() => { setType("ngo"); update("type", "ngo"); }}>NGO / Trust</button></div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        {mode === "register" && <><Input label="Legal name" required value={form.legalName} onChange={(value) => update("legalName", value)} /><Input label="Display name" required value={form.displayName} onChange={(value) => update("displayName", value)} /><Input label="Contact person" required value={form.contactName} onChange={(value) => update("contactName", value)} /><Input label="Phone" value={form.phone} onChange={(value) => update("phone", value)} /></>}
        <Input label="Email" type="email" required value={form.email} onChange={(value) => update("email", value)} /><Input label="Password" type="password" required minLength="8" value={form.password} onChange={(value) => update("password", value)} />
        {mode === "register" && <><Input label="Website" value={form.website} onChange={(value) => update("website", value)} /><TextArea label="Address" value={form.address} onChange={(value) => update("address", value)} /><TextArea label="Description" value={form.description} onChange={(value) => update("description", value)} /></>}
        <button className="primary" type="submit">{mode === "login" ? "Sign in securely" : "Create partner account"}</button>
      </form>
      <div className="auth-switch-copy"><span>{mode === "login" ? "New to the partner portal?" : "Already have an account?"}</span><button className="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Register your organisation" : "Sign in here"}</button></div>
    </section>
  </main>;
}
