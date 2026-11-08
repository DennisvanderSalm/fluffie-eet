import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const scripts=JSON.parse(readFileSync('audio-scripts.json','utf8').replace(/^\uFEFF/,''));
const manifest=JSON.parse(readFileSync('src/audio-manifest.json','utf8').replace(/^\uFEFF/,''));
for(const id of Object.keys(scripts)){
 assert(manifest[id],`Ontbrekende opname: ${id}`);
 assert(/^audio\/[a-z-]+\.mp3$/.test(manifest[id]),`Alleen lokaal audiopad toegestaan: ${id}`);
 assert(existsSync('public/'+manifest[id]),`Bestand ontbreekt: ${id}`);
 assert(readFileSync('public/'+manifest[id]).length>1000,`Leeg audiobestand: ${id}`);
}
console.log(`${Object.keys(scripts).length} lokale opnames gekoppeld en aanwezig.`);
