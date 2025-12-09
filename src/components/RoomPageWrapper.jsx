import { useLocation } from "react-router-dom";
import HotelSearch from "../pages/HotelSearch";

export default function RoomsPageWrapper() {
  const { state } = useLocation();

  const hotels = state?.hotels || [];
  const checkIn = state?.checkIn;
  const checkOut = state?.checkOut;

  return (
    <HotelSearch
      hotels={hotels}
      checkIn={checkIn}
      checkOut={checkOut}
      isLoading={false}
      onViewRooms={id => {}}
    />
  );
}
