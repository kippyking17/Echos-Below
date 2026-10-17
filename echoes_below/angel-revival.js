/* A consumed totem opens angel wings around the traveler, then returns the same battle. */
(()=>{
function draw(c,age,chapter,character){const t=Math.max(0,Math.min(1,age/2200)),palette=globalThis.EchoesStory.chapters[chapter].crystalPalette,light=chapter===29?palette:['#9af5cb','#e5ffe0','#a3e6f2'];c.fillStyle='#061820';c.fillRect(0,0,960,600);for(let i=0;i<24;i++){const a=i*Math.PI/12,r=30+Math.sin(t*Math.PI)*280;c.fillStyle=light[i%light.length];c.globalAlpha=.12*(1-t*.5);c.save();c.translate(480,300);c.rotate(a+t*.35);c.fillRect(25,-2,r,4);c.restore();}c.globalAlpha=1;
 const size=.25+Math.sin(Math.min(1,t*1.5)*Math.PI/2)*2.4;c.save();c.translate(480,300);c.scale(size,size);globalThis.EchoesOverworld.drawGrace(c,{x:0,y:0},{chapter,crystalPalette:palette,graceKind:'angel'},age/1000);c.restore();
 for(let i=0;i<36;i++){const a=i*2.399,spread=25+t*160;c.fillStyle=light[i%light.length];c.globalAlpha=Math.sin(t*Math.PI)*.7;c.fillRect(Math.round(480+Math.cos(a)*spread),Math.round(330+Math.sin(a)*spread*.6-t*60),3,5);}c.globalAlpha=1;c.fillStyle='#e5ffe2';c.font='25px monospace';c.textAlign='center';c.fillText('THE ANGELS ANSWER',480,92);c.fillStyle='#a8ddc6';c.font='15px monospace';c.fillText('Totem consumed · Full health restored',480,514);c.fillText('Your fight continues',480,546);
}
globalThis.EchoesAngelRevival={draw};
})();
