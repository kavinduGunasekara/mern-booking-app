import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  // Initialize state variables with null or appropriate default values
  const [destination, setDestination] = useState<string>(search.destination || "");
  const [checkIn, setCheckIn] = useState<Date | null>(search.checkIn || null);
  const [checkOut, setCheckOut] = useState<Date | null>(search.checkOut || null);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount || 1);
  const [childCount, setChildCount] = useState<number>(search.childCount || 0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Validate and handle null values for checkIn and checkOut
    const selectedCheckIn = checkIn || new Date(); // Use current date if checkIn is null
    const selectedCheckOut = checkOut || new Date(); // Use current date if checkOut is null

    search.saveSearchValues(destination, selectedCheckIn, selectedCheckOut, adultCount, childCount);
    navigate("/search");
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(null); // Use null to reset the date input
    setCheckOut(null); // Use null to reset the date input
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-yellow-300 shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 rounded-xl"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 rounded-lg">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold rounded-lg"
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
            className="w-full p-1 focus:outline-none font-bold rounded-lg"
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
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
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
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-1/2 bg-green-600 text-white h-full p-2 font-bold text-xl hover:bg-green-500 rounded-lg"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-1/2 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
