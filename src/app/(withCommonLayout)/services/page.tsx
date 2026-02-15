"use client";
import { useState, useEffect } from "react";
import Pagination from "./_components/Pagination";
import SearchBar from "./_components/SearchBar";
import ServiceList from "./_components/ServiceList";
import Sidebar from "./_components/Sidebar";
import Container from "@/components/shared/Container";

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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [priceType, setPriceType] = useState("chargePerDay");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);
  const limit = 6;

  // Fetch services based on filters
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      search,
      category,
      region,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      priceType,
      sort,
      order,
      page: page.toString(),
      limit: limit.toString(),
    });

    fetch(`/api/services?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
        setTotalServices(data.total);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [search, category, region, minPrice, maxPrice, priceType, sort, order, page]);

  const totalPages = Math.ceil(totalServices / limit);

  return (
    <main className="min-h-screen bg-base-200 py-8">
      <Container>
        <h1 className="text-4xl font-bold mb-2">Our Services</h1>
        <p className="text-gray-600 mb-8">Explore our comprehensive range of care and support services tailored to your needs.</p>


        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">


          {/* Sidebar */}
        <div className="sm:col-span-1 md:col-span-4 lg:col-span-3 rounded-md space-y-6 sm:sticky sm:top-20 h-fit">
          <Sidebar 
            onCategoryChange={(c) => {
              setCategory(c);
              setPage(1);
            }}
            onRegionChange={(r) => {
              setRegion(r);
              setPage(1);
            }}
            onPriceChange={(min, max, type) => {
              setMinPrice(min);
              setMaxPrice(max);
              setPriceType(type);
              setPage(1);
            }}
            onSortChange={(s, o) => {
              setSort(s);
              setOrder(o);
              setPage(1);
            }}
          />
          </div>

          {/* Main Content */}
          <section className="sm:col-span-1 md:col-span-8 lg:col-span-9">
          {/* <section className="md:col-span-3 border-2"> */}
            <SearchBar onSearch={(s) => {
              setSearch(s);
              setPage(1);
            }} />
            
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Found <strong>{totalServices}</strong> services
            </div>

            <ServiceList services={services} isLoading={isLoading} />

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </section>


        </div>

      </Container>
    </main>
  );
}
