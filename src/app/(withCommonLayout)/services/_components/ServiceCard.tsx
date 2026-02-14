"use client";
export default function ServiceCard({ service }: { service: any }) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{service.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
      <p className="mt-2 text-sm">
        <strong>৳{service.chargePerHour}</strong> per hour |{" "}
        <strong>৳{service.chargePerDay}</strong> per day
      </p>
      <button className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}
