import { BookingFormData } from "../forms/BookingForm/BookingForm";

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
  const queryParams = new URLSearchParams();
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

export const createPaymentIntent = async (
  id: string,
  numberOfNights: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/hotel-list/${id}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  console.log("formdataid", formData.hotelId);
  const response = await fetch(
    `http://localhost:3000/api/v1/hotel-list/${formData.hotelId}/booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async () => {
  const response = await fetch("http://localhost:3000/api/v1/my-bookings", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return await response.json();
};

export const fetchAllHotels = async () => {
  const response = await fetch(`http://localhost:3000/api/v1/hotel-list/`, {});
  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }
  return await response.json();
};
