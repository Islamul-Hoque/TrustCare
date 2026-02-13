"use client";

import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left side image */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="https://i.ibb.co.com/20vHfgb1/Trust-Care-Slider1.png"
            alt="TrustCare Mission"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right side text */}
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug">
            Our Mission: Trusted Care for Every Family
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At <span className="font-semibold text-pink-600">TrustCare</span>, we believe caregiving should be simple, safe, and accessible. 
            Our platform connects families with compassionate caretakers who provide reliable babysitting, elderly support, and special care at home.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            With responsive design, easy booking, and transparent service details, TrustCare ensures peace of mind for families while delivering professional care right at your doorstep.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
