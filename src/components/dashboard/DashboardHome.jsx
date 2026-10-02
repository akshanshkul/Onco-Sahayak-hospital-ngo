import React from "react";
import Icon from "../Icon";
import DemoNotice from "../common/DemoNotice";
import { demoDashboard } from "../../data/demoPortal";

export default function DashboardHome({ organization, onNavigate }) {
  const details = organization.details || {};
  const doctors = Array.isArray(details.doctors) ? details.doctors : [];
  const stats = [["patientGroup", "Total patients", "1,284", "teal"], ["appointments", "Today's appointments", "48", "blue"], ["doctors", "Total doctors", String(doctors.length || 24), "violet"], ["departments", "Departments", String(details.departments?.length || 8), "green"]];
  return <div className="dashboard-home">
    <section className="welcome-banner" style={details.bannerUrl ? { backgroundImage: `linear-gradient(90deg, #e7f5ffdd, #e7f5ff66), url(${details.bannerUrl})` } : undefined}><div><span className="eyebrow">GOOD MORNING</span><h2>Welcome, {organization.display_name}</h2><p>Keep your public care information current for families.</p><button className="banner-action" onClick={() => onNavigate("profile")}>Update public profile <Icon name="arrowRight" size={15} /></button></div><div className="date-card"><small>Today</small><strong>02 OCT</strong><b>2026</b></div></section>
    <div className="metric-grid">{stats.map(([icon, label, value, tone]) => <div className={`metric-card ${tone}`} key={label}><span className="metric-icon"><Icon name={icon} size={21} /></span><div><small>{label}</small><strong>{value}</strong><em>Updated workspace</em></div></div>)}</div>
    <div className="dashboard-columns"><section className="dashboard-card wide-card"><div className="card-heading"><div><h3>Recent patients</h3><DemoNotice>Patient API is not connected yet.</DemoNotice></div><button onClick={() => onNavigate("patients")}>View all <Icon name="arrowRight" size={14} /></button></div><table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Condition</th><th>Status</th></tr></thead><tbody>{demoDashboard.patients.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 4 ? <span className="status-pill green">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></section><section className="dashboard-card"><div className="card-heading"><div><h3>Quick actions</h3><DemoNotice>These actions are UI-only until their APIs are available.</DemoNotice></div></div><div className="quick-actions"><button onClick={() => onNavigate("patients")}><Icon name="patients" size={20} /><span>Patients</span></button><button onClick={() => onNavigate("appointments")}><Icon name="appointments" size={20} /><span>Appointments</span></button><button onClick={() => onNavigate("team")}><Icon name="doctors" size={20} /><span>Doctors</span></button><button onClick={() => onNavigate("events")}><Icon name="events" size={20} /><span>Events</span></button></div></section></div>
  </div>;
}
