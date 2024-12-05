import { useFormContext } from "react-hook-form";

import { HotelForm } from "../../pages/AddHotel";

const FormDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelForm>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-semibold">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label className="text-gray-700 text-sm font-semibold">
            City
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("city", { required: "This field is required" })}
            ></input>
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </label>
        </div>
        <div className="flex-1">
          <label className="text-gray-700 text-sm font-semibold">
            Country
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("country", { required: "This field is required" })}
            ></input>
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </label>
        </div>
      </div>
      <label className="text-gray-700 text-sm font-semibold">
        Description
        <textarea
          rows={7}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-semibold flex flex-col">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-1/2 py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-semibold">
        Rating
        <select
          {...register("rating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-400 font-normal"
        >
          <option value="" className="text-sm font-normal text-gray-400 ">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.rating && (
          <span className="text-red-500">{errors.rating.message}</span>
        )}
      </label>
    </div>
  );
};

export default FormDetails;
