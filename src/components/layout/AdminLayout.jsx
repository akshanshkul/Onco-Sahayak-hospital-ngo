import React from "react";
import Icon from "../Icon";
import { sections } from "../../data/portal";

export default function AdminLayout({ organization, section, onNavigate, onLogout, children }) {
  const isHospital = organization.type === "hospital";
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="side-brand"><img className="sidebar-logo-image sidebar-logo-full" src="/onco-sahayak-logo.png" alt="Onco Sahayak" /><img className="sidebar-logo-image sidebar-logo-mark" src="/onco-sahayak-mark.png" alt="Onco Sahayak" /></div>
      <div className="org-mini"><div className="avatar">{(organization.display_name || "P").slice(0, 1)}</div><div><strong>{organization.display_name}</strong><small>{isHospital ? "Hospital partner" : "NGO partner"}</small></div></div>
      <nav>{sections.map(([id, icon, label]) => <button key={id} className={section === id ? "selected" : ""} onClick={() => onNavigate(id)}><b><Icon name={icon} size={18} /></b>{label}</button>)}</nav>
      <button className="side-logout" onClick={onLogout}><Icon name="logout" size={18} />Sign out</button>
    </aside>
    <main className="main-area"><header className="topbar"><div><span className="eyebrow">PARTNER PORTAL / {section.toUpperCase()}</span><h1>{sections.find((item) => item[0] === section)?.[2] || "Dashboard"}</h1></div><span className="verified">● {organization.verification_status || "Pending review"}</span></header>{children}</main>
  </div>;
}
