/* Nine flexible bag slots plus the permanent glowberry pouch; equipped gear is separate. */
(()=>{
const catalog={},weapon=['Lantern Hook','Glass Saber','Ember Staff','Moon Needle','Chorus Spear','Dawnkeeper'],armor=['Mossweave','Riverguard','Ashplate','Starglass','Regent','Aurora'];
for(let tier=1;tier<=6;tier++){
 catalog['weapon-'+tier]={id:'weapon-'+tier,name:weapon[tier-1],slot:'weapon',tier,power:globalThis.EchoesProgression.weaponPower[tier],description:'FIGHT damage +'+globalThis.EchoesProgression.weaponPower[tier],cost:4+tier*3};
 for(const slot of ['head','chest','legs']){const name=armor[tier-1]+' '+({head:'Hood',chest:'Coat',legs:'Greaves'}[slot]),defense=(slot==='chest'?globalThis.EchoesProgression.chestDefense:globalThis.EchoesProgression.lightDefense)[tier];catalog[slot+'-'+tier]={id:slot+'-'+tier,name,slot,tier,defense,description:(defense?'Defense +'+defense+' · ':'')+(slot==='head'?'Maximum HP +'+tier:slot==='legs'?'Movement +'+(tier*1.5)+'%':'Protects your chest'),cost:slot==='chest'?5+tier*3:3+tier*2};}
}
for(const [id,name,description,cost] of [['tonic','Glow Tonic','Restore 20 HP plus grace healing.',5],['ward','Stonebrew','Prepare a shield that blocks one hit in the next fight.',7],['clarity','Clarity Draught','Add half an ACT of understanding in the next fight.',7]])catalog[id]={id,name,description,cost,consumable:true};
catalog['angel-totem']={id:'angel-totem',name:'Totem of the Angels',description:'Automatic extra life in a boss or miniboss fight. Consumed on revival; restores full HP.',cost:55,consumable:true};
function create(){return{bag:[],equipped:{weapon:null,head:null,chest:null,legs:null}};}
function normalise(value,legacy={}){const n=create();if(!value||typeof value!=='object'||!Array.isArray(value.bag)){n.equipped.weapon=legacy.weapon?'weapon-'+legacy.weapon:null;n.equipped.chest=legacy.armor?'chest-'+legacy.armor:null;return n;}for(const slot of Object.keys(n.equipped)){const id=value.equipped?.[slot];if(catalog[id]?.slot===slot)n.equipped[slot]=id;}for(const item of value.bag){const data=catalog[item?.id];if(!data||n.bag.length>=9)continue;const qty=data.consumable?Math.max(1,Math.min(9,Math.floor(Number(item.qty)||1))):1;const old=n.bag.find(x=>x.id===item.id);if(old){if(data.consumable)old.qty=Math.min(9,old.qty+qty);}else n.bag.push({id:item.id,qty});}return n;}
function canAdd(inv,id,qty=1){const data=catalog[id];if(!data)return false;const old=inv.bag.find(i=>i.id===id);return old?!!data.consumable&&old.qty+qty<=9:inv.bag.length<9;}
function add(inv,id,qty=1){if(!canAdd(inv,id,qty))return false;const old=inv.bag.find(i=>i.id===id);if(old)old.qty+=qty;else inv.bag.push({id,qty});return true;}
function owns(inv,id){return inv.bag.some(i=>i.id===id)||Object.values(inv.equipped).includes(id);}
function equip(inv,index){const entry=inv.bag[index],data=catalog[entry?.id];if(!data?.slot)return false;const old=inv.equipped[data.slot];inv.equipped[data.slot]=entry.id;if(old)inv.bag[index]={id:old,qty:1};else inv.bag.splice(index,1);return true;}
function unequip(inv,slot){const id=inv.equipped[slot];if(!id||inv.bag.length>=9)return false;inv.bag.push({id,qty:1});inv.equipped[slot]=null;return true;}
function remove(inv,index){const item=inv.bag[index];if(!item)return false;if(item.qty>1)item.qty--;else inv.bag.splice(index,1);return true;}
function item(inv,slot){return catalog[inv.equipped[slot]]||null;}
const rarities=[{name:'Basic',color:'#b6c8be',rank:0},{name:'Strong',color:'#7cbce8',rank:1},{name:'Godlike',color:'#efcf83',rank:2}];
function decorate(data,rank){const r=rarities[Math.max(0,Math.min(2,rank))];Object.assign(data,{rarity:r.name,rarityColor:r.color,rarityRank:r.rank});return data;}
function depth(chapter){return Math.max(0,Math.min(19,Math.floor(Number(chapter)||0)));}
function maxTier(chapter){const c=depth(chapter);return c<3?2:c<15?4:6;}
function available(id,chapter){const data=catalog[id];return !!data&&(!data.slot||data.tier<=maxTier(chapter));}
function forChapter(id,chapter){const data=catalog[id];return data?.slot?data.slot+'-'+Math.min(data.tier,maxTier(chapter)):id;}
for(const data of Object.values(catalog)){const rank=data.slot?Math.floor((data.tier-1)/2):data.id==='tonic'?0:1;decorate(data,rank);if(data.slot)data.cost=rank===0?(data.tier===1?3:6):rank===1?(data.tier===3?10:18):data.slot==='weapon'||data.slot==='chest'?(data.tier===5?65:90):(data.tier===5?50:70);}
catalog.ward.cost=10;catalog.clarity.cost=10;
const supplies={coin:decorate({name:'Coin',description:'Currency. Two loose coins per eight campaign rooms.'},0),berry:decorate({name:'Glowberry',description:'Healing supply. Two per eight campaign rooms.'},0),health:decorate({name:'Healing mote · 10 HP',description:'25% independent chance from roaming enemies.'},0),key:decorate({name:'Passage key',description:'Story item. Never requires a random drop.'},0),starter:decorate({name:'Traveler equipment',description:'Your starting clothes and bare hands.'},0),sword:decorate({name:'Sword of Life',description:'Guaranteed finale keepsake.'},2)};
const abilityRarities=[0,0,1,1,1,2].map((rank,i)=>decorate({cost:[4,6,12,18,24,60][i]},rank));
for(const r of globalThis.EchoesBossRewards?.relics||[])decorate(r,r.chapter>=15?2:1);
for(const r of globalThis.EchoesExpeditions?.regions||[])decorate(r.relic,r.chapter>=15?2:1);
function chances(chapter){const c=depth(chapter),godlike=c<15?0:.025+(c-15)*.0125,strong=c<3?0:Math.min(.34,.1+(c-3)*.015);return {basic:1-strong-godlike,strong,godlike};}
function roll(chapter,slot,random=Math.random){if(!['weapon','head','chest','legs'].includes(slot))throw new Error('Unknown equipment slot');const odds=chances(chapter),sample=()=>Math.max(0,Math.min(.999999999,Number(random())||0)),r=sample(),rank=r<odds.godlike?2:r<odds.godlike+odds.strong?1:0,tier=rank*2+1+(sample()<.5?0:1);return slot+'-'+tier;}
globalThis.EchoesItems={catalog,rarities,supplies,abilityRarities,decorate,maxTier,available,forChapter,chances,roll,create,normalise,canAdd,add,owns,equip,unequip,remove,item};
})();
