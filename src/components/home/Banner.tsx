"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const bannerSlides = [
  {
    id: 1,
    title: "Baby Care & Babysitting",
    description: "Compassionate babysitting and child care services for your little ones.",
    image: "https://i.ibb.co.com/20vHfgb1/Trust-Care-Slider1.png",
    btn: "Book a Service"
  },
  {
    id: 2,
    title: "Elderly Care & Support",
    description: "Trusted caretakers providing companionship and daily assistance for seniors.",
    image: "https://i.ibb.co.com/yryy77G/image.png",
    btn: "Explore Services"
  },
  {
    id: 3,
    title: "Special Care for the Sick",
    description: "Dedicated home services for sick or recovering family members.",
    image: "https://i.ibb.co.com/FqhFwKbX/image.png",
    btn: "Get Started"
  }
];


const Banner: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {bannerSlides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] md:h-[600px]">
              <Image
                src={item.image}
                alt={`TrustCare Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="text-left px-6 md:px-16 max-w-xl">
                  <h1 className="text-white text-2xl md:text-5xl font-bold mb-4 leading-snug">
                    {item.title}
                  </h1>
                  <p className="text-white text-sm md:text-lg mb-6">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition transform hover:scale-105">
  {item.btn}
</button>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
