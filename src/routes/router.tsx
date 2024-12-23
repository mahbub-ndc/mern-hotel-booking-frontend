import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Layout } from "../layout/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";

import AddHotel from "../pages/AddHotel";

import MyHotel from "../pages/MyHotel";
import EditHotel from "../pages/EditHotel";
import { Search } from "../pages/Search";
import HotelDetails from "../pages/HotelDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/myBookings";

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
        element: <AddHotel hotel={undefined} />,
      },
      {
        path: "/my-hotels",
        element: <MyHotel />,
      },
      {
        path: "/edit-hotel/:id",
        element: <EditHotel />,
      },
      {
        path: "/search",
        element: <Search />,
      },

      {
        path: "/hotel/:id",
        element: <HotelDetails />,
      },
      {
        path: "/hotel/:id/booking",
        element: <Booking />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
    ],
  },
]);
export default router;
