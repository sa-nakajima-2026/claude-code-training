---
name: review-example1
description: example1ディレクトリ（Next.js 16プロジェクト）のコードをレビューする。引数で特定ファイル/ディレクトリを指定可能。Next.js App Router・React 19・TypeScript・Vitest の観点でチェックし、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。
allowed-tools: Bash(cd example1 && npm run lint:*), Bash(cd example1 && npm test:*), Read, Grep, Glob
argument-hint: [対象ファイルまたはディレクトリ（省略時はexample1全体）]
---

# example1 コードレビュー

`example1/` ディレクトリ（Next.js 16プロジェクト）のコードをレビューする。

- `$ARGUMENTS` が指定されている場合: `example1/$ARGUMENTS` を対象にレビューする
- `$ARGUMENTS` が空の場合: `example1/` 全体を対象にする

## 技術スタック

- **Next.js 16** - App Router、Turbopack（dev/buildともデフォルト）
- **React 19** - Server Components / Client Components
- **TypeScript** - 型安全性
- **ESLint 9** - コード品質
- **Vitest 4** - 単体テスト（happy-dom環境）

## レビュー手順

1. **対象ファイルの確認**
   - 引数指定がある場合: `example1/$ARGUMENTS` を Read/Grep で読み込む
   - 引数なしの場合: `example1/src/` 配下を Glob で列挙してすべて確認する

2. **Next.js App Router の確認**
   - `src/app/` 配下のルート構造が適切か
   - Server Components / Client Components の使い分けが正しいか（`"use client"` の有無）
   - ルートハンドラー（`route.ts`）が Next.js の規約に沿っているか
   - `layout.tsx` / `page.tsx` の役割分担が適切か
   - メタデータ（`metadata` export）が適切に設定されているか

3. **React 19 のベストプラクティス**
   - Hooks のルール（条件分岐内での使用禁止等）
   - 不要な `useEffect` / `useState` の使用を避けているか
   - Server Components で非同期データ取得を適切に行っているか

4. **TypeScript / 型の確認**
   - `src/lib/types.ts` 等の型定義が適切に使われているか
   - `any` の不要な使用がないか
   - API レスポンス型の定義が適切か
   - 型の再利用性（共通型の一元管理）

5. **Vitest テストの確認**
   - `*.test.ts` ファイルのテストが適切に書かれているか
   - テストカバレッジの妥当性（ハッピーパス・エラーケース）
   - `vitest.config.ts` の設定が適切か
   - happy-dom 環境での DOM 操作テストの正確性

6. **セキュリティチェック**
   - API ルートでの入力バリデーション
   - 機密情報のハードコードがないか（APIキー、シークレット等）
   - XSS・CSRF 等の脆弱性
   - 適切な HTTP メソッドの制限

7. **パフォーマンス**
   - 不要なクライアントサイドレンダリングがないか
   - 画像最適化（`next/image` の使用）
   - 不要な再レンダリング（`useMemo` / `useCallback` の検討）
   - `next/font` によるフォント最適化

8. **コード品質**
   - ESLint ルール違反がないか（`npm run lint` 結果を参照）
   - 命名規則の一貫性
   - 重複コードの有無
   - ファイル・コンポーネントの責務が適切に分離されているか

## レビュー結果の報告フォーマット

### ✅ 良い点
- 適切な実装や優れた設計をリストアップ

### ⚠️ 改善提案
- 改善が推奨される点を、重要度と理由付きでリストアップ

### 🚨 重大な問題
- セキュリティ・バグ・ビルドエラーなど修正必須の問題をリストアップ

### 💡 オプション提案
- 必須ではないが、Next.js 16 / React 19 のベストプラクティスとして検討に値する改善案

## 注意事項

- Next.js 16 / React 19 の最新の推奨パターンを基準にする
- `example1/CLAUDE.md` があれば参照してプロジェクト固有の方針を考慮する
- 建設的で具体的なフィードバックを提供し、問題点には解決策も示す
- セキュリティ・正確性をコードスタイルより優先する
