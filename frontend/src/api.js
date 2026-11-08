const API_URL = "http://127.0.0.1:8080/api";

export async function request(path, method = "GET", data) {
  const response = await fetch(API_URL + "/" + path, {
    method,
    headers: data ? { "Content-Type": "application/json" } : undefined,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed (HTTP " + response.status + ").");
  }

  return response.status === 204 ? null : response.json();
}
