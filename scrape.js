import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const url = "https://www.city.sabae.fukui.jp/kanko_sangyo/sangyo/noringyoshinko/sabae_yasai/NoSeisaku0120230412.html";
const baseurl = "https://www.city.sabae.fukui.jp";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
//console.log(html);

const splitBR = (div) => {
  const list = [];
  const cs = div.childNodes;
  for (const c of cs) {
    //console.log(c.nodeType); // 3: text, 1: tag
    if (c.nodeType == 3) {
      list.push(c.textContent);
    }
  }
  return list; 
};

const divs = dom.querySelectorAll("div#main > *");
const list = [];
for (let i = 0; i < divs.length; i++) {
  const div = divs[i];
  //console.log(div.tagName, div.classList.contains("h2bg"), div.textContent);
  if (div.classList.contains("h2bg")) {
    const p = splitBR(divs[++i]).map(i => i.split("　"));
    const nseason = p[3][0] == "時期" ? 3 : p[4][0] == "時期" ? 4 : 5;
    const data = {
      name: div.textContent,
      zipcode: p[0][0],
      address: p[0][1] + (p[0].length > 2 ? " " + p[0][2] : ""),
      tel: p[1][1],
      description: p[2][0] + (nseason == 4 ? p[3][0] : "")  + (nseason == 5 ? p[3][0] + p[4][0] : ""),
      season: p[nseason][1],
      price: p[nseason + 1][1],
    };

    i++;
    const imgs = null;
    /*
    const divimg = div[++i];
    console.log(divimg.className)
    const imgs = divimg.querySelectorAll("img").map(i => i.getAttribute("src"));
    */

    const adiv = divs[++i].querySelector("a");
    if (!adiv) {
      i--;
      data.url = "";
    } else {
      const link = adiv.getAttribute("href");
      data.url = link.startsWith("http://") || link.startsWith("https://") ? link : baseurl + link;
    }
    //console.log(adiv);
    
    if (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        data["img" + (i + 1)] = imgs[i];
      }
    }
    
    list.push(data);
  }
}
console.log(list);
//console.log(companies.length);
await Deno.writeTextFile("yoshikawanasu-shop.csv", CSV.stringify(list));
