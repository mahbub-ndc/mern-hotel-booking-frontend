import { useQuery } from "react-query";
import { fetchHotelById } from "../api/hotelApi";
import { useParams } from "react-router-dom";
import AddHotel from "./AddHotel";

const EditHotel = () => {
  const { id } = useParams();
  const { data: hotel } = useQuery(["hotel", id], () =>
    fetchHotelById(id as string)
  );
  //console.log(hotel);
  return (
    <div>
      <AddHotel hotel={hotel} />
    </div>
  );
};

export default EditHotel;
