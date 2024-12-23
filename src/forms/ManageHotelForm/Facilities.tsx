import { hotelFacilities } from "../../types";
import { useFormContext } from "react-hook-form";
import { HotelForm } from "../../pages/AddHotel";

const Facilities = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelForm>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className=" text-sm flex text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (value) => {
                  if (value.length > 0) return true;
                  else return "Please select at least one facility";
                },
              })}
            />
            {facility}
          </label>
        ))}

        {errors.facilities && (
          <span className="text-red-500">{errors.facilities.message}</span>
        )}
      </div>
    </div>
  );
};

export default Facilities;
