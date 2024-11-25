import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Layout } from "../layout/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";

import AddHotel from "../pages/AddHotel";
import { TestForm } from "../pages/TestPage";
import MyHotel from "../pages/MyHotel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-hotel",
        element: <AddHotel />,
      },
      {
        path: "/my-hotel",
        element: <MyHotel />,
      },
      {
        path: "/test",
        element: <TestForm />,
      },
    ],
  },
]);
export default router;
