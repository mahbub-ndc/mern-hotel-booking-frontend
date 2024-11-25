import { useFormContext } from "react-hook-form";

import { hotelTypes } from "../../types";
import { HotelForm } from "../../pages/AddHotel";

const HotelType = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelForm>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
        {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
      </div>
    </div>
  );
};
export default HotelType;
