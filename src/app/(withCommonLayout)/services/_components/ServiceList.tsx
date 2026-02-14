"use client";

interface Service {
  id?: number;
  name: string;
  description: string;
  category: string;
  chargePerHour?: number;
  chargePerDay: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  location?: {
    region?: string;
  };
}

interface ServiceListProps {
  services: Service[];
  isLoading: boolean;
}

export default function ServiceList({ services, isLoading }: ServiceListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-200 shadow-md animate-pulse h-80"></div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No services found. Try adjusting your filters.</p>
      </div>
    );
  }

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < fullStars ? (
                <span className="text-yellow-400">★</span>
              ) : i === fullStars && hasHalfStar ? (
                <span className="text-yellow-400">⯨</span>
              ) : (
                <span className="text-gray-300">★</span>
              )}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-600 font-semibold">{rating}</span>
        <span className="text-sm text-gray-500">({(services.find(s => s.name === (services.find(srv => srv.rating === rating)?.name))?.reviewsCount || 0)})</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, idx) => (
        <div key={idx} className="card bg-base-100 shadow-md hover:shadow-lg transition">
          {service.image && (
            <figure className="h-48 bg-gray-200">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title text-lg">{service.name}</h2>
            <p className="text-sm text-gray-600">{service.description.substring(0, 80)}...</p>

            <div className="divider my-2"></div>

            <div className="mb-3">
              <span className="badge badge-primary">{service.category}</span>
              {service.location?.region && (
                <span className="badge badge-outline ml-2">{service.location.region}</span>
              )}
            </div>

            <div className="mb-3">
              {service.chargePerHour && (
                <div className="text-sm text-gray-700">৳{service.chargePerHour}/hr</div>
              )}
              <div className="text-2xl font-bold text-primary">৳{service.chargePerDay}/day</div>
            </div>

            {renderRating(service.rating)}

            <div className="card-actions">
              <button className="btn btn-primary w-full">Book Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
