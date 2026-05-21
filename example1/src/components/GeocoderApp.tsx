"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { GeocodingResult, ApiResponse } from "@/lib/types";
import styles from "@/app/page.module.css";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function GeocoderApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [selected, setSelected] = useState<GeocodingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (q: string) => {
    setError(null);
    setResults([]);
    setSelected(null);

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data: ApiResponse<GeocodingResult[]> = await res.json();

      if (!data.success) {
        setError(data.error.message);
        return;
      }
      if (data.data.length === 0) {
        setError("住所が見つかりませんでした");
        return;
      }

      setResults(data.data);
      setSelected(data.data[0]);
    } catch {
      setError("通信エラーが発生しました");
    }
  }, []);

  // URLに ?q=... があれば初回マウント時に自動検索
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      startTransition(() => { void performSearch(q); });
    }
  }, [searchParams, performSearch]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    router.replace(`?q=${encodeURIComponent(q)}`, { scroll: false });
    startTransition(() => { void performSearch(q); });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>ジオコーディング検索</h1>
        <p className={styles.subtitle}>住所から緯度・経度を検索します</p>
      </header>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="住所を入力（例：東京都千代田区千代田1）"
          className={styles.input}
          disabled={isPending}
        />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "検索中..." : "検索"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {results.length > 0 && (
            <p className={styles.count}>{results.length} 件の候補</p>
          )}
          {results.map((result) => (
            <button
              key={`${result.title}-${result.lat}-${result.lng}`}
              onClick={() => setSelected(result)}
              className={`${styles.resultItem} ${selected === result ? styles.resultItemSelected : ""}`}
            >
              <span className={styles.resultTitle}>{result.title}</span>
              <span className={styles.resultCoords}>
                {result.lat.toFixed(6)}, {result.lng.toFixed(6)}
              </span>
            </button>
          ))}
        </aside>

        <div className={styles.mapWrapper}>
          <MapView results={results} selected={selected} />
        </div>
      </div>
    </div>
  );
}
