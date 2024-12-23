import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppContext } from "@/contexts/AppContext";
import { AlignLeft } from "lucide-react";

import { Link } from "react-router-dom";
import SignOut from "./SignOut";

const MobileHeader = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <AlignLeft className="text-white" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {isLoggedIn ? (
              <div>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <div className="gap-5 flex flex-col">
                    <Link to={"/my-hotels"}>
                      <span className=" text-black">My Hotels</span>
                    </Link>
                    <Link to={"/my-bookings"}>
                      <span className=" text-black">My Bookings</span>
                    </Link>
                    <Link to={"/logout"}>
                      <span className=" text-white">
                        <SignOut />
                      </span>
                    </Link>
                  </div>
                </SheetDescription>
              </div>
            ) : (
              <>
                <Link to={"/login"}>Login</Link>
              </>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileHeader;
