import { GooglePlaceAPI } from "https://code4fukui.github.io/GooglePlaceAPI/GooglePlaceAPI.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const list = await CSV.fetchJSON("yoshikawanasu-shop.csv");

for (const i of list) {
  const r = await GooglePlaceAPI.fetchPosFromName(i.address);
  console.log(i.name, r);
  i.lat = r.lat;
  i.lng = r.lng;
}
await Deno.writeTextFile("yoshikwaanasu-shop-ll.csv", CSV.stringify(list));
