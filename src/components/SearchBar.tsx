import { FormEvent, useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const search = useContext(SearchContext);
  const [destination, setDestination] = useState(search?.destination as string);
  const [checkIn, setCheckIn] = useState(search?.checkIn as Date);
  const [checkOut, setCheckOut] = useState(search?.checkOut as Date);
  const [adultCount, setAdultCount] = useState(search?.adultCount as number);
  const [childCount, setChildCount] = useState(search?.childCount as number);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search?.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      search?.hotelId
    );
    navigate("/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-1 bg-orange-400 rounded shadow-md grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-2"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2 rounded">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <button className="w-full bg-blue-600 rounded text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
      </div>
    </form>
  );
};