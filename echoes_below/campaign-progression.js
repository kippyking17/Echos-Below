/* Fixed chapter progression: traveling farther never scales enemies down to the player. */
(()=>{
const roomsPerChapter=7,legacyRooms=[0,1,2,3,5,9],oldMiniChapters=new Set([1,4,7,10,13,16]);
const weaponPower=[0,2,4,7,11,17,24],chestDefense=[0,1,2,4,6,10,14],lightDefense=[0,0,1,2,3,5,7];
function stats(chapter,kind='boss'){
 const c=Math.max(0,Math.min(29,Math.floor(chapter)||0)),boss=kind==='boss',mini=kind==='mini';
 return {hp:Math.round(boss?54+14*c+.8*c*c+(c*7+4)*8:mini?32+9*c+.4*c*c+c*7*6:18+3*c+.15*c*c),
  damage:boss?4+2*c+Math.floor(c*c/16)+c*5+3+Math.floor(c*2.2):mini?3+c+Math.floor(c*c/24)+c*5+Math.floor(c*1.4):2+Math.floor(c/3),
  actRequired:Number((boss?3+c*.4:mini?2+c*.25:2).toFixed(1)),armor:Math.floor(c*(boss?.7:mini?.5:.25))};
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
function expand(value){
 if(value.campaignChapters===30)return value;
 const n=JSON.parse(JSON.stringify(value)),remap=record=>Object.fromEntries(Object.entries(record||{}).map(([key,v])=>[key.replace(/(^|:)19:(\d)/, (_,prefix,r)=>prefix+'29:'+r),v]));
 for(const field of ['flags','read','worldLoot','blessings','victoryGifts'])n[field]=remap(n[field]);
 if(n.bossLoot&&Object.hasOwn(n.bossLoot,'19')){n.bossLoot[29]=n.bossLoot[19]==='guardian-19'?'guardian-29':n.bossLoot[19];delete n.bossLoot[19];}
 if(n.chests){const moved={};for(const [key,v]of Object.entries(n.chests)){const index=+key;moved[index>=190&&index<200?index+100:index]=v;}n.chests=moved;}
 n.bossRelics=(n.bossRelics||[]).map(id=>id==='guardian-19'?'guardian-29':id);
 if(n.shopStock&&Object.hasOwn(n.shopStock,'19')){n.shopStock[29]=n.shopStock[19];delete n.shopStock[19];}
 // Old finale chests have incompatible world positions; retain them under their old location,
 // rather than creating another reward at a new ninth-room interval.
 if(n.expedition?.returnChapter===19)n.expedition.returnChapter=29;
 if(n.lastGrace?.chapter===19)n.lastGrace.chapter=29;
 if(n.checkpoint){if(n.checkpoint.chapter===19)n.checkpoint.chapter=29;for(const f of ['flags','read','blessings'])n.checkpoint[f]=remap(n.checkpoint[f]);}
 if(n.chapter===19||n.ended){n.chapter=19;n.room=0;n.x=110;n.y=353;n.ended=false;n.ending='';if(!n.lastGrace||n.lastGrace.chapter===29){n.lastGrace=null;for(let c=18;c>=0&&!n.lastGrace;c--)for(const r of [9,4])if(n.flags?.[c+':'+r]){n.lastGrace={chapter:c,room:r};break;}}n.checkpoint=null;n.expedition=null;}
 n.campaignChapters=30;return n;
}
function compress(value){
 const n=JSON.parse(JSON.stringify(value));if(n.campaignRooms===7)return n;
 const room=(c,r)=>c===29?([0,0,0,0,1,1,1,1,1,2][r]??0):([0,1,2,3,4,5,5,5,5,6][r]??0);
 const records=record=>Object.fromEntries(Object.entries(record||{}).map(([k,v])=>[k.replace(/(^|:)(\d{1,2}):(\d)(?=:|$)/,(_,pre,c,r)=>pre+c+':'+room(+c,+r)),v]));
 n.room=room(n.chapter,n.room);for(const field of ['flags','read','worldLoot','blessings','victoryGifts'])n[field]=records(n[field]);
 if(n.lastGrace)n.lastGrace.room=room(n.lastGrace.chapter,n.lastGrace.room);
 if(n.checkpoint){n.checkpoint.room=room(n.checkpoint.chapter,n.checkpoint.room);for(const f of ['flags','read','blessings'])n.checkpoint[f]=records(n.checkpoint[f]);}
 const chests={};for(const [key,v]of Object.entries(n.chests||{})){const old=+key,c=Math.floor(old/10);chests[c*7+room(c,old%10)]=v;}n.chests=chests;
 if(n.expedition)n.expedition.returnRoom=room(n.expedition.returnChapter,n.expedition.returnRoom);
 n.campaignRooms=7;n.x=110;n.y=353;return n;
}
function migrate(value){
 if(value.campaignRooms===roomsPerChapter&&value.campaignChapters===30)return value;
 if(value.campaignRooms===10)return compress(expand(value));
 const n=JSON.parse(JSON.stringify(value));if(!Object.hasOwn(n,'lastGrace')&&n.checkpoint)n.lastGrace={chapter:n.checkpoint.chapter,room:0};n.campaignRooms=10;n.room=legacyRoom(n.room);
 n.flags=mapRecord(n.flags,'flags');n.read=mapRecord(n.read,'read');n.worldLoot=mapRecord(n.worldLoot,'loot');
 if(n.expedition)n.expedition.returnRoom=legacyRoom(n.expedition.returnRoom);
 if(n.checkpoint){n.checkpoint.room=legacyRoom(n.checkpoint.room);n.checkpoint.flags=mapRecord(n.checkpoint.flags,'flags');n.checkpoint.read=mapRecord(n.checkpoint.read,'read');if(n.checkpoint.expedition)n.checkpoint.expedition.returnRoom=legacyRoom(n.checkpoint.expedition.returnRoom);}
 return compress(expand(n));
}
globalThis.EchoesProgression={roomsPerChapter,weaponPower,chestDefense,lightDefense,stats,migrate,expand,compress};
})();
