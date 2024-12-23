/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { fetchMyBookings } from "../api/global-api";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery("myBookings", fetchMyBookings);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(hotels);
  return (
    <div className=" container-fluid px-5 md:container mx-auto">
      <div className="flex flex-col gap-5 py-10">
        {hotels?.data?.map((hotel: any) => (
          <div
            key={hotel.id}
            className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full rounded"
            />
            <div>
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs font-normal">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking: any) => (
                <div>
                  <div>
                    <span className="font-bold mr-2">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
