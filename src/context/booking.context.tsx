"use client";
import React, { createContext, useState } from "react";

export const BookingContext = createContext(null);

const BookingsContextProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    const addBooking = (booking) => [setBookings([...bookings, booking])];
    const removeBooking = (id) => {
        setBookings(bookings.filter((b) => b._id != id));
    };

    const value = {
        bookings,
        setBookings,
        addBooking,
        removeBooking,
    };

    return (
        <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
    );
};

export default BookingsContextProvider;