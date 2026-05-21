import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { ApiResponse, GeocodingResult } from "@/lib/types";

const GSI_GEOCODE_URL =
  "https://msearch.gsi.go.jp/address-search/AddressSearch";

const MAX_QUERY_LENGTH = 200;

const GsiFeaturesSchema = z.array(
  z.object({
    geometry: z.object({
      coordinates: z.tuple([z.number(), z.number()]),
      type: z.literal("Point"),
    }),
    properties: z.object({
      title: z.string(),
      addressCode: z.string(),
    }),
  })
);

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.trim() === "") {
    return NextResponse.json<ApiResponse<GeocodingResult[]>>(
      { success: false, error: { message: "検索クエリが必要です", code: "MISSING_QUERY" } },
      { status: 400 }
    );
  }

  if (q.trim().length > MAX_QUERY_LENGTH) {
    return NextResponse.json<ApiResponse<GeocodingResult[]>>(
      { success: false, error: { message: "検索クエリが長すぎます（200文字以内）", code: "QUERY_TOO_LONG" } },
      { status: 400 }
    );
  }

  const url = `${GSI_GEOCODE_URL}?q=${encodeURIComponent(q.trim())}`;

  let gsiRes: Response;
  try {
    gsiRes = await fetch(url, { next: { revalidate: 60 } });
  } catch {
    return NextResponse.json<ApiResponse<GeocodingResult[]>>(
      { success: false, error: { message: "外部APIへの接続に失敗しました", code: "NETWORK_ERROR" } },
      { status: 502 }
    );
  }

  if (!gsiRes.ok) {
    return NextResponse.json<ApiResponse<GeocodingResult[]>>(
      { success: false, error: { message: "ジオコーディングAPIがエラーを返しました", code: "API_ERROR" } },
      { status: 502 }
    );
  }

  const parsed = GsiFeaturesSchema.safeParse(await gsiRes.json());
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<GeocodingResult[]>>(
      { success: false, error: { message: "APIレスポンスの形式が不正です", code: "INVALID_RESPONSE" } },
      { status: 502 }
    );
  }

  const results: GeocodingResult[] = parsed.data.map((f) => ({
    title: f.properties.title,
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
  }));

  return NextResponse.json<ApiResponse<GeocodingResult[]>>({
    success: true,
    data: results,
  });
}
