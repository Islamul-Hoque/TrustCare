"use client";
import CoverageMap from "@/components/Map/CoverageMap";

export default function CoveragePage() {
  return (
    <main className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-4">Coverage Areas</h1>
        <p className="text-gray-600 mb-6">Interactive map showing where our service centers operate. Click a marker for details.</p>
        <CoverageMap />
      </div>
    </main>
  );
}
