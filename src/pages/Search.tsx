/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import { searchHotels } from "../api/hotelApi";
import SearchResultsCard from "../components/SearchResultsCard";

export const Search = () => {
  const search = useContext(SearchContext);
  const [page, setPage] = useState(1);

  const searchParams = {
    destination: search?.destination,
    checkIn: search?.checkIn,
    checkOut: search?.checkOut,
    adultCount: search?.adultCount,
    childCount: search?.childCount,
    page: page.toString(),
  };
  const { data: hotelData } = useQuery(["hotel", searchParams], () =>
    searchHotels({
      ...searchParams,
      adultCount: searchParams.adultCount?.toString(),
      childCount: searchParams.childCount?.toString(),
    })
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 container mx-auto py-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          /> */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.total} Hotels found
            {search?.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            // value={sortOption}
            //onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel: any) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        {/* <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div> */}
      </div>
    </div>
  );
};
