import { NextResponse } from "next/server";
import services from "@/data/serviceData.json";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const region = searchParams.get("region") || "";
    const id = searchParams.get("id");
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "999999");
    const priceType = searchParams.get("priceType") || "chargePerDay";
    const sort = searchParams.get("sort") || "";
    const order = searchParams.get("order") || "asc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    // Add ID to each service
    const servicesWithId = services.map((service: any, index: number) => ({
        id: index + 1,
        ...service
    }));

    let filtered = [...servicesWithId];

    // If specific ID requested
    if (id) {
        const serviceId = parseInt(id);
        filtered = filtered.filter((s: any) => s.id === serviceId);
        return NextResponse.json({
            data: filtered,
            total: filtered.length,
        });
    }

    // Search
    if (search) {
        filtered = filtered.filter(
            (s: any) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Category Filter
    if (category) {
        filtered = filtered.filter((s: any) => s.category === category);
    }

    // Region Filter
    if (region) {
        filtered = filtered.filter((s: any) => s.location?.region === region);
    }

    // Price Range Filter
    filtered = filtered.filter((s: any) => {
        const price = priceType === "chargePerHour" ? (s.chargePerHour || 0) : s.chargePerDay;
        return price >= minPrice && price <= maxPrice;
    });

    // Sort
    if (sort) {
        filtered = filtered.sort((a: any, b: any) => {
            const aValue = a[sort];
            const bValue = b[sort];

            if (aValue === undefined || aValue === null) return order === "asc" ? 1 : -1;
            if (bValue === undefined || bValue === null) return order === "asc" ? -1 : 1;

            if (typeof aValue === "string" && typeof bValue === "string") {
                const comparison = aValue.localeCompare(bValue);
                return order === "asc" ? comparison : -comparison;
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "asc" ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });
    }

    // Pagination
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return NextResponse.json({
        data: paginated,
        total: filtered.length,
        page,
        limit,
    });
}
