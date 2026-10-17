/* Twenty original looping themes; no streamed audio or third-party songs. */
(()=>{
const themes=[
 ['A Bell Beneath the Well',76,0,'triangle',[0,7,3,10,7,5,3,2,0,3,7,12,10,7,3,0],[0,5,3,7]],
 ['Roots Carry a Heartbeat',88,2,'sine',[0,2,5,7,5,2,0,-2,0,5,9,7,5,2,4,0],[0,3,5,4]],
 ['Orchard of Glass',94,5,'triangle',[12,7,10,5,7,3,5,0,7,12,15,10,12,7,5,3],[0,5,3,7]],
 ['Names on the River',68,-2,'sine',[0,3,7,10,12,10,7,3,2,5,9,12,9,5,2,-2],[0,5,7,3]],
 ['The Unburned Page',82,-3,'triangle',[7,3,0,2,5,3,7,10,8,5,2,3,7,5,2,0],[0,3,5,7]],
 ['Lanterns in the Market',104,0,'square',[0,4,7,9,7,4,2,7,5,9,12,9,7,4,2,0],[0,5,7,0]],
 ['Furnace Workers’ Waltz',112,-5,'triangle',[0,0,7,5,3,7,10,7,0,3,5,8,7,5,3,-2],[0,3,5,7]],
 ['One Borrowed Minute',96,4,'square',[12,0,7,0,10,0,5,0,8,0,3,0,7,2,5,0],[0,5,3,7]],
 ['The Night Garden',72,1,'sine',[0,7,10,14,10,7,5,2,3,10,12,15,12,8,5,3],[0,3,8,5]],
 ['Breath Under Still Water',66,-4,'sine',[7,10,12,10,7,3,2,0,5,8,12,15,12,8,5,2],[0,5,3,7]],
 ['The Stone Choir',84,-2,'triangle',[0,3,7,12,10,7,3,5,2,5,9,14,12,9,5,0],[0,5,7,3]],
 ['The Last Train Home',108,2,'square',[0,7,2,9,4,11,7,12,5,12,9,14,7,11,4,2],[0,5,7,0]],
 ['Windows Pass the Flame',98,5,'triangle',[0,4,7,12,7,4,9,7,5,9,12,16,14,12,9,7],[0,5,3,7]],
 ['A Sky No One Can Own',78,7,'sine',[12,7,14,10,17,14,12,7,10,5,12,8,15,12,10,5],[0,3,5,7]],
 ['A Crown Learning to Bend',92,-1,'triangle',[0,7,3,8,5,10,7,12,10,5,8,3,7,2,5,0],[0,5,3,7]],
 ['A Coal Against the Snow',64,3,'sine',[12,10,7,5,3,5,7,10,14,12,8,7,5,3,2,0],[0,3,5,7]],
 ['The Names We Keep',74,-3,'triangle',[0,2,3,7,5,3,2,-2,0,5,7,10,8,5,3,0],[0,8,5,7]],
 ['A Bridge for Every Voice',106,0,'triangle',[0,4,7,11,9,7,5,2,4,7,12,14,12,9,7,4],[0,5,7,3]],
 ['The Heart Chooses Silence',90,-5,'triangle',[0,7,0,3,10,7,5,3,2,9,5,2,8,5,3,-2],[0,3,5,7]],
 ['Every Color Comes Home',100,5,'triangle',[0,4,7,12,11,9,7,4,5,9,12,16,14,12,7,4],[0,5,3,7]]
].map(([name,bpm,key,type,notes,chords],index)=>({name,bpm,key,type,notes,chords,index}));
function step(chapter,index,combat=false){const t=themes[Math.max(0,Math.min(19,chapter))],beat=60000/t.bpm/(combat?2:1.5),note=t.notes[index%16],chord=t.chords[Math.floor(index/8)%4],base=130.81*2**(t.key/12),event=(n,d,v,type=t.type,pan=0)=>({frequency:base*2**(n/12),duration:d,volume:v,type,pan}),events=[];
 // Each district has its own melody, register, pace and accompaniment rhythm.
 if(index%8!==7||chapter%3===0)events.push(event(note+12,beat/1000*.8,combat?.035:t.type==='square'?.014:.027,t.type,chapter%2?.14:-.14));
 if(index%4===0)events.push(event(chord,beat/1000*2.6,.017,'sine'));
 if(index%2===chapter%2)events.push(event(chord+7+(index%4===3?12:0),beat/1000*.55,.009,'triangle',chapter%2?-.2:.2));
 if(combat){if(index%2===0)events.push(event(-12,beat/1000*.28,.026,'triangle'));if(index%4===3)events.push(event(note+19,beat/1000*.22,.01,'square'));}
 return{beat,events,name:t.name};}
globalThis.EchoesMusic={themes,step};
})();
