/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api/global-api";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

export type AppContextType = {
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, isError, status } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
      onSuccess: (data) => {
        if (data?.message === "Token is valid") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      },
      onError: (error) => {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      },
    }
  );

  // console.log("validate-token from context-api", data?.message);

  // if (data?.message === "Token is valid") {
  //   setIsLoggedIn(true);
  // } else {
  //   setIsLoggedIn(false);
  // }

  if (data) {
    console.log("Query succeeded:", data);
  }
  if (status === "error") {
    console.error("Query failed:", isError);
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, stripePromise }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
