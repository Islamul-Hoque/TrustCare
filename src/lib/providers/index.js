"use client";
import { SessionProvider } from "next-auth/react";
import BookingsContextProvider from "@/context/booking.context";
import UserContextProvider from "@/context/user.context";
import React from "react";

const Providers = ({ children }) => {
    return (
        <SessionProvider>
            <UserContextProvider>
                <BookingsContextProvider>{children}</BookingsContextProvider>
            </UserContextProvider>
        </SessionProvider>
    );
};

export default Providers;
