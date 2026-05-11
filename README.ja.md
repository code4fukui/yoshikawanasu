# yoshikawanasu

このプロジェクトは、福井県鯖江市で吉川ナス（地元の特産ナス）を使用した料理を提供する飲食店の、位置情報付きリストを生成するためのデータとツールを提供します。

処理は主に以下の2つのステップで行われます。
1. 鯖江市の公式ウェブサイトから飲食店情報をスクレイピングする。
2. Google Places APIを使用して、住所を緯度・経度座標に変換する。

## データ

最終的な位置情報付きデータは、以下のファイルで利用可能です。

- [yoshikwaanasu-shop-ll.csv](yoshikwaanasu-shop-ll.csv)

## 使用方法

### 前提条件

- [Deno](https://deno.land/) ランタイム
- Google Places APIキー

### 手順

1. **APIキーの設定**

    プロジェクトのルートに `.env` ファイルを作成し、Google Places APIキーを追加します。
    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

2. **飲食店データのスクレイピング**

    スクレイパーを実行し、鯖江市のウェブサイトから最新の飲食店リストを取得します。これにより `yoshikawanasu-shop.csv` が作成されます。
    ```sh
    deno run -A scrape.js
    ```

3. **住所の座標変換（ジオコーディング）**

    ジオコーディングスクリプトを実行して `yoshikawanasu-shop.csv` を読み込み、各住所に緯度と経度を追加して、結果を `yoshikwaanasu-shop-ll.csv` に保存します。
    ```sh
    deno run -A address2latlng.js
    ```

## データスキーマ

最終的なCSVファイル（`yoshikwaanasu-shop-ll.csv`）には、以下の列が含まれています。

| 列名 | 説明 |
| --- | --- |
| `name` | 飲食店の名前。 |
| `zipcode` | 郵便番号。 |
| `address` | 完全な住所。 |
| `tel` | 連絡先の電話番号。 |
| `description` | 飲食店または提供される料理の簡単な説明。 |
| `season` | 吉川ナス料理が提供される時期。 |
| `price` | 関連する料理の価格帯。 |
| `url` | 飲食店の公式ウェブサイトまたは関連リンク。 |
| `lat` | 緯度。 |
| `lng` | 経度。 |

## データソース

飲食店情報は、鯖江市が提供する以下の公式ページからスクレイピングしています。

- [市内で吉川ナス料理が食べられるお店の一覧 – めがねのまちさばえ 鯖江市](https://www.city.sabae.fukui.jp/kanko_sangyo/sangyo/noringyoshinko/sabae_yasai/NoSeisaku0120230412.html)

## ライセンス

このプロジェクトは MIT License の下でライセンスされています。
