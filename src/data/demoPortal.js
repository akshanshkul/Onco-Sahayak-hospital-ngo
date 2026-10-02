export const demoPages = {
  patients: {
    title: "Patients",
    description: "Demo patient records are shown here until the patient management API is connected.",
    columns: ["Patient ID", "Name", "Age", "Cancer type", "Status", "Next visit"],
    rows: [
      ["PT-1001", "Anita Sharma", "43", "Breast cancer", "Active", "30 Sep 2026"],
      ["PT-1002", "Rajesh Verma", "56", "Lung cancer", "Active", "29 Sep 2026"],
      ["PT-1003", "Sunita Devi", "38", "Cervical cancer", "Under treatment", "02 Oct 2026"],
      ["PT-1004", "Mohd. Arif", "61", "Colon cancer", "Follow up", "01 Oct 2026"],
    ],
  },
  appointments: {
    title: "Appointments",
    description: "A sample schedule helps you preview this page before appointment APIs are available.",
    columns: ["Time", "Patient", "Visit type", "Doctor", "Status"],
    rows: [
      ["09:00 AM", "Anita Sharma", "Follow up", "Dr. Mehta", "Confirmed"],
      ["09:30 AM", "Rajesh Verma", "Consultation", "Dr. Singh", "Confirmed"],
      ["10:00 AM", "Sunita Devi", "Chemotherapy", "Dr. Patel", "Waiting"],
      ["10:30 AM", "Mohd. Arif", "Review", "Dr. Mehta", "Confirmed"],
    ],
  },
  team: {
    title: "Doctors",
    description: "These demo doctors illustrate the team workspace. Hospital profile doctors are managed from the connected profile settings.",
    columns: ["Name", "Specialisation", "Experience", "Status"],
    rows: [
      ["Dr. S. Mehta", "Medical Oncologist", "18 years", "Active"],
      ["Dr. P. Singh", "Surgical Oncologist", "14 years", "Active"],
      ["Dr. K. Reddy", "Hematologist", "11 years", "Active"],
    ],
  },
  departments: {
    title: "Departments",
    description: "Demo department data is shown until department management APIs are added.",
    columns: ["Department", "Head", "Patients this month", "Status"],
    rows: [
      ["Medical Oncology", "Dr. S. Mehta", "320", "Open"],
      ["Radiation Oncology", "Dr. P. Singh", "186", "Open"],
      ["Surgical Oncology", "Dr. K. Reddy", "95", "Open"],
    ],
  },
  services: {
    title: "Medical services",
    description: "Demo service data is shown here. Public facilities, schemes and treatment costs are connected in Hospital settings.",
    columns: ["Service", "Department", "Typical cost", "Availability"],
    rows: [
      ["Chemotherapy", "Medical Oncology", "₹10,000 – ₹25,000", "Available"],
      ["Radiation therapy", "Radiation Oncology", "₹35,000 – ₹80,000", "Available"],
      ["Cancer surgery", "Surgical Oncology", "Case based", "Available"],
    ],
  },
  events: {
    title: "Events & camps",
    description: "Demo events help you preview community outreach until events APIs are available.",
    columns: ["Event", "Date", "Location", "Type", "Status"],
    rows: [
      ["Breast Cancer Screening Camp", "05 Oct 2026", "Hospital campus", "Camp", "Published"],
      ["Cancer Awareness Seminar", "12 Oct 2026", "Community hall", "Seminar", "Published"],
      ["Patient Support Group", "18 Oct 2026", "Support centre", "Support", "Draft"],
    ],
  },
  support: {
    title: "Support programmes",
    description: "Demo support entries are shown until programme management APIs are available.",
    columns: ["Programme", "Support offered", "Eligibility", "Status"],
    rows: [
      ["Treatment assistance desk", "Financial guidance", "Low-income patients", "Published"],
      ["Patient travel support", "Local travel help", "Active treatment", "Published"],
      ["Counselling referral", "Emotional support", "Patients and families", "Published"],
    ],
  },
  documents: {
    title: "Documents",
    description: "Demo documents are shown until partner document management APIs are available.",
    columns: ["Document", "Category", "Updated", "Visibility"],
    rows: [
      ["Hospital registration certificate", "Verification", "20 Sep 2026", "Private"],
      ["PM-JAY empanelment letter", "Schemes", "18 Sep 2026", "Public"],
      ["Patient information booklet", "Patient care", "12 Sep 2026", "Public"],
    ],
  },
  reviews: {
    title: "Feedback",
    description: "Reviews are currently collected from the mobile app. These sample entries show the planned feedback view.",
    columns: ["Patient", "Rating", "Comment", "Date"],
    rows: [
      ["Meena R.", "★★★★★", "The team explained every step clearly.", "28 Sep 2026"],
      ["Rahul S.", "★★★★☆", "Helpful staff and affordable treatment.", "19 Sep 2026"],
      ["Pooja D.", "★★★★★", "Doctors were patient and supportive.", "11 Sep 2026"],
    ],
  },
  analytics: {
    title: "Analytics",
    description: "These charts are demo summaries until analytics APIs are available.",
    columns: ["Measure", "This month", "Last month", "Change"],
    rows: [
      ["Patients served", "1,284", "1,148", "+12%"],
      ["Appointments completed", "32", "28", "+14%"],
      ["Support referrals", "86", "73", "+18%"],
    ],
  },
};

export const demoDashboard = {
  patients: [
    ["PT-1001", "Anita Sharma", "43", "Breast cancer", "Active"],
    ["PT-1002", "Rajesh Verma", "56", "Lung cancer", "Active"],
    ["PT-1003", "Sunita Devi", "38", "Cervical cancer", "Under treatment"],
  ],
  appointments: [
    ["09:00 AM", "Anita Sharma", "Follow up", "Dr. Mehta"],
    ["09:30 AM", "Rajesh Verma", "Consultation", "Dr. Singh"],
    ["10:00 AM", "Sunita Devi", "Chemotherapy", "Dr. Patel"],
  ],
  events: [
    ["Breast Cancer Screening Camp", "05 Oct 2026", "Camp"],
    ["Cancer Awareness Seminar", "12 Oct 2026", "Seminar"],
    ["Patient Support Group", "18 Oct 2026", "Support"],
  ],
};
