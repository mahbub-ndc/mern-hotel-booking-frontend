import { useContext } from "react";
import DatePicker from "react-datepicker";
import { SearchContext } from "../contexts/SearchContext";
import { useForm } from "react-hook-form";
import { AppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type GuestFormProps = {
  pricePerNight: number;
  hotelId: string;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestForm = ({ pricePerNight, hotelId }: GuestFormProps) => {
  console.log(pricePerNight, hotelId);
  const search = useContext(SearchContext);
  const { isLoggedIn } = useContext(AppContext) as AppContext;

  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search?.checkIn,
      checkOut: search?.checkOut,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onSubmit = (data: GuestInfoFormData) => {
    search?.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      ""
    );
    console.log(data);
    navigate(`/hotel/${hotelId}/booking`);
  };

  const onSign = (data: GuestInfoFormData) => {
    search?.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      ""
    );
    navigate(`/login`, {
      state: { from: location },
    });
  };

  return (
    <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSign)}>
      <div>
        <h2 className="pb-2 font-bold"> ${pricePerNight}</h2>

        <div className="flex flex-col gap-4">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded"
            wrapperClassName="min-w-full"
          />

          <DatePicker
            selected={checkOut}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded"
            wrapperClassName="min-w-full"
          />
          <div className="flex  bg-white px-2 py-1 gap-2 rounded">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  required: "This field is required",

                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login to Book
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default GuestForm;
