# yoshikawanasu

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This project provides data and tools to generate a geocoded list of restaurants in Sabae City, Fukui, that serve dishes made with Yoshikawa Nasu (a local specialty eggplant).

The process involves two main steps:
1.  Scraping restaurant information from the official Sabae City website.
2.  Converting the addresses into latitude and longitude coordinates using the Google Places API.

## Data

The final, geocoded data is available in this file:

- [yoshikwaanasu-shop-ll.csv](yoshikwaanasu-shop-ll.csv)

## Usage

### Prerequisites

-   [Deno](https://deno.land/) runtime
-   A Google Places API key

### Steps

1.  **Set up your API Key**

    Create a `.env` file in the root of the project and add your Google Places API key:
    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

2.  **Scrape Restaurant Data**

    Run the scraper to fetch the latest restaurant list from the Sabae City website. This will create `yoshikawanasu-shop.csv`.
    ```sh
    deno run -A scrape.js
    ```

3.  **Geocode Addresses**

    Run the geocoding script to read `yoshikawanasu-shop.csv`, add latitude and longitude for each address, and save the result to `yoshikwaanasu-shop-ll.csv`.
    ```sh
    deno run -A address2latlng.js
    ```

## Data Schema

The final CSV file (`yoshikwaanasu-shop-ll.csv`) contains the following columns:

| Column        | Description                                           |
|---------------|-------------------------------------------------------|
| `name`        | The name of the restaurant.                           |
| `zipcode`     | The postal code.                                      |
| `address`     | The full street address.                              |
| `tel`         | The contact phone number.                             |
| `description` | A brief description of the restaurant or its dishes.  |
| `season`      | The season when Yoshikawa Nasu dishes are available.  |
| `price`       | The price range for relevant dishes.                  |
| `url`         | The official website or related link for the restaurant. |
| `lat`         | The latitude coordinate.                              |
| `lng`         | The longitude coordinate.                             |

## Data Source

The restaurant information is scraped from the following official page provided by Sabae City.

- [市内で吉川ナス料理が食べられるお店の一覧 – めがねのまちさばえ 鯖江市](https://www.city.sabae.fukui.jp/kanko_sangyo/sangyo/noringyoshinko/sabae_yasai/NoSeisaku0120230412.html)

## License

This project is licensed under the MIT License.