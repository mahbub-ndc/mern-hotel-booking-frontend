import { useQuery } from "react-query";

import { useParams } from "react-router-dom";
import AddHotel from "./AddHotel";
import { fetchHotelById } from "../api/global-api";

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
