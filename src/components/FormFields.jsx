import React from "react";

export function Input({ label, value, onChange, ...props }) {
  return <label className="field"><span>{label}</span><input value={value || ""} onChange={(event) => onChange(event.target.value)} {...props} /></label>;
}

export function TextArea({ label, value, onChange, ...props }) {
  return <label className="field"><span>{label}</span><textarea value={value || ""} onChange={(event) => onChange(event.target.value)} {...props} /></label>;
}
