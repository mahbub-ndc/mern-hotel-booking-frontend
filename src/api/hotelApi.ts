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

export const fetchMyHotels = async () => {
  const response = await fetch("http://localhost:3000/api/v1/hotels", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return await response.json();
};

export const fetchHotelById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/hotels/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
};

export const viewHotelById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/hotel-list/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
};

export type searchParams = {
  destination?: string;
  checkin?: string;
  checkout?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export const searchHotels = async (searchParams: searchParams) => {
  const queryParams = new URLSearchParams(searchParams);
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkin", searchParams.checkin || "");
  queryParams.append("checkout", searchParams.checkout || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  const response = await fetch(
    `http://localhost:3000/api/v1/hotel-list/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return await response.json();
};
