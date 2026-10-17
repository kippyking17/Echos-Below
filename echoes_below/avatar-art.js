(()=>{
const presets=[
 {id:'wanderer',name:'The Wanderer',coat:'#70867c',hood:'#486278',scarf:'#d37b72',skin:'#d2b992'},
 {id:'mossrunner',name:'Mossrunner',coat:'#60815e',hood:'#85945f',scarf:'#e2cf9d',skin:'#c7a580'},
 {id:'embercoat',name:'Embercoat',coat:'#a35d4d',hood:'#734f47',scarf:'#efc36d',skin:'#987155'},
 {id:'duskcloak',name:'Duskcloak',coat:'#716587',hood:'#584e79',scarf:'#a9c9de',skin:'#d1b39f'},
 {id:'seaglass',name:'Seaglass',coat:'#4b8d8b',hood:'#355e73',scarf:'#d7c66e',skin:'#a78060'},
 {id:'dawnkeeper',name:'Dawnkeeper',coat:'#bcc8b2',hood:'#9caa95',scarf:'#c788a1',skin:'#d8c4a2'}
];
function get(id){return presets.find(p=>p.id===id)||presets[0];}
function portrait(c,id,time=0,transparent=false){const p=get(id),b=Math.round(Math.sin(time*2)),r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y+b,w,h);};c.clearRect(0,0,160,120);if(!transparent){c.fillStyle='#102733';c.fillRect(0,0,160,120);}c.save();c.translate(80,65);c.scale(2,2);r(-12,20,24,3,'#06121b');r(-8,6,6,14,'#23394d');r(2,6,6,14,'#23394d');r(-9,17,8,4,'#122736');r(2,17,8,4,'#122736');r(-11,-8,22,23,p.coat);r(-15,-5,5,17,p.hood);r(10,-5,5,17,p.hood);r(-10,-24,20,17,'#172b3b');r(-9,-27,18,12,p.hood);r(-8,-18,16,11,p.skin);r(-5,-14,3,3,'#152c39');r(3,-14,3,3,'#152c39');r(-12,-8,24,5,p.scarf);r(-16,-4,7,8,p.scarf);r(15,10,6,8,'#c8a773');r(16,11,4,5,'#ffe4a2');c.restore();}
globalThis.EchoesAvatars={presets,get,portrait};
})();
