/* Original pixel energy effects. Procedural drawing never consumes the gameplay RNG. */
(()=>{
const palettes=[['#ead4ad','#fff6da','#b79574'],['#ffb34f','#fff0b0','#f35b36'],['#65dcff','#ecfbff','#5788ed'],['#ff713f','#fff1a0','#ce354d'],['#be92ff','#fbebff','#7651df'],['#57efb4','#e8fff0','#239cdb'],['#ffe586','#fffbe1','#ff9559']],rainbow=['#59bfff','#c08aff','#ff85c4','#ffae64','#fff17b','#7bf1bb'],cues=[];
let reduced=false;try{reduced=localStorage.getItem('echoesBelow_vfx_v1')==='reduced';}catch{}
const clamp=x=>Math.max(0,Math.min(1,x)),part=(i,t)=>{const n=Math.sin(i*127.1+t*13.7)*43758.5453;return n-Math.floor(n);};
function px(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
function path(c,points,color,width,alpha=1,closed=false){c.save();c.globalAlpha*=alpha;c.strokeStyle=color;c.fillStyle=color;c.lineWidth=width;c.beginPath();points.forEach((p,i)=>i?c.lineTo(Math.round(p.x),Math.round(p.y)):c.moveTo(Math.round(p.x),Math.round(p.y)));if(closed){c.closePath();c.fill();}else c.stroke();c.restore();}
function star(c,x,y,size,color){px(c,x-size,y-1,size*2+1,2,color);px(c,x-1,y-size,2,size*2+1,color);}
function halo(c,x,y,r,color,alpha){c.save();c.globalAlpha*=alpha;for(let i=0;i<3;i++){c.fillStyle=color;c.beginPath();c.ellipse(x,y,r*(1+i*.5),r*(.6+i*.25),0,0,Math.PI*2);c.fill();c.globalAlpha*=.45;}c.restore();}
function blade(c,w,time=performance.now()/1000){if(!w)return;const p=palettes[w]||palettes[1],power=w>=5?1:w>=3?.72:.48,n=reduced?4:8+w*2,len=w===1?30:w===3?40:49;c.save();c.shadowBlur=0;c.globalCompositeOperation='lighter';
 // Keep one continuous blade silhouette; fire and crystal motes are surface energy.
 for(let side of[-1,1])path(c,[{x:side*4,y:1},{x:side*5,y:-len+8},{x:0,y:-len-3}],p[0],reduced?2:5,.15*power);
 path(c,[{x:0,y:0},{x:0,y:-len}],p[1],1,.7);
 for(let i=0;i<n;i++){const phase=(time*(w===3?1.2:.55)+i*.137)%1,yy=-4-phase*(len-4),side=i%2?1:-1,xx=side*(5+Math.sin(time*4+i*2)*3),col=w===6?rainbow[i%6]:i%3?p[0]:p[1];
  c.save();c.globalAlpha*=(1-phase)*power;
  if(w===1||w===3){const h=4+phase*9;path(c,[{x:xx-3,y:yy+3},{x:xx+side*2,y:yy-h},{x:xx+3,y:yy+1}],col,1,.65,true);}
  else if(w===2){path(c,[{x:xx,y:yy-4},{x:xx+3,y:yy},{x:xx,y:yy+3},{x:xx-2,y:yy}],col,1,.7,true);}
  else if(w===4){star(c,xx,yy,2+i%3,col);}
  else if(w===5){px(c,xx,yy,2,4,col);if(i%4===0)path(c,[{x:xx-3,y:yy},{x:xx+3,y:yy+2},{x:xx-1,y:yy+5}],p[1],1);}
  else{star(c,xx*1.4,yy,2+i%2,col);}c.restore();
 }
 if(!reduced&&w>=2){const tick=Math.floor(time*9);for(let j=0;j<(w>=5?3:1);j++){const y=-10-j*13;path(c,[{x:0,y},{x:7+part(j,tick)*5,y:y-5},{x:3,y:y-11},{x:11,y:y-17}],w===6?rainbow[(tick+j)%6]:p[0],1,.45);}}
 c.restore();}
function slash(c,w,x,y,angle,t,size,combo=0){if(!w||t<.09||t>.96)return;const p=palettes[w],count=reduced?10:24,envelope=Math.sin(clamp((t-.08)/.88)*Math.PI);c.save();c.translate(x,y);c.rotate(angle);c.scale(size,size);c.globalCompositeOperation='lighter';
 const tips=[],inner=[];for(let i=0;i<=count;i++){const past=Math.max(.06,t-.32+i/count*.32),q=globalThis.EchoesWeapons.pose(w,past,combo),a=q.angle;tips.push({x:q.x+Math.sin(a)*55,y:q.y-Math.cos(a)*55});inner.push({x:q.x+Math.sin(a)*19,y:q.y-Math.cos(a)*19});}
 path(c,[...tips,...inner.reverse()],p[2],1,.17*envelope,true);
 for(let layer=0;layer<3;layer++){const col=w===6?rainbow[(combo+layer)%6]:layer===2?p[1]:p[0];path(c,tips.map(q=>({x:q.x*(1-layer*.025),y:q.y*(1-layer*.025)})),col,[9,4,1][layer],envelope*[.11,.45,.95][layer]);}
 if(!reduced&&w>=2){for(let echo=1;echo<=2;echo++)path(c,tips.map(q=>({x:q.x*(1-echo*.07),y:q.y*(1-echo*.07)})),w===6?rainbow[(combo+echo+2)%6]:p[0],1,envelope*.22);}const end=tips[tips.length-1];halo(c,end.x,end.y,w>=5?10:6,p[0],envelope*.14);
 const n=reduced?4:w>=5?22:13;for(let i=0;i<n;i++){const q=tips[Math.floor(i/n*(tips.length-1))],a=i*2.399+t*4,d=4+((i*7)%18)*envelope,col=w===6?rainbow[i%6]:i%3?p[0]:p[1];c.save();c.globalAlpha*=envelope*(.3+.6*i/n);px(c,q.x+Math.cos(a)*d,q.y+Math.sin(a)*d,2,i%3?3:6,col);if(i%5===0)star(c,q.x,q.y,3,col);c.restore();}
 c.restore();}
function burst(c,w,x,y,age,scale=1,finish=false){if(!w||age<0||age>(finish?1000:620))return;const t=age/(finish?1000:620),p=palettes[w],n=reduced?7:finish?28:18,r=(finish?18:8)+Math.sqrt(t)*(finish?74:43);c.save();c.translate(x,y);c.scale(scale,scale);c.globalCompositeOperation='lighter';c.globalAlpha*=(1-t)*.75;halo(c,0,0,14+30*t,p[0],.12);
 for(let i=0;i<n;i++){const a=i*2.399+.2*w,d=r*(.45+part(i,w)*.55),cx=Math.cos(a)*d,cy=Math.sin(a)*d*.8-t*t*14,col=w===6?rainbow[i%6]:i%3?p[0]:p[1],l=(finish?15:9)*(1-t)+2;
  path(c,[{x:cx,y:cy},{x:cx-Math.cos(a)*l-Math.sin(a)*2,y:cy-Math.sin(a)*l+Math.cos(a)*2},{x:cx-Math.cos(a)*l*.7+Math.sin(a)*2,y:cy-Math.sin(a)*l*.7-Math.cos(a)*2}],col,1,.75,true);
  if(i%4===0)star(c,cx,cy,2,col);
 }
 if(w>=5||finish){for(let j=0;j<2;j++){const pts=[];for(let i=0;i<=40;i++){const a=i/40*Math.PI*2;pts.push({x:Math.cos(a)*(r+j*7),y:Math.sin(a)*(r+j*7)*.48});}path(c,pts,w===6?rainbow[j*3]:p[0],1,.5);}}
 c.restore();}
function held(c,w,x,y,time){if(!w)return;globalThis.EchoesWeapons.weapon(c,w,x,y,0,.32,palettes[w][0]);if(w>=5&&!reduced){c.save();c.globalAlpha=.5;for(let i=0;i<4;i++){const a=time*1.2+i*Math.PI/2;px(c,x+Math.cos(a)*10,y-10+Math.sin(a)*9,1,2,w===6?rainbow[i]:palettes[w][0]);}c.restore();}}
const cueColors={collectCoin:'#ffe18a',collectBerry:'#ff9cbd',collectKey:'#fff3bc',collectLoot:'#88e5ff',heal:'#8bffc2',potion:'#b0f5dc',upgrade:'#e8f7a8',relic:'#e9b5ff',grace:'#afffce',respawn:'#bcffdb',chapter:'#92deff',portal:'#acb9ff'};
function emit(name,x,y){if(!cueColors[name]||!Number.isFinite(x+y))return;cues.push({name,x,y,age:0,color:cueColors[name]});if(cues.length>24)cues.shift();}
function update(dt){for(const e of cues)e.age+=dt;for(let i=cues.length-1;i>=0;i--)if(cues[i].age>850)cues.splice(i,1);}
function drawCues(c){for(const e of cues){const t=clamp(e.age/850);c.save();c.strokeStyle=e.color;c.lineWidth=1;c.globalAlpha=(1-t)*.5;c.beginPath();c.ellipse(e.x,e.y,8+t*34,4+t*12,0,0,Math.PI*2);c.stroke();c.globalAlpha=1;c.globalAlpha*=(1-t)*.75;const n=reduced?6:15;for(let i=0;i<n;i++){const a=i*2.399+t*3,r=9+t*27,xx=e.x+Math.cos(a)*r,yy=e.y+Math.sin(a)*r*.6-t*25;star(c,xx,yy,i%3?1:2,e.color);}c.restore();}}
function configure(value){reduced=!!value;try{localStorage.setItem('echoesBelow_vfx_v1',reduced?'reduced':'full');}catch{}return reduced;}
globalThis.EchoesWeaponVFX={palettes,blade,slash,burst,held,emit,update,drawCues,configure,clear:()=>cues.splice(0),get reduced(){return reduced},get cueCount(){return cues.length}};
})();
