/* Authored encounter identities and fair, edge-spawned attack waves. */
(()=>{
const blueprints=[
 ['Bellfall',['rain','gates','fan'],'Watch the falling bell marks. Move into the unmarked gap.','sentinel'],
 ['Briar Oath',['vines','crosswind','rain'],'Roots grow from the edges. Find the open lane before they arrive.','briar'],
 ['Broken Refraction',['fan','diagonal','gates'],'Prisms split from the rim. Move between the marked rays.','prism'],
 ['River Promise',['crosswind','rain','ring'],'Read the current at the edge, then cross behind it.','tide'],
 ['Ashen Margins',['pages','crosswind','fan'],'Falling pages leave a blank margin. Keep moving into that space.','scribe'],
 ['The Unpaid Toll',['gates','fan','crosswind'],'The toll gates leave one free lane. No coins are needed.','merchant'],
 ['Furnace Heart',['embers','diagonal','gates'],'Embers climb as well as fall. Follow the clear furnace lane.','forge'],
 ['Borrowed Seconds',['sweep','ring','crosswind'],'Clock hands move in order. Stay behind the last sweep.','clock'],
 ['The Thorn Garden',['vines','fan','rain'],'Watch the root marks. Their bright tips show the incoming path.','briar'],
 ['Pressure of Memory',['ring','crosswind','diagonal'],'Pressure closes from the walls. Drift away from the converging shots.','tide'],
 ['A Voice Returned',['notes','fan','ring'],'Notes enter on the beat. Slip between the paired voices.','choir'],
 ['The Last Departure',['crosswind','gates','sweep'],'Read each carriage lane. Wait for the clear row to pass.','conductor'],
 ['Lantern Procession',['fan','rain','sweep'],'Lantern light points toward the next wave. Step out of its line.','lantern'],
 ['Falling Constellations',['diagonal','ring','stars'],'Comets enter from the corners. The unmarked corner stays open.','astral'],
 ['The Regent’s Reach',['gates','sweep','fan'],'The shield wall always has a gate. Cross before it closes.','regent'],
 ['Patient Winter',['snow','crosswind','ring'],'Snow drifts slowly. Small movements are safer than chasing it.','winter'],
 ['Names in the Ink',['pages','ring','gates'],'Ink travels along the margins. Watch the next marked edge.','scribe'],
 ['A Bridge for Two',['diagonal','crosswind','vines'],'Two sides answer each other. Leave room for the returning wave.','sentinel'],
 ['The Borrowed Heart',['embers','ring','gates'],'The engine announces each pulse. Move before the marked rays ignite.','engine'],
 ['Every Color at Dawn',['stars','fan','ring'],'Every color has a place. Read the edge marks and keep a clear path.','dawn']
];
const minis=[
 {chapter:1,name:'Briarbound Scout',title:'The First Tangled Promise',kinds:['vines','fan'],look:'briar',acts:['Show the scout Mara’s ribbon.','Promise to leave a path through the roots.'],hint:'The scout marks each root before it grows. Find the empty column.'},
 {chapter:4,name:'Ashpage Curator',title:'Keeper of the Unread',kinds:['pages','crosswind'],look:'scribe',acts:['Ask which page the curator is protecting.','Offer to carry its missing names in your journal.'],hint:'Read the blank margin between the falling pages.'},
 {chapter:7,name:'Secondhand Duelist',title:'A Minute to Listen',kinds:['sweep','ring'],look:'clock',acts:['Match the duelist’s patient rhythm.','Ask for one borrowed minute of peace.'],hint:'Stay behind the sweep instead of racing into it.'},
 {chapter:10,name:'Hollow Resonator',title:'The Note Between Voices',kinds:['notes','fan'],look:'choir',acts:['Repeat the note the resonator cannot finish.','Leave room for it to answer in its own voice.'],hint:'Paired notes leave a space between them. Move with the rhythm.'},
 {chapter:13,name:'Comet Watcher',title:'Someone Still Looking Up',kinds:['diagonal','stars'],look:'astral',acts:['Ask which missing traveler the watcher follows.','Promise to return the star chart to its window.'],hint:'Read the corner marks before the comets cross.'},
 {chapter:16,name:'Inkbound Keeper',title:'The Name That Would Not Fade',kinds:['pages','gates'],look:'scribe',acts:['Read the keeper’s faded name aloud.','Offer a blank page for the story that comes next.'],hint:'Ink leaves a clear margin. Wait for the marked wave, then cross.'}
];
const profiles=blueprints.map((b,index)=>({index,signature:b[0],kinds:b[1],hint:b[2],look:b[3]}));
function miniboss(chapter,room){return room===2?minis.find(m=>m.chapter===chapter):null;}
function profile(chapter,room){const mini=miniboss(chapter,room);return mini?{...mini,index:chapter,signature:mini.title,mini:true}:profiles[chapter];}
function phase(b){return b.hp<=b.max*.5||b.peace>=2?2:1;}
function create(b,chapter){const p=b.profile;return{clock:0,wave:0,next:100,pending:[],phase:phase(b),chapter,profile:p,mini:!!b.mini,move:p.kinds[(Math.max(0,b.turn-1)+(phase(b)-1))%p.kinds.length]};}
function spawnWave(s,player){
 const wave=s.wave++,kind=s.move,phase=s.phase,speed=(s.mini?.115:.125)+Math.min(s.chapter,19)*.001+((phase-1)*.01),damage=s.mini?3:3+(s.chapter>=12?1:0),shots=[],add=(x,y,vx,vy)=>shots.push({x,y,vx,vy,damage,color:globalThis.EchoesStory.chapters[s.chapter].crystalPalette[(wave*5+shots.length*3)%globalThis.EchoesStory.chapters[s.chapter].crystalPalette.length],shape:kind});
 const gap=(wave+s.chapter+phase)%5;
 if(['rain','snow','embers','pages','gates','vines','stars'].includes(kind)){
  const up=kind==='embers'&&wave%2===1;for(let i=0;i<5;i++){if(i===gap)continue;const x=360+i*58;add(x,up?487:331,kind==='snow'?Math.sin(i+wave)*.018:kind==='pages'?(i%2?.018:-.018):0,up?-speed:speed*(kind==='snow'?.72:1));if(kind==='gates'&&phase===2)add(x+15,up?487:331,0,up?-speed:speed);}
 }else if(kind==='crosswind'||kind==='sweep'){
  const left=(wave+s.chapter)%2===0,empty=(wave+s.chapter)%4;for(let i=0;i<4;i++){if(i===empty)continue;add(left?337:623,345+i*43,left?speed:-speed,kind==='sweep'?(i%2?.018:-.018):0);}
 }else if(kind==='fan'||kind==='notes'){
  const x=380+(wave%3)*100,y=331,a=Math.atan2(player.y-y,player.x-x);for(let i=-1;i<=1;i++){const angle=a+i*(kind==='notes'?.38:.48);add(x,y,Math.cos(angle)*speed,Math.sin(angle)*speed);}if(kind==='notes'&&phase===2)add(623,468,-speed*.9,-speed*.14);
 }else if(kind==='diagonal'){
  const corners=[[338,332],[622,332],[338,486],[622,486]],skip=gap%4;for(let i=0;i<4;i++){if(i===skip)continue;const [x,y]=corners[i],angle=Math.atan2(410-y,480-x);add(x,y,Math.cos(angle)*speed,Math.sin(angle)*speed);}
 }else if(kind==='ring'){
  const origins=[[338,346],[338,470],[622,346],[622,470],[420,331],[540,487]];for(let i=0;i<origins.length;i++){if(i===(wave+s.chapter)%origins.length)continue;const [x,y]=origins[i],angle=Math.atan2(410-y,480-x);add(x,y,Math.cos(angle)*speed*.82,Math.sin(angle)*speed*.82);}
 }
 // Every shot spends at least 650 ms marked at an arena edge before becoming harmful.
 const warning=s.mini?800:700;s.pending.push(...shots.map(b=>({...b,due:s.clock+warning})));return shots.length;
}
function step(s,dt,player){s.clock+=dt;if(s.clock>=s.next){spawnWave(s,player);s.next=s.clock+(s.mini?1450:1240)-(s.phase===2?100:0)-(s.chapter%4)*30;}const ready=s.pending.filter(b=>b.due<=s.clock);s.pending=s.pending.filter(b=>b.due>s.clock);return ready.map(({due,...b})=>b);}
function warnings(c,s){if(!s)return;for(const b of s.pending){const remaining=b.due-s.clock;c.fillStyle=remaining<250?'#f5d99c':'#788f9b';c.globalAlpha=.45+.2*Math.sin(s.clock/90);c.fillRect(b.x-4,b.y-4,8,8);c.globalAlpha=1;c.strokeStyle='#f4ce8955';c.lineWidth=1;c.beginPath();c.moveTo(b.x,b.y);c.lineTo(b.x+b.vx*100,b.y+b.vy*100);c.stroke();}c.globalAlpha=1;}
function drawBullet(c,b){c.fillStyle=b.color||'#f3d19b';const x=Math.round(b.x),y=Math.round(b.y);if(b.shape==='pages'){c.fillRect(x-5,y-6,10,12);c.fillStyle='#163247';c.fillRect(x-3,y-3,6,2);c.fillRect(x-3,y+1,4,2);}else if(b.shape==='notes'){c.fillRect(x+2,y-7,3,12);c.fillRect(x-4,y+1,7,5);c.fillRect(x+3,y-7,5,3);}else if(['fan','diagonal','stars','snow','vines'].includes(b.shape)){c.fillRect(x-2,y-7,4,14);c.fillRect(x-5,y-3,10,6);c.fillStyle='#ffffff88';c.fillRect(x-1,y-5,2,5);}else{c.fillRect(x-5,y-5,10,10);c.fillStyle='#ffffff88';c.fillRect(x-3,y-3,4,3);}}
function drawEnemy(c,b,color,time){
 const p=b.profile,look=p?.look||'sentinel',large=b.boss?1.3:b.mini?1.12:.9;function r(x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(480+x*large),Math.round(177+y*large),Math.ceil(w*large),Math.ceil(h*large));}c.save();const bob=Math.round(Math.sin(time*1.6)*2);c.translate(0,bob);r(-24,32,48,6,'#030c1680');r(-17,-7,34,37,'#263e51');r(-15,-5,30,3,color);r(-28,0,11,20,'#355668');r(17,0,11,20,'#355668');r(-14,28,10,10,'#182e40');r(4,28,10,10,'#182e40');
 if(['scribe','merchant','conductor'].includes(look)){r(-22,-26,44,24,'#b5aa87');r(-2,-26,4,26,'#6c6555');for(let i=0;i<3;i++){r(-17,-21+i*6,11,2,'#56646b');r(6,-21+i*6,11,2,'#56646b');}r(-14,-30,28,4,color);}
 else if(['clock','forge','engine'].includes(look)){for(let i=0;i<8;i++){const a=time*.2+i*Math.PI/4;r(Math.cos(a)*21-3,Math.sin(a)*21-20,6,6,'#bc9c64');}r(-18,-31,36,27,'#917d58');r(-12,-25,24,15,'#18394d');r(-3,-24,6,14,color);r(-3,-15,13,4,color);}
 else if(look==='briar'){r(-23,-20,7,23,'#5d805f');r(16,-20,7,23,'#5d805f');r(-30,-23,13,7,color);r(17,-23,13,7,color);r(-9,-29,18,24,'#7da08a');r(-4,-36,8,9,color);}
 else{const points=[[-2,-41],[15,-24],[10,-6],[-2,0],[-14,-8],[-19,-24]];c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(480+x*large,177+y*large):c.moveTo(480+x*large,177+y*large));c.closePath();c.fill();r(-13,-25,9,16,'#ffffff55');if(['astral','dawn','regent','winter'].includes(look)){r(-24,-34,7,10,color);r(17,-34,7,10,color);r(-27,-37,13,4,'#e0cfa4');r(14,-37,13,4,'#e0cfa4');}}
 r(-10,-2,5,4,'#d6f5e3');r(6,-2,5,4,'#d6f5e3');if(b.boss&&phase(b)===2){r(-34,7,4,8,color);r(30,7,4,8,color);}c.restore();
}
globalThis.EchoesCombat={profiles,minis,miniboss,profile,phase,create,step,warnings,drawBullet,drawEnemy,duration:b=>b.mini?5200:phase(b)===2?6200:5700};
})();
