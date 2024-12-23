import { Link } from "react-router-dom";

import SignOut from "./SignOut";
import MobileHeader from "./MobileHeader";

import { useAppContext } from "@/contexts/AppContext";

export const Navbar = () => {
  const { isLoggedIn } = useAppContext();
  console.log("navbar", isLoggedIn);

  return (
    <div className=" bg-blue-600 py-5">
      <div className=" container-fluid px-5 md:container">
        <div className="flex justify-between">
          <Link to={"/"}>
            <span className="text-2xl text-white">Hotel Booking</span>
          </Link>
          {isLoggedIn ? (
            <>
              <div className="md:hidden">
                <MobileHeader />
              </div>
              <div className="hidden md:block">
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
              </div>
            </>
          ) : (
            <>
              <div className=" md:hidden ">
                <MobileHeader />
              </div>
              <div className="hidden md:block text-white">
                <Link to={"/login"}>Login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
