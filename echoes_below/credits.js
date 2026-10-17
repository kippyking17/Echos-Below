/* A skippable victory sequence, drawn with the game's own canvas. */
(()=>{
const W=960,H=600;
function text(ctx,value,x,y,size=20,color='#eaefff',align='center'){ctx.fillStyle=color;ctx.font=size+'px monospace';ctx.textAlign=align;ctx.fillText(value,x,y);}
function prism(ctx,x,y,size,palette,time,opacity=1){
 ctx.save();ctx.globalAlpha=opacity;ctx.translate(x,y);const gradient=ctx.createLinearGradient(-size,-size*1.6,size,size);palette.forEach((c,i)=>gradient.addColorStop(i/(palette.length-1),c));
 ctx.shadowBlur=30;ctx.shadowColor=palette[Math.floor(time/750)%palette.length];ctx.fillStyle=gradient;ctx.beginPath();ctx.moveTo(0,-size*1.5);ctx.lineTo(size*.66,-size*.45);ctx.lineTo(size*.53,size*.75);ctx.lineTo(0,size);ctx.lineTo(-size*.53,size*.75);ctx.lineTo(-size*.66,-size*.45);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
 ctx.strokeStyle='#ffffffa0';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-size*1.5);ctx.lineTo(0,size);ctx.moveTo(-size*.66,-size*.45);ctx.lineTo(size*.66,-size*.45);ctx.moveTo(-size*.53,size*.75);ctx.lineTo(0,-size*.45);ctx.lineTo(size*.53,size*.75);ctx.stroke();ctx.restore();
}
function backdrop(ctx,s,summary=false){
 const palette=s.campaign.slice(0,19).map(c=>c.crystalColor),t=s.time/1000,background=ctx.createLinearGradient(0,0,0,H);background.addColorStop(0,'#050b1d');background.addColorStop(.7,'#18213a');background.addColorStop(1,'#34253c');ctx.fillStyle=background;ctx.fillRect(0,0,W,H);
 for(let i=0;i<110;i++){const x=(i*149+37)%W,y=((i*83-t*(3+i%4))%H+H)%H;ctx.globalAlpha=.2+.5*(.5+.5*Math.sin(t*.7+i));ctx.fillStyle=palette[i%palette.length];ctx.fillRect(x,y,i%7===0?3:1.5,i%7===0?3:1.5);}ctx.globalAlpha=1;
 for(let i=0;i<palette.length;i++){ctx.strokeStyle=palette[i]+'1f';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(480,540);ctx.quadraticCurveTo(480+Math.sin(t*.3+i)*240,280,50+i*47,0);ctx.stroke();}
 ctx.strokeStyle='#d0e8ff33';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(360,560);ctx.lineTo(360,185);ctx.quadraticCurveTo(480,40,600,185);ctx.lineTo(600,560);ctx.stroke();
 prism(ctx,480,summary?324:440,summary?60:95,palette,s.time,summary?.9:.22);
}
function rows(s){
 const count=Object.keys(s.game.read||{}).filter(k=>k.startsWith('story:')&&!k.startsWith('story:exp:')).length;
 const out=[
 ['CREATED BY',22,'#a9bad2'],['KingKippy',36,'#fff0bc'],['',18],['A STORY ABOUT',18,'#a9bad2'],['The light we borrow.',24],['The names we carry.',24],['The way we come home.',24],['',18],
 ['OUR COMPANIONS',21,'#a9bad2'],['Mara — who refused another sacrifice',20],['Wick — who learned to answer the call',20],['You — who followed the lantern',20],['',18],['THE DISTRICTS THAT MADE THE DAWN',20,'#a9bad2']
 ];
 s.campaign.forEach((c,i)=>out.push([String(i+1).padStart(2,'0')+'  '+c.title,21,c.crystalColor]));
 out.push(['',18],['YOUR JOURNEY',23,'#fff0bc'],[s.game.mercy+' lives spared · '+s.game.fight+' victories by force',20],[count+' of 120 memories carried home',20],[(s.game.gear?.relics?.length||0)+' of 6 trail relics discovered',20],['',18],['BUILT WITH',21,'#a9bad2'],['Three.js · MIT License',23],['',18],['FOR EVERYONE WHO PLAYED',21,'#a9bad2'],['Thank you for listening.',27,'#fff0bc'],['Thank you for coming back.',27,'#fff0bc'],['',18],['“Let’s make tomorrow ourselves.”',24],['— Mara',20,'#b9e2e9']);return out;
}
function duration(s){return 8000+(rows(s).length*42+680)/48*1000;}
function draw(ctx,s){
 backdrop(ctx,s);const t=s.time;
 if(t<8000){const fade=Math.min(1,t/1200,(8000-t)/1200);ctx.save();ctx.globalAlpha=fade;text(ctx,'ECHOES BELOW',480,228,56,'#fff0d5');text(ctx,'THE BORROWED LIGHT',480,276,27,'#c8d7ef');text(ctx,'Twenty colors. One shared dawn.',480,340,20,'#d3edee');text(ctx,'A game by KingKippy',480,384,18,'#fff0bc');ctx.restore();}
 else{const offset=(t-8000)/1000*48;ctx.save();ctx.beginPath();ctx.rect(28,64,904,464);ctx.clip();rows(s).forEach(([label,size,color],i)=>{const y=H+70+i*42-offset;if(y>50&&y<550){ctx.globalAlpha=Math.min(1,(y-50)/45,(550-y)/45);text(ctx,label,480,y,size,color||'#e9edfa');}});ctx.restore();ctx.globalAlpha=1;}
 text(ctx,'THANK YOU FOR WALKING WITH US',480,576,14,'#a5b7cf');
}
function summary(ctx,s){backdrop(ctx,s,true);text(ctx,'THE DOOR IS OPEN',480,119,42,'#fff1ca');text(ctx,'Every color belongs in the light.',480,160,21,'#d3e5ff');text(ctx,'Mara is home. Wick has a holiday.',480,210,20,'#d7eaf1');
 text(ctx,s.game.mercy+' SPARED    '+s.game.fight+' DEFEATED',480,424,20,'#e7efff');text(ctx,'Your completed journey is saved.',480,461,17,'#b4d6d1');text(ctx,'Return to the title',480,535,18,'#ffdf9a');}
globalThis.EchoesCredits={draw,summary,duration,prism};
})();
