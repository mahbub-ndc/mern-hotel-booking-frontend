import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import SignOut from "./SignOut";

export const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext) as AppContext;

  return (
    <div className=" bg-blue-600 py-5">
      <div className="container">
        <div className="flex justify-between">
          <Link to={"/"}>
            <span className="text-2xl text-white">Hotel Booking</span>
          </Link>
          {isLoggedIn ? (
            <div className="flex gap-5">
              <Link to={"/my-hotels"}>
                <span className=" text-white">My Hotels</span>
              </Link>
              <Link to={"/my-bookings"}>
                <span className=" text-white">My Bookings</span>
              </Link>
              <Link to={"/logout"}>
                <span className=" text-white">
                  <SignOut />
                </span>
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>
              <span className="text-xl text-white">SignIn</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
