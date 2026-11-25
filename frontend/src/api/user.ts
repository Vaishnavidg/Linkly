import { API_URL } from "./config";

async function authenticate(path: string, body: Record<string, string>, fallbackMessage: string) {
  const response = await fetch(`${API_URL}/user/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || fallbackMessage);

  localStorage.setItem("token", data.token);
  return data;
}

export const signupUser = (username: string, email: string, password: string) =>
  authenticate("signup", { name: username, email, password }, "Failed to sign up user");

export const loginUser = (email: string, password: string) =>
  authenticate("login", { email, password }, "Failed to log in user");
