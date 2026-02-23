<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $makeup =Category::where('name','コスメ')->first();
        $accessories = Category::where('name', 'アクセサリー')->first();
        $machine = Category::where('name', '家電')->first();
        $interior = Category::where('name', 'インテリア')->first();
        $sports = Category::where('name', 'スポーツ')->first();



        $products = [

            // コスメ
            [
                'sku' => 'COS-EL-001',
                'category_id' => $makeup->id,
                'name' => '高密度アイライナーブラシ 5種セット',
                'price' => 2400,
                'description'=> '極細から平筆まで、精密な描画に対応した耐薬品性ナイロン毛を採用。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'eyeliner.webp',
            ],
            [
                'sku' => 'COS-EL-002',
                'category_id' => $makeup->id,
                'name' => 'プロユース・アイシャドウパレット (8色・高発色型)',
                'price' => 3800,
                'description'=> '粉飛びしにくい高密着プレス加工。暖色系メインの汎用性の高い配色。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'EyeShadow.webp',
            ],
            [
                'sku' => 'COS-EL-003',
                'category_id' => $makeup->id,
                'name' => 'リキッドファンデーション 30ml',
                'price' => 3200,
                'description' => 'ハイカバー＆ロングラスティング処方。3色展開（ライト/ミディアム/ダーク）。ポンプ式。',
                'current_stock' => 80,
                'status' => 'active',
                'image_url' => 'Foundation.webp',
            ],
            [
                'sku' => 'COS-EL-004',
                'category_id' => $makeup->id,
                'name' => 'リップスティック (5色セット)',
                'price' => 2100,
                'description' => '高発色・低退色処方。サロンでのタッチアップ、テスター利用に最適な5種カラーアソート。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'lipstick.webp',
            ],
            [
                'sku' => 'COS-EL-005',
                'category_id' => $makeup->id,
                'name' => '高浸透モイスチャーローション 500ml',
                'price' => 2800,
                'description' => '無香料・低刺激処方で導入液としても使用可能。ポンプ別売。',
                'current_stock' => 80,
                'status' => 'active',
                'image_url' => 'lotion.webp',
            ],
            [
                'sku' => 'COS-EL-006',
                'category_id' => $makeup->id,
                'name' => 'プロフェッショナル・カラーネイル 5色アソート',
                'price' => 2500,
                'description' => '速乾・高発色タイプ。サロンワーク効率化を実現。トレンドカラーの5色セット。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'manicure.webp',
            ],
            [
                'sku' => 'COS-EL-007',
                'category_id' => $makeup->id,
                'name' => 'オードパルファム ベース 100ml',
                'price' => 5800,
                'description' => '持続性の高いフローラルムスクの香り。遮光ビン採用。',
                'current_stock' => 50,
                'status' => 'active',
                'image_url' => 'perfume.webp',
            ],
            [
                'sku' => 'COS-EL-008',
                'category_id' => $makeup->id,
                'name' => 'ベーシックスキンケア 集中導入セット',
                'price' => 12000,
                'description' => 'クレンジングからクリームまで、シリーズ全7品を網羅したカウンセリング用セット。',
                'current_stock' => 20,
                'status' => 'active',
                'image_url' => 'SkinCareSet.webp',
            ],
            [
                'sku' => 'COS-EL-009',
                'category_id' => $makeup->id,
                'name' => 'インテンシブ・リペアクリーム 200g',
                'price' => 2200,
                'description' => '高保湿成分セラミド配合。施術の仕上げやハンドケアに使用できるプロ用大容量。',
                'current_stock' => 60,
                'status' => 'active',
                'image_url' => 'SkinCream.webp',
            ],


            // アクセサリー
            [
                'sku' => 'ACC-PN-015',
                'category_id' => $accessories->id,
                'name' => 'イニシャル・メダルペンダント',
                'price' => 8000,
                'description' => '真鍮製ゴールドメッキ仕上げ。B2Bギフト需要向け、チェーン長50cm。ニッケルフリー。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'pendant.webp',
            ],
            [
                'sku' => 'ACC-WT-014',
                'category_id' => $accessories->id,
                'name' => 'スケルトン・自動巻き腕時計',
                'price' => 15000,
                'description' => '内部機構が見える機械式モデル。本革ベルト、生活防水仕様。',
                'current_stock' => 10,
                'status' => 'active',
                'image_url' => 'watch.webp',
            ],
            [
                'sku' => 'ACC-ER-013',
                'category_id' => $accessories->id,
                'name' => 'アメジスト・ドロップイヤリング',
                'price' => 4800,
                'description' => '高品質人工石。金属アレルギー対応チタンポスト採用。',
                'current_stock' => 30,
                'status' => 'active',
                'image_url' => 'earrings.webp',
            ],
            [
                'sku' => 'ACC-BR-019',
                'category_id' => $accessories->id,
                'name' => 'アコヤ真珠 ブレスレット',
                'price' => 8000,
                'description' => '8mm珠使用、全長18cm。冠婚葬祭・ギフト向け。高耐久シリコンワイヤー仕様。',
                'current_stock' => 20,
                'status' => 'active',
                'image_url' => 'braclet.webp',
            ],
            [
                'sku' => 'ACC-RG-020',
                'category_id' => $accessories->id,
                'name' => 'プラチナ台 オパールリング',
                'price' => 12000,
                'description' => '0.3ct天然石、Pt900刻印。サイズ展開可。ブライダル・高級ジュエリー枠。',
                'current_stock' => 30,
                'status' => 'active',
                'image_url' => 'ring.webp',
            ],


            // 家電
            [
                'sku' => 'MAC-PC-016',
                'category_id' => $machine->id,
                'name' => 'ビジネスノートPC 13インチ',
                'price' => 30000,
                'description' => 'アルミ筐体、軽量モバイル仕様。リモートワーク用。標準OSインストール済み。',
                'current_stock' => 30,
                'status' => 'active',
                'image_url' => 'PC.webp',
            ],
            [
                'sku' => 'MAC-EP-017',
                'category_id' => $machine->id,
                'name' => 'ワイヤレスイヤホン（ホワイト）',
                'price' => 5500,
                'description' => 'Bluetooth 5.2対応、自動ペアリング機能。WEB会議、サロン内BGM視聴用。',
                'current_stock' => 70,
                'status' => 'active',
                'image_url' => 'earphones.webp',
            ],
            [
                'sku' => 'MAC-EP-018',
                'category_id' => $machine->id,
                'name' => 'スマートウォッチ・レザーバンド',
                'price' => 12000,
                'description' => '着信通知、健康管理機能搭載。本革ブラウンベルト仕様。iOS/Android両対応。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'ElectronicClock.webp',
            ],
            [
                'sku' => 'MAC-TB-024',
                'category_id' => $machine->id,
                'name' => '10.9インチ 高性能タブレット',
                'price' => 22000,
                'description' => 'Wi-Fiモデル、ストレージ256GB。店舗でのレジ端末、在庫確認、カタログ閲覧用。',
                'current_stock' => 60,
                'status' => 'active',
                'image_url' => 'tablet.webp',
            ],
            [
                'sku' => 'MAC-PJ-023',
                'category_id' => $machine->id,
                'name' => '4K対応 ホームプロジェクター',
                'price' => 45000,
                'description' => '最大200インチ投影。Android TV搭載、HDMI/Wi-Fi対応。家庭用シアター向け。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'projector.webp',
            ],

            // インテリア
            [
                'sku' => 'INT-SF-012',
                'category_id' => $interior->id,
                'name' => '3人掛け ベルベットソファ',
                'price' => 68000,
                'description' => '防汚加工ベルベット生地使用。店舗・応接室用。脚部は高級感のある真鍮仕上げ。',
                'current_stock' => 50,
                'status' => 'active',
                'image_url' => 'sofa.webp',
            ],
            [
                'sku' => 'INT-IL-010',
                'category_id' => $interior->id,
                'name' => 'ローテーブル',
                'price' => 12000,
                'description' => '幅120cm、スチールフレーム採用。カフェ・ロビー等の待合スペース向け耐久設計。',
                'current_stock' => 70,
                'status' => 'active',
                'image_url' => 'desk.webp',
            ],
            [
                'sku' => 'INT-IL-011',
                'category_id' => $interior->id,
                'name' => '4灯式 スタンドライト（モダン）',
                'price' => 20000,
                'description' => '高さ160cm。調光機能付きLED電球対応。店舗装飾・空間演出用のフロア照明。',
                'current_stock' => 40,
                'status' => 'active',
                'image_url' => 'illumination.webp',
            ],


            // スポーツ
            [
                'sku' => 'SPT-RS-021',
                'category_id' => $sports->id,
                'name' => '高弾性 ランニングシューズ',
                'price' => 3000,
                'description' => 'クッション性重視の厚底モデル。ジム・ジョギング用。通気性メッシュ素材。',
                'current_stock' => 50,
                'status' => 'active',
                'image_url' => 'sportShoes.webp',
            ],
            [
                'sku' => 'SPT-JR-022',
                'category_id' => $sports->id,
                'name' => 'デジタルカウンター付 縄跳び',
                'price' => 1980,
                'description' => '跳躍回数・消費カロリー表示機能。フィットネス・トレーニング用。長さ調節可。',
                'current_stock' => 60,
                'status' => 'active',
                'image_url' => 'jumpRopes.webp',
            ],

        ];

        // 1. まず「category_id」をデータから外して、商品だけを登録する
        // array_diff_key という魔法を使って、一旦 category_id を除いたデータを作ります
        foreach ($products as $item) {
            $category_id = $item['category_id'];
            unset($item['category_id']);
            $newProduct = Product::create($item);
            $newProduct->categories()->attach($category_id);
        }
    }
}
