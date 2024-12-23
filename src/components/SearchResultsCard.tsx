/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";

const SearchResultsCard = ({ hotel }: any) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.rating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/hotel/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility: any) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col gap-3 pt-5 md:items-end">
            <span className="font-bold ">${hotel.pricePerNight} per night</span>
            <Link
              to={`/hotel/${hotel._id}`}
              className="w-full text-center bg-blue-600 text-white rounded h-full p-2 font-bold md:max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
