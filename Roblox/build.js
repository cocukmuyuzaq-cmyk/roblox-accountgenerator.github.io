const fs = require("fs");

const satirlar = fs.readFileSync("havuz.txt", "utf8")
  .split(/\r?\n/)
  .map(s => s.trim())
  .filter(Boolean);

console.log(`[ok] havuz.txt: ${satirlar.length} satır`);

const dizi = satirlar.map(s => "  " + JSON.stringify(s)).join(",\n");

let html = fs.readFileSync("index.html", "utf8");

const BAS = "// HAVUZ_BASLANGIC";
const BIT = "// HAVUZ_BITIS";

const iBas = html.indexOf(BAS);
const iBit = html.indexOf(BIT);

if (iBas === -1 || iBit === -1 || iBit < iBas) {
  console.error("[hata] HAVUZ_BASLANGIC / HAVUZ_BITIS işaretleri bulunamadı.");
  process.exit(1);
}

const yeniBlok =
  BAS + "\n" +
  "const HESAP_HAVUZU = [\n" + dizi + "\n];\n" +
  BIT;

html = html.slice(0, iBas) + yeniBlok + html.slice(iBit + BIT.length);

fs.writeFileSync("index_dolu.html", html, "utf8");
console.log(`[ok] index_dolu.html yazıldı (${html.length.toLocaleString("tr-TR")} karakter)`);