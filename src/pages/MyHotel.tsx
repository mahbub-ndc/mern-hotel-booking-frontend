/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchMyHotels } from "../api/hotelApi";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotel = () => {
  const { data: hotels } = useQuery("data", fetchMyHotels, {
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  console.log(hotels);

  if (!hotels) {
    return <div className="text-center py-5">Loading...</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">My Hotels</h1>
        <Link to={"/add-hotel"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Hotel
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {hotels?.data.map((hotel: any) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex gap-3 items-center">
                {
                  <img
                    className="rounded w-[50px]"
                    src={hotel?.imageUrls[0]}
                    alt={hotel.name}
                  />
                }
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.rating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
