/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import GuestForm from "../forms/GuestForm";
import { viewHotelById } from "../api/global-api";

const HotelDetails = () => {
  const { id } = useParams();
  const { data: hotelData } = useQuery(["hotel", id], () =>
    viewHotelById(id as string)
  );
  console.log(hotelData);

  return (
    <div className=" container-fluid px-5 md:container mx-auto">
      <div className="flex gap-1 pt-5">
        {Array.from({ length: hotelData?.data?.rating }).map(() => (
          <AiFillStar className="text-yellow-500" />
        ))}
      </div>
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold">{hotelData?.data.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {hotelData?.data.imageUrls.map((image: any) => (
          <img
            className=" w-full md:w-[350px] md:h-[250px] rounded"
            src={image}
            alt="hotel"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
        <p>{hotelData?.data.description}</p>
        <div className=" bg-slate-200  rounded-sm p-3">
          <GuestForm
            pricePerNight={hotelData?.data.pricePerNight}
            hotelId={hotelData?.data._id}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 py-5 ">
        {hotelData?.data.facilities.map((facility: any) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
