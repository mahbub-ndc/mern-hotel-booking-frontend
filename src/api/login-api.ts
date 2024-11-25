import { LoginFormData } from "../pages/Login";

const login = async (data: LoginFormData) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
export const loginApi = login;
