import { Suspense } from "react";
import GeocoderApp from "@/components/GeocoderApp";

export default function Home() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>読み込み中...</div>}>
      <GeocoderApp />
    </Suspense>
  );
}
