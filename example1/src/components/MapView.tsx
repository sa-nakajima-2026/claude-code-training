"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeocodingResult } from "@/lib/types";

// Leaflet のデフォルトアイコンを public/ からローカル参照（CDN 依存を排除）
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function FlyTo({ result }: { result: GeocodingResult }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([result.lat, result.lng], 15, { duration: 1 });
  }, [map, result]);
  return null;
}

interface MapViewProps {
  results: GeocodingResult[];
  selected: GeocodingResult | null;
}

export default function MapView({ results, selected }: MapViewProps) {
  return (
    <MapContainer
      center={[36.2, 138.3]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {results.map((result) => (
        <Marker key={`${result.title}-${result.lat}-${result.lng}`} position={[result.lat, result.lng]}>
          <Popup>{result.title}</Popup>
        </Marker>
      ))}
      {selected && <FlyTo result={selected} />}
    </MapContainer>
  );
}
