# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
npm run dev          # 開発サーバー起動（Turbopack）
npm run build        # 本番ビルド
npm run lint         # ESLint実行

npm run test         # テスト1回実行
npm run test:watch   # ウォッチモード
npm run test:coverage # カバレッジ計測（src/app/api/**/*.ts が対象）
```

単一テストファイルの実行:
```bash
npx vitest run src/app/api/health/route.test.ts
```

## アーキテクチャ

Next.js 16 App Router プロジェクト。テストは Vitest（happy-dom 環境）で実行し、Next.js のビルドパイプラインとは独立している。

### APIルートとテスト

APIルートハンドラ（`route.ts`）は Next.js の `NextResponse` を返す純粋な関数として実装されており、Vitest から直接インポートしてテストできる（Next.jsサーバーを起動する必要がない）。`route.test.ts` は `GET()` を直接呼び出してレスポンスオブジェクトを検証している。

### 型定義

`src/lib/types.ts` にAPIレスポンス共有型（`ApiResponse<T>`、`ApiSuccessResponse<T>`、`ApiErrorResponse`、`HealthCheckResponse`）を集約。新規APIを追加する場合はここにレスポンス型を定義する。

### パスエイリアス

`@/` が `src/` にマッピングされている（`tsconfig.json` および `vitest.config.ts` の両方で設定済み）。
