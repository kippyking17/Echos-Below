/* Pixel motion, contact bursts and weapon-specific finishers; damage timing stays in gameplay. */
(()=>{
const base=globalThis.EchoesWeapons,portraits=new Map(),effects=[];
const profiles=[
 {id:'knuckles',name:'Bare hands',technique:'Lantern Knuckle',color:'#efd4a2'},
 {id:'hook',name:'Lantern Hook',technique:'Ember Reaping',color:'#ffc56b'},
 {id:'glass',name:'Glass Saber',technique:'Shatter Cross',color:'#74dfff'},
 {id:'ember',name:'Ember Staff',technique:'Cinder Spiral',color:'#ff8056'},
 {id:'needle',name:'Moon Needle',technique:'Moonlit Pierce',color:'#c5b0ff'},
 {id:'chorus',name:'Chorus Spear',technique:'Resonant Thrust',color:'#82efc6'},
 {id:'dawn',name:'Dawnkeeper',technique:'Prismatic Sundering',color:'#ffe398'}
];
const rainbow=['#438bff','#ff9b42','#c583ff','#37c8c0','#f3d34f','#ff8db8'];
const profile=w=>profiles[Math.max(0,Math.min(6,Math.floor(w)||0))],clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
function pixel(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
function ray(c,x,y,angle,from,to,width,color){for(let d=from;d<to;d+=3)pixel(c,x+Math.cos(angle)*d-width/2,y+Math.sin(angle)*d-width/2,width,width,color);}
function ring(c,x,y,r,color,phase=0){for(let i=0;i<36;i++){const a=i*Math.PI/18+phase;pixel(c,x+Math.cos(a)*r,y+Math.sin(a)*r*.65,2,2,color);}}
function pose(w,t,combo=0){const p=ease((t-.08)/.7),q=Math.sin(p*Math.PI),reverse=combo%2?-1:1;
 if(w===0)return{x:15+q*28,y:(combo%3===2?-22*q:Math.sin(p*5)*6),angle:reverse*(p-.5)*.65};
 if(w===1)return{x:15+Math.cos(p*Math.PI)*18,y:Math.sin((p-.5)*Math.PI)*30,angle:-1.5+p*3.3};
 if(w===2)return{x:18+q*25,y:reverse*(p-.5)*45,angle:reverse*(-1.9+p*3.8)};
 if(w===3)return{x:14+q*12,y:-q*12,angle:-2.2+p*Math.PI*3.4};
 if(w===4)return{x:7+q*48,y:-q*3,angle:Math.PI/2+.08*Math.sin(p*12)};
 if(w===5)return{x:2+q*45,y:Math.sin(p*9)*5,angle:Math.PI/2+(p-.5)*.4};
 return{x:12+q*20,y:-28+ease(p)*55,angle:-2.4+p*4.4};
}
function trail(c,w,x,y,angle,t,size,combo){globalThis.EchoesWeaponVFX?.slash(c,w,x,y,angle,t,size,combo);const color=profile(w).color;c.save();c.translate(x,y);c.rotate(angle);c.scale(size,size);
 for(let k=5;k>=1;k--){const past=Math.max(0,t-k*.04),p=pose(w,past,combo);c.globalAlpha=(1-k/6)*.24;const col=w===6?rainbow[k%6]:color;
  if(w===4||w===5)ray(c,0,0,0,8,p.x+26,3,col);else{const a=p.angle-Math.PI/2;for(let n=0;n<5;n++){const d=28+n*4;pixel(c,p.x+Math.cos(a)*d,p.y+Math.sin(a)*d,3,5,col);}}
 }c.restore();}
function impact(c,w,x,y,age,scale=1,finish=false){globalThis.EchoesWeaponVFX?.burst(c,w,x,y,age,scale,finish);const length=finish?1050:620;if(age<0||age>length)return;const t=age/length,p=profile(w),r=(finish?18:7)+Math.sqrt(t)*(finish?68:37);c.save();c.translate(x,y);c.scale(scale,scale);c.globalAlpha=(1-t)*(finish?1:.9);
 if(w===0){for(let i=0;i<8;i++)ray(c,0,0,i*Math.PI/4+Math.PI/8,r*.45,r,3,p.color);pixel(c,-5,-5,10,10,'#fff8dd');}
 if(w===1){ring(c,0,0,r,p.color,t*2);for(let i=0;i<14;i++){const a=i*2.4+t*2;pixel(c,Math.cos(a)*r,Math.sin(a)*r*.7-t*28,3,5,i%2?p.color:'#f66c46');}}
 if(w===2){for(const a of[-.65,.65])ray(c,0,0,a,-r,r,finish?5:3,p.color);for(let i=0;i<16;i++){const a=i*2.4;pixel(c,Math.cos(a)*r,Math.sin(a)*r,3,i%2?8:4,i%3?p.color:'#f4fdff');}}
 if(w===3){for(let i=0;i<24;i++){const a=i*.65+t*8,d=r*(.35+i/36);pixel(c,Math.cos(a)*d,Math.sin(a)*d-t*28,4,7,i%3===0?'#fff1a0':i%2?p.color:'#ee4d42');}ring(c,0,0,r*.8,'#ffd38a',t);}
 if(w===4){ray(c,0,0,-.15,-r*1.6,r*1.6,2,'#f0e8ff');for(let i=0;i<9;i++){const a=i*2.4,d=r*(.5+i*.06),px=Math.cos(a)*d,py=Math.sin(a)*d;pixel(c,px-3,py,7,2,p.color);pixel(c,px,py-3,2,7,'#fff4ff');}}
 if(w===5){for(let i=0;i<3;i++)ring(c,t*24,0,Math.max(3,r-i*12),i===1?'#efffeb':p.color,t*.2);for(let i=0;i<6;i++)pixel(c,Math.cos(i)*r,Math.sin(i)*r*.7,3,6,p.color);}
 if(w===6){for(let i=0;i<6;i++){const col=rainbow[i];ray(c,0,0,-.85+i*.07,-r*1.2,r*1.2,3,col);for(let j=0;j<5;j++){const a=(i*5+j)*2.4;pixel(c,Math.cos(a)*r,Math.sin(a)*r,3,4,col);}}ring(c,0,0,r,'#fff0c5',t);}
 if(t<.13){c.globalAlpha=(.13-t)*2;pixel(c,-13,-13,26,26,'#fffde7');}c.restore();
}
function drawWorld(c,s){const t=clamp(s.age/440),p=pose(s.weapon,s.age>=180&&s.age<210?.43:t,s.combo),angle=s.angle,color=profile(s.weapon).color;trail(c,s.weapon,s.x,s.y,angle,t,.65,s.combo);c.save();c.translate(s.x,s.y);c.rotate(angle);base.weapon(c,s.weapon,p.x*.7,p.y*.7,p.angle,.65,color);c.restore();}
function emitHit(hit,weapon,chapter=0){effects.push({x:hit.x,y:hit.y,weapon,chapter,killed:!!hit.killed,age:0});if(effects.length>24)effects.shift();}
function update(dt){for(const e of effects)e.age+=dt;for(let i=effects.length-1;i>=0;i--)if(effects[i].age>(effects[i].killed?1200:650))effects.splice(i,1);}
function drawEffects(c){for(const e of effects){if(e.killed){const t=clamp(e.age/450);c.save();c.translate(e.x,e.y);c.rotate(t*Math.PI/2*(e.weapon%2?-1:1));c.globalAlpha=1-clamp((e.age-300)/700);pixel(c,-8,-18,16,17,'#718f74');pixel(c,-7,-1,14,17,'#3c6161');pixel(c,-9,-20,18,4,profile(e.weapon).color);pixel(c,-5,-11,3,2,'#dbe4b2');pixel(c,3,-11,3,2,'#dbe4b2');c.restore();base.smoke(c,e.x,e.y,e.age/1000,profile(e.weapon).color);}impact(c,e.weapon,e.x,e.y-6,e.age,e.killed?.8:.55,e.killed);}}
function drawBattle(c,s,battle,chapter,character,color,equipment={}){const w=s.weapon,p=profile(w),age=s.age-340,t=clamp(s.age/s.duration),motion=pose(w,s.age>=340&&s.age<390?.43:t,s.combo),target={x:480,y:236};const g=c.createRadialGradient(480,245,10,480,245,430);g.addColorStop(0,'#183641');g.addColorStop(1,'#07111c');c.fillStyle=g;c.fillRect(0,0,960,600);
 let portrait=portraits.get(character);if(!portrait){portrait=document.createElement('canvas');portrait.width=160;portrait.height=120;portraits.set(character,portrait);}globalThis.EchoesAvatars.portrait(portrait.getContext('2d'),character,s.age/1000,true,equipment);const recoil=age>=0&&age<180?Math.sin(age/180*Math.PI)*12:0;c.drawImage(portrait,160+Math.sin(t*Math.PI)*68,330-Math.sin(t*Math.PI)*28,200,150);
 c.save();c.translate(recoil,0);globalThis.EchoesCharacters.enemy(c,{x:480,y:225,chapter,boss:battle.boss,mini:battle.mini,scale:battle.boss?1.7:1.4,time:s.age/1000,color,phase:globalThis.EchoesCombat.phase(battle)});c.restore();
 const origin={x:420,y:275};trail(c,w,origin.x,origin.y,-.55,t,1.65,s.combo);base.weapon(c,w,origin.x+motion.x*1.7,origin.y+motion.y*1.3,motion.angle-.55,1.7,p.color);impact(c,w,target.x,target.y,age,1.45,!!s.lethal);
 if(age>=0){c.fillStyle='#fff1bf';c.font='28px monospace';c.textAlign='center';c.fillText('−'+s.damage,480,135-clamp(age/600)*20);}c.fillStyle='#c4d9cd';c.font='17px monospace';c.textAlign='center';c.fillText(battle.name,480,65);c.fillStyle=p.color;c.font='14px monospace';c.fillText(p.technique+(s.lethal?' · FINAL BLOW':''),480,513);c.fillStyle='#a9c8b5';c.fillText(globalThis.EchoesItems.catalog[equipment.weapon]?.name||p.name,480,539);
}
function drawDefeat(c,battle,chapter,age,color){base.drawDefeat(c,battle,chapter,age,color);const w=battle.defeat?.weapon||0;impact(c,w,493,300,age,1.35,true);if(age<500){c.fillStyle=profile(w).color;c.font='14px monospace';c.textAlign='center';c.fillText(profile(w).technique,480,520);}}
globalThis.EchoesWeapons={...base,profiles,profile,pose,impact,drawWorld,drawBattle,drawDefeat,emitHit,update,drawEffects,clear:()=>{effects.splice(0);globalThis.EchoesWeaponVFX?.clear();},get effects(){return effects.map(e=>({...e}))}};
})();
