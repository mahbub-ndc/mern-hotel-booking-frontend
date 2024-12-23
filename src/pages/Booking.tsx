import { useQuery } from "react-query";
import {
  createPaymentIntent,
  fetchCurrentUser,
  viewHotelById,
} from "../api/global-api";

import { useParams } from "react-router-dom";
import { BookingForm } from "../forms/BookingForm/BookingForm";
import BookingSummary from "../components/BookingSummary";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useAppContext } from "../contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const { id } = useParams();
  const { data: hotel } = useQuery(["hotel", id], () =>
    viewHotelById(id as string)
  );
  console.log("booking-page", hotel);

  const search = useContext(SearchContext);

  const { data: user } = useQuery("user", fetchCurrentUser);

  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (search?.checkIn && search.checkOut) {
      const timeOfStays =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setDuration(Math.ceil(timeOfStays));
    }
  }, [search?.checkIn, search?.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => createPaymentIntent(id as string, duration.toString()),
    {
      enabled: !!id && duration > 0,
    }
  );
  console.log("paymentIntentData", paymentIntentData);

  if (!user) {
    return <div>...loading</div>;
  }

  if (!hotel) {
    return <div>...loading</div>;
  }

  return (
    <div className="container-fluid px-5 md:container   mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 py-5">
        <div>
          <BookingSummary
            checkIn={search?.checkIn}
            checkOut={search?.checkOut}
            adultCount={search?.adultCount}
            childCount={search?.childCount ?? 0}
            hotel={hotel}
            duration={duration}
          />
        </div>
        <div>
          {user && paymentIntentData && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntentData.clientSecret,
              }}
            >
              <BookingForm user={user} paymentIntent={paymentIntentData} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};
export default Booking;
