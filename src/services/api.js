export const API = import.meta.env.VITE_API_URL || "https://hope-one-backend.onrender.com/v1/api";

export const token = () => localStorage.getItem("organization_token") || "";

export async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || "Request failed");
  return payload.data;
}

export const authHeaders = () => ({ Authorization: `Bearer ${token()}` });
