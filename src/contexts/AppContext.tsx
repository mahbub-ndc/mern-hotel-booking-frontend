import React from "react";

import { useQuery } from "react-query";
import * as apiClient from "../api/global-api";

export type AppContext = {
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContext | undefined>(
  undefined
);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   return context as AppContext;
// };
