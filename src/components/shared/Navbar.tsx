import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavLink from "../Buttons/NavLink";
import { FiShoppingCart } from "react-icons/fi";
import AuthButtons from "../Buttons/AuthButtons";

const Navbar = () => {
    const nav = (
        <>
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/services">Services</NavLink></li>
            <li><NavLink href="/coverage">Coverage Area</NavLink></li>
            <li><NavLink href="/blog">Blog</NavLink></li>
            <li><NavLink href="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div className="sticky top-0 z-5000 bg-base-100 shadow">
            <div className="navbar container mx-auto px-4">
                {/* Navbar Start: Logo + Mobile dropdown */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div>
                    <Logo />
                </div>

                {/* Navbar Center: Desktop */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{nav}</ul>
                </div>

                {/* Navbar End: Cart + AuthButtons */}
                <div className="navbar-end flex items-center space-x-4">
                    <Link href="/cart" className="btn btn-primary">
                        <FiShoppingCart className="text-lg" />
                    </Link>
                    {/* Client-side for auth buttons */}
                    <AuthButtons />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
