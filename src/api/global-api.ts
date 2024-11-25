export const validateToken = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/auth/validate-token",
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
    credentials: "include",
    method: "POST",
  });
  return response.json();
};

export const testForm = async (data: FormData) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/test/create-test",
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: data,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return response.json();
};
