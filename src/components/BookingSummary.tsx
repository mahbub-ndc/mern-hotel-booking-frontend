/* eslint-disable @typescript-eslint/no-explicit-any */

const BookingSummary = ({
  checkIn,
  checkOut,
  hotel,
  duration,
  adultCount,
  childCount,
}: {
  checkIn: any;
  checkOut: any;
  hotel: any;
  duration: any;
  adultCount: any;
  childCount: number;
}) => {
  console.log(hotel);
  return (
    <div className="grid grid-cols-1 border border-slate-300 rounded p-5 gap-5">
      <div>
        <h2 className="text-2xl font-bold">Booking Summary</h2>
        <p>
          Location: {hotel?.data.name}, {hotel?.data.city},{" "}
          {hotel?.data.country}
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{duration} nights</div>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">
          {adultCount} adults & {childCount} childrens
        </div>
      </div>
    </div>
  );
};
export default BookingSummary;
