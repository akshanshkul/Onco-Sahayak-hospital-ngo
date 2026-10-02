export const emptyForm = {
  type: "hospital", legalName: "", displayName: "", contactName: "", email: "",
  password: "", phone: "", website: "", address: "", state: "", district: "",
  pinCode: "", description: "", details: {},
};

export const sections = [
  ["overview", "dashboard", "Dashboard"], ["patients", "patients", "Patients"], ["appointments", "appointments", "Appointments"],
  ["team", "doctors", "Doctors"], ["departments", "departments", "Departments"], ["services", "services", "Medical services"],
  ["events", "events", "Events & camps"], ["profile", "settings", "Hospital settings"], ["support", "support", "Support programmes"],
  ["documents", "documents", "Documents"], ["announcements", "announcement", "Announcements"], ["staff", "users", "Staff"],
  ["reviews", "feedback", "Feedback"], ["analytics", "analytics", "Analytics"],
];
