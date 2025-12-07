import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomsCount: 1,
  checkInDate: "",
  checkOutDate: "",
  bookingInitiatedTime: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setRoomsCountAction: (state, action) => {
      state.roomsCount = action.payload;
    },
    setCheckInDateAction: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDateAction: (state, action) => {
      state.checkOutDate = action.payload;
    },
    setBookingInitiatedTime: (state, action) => {
      state.bookingInitiatedTime = action.payload;
    },
  },
});
export const {
  setRoomsCountAction,
  setCheckInDateAction,
  setCheckOutDateAction,
  setBookingInitiatedTime,
} = bookingSlice.actions;

export default bookingSlice.reducer;
