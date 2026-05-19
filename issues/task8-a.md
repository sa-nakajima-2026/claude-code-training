# Task 8-a: GitHub Fork と push 先のセットアップ

## 目的

以降のタスクで GitHub に push したり Pull Request を作成したりするため、本リポジトリを **自分の GitHub アカウントへ Fork** し、ローカルの `origin` を自分の Fork に向ける。

## 所要時間

約15分

## 前提条件

- Task 1-7 が完了していること
- GitHub アカウントを持っていること
- ローカルに `git` がインストールされていること
- 任意: [GitHub CLI（`gh`）](https://cli.github.com/) がインストール済みだとさらに楽

## なぜ Fork するのか

- 元リポジトリ（講習用の本家）への直接 push 権限は学生にはない
- Fork すれば **自分のアカウント配下のコピー** ができ、好きなようにブランチ作成・push・PR 作成・GitHub Actions 実行ができる
- 本家の更新を取り込みたい場合は `upstream` 経由で同期する

## 全体像

```
GitHub:
  本家リポジトリ (upstream)  ← 講習用、読み取り専用想定
        │  fork
        ▼
  自分のリポジトリ (origin)  ← ここに push する
        │  clone (or remote 切替)
        ▼
  ローカル
```

## 手順

### 1. GitHub 上で Fork する

#### 方法A: ブラウザから

1. 本家リポジトリのページを開く
2. 右上の **「Fork」** ボタンをクリック
3. 自分のアカウントを所有者に選び、`Create fork` を押す
4. 自分のアカウント配下にコピーが作成される

#### 方法B: GitHub CLI から

```bash
gh repo fork <owner>/<repo> --clone=false
```

> ℹ️ すでにローカルにクローン済みの状態で進めるため、`--clone=false` で Fork のみ行います。

### 2. ローカルの remote を Fork に向け直す

現在の remote を確認:

```bash
cd /path/to/claude-code-training
git remote -v
```

`origin` が本家リポジトリを指している場合、Fork に切り替えます。

#### 方法1: `origin` を Fork に置き換え、本家を `upstream` に

```bash
# 現在の origin（本家）を upstream にリネーム
git remote rename origin upstream

# Fork を新しい origin として追加
git remote add origin git@github.com:<your-username>/claude-code-training.git
# または HTTPS
# git remote add origin https://github.com/<your-username>/claude-code-training.git
```

確認:

```bash
git remote -v
# origin    git@github.com:<your-username>/claude-code-training.git (fetch)
# origin    git@github.com:<your-username>/claude-code-training.git (push)
# upstream  git@github.com:<original-owner>/claude-code-training.git (fetch)
# upstream  git@github.com:<original-owner>/claude-code-training.git (push)
```

### 3. Git ユーザー設定（未設定の場合）

```bash
git config user.name "あなたの名前"
git config user.email "あなたのメールアドレス"
```

> ℹ️ `--global` を付けるとマシン全体に適用されます。プロジェクト内だけで上書きしたい場合は付けない方が安全です。

### 4. GitHub への認証

push 時に認証が求められます。以下のいずれかを準備:

- **SSH 鍵** を GitHub に登録（[公式手順](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)）
- **GitHub CLI で認証**（推奨）:
  ```bash
  gh auth login
  ```
  対話形式で GitHub.com / プロトコル（HTTPS or SSH）/ ブラウザ認証 を選びます

### 5. main を Fork に push して動作確認

```bash
git checkout main
git push -u origin main
```

成功すれば、自分の Fork の `main` ブランチに同じ内容が反映されます。GitHub の Fork ページをリロードして確認してください。

### 6. 本家の更新を取り込む方法（参考）

本家（`upstream`）に新しい変更が入ったら、自分の Fork に取り込みます。

```bash
# 本家の最新を取得
git fetch upstream

# main に切り替え
git checkout main

# 本家 main を取り込む
git merge upstream/main

# 自分の Fork にも反映
git push origin main
```

## 確認事項

- [ ] 自分のアカウント配下に Fork ができている
- [ ] `git remote -v` で `origin` が自分の Fork、`upstream` が本家を指している
- [ ] `git config user.name` / `user.email` が設定されている
- [ ] GitHub への認証が通る（SSH 鍵 or `gh auth login`）
- [ ] `git push -u origin main` が成功する

## トラブルシューティング

### `Permission denied (publickey)` と出る

- SSH 鍵が GitHub に登録されていない
- 解決策: `gh auth login` で HTTPS 経由の認証に切り替える、または SSH 鍵を登録する

### `remote origin already exists` と出る

- 既存の origin を rename/削除せずに新規追加しようとしている
- 解決策: `git remote rename origin upstream` → `git remote add origin <fork-url>` の順で実行

### `gh auth login` が失敗する

- ネットワーク制限・プロキシ環境ではブラウザ認証が通らないことがある
- 解決策: Personal Access Token を発行して `gh auth login --with-token` で渡す

## 次のステップ

✅ Fork と push 先のセットアップが完了したら、[task8.md](./task8.md) に進んで Biome と GitHub Actions CI を導入しましょう！

以降のすべての `git push` / `gh pr create` は、**自分の Fork（origin）** に対して行われます。CI で使う secrets（例: `CODECOV_TOKEN`）も自分の Fork の Settings から登録します。
