import React from "react";
import { assets } from "../assets/assets";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { Bed } from "lucide-react";
import { searchHotels } from "../api/hotelsSearch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import {
  setCheckInDateAction,
  setCheckOutDateAction,
  setRoomsCountAction,
} from "../store/bookingSlice";
import Particles from "./Particles";
import ColorBends from "./Effects/ColorBends";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Hero = () => {
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomsCount, setRoomsCount] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleHotelSearch = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    dispatch(setRoomsCountAction(roomsCount));
    dispatch(setCheckInDateAction(startDate));
    dispatch(setCheckOutDateAction(endDate));
    try {
      const res = await searchHotels({ city, startDate, endDate, roomsCount });

      navigate("/rooms", {
        state: {
          hotels: res?.data?.content,
          checkIn: startDate.toDateString(),
          checkOut: endDate.toDateString(),
        },
      });
    } catch (e) {
      console.error("Hotel search failed", e);
    }
  };

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      {/* HERO SECTION WITH PARTICLE BACKGROUND */}
      <div className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <ColorBends
            rotation={45}
            speed={0.25}
            colors={["#7abfff", "#ffffff", "#7ad3ff"]}
            transparent={true}
            autoRotate={0}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.6}
            noise={0.05}
          />
        </div>

        {/* Actual Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white h-full">
          <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
            The Ultimate Hotel Experience
          </p>

          <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
            Discover Your Perfect Gateway Destination
          </h1>

          <p className="max-w-[500px] mt-2 text-sm md:text-base">
            Unparalled luxury and comfort await at the world's most exclusive
            hotels and resorts. Start your journey today.
          </p>

          <form
            onSubmit={handleHotelSearch}
            className="bg-white text-gray-500 rounded-lg px-4 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto"
          >
            <div>
              <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} alt="" className="h-4" />
                <label htmlFor="destinationInput">Destination</label>
              </div>

              <input
                id="destinationInput"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                placeholder="Type here"
                required
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <label>Dates</label>
              </div>

              <input
                readOnly
                onClick={() => setOpen(!open)}
                value={`${range[0].startDate.toDateString()} → ${range[0].endDate.toDateString()}`}
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none cursor-pointer w-[230px]"
              />

              {open &&
                createPortal(
                  <div
                    className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 
                 z-[999999] bg-white shadow-2xl rounded-xl p-4"
                  >
                    <DateRange
                      onChange={(item) => {
                        const { startDate, endDate } = item.selection;
                        setStartDate(startDate);
                        setEndDate(endDate);
                        setRange([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                      minDate={new Date()}
                      rangeColors={["#000"]}
                    />

                    <button
                      className="mt-2 bg-black text-white px-4 py-2 rounded"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>,
                  document.body
                )}
            </div>
            <div>
              <label className="flex items-center gap-2">
                <Bed size={18} className="text-gray-800" />
                Rooms
              </label>

              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setRoomsCount((prev) => Math.max(1, prev - 1))}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  −
                </button>

                <span className="w-6 text-center font-medium">
                  {roomsCount}
                </span>

                <button
                  type="button"
                  onClick={() => setRoomsCount((prev) => prev + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              <span>Search</span>
            </button>
          </form>
          {/* Join as Host */}
          <div className="mt-4 text-sm text-white/80">
            Want to list your property?{" "}
            <button
              onClick={() => {
                if(loggedIn){
                    navigate("/join-host")
                }else{
                  navigate("/login")
                }            
              }
            }
              className="text-white font-medium underline hover:text-[#49B9FF] transition"
            >
              Become a Host
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
