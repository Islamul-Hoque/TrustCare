"use client";
import Link from "next/link";

export default function ServiceDetail({ service }: { service: any }) {
    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
            {/* Image */}
            <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-md mb-6" />

            {/* Title + Description */}
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <p className="text-gray-600 mb-4">{service.description}</p>

            {/* Pricing */}
            <div className="mb-4">
                <span className="text-lg font-semibold">৳{service.chargePerHour}/hr</span> |{" "}
                <span className="text-lg font-semibold">৳{service.chargePerDay}/day</span>
            </div>

            {/* Features */}
            <div className="mb-4">
                <h2 className="font-semibold">Features:</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {service.features.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>
            </div>

            {/* Availability, Age Range, Qualification */}
            <p><strong>Availability:</strong> {service.availability}</p>
            <p><strong>Age Range:</strong> {service.ageRange}</p>
            <p><strong>Caregiver Qualification:</strong> {service.caregiverQualification}</p>
            <p><strong>Languages:</strong> {service.languagesSpoken.join(", ")}</p>

            {/* Location */}
            <div className="mt-4">
                <h2 className="font-semibold">Location:</h2>
                <p>{service.location.city}, {service.location.district}, {service.location.region}</p>
                <p>Covered Areas: {service.location.covered_area.join(", ")}</p>
            </div>

            {/* Rating + Reviews */}
            <div className="mt-4">
                <span className="text-yellow-500">★ {service.rating}</span>
                <span className="text-gray-600 ml-2">({service.reviewsCount} reviews)</span>
            </div>

            {/* FAQ */}
            <div className="mt-6">
                <h2 className="font-semibold mb-2">FAQs:</h2>
                {service.faq.map((item: any, i: number) => (
                    <div key={i} className="mb-2">
                        <p className="font-semibold">{item.question}</p>
                        <p className="text-gray-600">{item.answer}</p>
                    </div>
                ))}
            </div>

            {/* Book Service Button */}
            <div className="mt-6">
                <Link href={`/booking/${service.id || "demo"}`}>
                    <button className="btn btn-primary w-full">Book Service</button>
                </Link>
            </div>
        </div>
    );
}
