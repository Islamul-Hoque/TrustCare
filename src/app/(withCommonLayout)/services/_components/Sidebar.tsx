"use client";
import { useEffect, useState } from "react";

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  onPriceChange: (min: number, max: number, priceType: string) => void;
  onSortChange: (sort: string, order: string) => void;
}

export default function Sidebar({ onCategoryChange, onRegionChange, onPriceChange, onSortChange }: SidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceType, setPriceType] = useState("chargePerDay");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("/api/services?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.data.map((s: any) => s.category))];
        const uniqueRegions = [...new Set(data.data.map((s: any) => s.location?.region).filter(Boolean))];
        setCategories(uniqueCategories as string[]);
        setRegions(uniqueRegions as string[]);
      });
  }, []);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortField(newSort);
    onSortChange(newSort, sortOrder);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    onSortChange(sortField, newOrder);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMinPrice(val);
    onPriceChange(val ? parseInt(val) : 0, maxPrice ? parseInt(maxPrice) : 99999, priceType);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMaxPrice(val);
    onPriceChange(minPrice ? parseInt(minPrice) : 0, val ? parseInt(val) : 99999, priceType);
  };

  return (
    <aside className="card bg-base-100 shadow-md p-6 h-fit sticky top-20">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Category</h3>
        <select
          className="select select-bordered w-full"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Region</h3>
        <select
          className="select select-bordered w-full"
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Price Type Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Type</h3>
        <div className="flex gap-4">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="priceType"
              className="radio radio-sm"
              value="chargePerDay"
              checked={priceType === "chargePerDay"}
              onChange={(e) => {
                setPriceType(e.target.value);
                onPriceChange(minPrice ? parseInt(minPrice) : 0, maxPrice ? parseInt(maxPrice) : 99999, e.target.value);
              }}
            />
            <span className="label-text ml-2">Per Day</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="priceType"
              className="radio radio-sm"
              value="chargePerHour"
              checked={priceType === "chargePerHour"}
              onChange={(e) => {
                setPriceType(e.target.value);
                onPriceChange(minPrice ? parseInt(minPrice) : 0, maxPrice ? parseInt(maxPrice) : 99999, e.target.value);
              }}
            />
            <span className="label-text ml-2">Per Hour</span>
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Minimum price"
            className="input input-bordered w-full"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            placeholder="Maximum price"
            className="input input-bordered w-full"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <small className="text-gray-500 block">
            {priceType === "chargePerDay" ? "Per Day" : "Per Hour"}
          </small>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Sort By</h3>
        <div className="space-y-2">
          <select
            className="select select-bordered w-full"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="">Default</option>
            <option value="chargePerDay">Price (Day)</option>
            <option value="chargePerHour">Price (Hour)</option>
            <option value="rating">Rating</option>
            <option value="reviewsCount">Popularity</option>
            <option value="name">Name</option>
          </select>
          <select
            className="select select-bordered w-full"
            value={sortOrder}
            onChange={handleSortOrderChange}
            disabled={!sortField}
          >
            <option value="asc">Ascending (Low to High)</option>
            <option value="desc">Descending (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="btn btn-outline w-full"
        onClick={() => {
          setMinPrice("");
          setMaxPrice("");
          setPriceType("chargePerDay");
          setSortField("");
          setSortOrder("asc");
          onCategoryChange("");
          onRegionChange("");
          onPriceChange(0, 99999, "chargePerDay");
          onSortChange("", "asc");
        }}
      >
        Reset Filters
      </button>
    </aside>
  );
}
