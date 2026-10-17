/* The Last Echo's one-time ascension; all color comes from the completed districts. */
(()=>{
const duration=6600,line='Go on, little light. Live what I could only remember.';
function draw(c,age,game){const palette=globalThis.EchoesStory.chapters[29].crystalPalette,t=age/1000,ascend=Math.min(1,age/2600),burst=Math.max(0,(age-2400)/1000);c.fillStyle='#040c19';c.fillRect(0,0,960,600);c.save();c.translate(480,340);for(let i=0;i<palette.length;i++){const angle=i*Math.PI*2/palette.length+t*.1;c.strokeStyle=palette[i];c.globalAlpha=.12+Math.sin(t)*.03;c.lineWidth=5;c.beginPath();c.moveTo(Math.cos(angle)*25,Math.sin(angle)*25);c.lineTo(Math.cos(angle)*(90+ascend*330),Math.sin(angle)*(90+ascend*220));c.stroke();}c.restore();
 if(age<3000){c.save();c.globalAlpha=Math.max(0,1-(age-2300)/700);globalThis.EchoesCharacters.enemy(c,{x:480,y:340-ascend*145,chapter:29,boss:true,scale:1.3,time:t,color:palette[Math.floor(t*4)%palette.length],phase:3});c.restore();}
 if(age>2400){for(let i=0;i<180;i++){const a=i*2.399963+Math.sin(i)*.2,r=(45+i%17*6)*burst/(1+burst*.4),x=480+Math.cos(a)*r,y=195+Math.sin(a)*r*.65+burst*burst*10;c.globalAlpha=Math.max(0,1-burst/4.1);c.fillStyle=palette[i%palette.length];c.save();c.translate(x,y);c.rotate(a+burst);c.fillRect(-2,-4,4+(i%3),8);c.restore();}c.globalAlpha=Math.exp(-burst*9)*.45;c.fillStyle='#fff9df';c.fillRect(0,0,960,600);c.globalAlpha=1;}
 if(age>4900){const alpha=Math.min(1,(age-4900)/1000);c.globalAlpha=alpha;c.fillStyle='#c9ded6';c.font='21px monospace';c.textAlign='center';c.fillText('For the first time, the silence lets you go.',480,470);c.fillStyle='#edd29a';c.fillRect(475,342,12,9);c.fillRect(487,345,20,4);c.fillRect(500,348,4,7);c.fillRect(507,348,4,7);c.globalAlpha=1;}}
globalThis.EchosFinale={draw,duration,line};
})();
