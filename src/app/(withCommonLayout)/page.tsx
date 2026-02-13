import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const Homepage = () => {
    return (
        <div className=" ">
            <Banner/>
            <About/>
            <ServicesOverview />
            <Testimonials />
        </div>
    );
};

export default Homepage;