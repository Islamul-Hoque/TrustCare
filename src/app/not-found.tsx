
import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
            <h1 className="text-5xl font-bold text-pink-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-pink-600 transition"
            >
                Return to Home
            </Link>
        </div>
    );
}
