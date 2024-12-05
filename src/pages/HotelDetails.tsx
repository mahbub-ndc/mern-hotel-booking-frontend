/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { viewHotelById } from "../api/hotelApi";
import { AiFillStar } from "react-icons/ai";

const HotelDetails = () => {
  const { id } = useParams();
  const { data: hotelData } = useQuery(["hotel", id], () =>
    viewHotelById(id as string)
  );
  console.log(hotelData);

  return (
    <div className="container mx-auto">
      <div className="flex gap-1 pt-5">
        {Array.from({ length: hotelData?.data?.rating }).map(() => (
          <AiFillStar className="text-yellow-500" />
        ))}
      </div>
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold">{hotelData?.data.name}</h2>
      </div>
      <div className="flex gap-5">
        <p>{hotelData?.data.description}</p>
      </div>
      <div className="flex gap-5 pt-5">
        {hotelData?.data.imageUrls.map((image: any) => (
          <img
            className="w-[250px] h-[250px] rounded"
            src={image}
            alt="hotel"
          />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
