/* Per-journey stock and chest rolls, persisted independently of battle RNG. */
(()=>{
function hash(text){let n=2166136261;for(const ch of String(text)){n^=ch.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0||1;}
function random(seed){let n=seed>>>0||1;return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;};}
function newSeed(){let counter=1;try{counter=(Number(localStorage.getItem('echoesBelow_runCounter'))||0)+1;localStorage.setItem('echoesBelow_runCounter',String(counter));}catch{}let entropy=Date.now();try{const words=new Uint32Array(1);crypto.getRandomValues(words);entropy=words[0];}catch{}return hash(entropy+':'+counter+':'+performance.now());}
function seed(g){if(!Number.isInteger(g.runSeed)||g.runSeed<1||g.runSeed>4294967295)g.runSeed=hash('legacy:'+g.created);return g.runSeed;}
function stock(g,chapter){seed(g);const I=globalThis.EchoesItems,existing=g.shopStock[chapter];if(Array.isArray(existing?.offers)&&existing.offers.length===2)return existing.offers;
 const rng=random(hash(g.runSeed+':shop:'+chapter)),build=()=>[I.roll(chapter,'weapon',rng),I.roll(chapter,['head','chest','legs'][Math.floor(rng()*3)],rng)];let offers=build();
 // Never repeat this device's immediately preceding journey's same shop pair.
 try{const key='echoesBelow_lastOffer_'+chapter,previous=JSON.parse(localStorage.getItem(key)||'null');let tries=0;while(previous?.seed!==g.runSeed&&previous?.signature===offers.join('|')&&tries++<32)offers=build();if(previous?.seed!==g.runSeed&&previous?.signature===offers.join('|')){const alternate=Object.values(I.catalog).find(d=>d.slot&&d.slot!=='weapon'&&I.available(d.id,chapter)&&d.id!==offers[1]);offers[1]=alternate.id;}localStorage.setItem(key,JSON.stringify({seed:g.runSeed,signature:offers.join('|')}));}catch{}
 g.shopStock[chapter]={offers};return offers;
}
function normaliseStock(value){const out={},I=globalThis.EchoesItems;if(!value||typeof value!=='object')return out;for(let c=0;c<20;c++){const old=value[c];if(!old||typeof old!=='object')continue;const list=Array.isArray(old.offers)?old.offers:[old.weapon,old.chest,old.head,old.legs],valid=[...new Set(list.filter(id=>I.catalog[id]?.slot).map(id=>I.forChapter(id,c)))];if(valid.length>=2)out[c]={offers:valid.slice(0,2)};}return out;}
function chestIndex(g){return g.expedition?-1:g.chapter*10+g.room;}
function hasChest(g){const n=chestIndex(g);return n>=0&&(n+1)%9===0&&!g.chests?.[n]?.opened;}
function chestItem(g){seed(g);const n=chestIndex(g),I=globalThis.EchoesItems;if(!g.chests[n]){const rng=random(hash(g.runSeed+':chest:'+n)),owned=[...g.inventory.bag.map(e=>e.id),...Object.values(g.inventory.equipped)].filter(Boolean);let id=null;for(let i=0;i<12&&!id;i++)id=I.roll(g.chapter,['weapon','head','chest','legs'][Math.floor(rng()*4)],rng,'chest',owned);if(!id)id=Object.values(I.catalog).find(d=>d.slot&&d.rarityRank>0&&I.available(d.id,g.chapter)&&!owned.includes(d.id))?.id;if(id)g.chests[n]={id,opened:false};}return g.chests[n]?.id||null;}
function normaliseChests(value){const out={},I=globalThis.EchoesItems;if(value&&typeof value==='object')for(let n=8;n<200;n+=9){const old=value[n];if(old&&I.catalog[old.id]?.slot&&I.catalog[old.id].rarityRank>0)out[n]={id:I.forChapter(old.id,Math.floor(n/10)),opened:old.opened===true};}return out;}
globalThis.EchoesLoot={hash,random,newSeed,seed,stock,normaliseStock,chestIndex,hasChest,chestItem,normaliseChests};
})();
