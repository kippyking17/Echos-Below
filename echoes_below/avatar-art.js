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
function portrait(c,id,time=0,transparent=false,equipment={}){const p=get(id),b=Math.round(Math.sin(time*2)),r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y+b,w,h);};c.clearRect(0,0,160,120);if(!transparent){c.fillStyle='#102733';c.fillRect(0,0,160,120);}c.save();c.translate(80,65);c.scale(2,2);r(-12,20,24,3,'#06121b');r(-8,6,6,14,'#23394d');r(2,6,6,14,'#23394d');r(-9,17,8,4,'#122736');r(2,17,8,4,'#122736');r(-11,-8,22,23,p.coat);r(-15,-5,5,17,p.hood);r(10,-5,5,17,p.hood);r(-10,-24,20,17,'#172b3b');r(-9,-27,18,12,p.hood);r(-8,-18,16,11,p.skin);r(-5,-14,3,3,'#152c39');r(3,-14,3,3,'#152c39');r(-12,-8,24,5,p.scarf);r(-16,-4,7,8,p.scarf);r(15,10,6,8,'#c8a773');r(16,11,4,5,'#ffe4a2');armor(c,0,b,equipment,time,1.15,'down',0);c.restore();}

const armorStyles=[null,{base:'#65836b',edge:'#b6d19b',dark:'#365544',gem:'#d2f3b4'},{base:'#497f94',edge:'#a6e0df',dark:'#294e65',gem:'#8bffff'},{base:'#95624f',edge:'#e3ad7e',dark:'#573f41',gem:'#ff9f63'},{base:'#7666a1',edge:'#cdb5f1',dark:'#413b6d',gem:'#edcaff'},{base:'#b68c4d',edge:'#ffe2a0',dark:'#695136',gem:'#76f1c0'},{base:'#86bdc5',edge:'#ecffff',dark:'#436a88',gem:'#d1b7ff'}];
function armor(c,x,y,equipment={},time=0,scale=1,facing='down',stride=0){c.save();c.translate(x,y);c.scale(scale,scale);const tier=id=>globalThis.EchoesItems.catalog[id]?.tier||0,r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h);};
 const legs=tier(equipment.legs);if(legs){const p=armorStyles[legs];for(const [xx,step]of[[-6,stride],[1,-stride]]){r(xx,3+step,5,8,p.dark);r(xx,4+step,5,5,p.base);r(xx,4+step,5,1,p.edge);r(xx-1,10+step,7,3,p.dark);r(xx,10+step,5,1,p.edge);if(legs>=3)r(xx+2,6+step,2,2,p.gem);}}
 const chest=tier(equipment.chest);if(chest){const p=armorStyles[chest];r(-8,-7,16,12,p.dark);r(-7,-6,14,10,p.base);r(-6,-5,2,8,p.edge);r(4,-5,2,8,p.edge);r(-11,-7,5,5,p.base);r(6,-7,5,5,p.base);r(-11,-7,5,1,p.edge);r(6,-7,5,1,p.edge);r(-7,3,14,2,p.edge);r(-1,-4,2,7,p.dark);if(chest>=3){r(-3,-3,6,5,p.dark);r(-1,-2,2,3,p.gem);}if(chest>=5){r(-12,-9,6,2,p.edge);r(6,-9,6,2,p.edge);r(-3,4,6,2,p.gem);}}
 const head=tier(equipment.head);if(head){const p=armorStyles[head];r(-9,-23,18,8,p.dark);r(-8,-23,16,6,p.base);r(-7,-23,14,2,p.edge);r(-9,-17,3,7,p.base);r(6,-17,3,7,p.base);r(-9,-17,18,2,p.edge);if(head>=3){r(-1,-24,2,7,p.gem);r(-6,-24,3,2,p.edge);r(3,-24,3,2,p.edge);}if(head>=5){r(-10,-27,3,7,p.edge);r(7,-27,3,7,p.edge);r(-2,-27,4,4,p.gem);}if(facing==='up')r(-6,-16,12,7,p.base);}
 c.restore();}

globalThis.EchoesAvatars={presets,get,portrait,armor,armorStyles};
})();
