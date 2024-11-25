import { RegisterFormData } from "../pages/Register";

const register = async (data: RegisterFormData) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/users/create-user",
    {
      method: "POST",
      //credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
export const registerApi = register;
