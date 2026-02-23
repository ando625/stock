# 📦 在庫管理システム（ネットショップ向け）

## ■ 概要
本システムは、ネットショップの倉庫業務を想定した在庫管理アプリです。  
商品の「入荷」「発送」「在庫調整」を記録し、現在在庫と履歴を一元管理します。

在庫は直接変更するのではなく、  
履歴（stock_logs）を保存しながら在庫数（products.stock）を更新する設計です。

基本設計図　https://docs.google.com/spreadsheets/d/1J264aKU69xM75LiR4Pkc_aK7lBWPsKz70G7QsmFM840/edit?usp=sharing


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
git clone git@github.com:ando625/stock.git
cd stock

```


2. **環境設定ファイルの準備**
```bash
cp .env.example .env

```


3. **Dockerコンテナの起動**
```bash
docker-compose up -d

```


4. **ライブラリのインストール (PHP & JavaScript)**
```bash
# PHPのライブラリを入れる
docker-compose exec app composer install

# フロントエンドのライブラリを入れる
docker-compose exec app npm install

```


5. **アプリケーションキーの生成とデータベースの準備**
```bash
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --seed

```


6. **フロントエンドのビルド（Viteの起動）**
```bash
docker-compose exec app npm run dev

```


7. **ブラウザで確認**
[http://localhost](https://www.google.com/search?q=http://localhost) にアクセスしてください。



