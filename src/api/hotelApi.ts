export const addMyHotel = async (data: FormData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/hotels", {
      credentials: "include",

      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add hotel");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding hotel:", error);
    throw error;
  }
};
