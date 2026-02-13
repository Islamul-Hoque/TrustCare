import React from "react";
import Image from "next/image";

const servicesData = [
    {
        id: 1,
        title: "Baby Care & Babysitting",
        description:
            "Compassionate babysitting and child care services for your little ones.",
        image: "https://i.ibb.co.com/20vHfgb1/Trust-Care-Slider1.png",
    },
    {
        id: 2,
        title: "Elderly Care & Support",
        description:
            "Trusted caretakers providing companionship and daily assistance for seniors.",
        image: "https://i.ibb.co.com/yryy77G/image.png",
    },
    {
        id: 3,
        title: "Special Care for the Sick",
        description:
            "Dedicated home services for sick or recovering family members.",
        image: "https://i.ibb.co.com/FqhFwKbX/image.png",
    },
];

const ServicesOverview: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Services
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Explore trusted caregiving solutions tailored for your family.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-pink-600 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
