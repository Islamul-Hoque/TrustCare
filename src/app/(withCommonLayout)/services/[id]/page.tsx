"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Service {
    id?: number;
    name: string;
    description: string;
    image?: string;
    chargePerHour?: number;
    chargePerDay: number;
    category: string;
    features?: string[];
    availability?: string;
    ageRange?: string;
    caregiverQualification?: string;
    languagesSpoken?: string[];
    rating: number;
    reviewsCount: number;
    faq?: { question: string; answer: string }[];
    location?: {
        region?: string;
        district?: string;
        city?: string;
        covered_area?: string[];
        latitude?: number;
        longitude?: number;
        status?: string;
    };
    isActive?: boolean;
}

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const id = params.id as string;

    useEffect(() => {
        if (!id) {
            setError("Invalid service ID");
            setLoading(false);
            return;
        }

        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services?id=${id}`);
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    setService(data.data[0]);
                } else {
                    setError("Service not found");
                }
            } catch (err) {
                setError("Failed to load service details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleBookService = () => {
        if (!session) {
            router.push("/auth/login");
        } else {
            router.push(`/booking?service=${service?.id || service?.name}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="alert alert-error shadow-lg">
                    <span>{error || "Service not found"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <button onClick={() => router.back()} className="btn btn-ghost mb-6">
                    Back to Services
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Image */}
                        {service.image && (
                            <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-200">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Service Header */}
                        <div className="bg-white rounded-lg shadow p-8">
                            <div className="mb-4">
                                <span className="badge badge-primary">{service.category}</span>
                                {service.isActive && (
                                    <span className="badge badge-success ml-2">Active</span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                {service.name}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Rating Section */}
                        <div className="bg-white rounded-lg shadow p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Customer Ratings
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="text-4xl font-bold text-yellow-500">
                                        {service.rating.toFixed(1)}
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    i < Math.floor(service.rating)
                                                        ? "text-yellow-400 text-2xl"
                                                        : "text-gray-300 text-2xl"
                                                }
                                            >
                                                *
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {service.reviewsCount}
                                    </p>
                                    <p className="text-sm text-gray-500">customer reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {service.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                                        >
                                            <span className="text-blue-600 text-xl">+</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Service Details */}
                        <div className="bg-white rounded-lg shadow p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Service Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.availability && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase">
                                            Availability
                                        </label>
                                        <p className="text-lg text-gray-800 mt-1">
                                            {service.availability}
                                        </p>
                                    </div>
                                )}

                                {service.ageRange && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase">
                                            Age Range
                                        </label>
                                        <p className="text-lg text-gray-800 mt-1">
                                            {service.ageRange}
                                        </p>
                                    </div>
                                )}

                                {service.caregiverQualification && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase">
                                            Caregiver Qualification
                                        </label>
                                        <p className="text-lg text-gray-800 mt-1">
                                            {service.caregiverQualification}
                                        </p>
                                    </div>
                                )}


                            </div>
                        </div>

                        {/* Location Information */}
                        {service.location && (
                            <div className="bg-white rounded-lg shadow p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Service Location
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {service.location.region && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-500 uppercase">
                                                Region
                                            </label>
                                            <p className="text-lg text-gray-800 mt-1">
                                                {service.location.region}
                                            </p>
                                        </div>
                                    )}
                                    {service.location.district && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-500 uppercase">
                                                District
                                            </label>
                                            <p className="text-lg text-gray-800 mt-1">
                                                {service.location.district}
                                            </p>
                                        </div>
                                    )}
                                    {service.location.city && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-500 uppercase">
                                                City
                                            </label>
                                            <p className="text-lg text-gray-800 mt-1">
                                                {service.location.city}
                                            </p>
                                        </div>
                                    )}
                                    {service.location.latitude && service.location.longitude && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-500 uppercase">
                                                Coordinates
                                            </label>
                                            <p className="text-sm text-gray-800 mt-1">
                                                Lat: {service.location.latitude}, Lon:{" "}
                                                {service.location.longitude}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {service.location.covered_area &&
                                    service.location.covered_area.length > 0 && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-500 uppercase block mb-2">
                                                Covered Areas
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {service.location.covered_area.map((area, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="badge badge-lg badge-outline"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}

                        {/* FAQ Section */}
                        {service.faq && service.faq.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {service.faq.map((item, idx) => (
                                        <details
                                            key={idx}
                                            className="collapse collapse-arrow border border-gray-200"
                                        >
                                            <summary className="collapse-title font-semibold text-gray-800 cursor-pointer">
                                                {item.question}
                                            </summary>
                                            <div className="collapse-content">
                                                <p className="text-gray-600">{item.answer}</p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Pricing & Booking */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-8 sticky top-24 space-y-6">
                            {/* Pricing Card */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Pricing</h3>
                                <div className="space-y-3">
                                    {service.chargePerHour && (
                                        <div className="border-b pb-3">
                                            <p className="text-sm text-gray-500">Per Hour</p>
                                            <p className="text-3xl font-bold text-primary">
                                                {service.chargePerHour}
                                            </p>
                                        </div>
                                    )}
                                    <div className="border-b pb-3">
                                        <p className="text-sm text-gray-500">Per Day</p>
                                        <p className="text-3xl font-bold text-primary">
                                            {service.chargePerDay}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Book Service Button */}
                            <button
                                onClick={handleBookService}
                                className="btn btn-primary btn-lg w-full"
                            >
                                Book Service
                            </button>

                            {!session && (
                                <p className="text-sm text-gray-500 text-center">
                                    Sign in required to book this service
                                </p>
                            )}

                            {/* Quick Info */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Status:</strong>
                                    <span className="text-green-600">
                                        {service.isActive ? " Active" : " Inactive"}
                                    </span>
                                </p>
                            </div>

                            {/* Contact Info Note */}
                            <div className="text-center pt-4 border-t">
                                <p className="text-sm text-gray-600">
                                    Questions? Contact our support team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
