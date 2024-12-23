/* eslint-disable @typescript-eslint/no-explicit-any */

import { BookingFormData } from "../forms/BookingForm/BookingForm";
import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const register = async (data: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/create-user`, {
    method: "POST",
    //credentials: "include",
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
export const registerApi = register;

const login = async (data: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  // console.log("response from client", responseBody.token);
  // responseBody.token = localStorage.setItem("token", responseBody.token);
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
export const loginApi = login;

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    credentials: "include",
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Token invalid: ${errorText}`);
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseData = await response.json();
  console.log("response", responseData.token);

  return responseData;
};

export const fetchCurrentUser = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users/get-user`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return await response.json();
};

export const addMyHotel = async (data: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
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
  const response = await fetch(`${API_BASE_URL}/hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return await response.json();
};

export const fetchHotelById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
};

export const viewHotelById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/hotel-list/${id}`);
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
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkin", searchParams.checkin || "");
  queryParams.append("checkout", searchParams.checkout || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/hotel-list/search?${queryParams}`
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
    `${API_BASE_URL}/hotel-list/${id}/bookings/payment-intent`,
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
    `${API_BASE_URL}/hotel-list/${formData.hotelId}/booking`,
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
  const response = await fetch(`${API_BASE_URL}/my-bookings`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return await response.json();
};

export const fetchAllHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/hotel-list/`, {});
  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }
  return await response.json();
};
