import React, { useEffect, useState } from "react";
import { api, authHeaders } from "../services/api";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardHome from "../components/dashboard/DashboardHome";
import Settings from "./settings/Settings";
import DemoPage from "./DemoPage";
import Doctors from "./doctors/Doctors";
import Departments from "./departments/Departments";
import ContentEditor from "./ContentEditor";
import PartnerRecords from "./PartnerRecords";

export default function Dashboard({ session, onLogout }) {
  const [organization, setOrganization] = useState(session.organization || session.user);
  const [section, setSection] = useState(window.location.pathname.split("/")[2] || "overview");

  useEffect(() => {
    api("/organizations/profile", { headers: authHeaders() }).then((data) => setOrganization(data.organization)).catch(() => onLogout());
    const onPopState = () => setSection(window.location.pathname.split("/")[2] || "overview");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextSection) => {
    setSection(nextSection);
    window.history.pushState({}, "", nextSection === "overview" ? "/dashboard" : `/dashboard/${nextSection}`);
  };

  const content = section === "overview"
    ? <DashboardHome organization={organization} onNavigate={navigate} />
    : section === "profile"
    ? <Settings organization={organization} onSaved={setOrganization} />
    : section === "team"
    ? <Doctors organization={organization} onSaved={setOrganization} onSettings={() => navigate("profile")} />
    : section === "departments"
    ? <Departments organization={organization} onSaved={setOrganization} />
    : section === "services"
    ? <ContentEditor organization={organization} mode="hospital" onSaved={setOrganization} />
    : section === "support"
    ? <ContentEditor organization={organization} mode="ngo" onSaved={setOrganization} />
    : ["patients", "appointments", "events", "documents", "announcements", "staff"].includes(section)
    ? <PartnerRecords resource={section} />
    : <DemoPage section={section} />;

  return <AdminLayout organization={organization} section={section} onNavigate={navigate} onLogout={onLogout}>{content}</AdminLayout>;
}
