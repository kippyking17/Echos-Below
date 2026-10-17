/* Fixed chapter progression: traveling farther never scales enemies down to the player. */
(()=>{
const roomsPerChapter=10,legacyRooms=[0,1,2,3,5,9],oldMiniChapters=new Set([1,4,7,10,13,16]);
const weaponPower=[0,2,4,8,12,20,28],chestDefense=[0,1,2,4,6,10,14],lightDefense=[0,0,1,2,3,5,7];
function stats(chapter,kind='boss'){
 const c=Math.max(0,Math.min(19,Math.floor(chapter)||0)),boss=kind==='boss',mini=kind==='mini';
 return {hp:Math.round(boss?54+14*c+.8*c*c:mini?32+9*c+.4*c*c:18+3*c+.15*c*c),
  damage:boss?4+2*c+Math.floor(c*c/16):mini?3+c+Math.floor(c*c/24):2+Math.floor(c/3),
  armor:Math.floor(c*(boss?.7:mini?.5:.25))};
}
function legacyRoom(room){return Number.isInteger(room)&&room>=0&&room<6?legacyRooms[room]:room;}
function mapRecord(value,kind){
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 const out={};for(const [key,v] of Object.entries(value)){
  const match=key.match(/^(.*?)(\d{1,2}):([0-5])(?=(:\d+)?$)/);
  if(!match){out[key]=v;continue;}
  const c=Number(match[2]),r=Number(match[3]),prefix=match[1],tail=key.slice(match[0].length);
  const encounter=kind==='flags'||['fallen:','exitKey:'].includes(prefix);
  const mapped=encounter&&r===2&&oldMiniChapters.has(c)?4:legacyRoom(r);
  out[prefix+c+':'+mapped+tail]=v;
 }return out;
}
function migrate(value){
 if(value.campaignRooms===roomsPerChapter)return value;
 const n=JSON.parse(JSON.stringify(value));if(!Object.hasOwn(n,'lastGrace')&&n.checkpoint)n.lastGrace={chapter:n.checkpoint.chapter,room:0};n.campaignRooms=roomsPerChapter;n.room=legacyRoom(n.room);
 n.flags=mapRecord(n.flags,'flags');n.read=mapRecord(n.read,'read');n.worldLoot=mapRecord(n.worldLoot,'loot');
 if(n.expedition)n.expedition.returnRoom=legacyRoom(n.expedition.returnRoom);
 if(n.checkpoint){n.checkpoint.room=legacyRoom(n.checkpoint.room);n.checkpoint.flags=mapRecord(n.checkpoint.flags,'flags');n.checkpoint.read=mapRecord(n.checkpoint.read,'read');if(n.checkpoint.expedition)n.checkpoint.expedition.returnRoom=legacyRoom(n.checkpoint.expedition.returnRoom);}
 return n;
}
globalThis.EchoesProgression={roomsPerChapter,weaponPower,chestDefense,lightDefense,stats,migrate};
})();
