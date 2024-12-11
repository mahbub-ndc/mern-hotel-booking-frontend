/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { fetchAllHotels } from "../api/hotelApi";
import { Link } from "react-router-dom";

export const Home = () => {
  const { data: hotels, isLoading } = useQuery("hotels", fetchAllHotels);
  if (isLoading) {
    return <div className="container mx-auto">Loading...</div>;
  }
  console.log(hotels);
  return (
    <div className="container mx-auto mb-10">
      <div>
        <h1 className="text-3xl font-bold py-5">Latest Hotels</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-5 py-6">
        {hotels?.data.map((hotel: any) => (
          <Link to={`/hotel/${hotel._id}`} className="cursor-pointer">
            <div className="relative" key={hotel.id}>
              <img
                src={hotel.imageUrls[0]}
                className="w-full h-full md:w-[250xp] md:h-[250px] object-cover object-center rounded-md"
              />
              <div className="absolute bottom-4 bg-slate-800 w-full p-4 opacity-75 rounded-md mb-[-16px]">
                <h2 className=" text-center text-xl font-bold text-white">
                  {hotel.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
