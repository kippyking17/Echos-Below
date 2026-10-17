/* Nine flexible bag slots plus the permanent glowberry pouch; equipped gear is separate. */
(()=>{
const catalog={},weapon=['Lantern Hook','Glass Saber','Ember Staff','Moon Needle','Chorus Spear','Dawnkeeper'],armor=['Mossweave','Riverguard','Ashplate','Starglass','Regent','Aurora'];
for(let tier=1;tier<=6;tier++){
 catalog['weapon-'+tier]={id:'weapon-'+tier,name:weapon[tier-1],slot:'weapon',tier,power:globalThis.EchoesProgression.weaponPower[tier],description:'FIGHT damage +'+globalThis.EchoesProgression.weaponPower[tier],cost:4+tier*3};
 for(const slot of ['head','chest','legs']){const name=armor[tier-1]+' '+({head:'Hood',chest:'Coat',legs:'Greaves'}[slot]),defense=(slot==='chest'?globalThis.EchoesProgression.chestDefense:globalThis.EchoesProgression.lightDefense)[tier];catalog[slot+'-'+tier]={id:slot+'-'+tier,name,slot,tier,defense,description:(defense?'Defense +'+defense+' · ':'')+(slot==='head'?'Maximum HP +'+tier:slot==='legs'?'Movement +'+(tier*1.5)+'%':'Protects your chest'),cost:slot==='chest'?5+tier*3:3+tier*2};}
}
for(const [id,name,description,cost] of [['tonic','Glow Tonic','Restore 20 HP plus grace healing.',5],['ward','Stonebrew','Prepare a shield that blocks one hit in the next fight.',7],['clarity','Clarity Draught','Add half an ACT of understanding in the next fight.',7]])catalog[id]={id,name,description,cost,consumable:true};
function create(){return{bag:[],equipped:{weapon:null,head:null,chest:null,legs:null}};}
function normalise(value,legacy={}){const n=create();if(!value||typeof value!=='object'||!Array.isArray(value.bag)){n.equipped.weapon=legacy.weapon?'weapon-'+legacy.weapon:null;n.equipped.chest=legacy.armor?'chest-'+legacy.armor:null;return n;}for(const slot of Object.keys(n.equipped)){const id=value.equipped?.[slot];if(catalog[id]?.slot===slot)n.equipped[slot]=id;}for(const item of value.bag){const data=catalog[item?.id];if(!data||n.bag.length>=9)continue;const qty=data.consumable?Math.max(1,Math.min(9,Math.floor(Number(item.qty)||1))):1;const old=n.bag.find(x=>x.id===item.id);if(old){if(data.consumable)old.qty=Math.min(9,old.qty+qty);}else n.bag.push({id:item.id,qty});}return n;}
function canAdd(inv,id,qty=1){const data=catalog[id];if(!data)return false;const old=inv.bag.find(i=>i.id===id);return old?!!data.consumable&&old.qty+qty<=9:inv.bag.length<9;}
function add(inv,id,qty=1){if(!canAdd(inv,id,qty))return false;const old=inv.bag.find(i=>i.id===id);if(old)old.qty+=qty;else inv.bag.push({id,qty});return true;}
function owns(inv,id){return inv.bag.some(i=>i.id===id)||Object.values(inv.equipped).includes(id);}
function equip(inv,index){const entry=inv.bag[index],data=catalog[entry?.id];if(!data?.slot)return false;const old=inv.equipped[data.slot];inv.equipped[data.slot]=entry.id;if(old)inv.bag[index]={id:old,qty:1};else inv.bag.splice(index,1);return true;}
function unequip(inv,slot){const id=inv.equipped[slot];if(!id||inv.bag.length>=9)return false;inv.bag.push({id,qty:1});inv.equipped[slot]=null;return true;}
function remove(inv,index){const item=inv.bag[index];if(!item)return false;if(item.qty>1)item.qty--;else inv.bag.splice(index,1);return true;}
function item(inv,slot){return catalog[inv.equipped[slot]]||null;}
const rarityNames=['Basic','Strong','Godlike'],rarityColors=['#b6c8be','#7cbce8','#efcf83'];for(const item of Object.values(catalog)){if(item.slot){const rank=Math.floor((item.tier-1)/2);item.rarity=rarityNames[rank];item.rarityColor=rarityColors[rank];item.cost=[2,5,8][rank];}}
function chances(chapter){return {godlike:.02+Math.min(19,chapter)*.015,strong:.18+Math.min(19,chapter)*.012};}
function roll(chapter,slot,random=Math.random){const odds=chances(chapter),r=random(),rank=r<odds.godlike?2:r<odds.godlike+odds.strong?1:0,tier=rank*2+1+(random()<.5?0:1);return slot+'-'+tier;}
globalThis.EchoesItems={catalog,chances,roll,create,normalise,canAdd,add,owns,equip,unequip,remove,item};
})();
