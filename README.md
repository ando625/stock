# 📦 在庫管理システム（ネットショップ向け）

## ■ 概要
本システムは、ネットショップの倉庫業務を想定した在庫管理アプリです。  
商品の「入荷」「発送」「在庫調整」を記録し、現在在庫と履歴を一元管理します。

在庫は直接変更するのではなく、  
履歴（stock_logs）を保存しながら在庫数（products.stock）を更新する設計です。

基本設計図・機能要件　https://docs.google.com/spreadsheets/d/1oEkV4dLdGME9CICDjD1BoY_pEpfZK0rP416_m5_3POM/edit?usp=sharing


---

## ■ 一般ユーザー（スタッフ）の動き
※ 倉庫作業員を想定

### ① 会員登録・認証
- 会員登録（Breeze）
- ログイン / ログアウト
- Breeze標準によるバリデーション・エラーメッセージ表示

### ② 在庫操作（メイン業務）
1. 商品一覧を確認（カード形式表示）
2. 入荷登録  
   - 倉庫に商品が届いたら数量を入力  
   - 在庫数を加算
3. 発送完了登録  
   - 注文商品を出荷した際に数量を入力  
   - 在庫数を減算
4. 入出荷履歴の自動保存  
   - 操作ユーザーID  
   - 日時  
   - 数量  
   - 理由（例：注文番号、入荷元）

※ 出庫数が在庫を超える場合はエラー「在庫が不足しています」

---

## ■ 管理者ユーザーの動き
※ ショップ管理者を想定

### ① 管理者認証
- 管理者ログイン（Breeze）
- ログアウト機能
- Breeze標準によるバリデーション

### ② 商品マスタ管理
- 新規商品登録（商品名 / SKU / 価格 / カテゴリ / 在庫数 / ステータス）
- 商品情報編集（商品名・SKU・価格・説明・カテゴリ等）
- SKU重複チェックあり

### ③ 在庫管理（管理機能）
- 在庫調整（棚卸し・破損・紛失対応）
  - 在庫を強制書き換え
  - 履歴は type: adjustment として保存

### ④ 履歴・分析
- 全在庫ログ一覧表示（誰が・いつ・何を・何個・なぜ）

---

## 使用技術

- PHP 8.4
- Laravel 12
- React/TypeScript/Inertia.js
- MySQL 8.0.26
- nginx:1.21.1
- docker
- Breeze
- GitHub




---

#### ## セットアップ方法 (Setup)

このプロジェクトをローカル環境で起動するための手順です。

1. **リポジトリをクローンする**
```bash
git clone git@github.com:ando625/stock.git stockapp
cd stockapp

```

2. **Dockerコンテナの起動**
```bash
docker-compose up -d --build

```



3. プロジェクトのルートphp上で実行
```
docker compose exec php bash
```



4. **環境設定ファイルの準備**
```bash
cp .env.example .env

```

※ .env ファイルを開き、データベースの設定を以下のように書き換えてください：

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass
```
- .envをjaにするか
```
APP_LOCALE=ja
APP_FALLBACK_LOCALE=ja
```

- config/app.php を直接書き換える

```
// 修正前
'locale' => env('APP_LOCALE', 'en'),

// 修正後
'locale' => 'ja',
```
ログイン、新規登録のバリデーションを日本語へ

5. **ライブラリのインストール (PHP & JavaScript)**

```bash
composer install
```

```
npm install
```
エラーが出た場合はこちらで
```
npm install --legacy-peer-deps
```


6. **アプリケーションキーの生成とデータベース、シンボリックリンクの準備**
```bash
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
```


7. **フロントエンドのビルド（Viteの起動）**
```bash
npm run dev

```


8. **ブラウザで確認**
- URL: http://localhost/ にアクセスしてください。


- 管理者ログインURL: http://localhost/login

| メールアドレス        | パスワード |
|-----------------------|------------|
| admin@example.com  | password1234   |



- スタッフURL: http://localhost/register

| メールアドレス        | パスワード |
|-----------------------|------------|
| staff@example.com  | password123   |

**UserSeeder.phpで作成しているのでログインする前に一度確認してください**


**新規登録はスタッフとして新規登録できますが管理者はSeederで設定したものでしか入れません。**
---


## phpMyAdmin

- URL: http://localhost:8080/
- ユーザー名・パスワードは `.env` と同じ
- DB: `laravel_db` を確認可能

---



