"use client";
import React, { useEffect, useRef, useState } from "react";

type Center = any;

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const centersRef = useRef<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Center[]>([]);

  useEffect(() => {
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const loadScript = () => new Promise<void>((resolve, reject) => {
      if ((window as any).L) return resolve();
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject();
      document.body.appendChild(s);
    });

    let map: any;

    loadScript()
      .then(() => {
        const L = (window as any).L;
        leafletRef.current = L;

        map = L.map(mapRef.current!, { scrollWheelZoom: true }).setView([23.8, 90.4], 12);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        fetch('/servicesCenters.json')
          .then((r) => r.json())
          .then((data: any[]) => {
            if (!data || data.length === 0) {
              setLoading(false);
              return;
            }

            centersRef.current = data;

            const bounds = L.latLngBounds([]);

            data.forEach((center, i) => {
              if (center.latitude == null || center.longitude == null) return;

              const marker = L.marker([center.latitude, center.longitude]).addTo(map);

              const popupHtml = `
                <div style="max-width:220px;">
                  <h3 style="font-weight:700;margin:0 0 6px 0">${center.city || center.district || center.region}</h3>
                  <p style="margin:0 0 6px 0"><strong>District:</strong> ${center.district || '-'}<br/>
                  <strong>Region:</strong> ${center.region || '-'}<br/>
                  <strong>Status:</strong> ${center.status || '-'}
                  </p>
                  <p style="margin:6px 0 0 0"><strong>Covered Areas:</strong><br/>${(center.covered_area || []).slice(0,6).join(', ')}</p>
                  <a href="/service/${encodeURIComponent(center.district || center.city || '')}" style="display:inline-block;margin-top:8px;color:#0b5fff;text-decoration:underline">View Service</a>
                </div>
              `;

              marker.bindPopup(popupHtml);

              markersRef.current.push({ marker, center });

              bounds.extend([center.latitude, center.longitude]);
            });

            if (bounds.isValid()) {
              map.fitBounds(bounds, { padding: [40, 40], animate: true, duration: 1.0 });
            }

            setLoading(false);
          })
          .catch((err) => {
            console.error('Failed to load service centers', err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error('Failed to load Leaflet', err);
        setLoading(false);
      });

    return () => {
      try {
        if (map) map.remove();
      } catch (e) {}
    };
  }, []);

  // simple search across region/district/city/covered_area
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const q = query.trim().toLowerCase();
    const matches = centersRef.current.filter((c: any) => {
      if (!c) return false;
      if ((c.region || "").toLowerCase().includes(q)) return true;
      if ((c.district || "").toLowerCase().includes(q)) return true;
      if ((c.city || "").toLowerCase().includes(q)) return true;
      if (Array.isArray(c.covered_area) && c.covered_area.some((a: string) => a.toLowerCase().includes(q))) return true;
      return false;
    });

    setResults(matches.slice(0, 10));
  }, [query]);

  const goToCenter = (center: any) => {
    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map || !center) return;

    map.flyTo([center.latitude, center.longitude], 14, { animate: true, duration: 1.2 });

    const entry = markersRef.current.find((m: any) => m.center === center);
    if (entry) {
      entry.marker.openPopup();
    }

    setQuery("");
    setResults([]);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="relative max-w-xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search region, district, city or covered area..."
            className="input input-bordered w-full"
          />
          {results.length > 0 && (
            <ul className="absolute bg-white shadow rounded w-full mt-1 max-h-60 overflow-auto" style={{ zIndex: 10000 }} onMouseDown={(e) => e.stopPropagation()}>
              {results.map((c, idx) => (
                <li
                  key={idx}
                  onClick={() => goToCenter(c)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="font-semibold">{c.city || c.district || c.region}</div>
                  <div className="text-sm text-gray-500">{c.district ? c.district + ' • ' : ''}{c.region}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <div ref={mapRef} id="coverage-map" className="w-full h-full" />
      </div>
    </div>
  );
}