import React from "react";
import AddGuests from "../pages/AddGuests";
import { useLocation } from "react-router-dom";

const AddGuestWrapper = () => {
  const { state } = useLocation();

  const bookingId = state?.bookingId || null;
  return (
    <AddGuests bookingId={bookingId} />
  )
};

export default AddGuestWrapper;
