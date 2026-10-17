/* Original pixel cathedral, floating crystals and lantern-lit stairs for the title. */
(()=>{
const colors=['#59bbff','#ffac60','#bd8cff','#6ae3cb','#efcf77','#ee90b6'];
function draw(c,time){
const box=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);},poly=(ps,color)=>{c.fillStyle=color;c.beginPath();ps.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
const glow=(x,y,r,color,power)=>{c.save();c.globalAlpha=power;const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore();};
const gem=(x,y,size,color)=>{poly([[x,y-size],[x+size*.34,y-size*.25],[x+size*.24,y+size*.52],[x,y+size*.8],[x-size*.25,y+size*.5],[x-size*.34,y-size*.25]],color);poly([[x,y-size],[x,y+size*.8],[x-size*.25,y+size*.5],[x-size*.34,y-size*.25]],'#d9f9ff66');poly([[x,y-size],[x+size*.1,y-size*.2],[x,y+size*.8],[x-size*.08,y-size*.2]],'#ecffff55');};
box(0,0,960,600,'#040c16');glow(714,275,330,'#2a6583',.5);glow(650,500,250,'#23665c',.18);
for(let i=0;i<14;i++){const x=i*77-20,y=35+(i*37)%105;poly([[x,0],[x+80,0],[x+70,y-22],[x+42,y+24],[x+25,y-10]],'#0a1b29');box(x+35,0,6,y-5,'#112837');}
// Stepped Gothic vault, with distant corridors visible through the entrance.
for(let j=0;j<4;j++){const x=570+j*13,y=65+j*20,w=290-j*26,h=440-j*19;poly([[x,y+85],[x+48,y+30],[x+w/2,y],[x+w-48,y+30],[x+w,y+85],[x+w,y+h],[x,y+h]],['#26424f','#162e3c','#0a1b2a','#07131f'][j]);}
for(const x of[558,840]){box(x,160,20,352,'#263c46');box(x+3,168,4,330,'#537480');for(let y=182;y<500;y+=45){box(x-4,y,28,6,'#3b5662');box(x+10,y+9,2,25,'#132c3a');}box(x-10,495,40,15,'#38525b');}
for(let i=0;i<9;i++){const width=130+i*30,y=444+i*18;box(712-width/2,y,width,17,i%2?'#162b37':'#1d3440');box(712-width/2,y,width,2,'#496675');box(712-width/2+5,y+3,width-10,1,'#73909722');}
// The halo is made of angular runes, with six district colors slowly orbiting.
const cy=267+Math.sin(time*.65)*5;for(let i=0;i<48;i++){const a=i*Math.PI/24,x=712+Math.cos(a)*111,y=cy+Math.sin(a)*111;box(x,y,i%4?2:4,i%4?2:4,i%4?'#43829955':'#afd7df');}
for(let i=0;i<6;i++){const a=time*.1+i*Math.PI/3,x=712+Math.cos(a)*116,y=cy+Math.sin(a)*98;glow(x,y,28,colors[i],.28);gem(x,y,9,colors[i]);}
glow(712,cy,130,'#72d9ff',.48);gem(674,cy+66,38,'#3989b5');gem(758,cy+47,51,'#43789b');gem(712,cy,99,'#74cfe8');
box(667,415,90,12,'#4f6670');box(658,427,108,13,'#1b3846');box(670,428,84,2,'#9db9ba');glow(712,427,68,'#7cd8f3',.17);
for(let i=0;i<54;i++){const x=520+(i*137)%425,y=(i*83-time*(5+i%4)+600)%600;c.globalAlpha=.2+(Math.sin(time*.7+i)+1)*.2;box(x,y,i%9?1:3,i%9?2:3,colors[i%6]);}c.globalAlpha=1;
// Foreground lantern and quiet rock shelves frame the readable left-hand title.
poly([[0,520],[74,493],[148,512],[210,545],[340,565],[375,600],[0,600]],'#071521');poly([[862,489],[922,470],[960,483],[960,600],[832,600]],'#071521');
glow(568,488,88,'#ffcc83',.18);box(560,473,14,21,'#775c3e');box(563,476,8,13,'#e7b86e');box(566,479,3,10,'#fff2b2');box(558,471,18,3,'#b59a69');box(563,463,8,7,'#2e464e');box(556,495,22,4,'#4f6063');
// An offset shadow gives the title weight without abandoning the pixel lettering.
const text=(word,x,y,size,color)=>{c.textAlign='left';c.font=size>=40?size+"px 'Echoes Pixel',monospace":Math.max(16,size)+"px monospace";c.fillStyle='#020911';c.fillText(word,x+2,y+2);c.fillStyle=color;c.fillText(word,x,y);};
box(76,107,28,2,'#bfcfa2');text('THE LANTERN CHRONICLES',117,113,12,'#8caeb7');text('ECHOS',70,205,77,'#e8f2df');text('BELOW',70,288,91,'#bce2de');box(78,312,45,2,'#e9c788');text('THE LONG DESCENT',136,318,16,'#e9c788');
text('Some lights are worth bringing home.',78,359,16,'#9dbec6');text('Find Mara. Choose your way.',78,384,14,'#bdd0d9');
text('30 CHAPTERS',78,515,11,'#9bbfc6');box(195,503,1,16,'#38545f');text('ONE WAY HOME',212,515,16,'#9bbfc6');
box(77,545,390,1,'#24434e');for(let i=0;i<20;i++)box(78+i*19,557,11,3,colors[i%6]);
}
globalThis.EchoesTitleScene={draw};
})();
