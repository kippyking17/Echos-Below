/* Shared, hand-drawn pixel characters for rooms, battles and 3D billboards. */
(()=>{
const skins=[
 ['gatekeeper','The Gatekeeper','#6888a1','#d7bd72'],['nurse','Bramble Nurse','#698767','#efb49e'],
 ['queen','The Orchard Queen','#a96572','#ffd494'],['ferryman','The Ferryman','#427c89','#a1d9db'],
 ['archivist','The Ash Archivist','#857569','#e2bc83'],['collector','The Debt Collector','#795782','#dbb476'],
 ['furnace','The Furnace Warden','#88634d','#ffac62'],['saint','The Clock Saint','#716a8c','#efd99c'],
 ['gardener','The Night Gardener','#3d685e','#bc9de0'],['custodian','The Lake Custodian','#397887','#9cddd9'],
 ['conductor','The Basalt Conductor','#565b76','#edc895'],['inspector','The Sleeper Inspector','#49627d','#d1bd82'],
 ['lamplighter','The Lamplighter','#85704f','#ffdc89'],['astronomer','The Blind Astronomer','#5c5890','#b9ccff'],
 ['regent','The Rust Regent','#9c6650','#daba77'],['winter','The Winter Sentinel','#6c9fa9','#d9f9f0'],
 ['eater','The Name-Eater','#58516f','#b8a7d9'],['marshal','The Bridge Marshal','#667b83','#d2b98c'],
 ['curator','The Curator','#795b6e','#f9b28f'],['echo','The Last Echo','#91a8b8','#fff1c0']
].map(([id,name,body,trim],index)=>({id,name,body,trim,index}));
function enemy(c,s){
 const skin=skins[s.chapter]||skins[0],t=s.time||0,mini=!!s.mini,phase=s.phase||1,bob=Math.round(Math.sin(t*(mini?2.2:1.5))*2),b=skin.body,g=skin.trim,a=s.color||g,dark='#101c2c',ink='#07121e',light='#edf2d9';
 c.save();c.translate(Math.round(s.x),Math.round(s.y));c.scale(s.scale||1,s.scale||1);
 function r(x,y,w,h,col=b){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y+bob),w,h);}
 function line(points,col,width=2){c.strokeStyle=col;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y+bob):c.moveTo(x,y+bob));c.stroke();}
 function gem(x,y,col=a,size=7){r(x-2,y-size,4,size*2,col);r(x-5,y-size/2,10,size,col);r(x-1,y-size+2,2,size-2,'#ffffff99');}
 function robe(col=b){r(-24,-4,48,35,ink);r(-21,-5,42,32,col);r(-28,21,56,10,col);r(-25,31,50,4,dark);r(-2,-2,4,33,g);r(-17,1,4,24,'#ffffff17');}
 function face(col=g){r(-15,-30,30,27,ink);r(-12,-28,24,23,col);r(-9,-17,5,3,light);r(5,-17,5,3,light);r(-4,-8,8,2,dark);}
 function arms(col=b){r(-33,-3,12,26,ink);r(21,-3,12,26,ink);r(-31,-1,9,21,col);r(23,-1,9,21,col);r(-31,19,9,5,g);r(23,19,9,5,g);}
 function boots(){r(-18,31,12,11,dark);r(6,31,12,11,dark);r(-21,40,15,5,ink);r(6,40,15,5,ink);}
 function crown(){r(-20,-36,40,6,g);for(let i=0;i<5;i++)r(-20+i*9,-45-(i===2?6:0),5,13,g);gem(0,-36,a,4);}
 function staff(x,col=g){r(x,-42,4,86,col);r(x-5,38,14,4,dark);}
 function leaf(x,y,col=a){r(x,y,10,4,col);r(x+3,y-4,9,4,col);r(x+7,y-7,7,4,col);}
 function book(x,y,col=g){r(x-14,y-12,29,25,ink);r(x-12,y-10,24,20,col);r(x-1,y-10,2,21,dark);for(let i=0;i<3;i++){r(x-9,y-7+i*5,6,2,'#776e6a');r(x+4,y-7+i*5,6,2,'#776e6a');}}
 function halo(col=g){for(let i=0;i<14;i++){const angle=i*Math.PI/7; r(Math.cos(angle)*31-2,Math.sin(angle)*27-26,4,4,col);}}
 // The shadow remains planted while the body breathes or floats.
 c.fillStyle='#02081488';c.fillRect(-26,45,52,5);c.fillRect(-18,42,36,10);
 if(!s.boss&&!mini){boots();robe();arms();face(b);gem(0,-36,a,8);r(-9,-17,5,3,light);r(5,-17,5,3,light);c.restore();return;}
 if(mini){
  boots();robe();arms();face();
  switch(s.chapter){
   case 1:r(-21,-35,42,8,'#42634c');leaf(-25,-38,'#92b77b');r(-10,-27,21,6,'#759263');r(22,-29,4,64,'#ad8d61');leaf(23,-19);r(-17,5,33,7,'#be8c6a');break;
   case 4:book(-5,7);r(-26,-38,52,9,'#8e7560');r(-17,-49,34,13,b);r(31,-20,4,41,g);for(let i=0;i<3;i++)r(35+i*4,-26-i*3,4,16,a);break;
   case 7:r(-18,-34,36,9,g);r(-8,-46,16,12,b);r(33,-34,3,68,g);r(23,16,23,4,a);r(-11,-25,23,17,dark);line([[0,-22],[0,-15],[8,-11]],g,3);break;
   case 10:r(-20,-32,40,29,'#5f7281');r(-14,-25,28,18,dark);for(let i=0;i<3;i++)r(-10+i*9,-23,4,15,g);for(let i=0;i<4;i++){r(-41+i*7,-7-i*5,4,29,a);r(21+i*7,-22+i*5,4,29,a);}break;
   case 13:halo(a);r(-23,-38,46,9,b);r(-15,-50,30,15,b);r(25,-32,10,22,g);r(29,-35,19,10,a);r(-14,4,28,23,dark);gem(0,15,a,7);break;
   case 16:book(0,8,'#b7aa8b');r(-21,-39,42,10,b);r(-11,-47,22,10,b);r(-13,-22,26,7,ink);r(33,-36,3,68,g);r(29,-41,10,12,a);break;
  }
  r(-3,2,6,6,a);c.restore();return;
 }
 switch(skin.id){
 case 'gatekeeper':
  boots();robe('#4f697e');arms();face('#8099a6');r(-27,-31,54,9,b);r(-19,-44,38,15,b);r(-2,-36,4,31,g);r(-9,-18,18,4,ink);r(-43,-43,5,87,g);r(-49,-44,18,8,g);r(-47,-43,4,11,ink);r(25,-6,24,34,dark);r(28,-3,18,27,b);gem(37,8,a,8);break;
 case 'nurse':
  boots();robe('#44665c');arms('#5a7866');face('#b7b697');r(-21,-36,42,11,'#d0c7a5');r(-3,-34,6,13,'#bf7271');r(-7,-30,14,5,'#bf7271');line([[-29,28],[-36,9],[-32,-16],[-24,-40]],'#618957',4);leaf(-42,-14,'#93b676');leaf(24,-29,'#93b676');book(27,14,'#d4be9a');gem(0,10,a,7);break;
 case 'queen':
  robe('#985767');arms('#9d6c7a');face('#dbb495');crown();r(-30,18,60,14,b);r(-36,31,72,9,b);for(let i=0;i<5;i++){leaf(-29+i*13,31,'#ba8392');gem(-24+i*12,19,a,4);}staff(39,'#b39863');r(34,-44,15,12,'#c97c6c');leaf(38,-49,'#9ebd78');break;
 case 'ferryman':
  boots();robe('#315568');arms('#3e6b79');face('#87aeb0');r(-22,-33,44,14,b);r(-26,-24,10,25,b);r(16,-24,10,25,b);r(-12,-19,24,5,dark);staff(38,'#b6aa8b');r(31,-51,18,28,'#9d9d7e');r(35,-49,10,23,g);for(let i=0;i<3;i++)line([[-30,34+i*5],[0,37+i*5],[29,33+i*5]],a,2);break;
 case 'archivist':
  boots();robe('#695b55');arms();face('#b5aa8a');book(0,10,'#d7c4a1');r(-26,-39,52,10,b);r(-19,-49,38,12,b);r(-16,-19,12,8,dark);r(4,-19,12,8,dark);r(-4,-16,8,2,g);for(let i=0;i<3;i++){r(31+i*4,-38-i*4,4,22,a);r(-42-i*2,4-i*12,10,7,'#bcb399');}break;
 case 'collector':
  boots();robe('#604269');arms();face('#bcb09a');r(-27,-35,54,7,dark);r(-18,-51,36,17,b);r(-18,-40,36,4,g);r(-17,-8,34,7,'#8e738e');staff(40);r(22,-27,40,3,g);line([[24,-25],[17,-5],[31,-5],[24,-25]],g);line([[55,-25],[48,-5],[62,-5],[55,-25]],g);r(16,-5,16,4,a);r(47,-5,16,4,a);gem(-4,12,a,7);break;
 case 'furnace':
  boots();r(-30,-9,60,42,ink);r(-27,-7,54,39,b);arms('#6e5042');r(-22,-40,44,31,dark);r(-18,-36,36,24,b);for(let i=0;i<4;i++)r(-14+i*8,-27,4,12,'#ffbd6e');r(-16,1,32,22,ink);for(let i=0;i<3;i++)r(-11+i*9,4,5,15,a);r(-34,-39,9,20,b);r(25,-47,9,28,b);r(-32,-46,5,8,'#ffcf7c');r(27,-55,5,8,'#ffcf7c');staff(45,'#876e56');r(33,-30,28,17,'#a29c81');break;
 case 'saint':
  halo();robe('#77708d');arms();face('#e2d0a1');r(-18,-34,36,6,g);for(let i=0;i<12;i++){const a=i*Math.PI/6;r(Math.cos(a)*24-2,Math.sin(a)*23+5,4,4,g);}r(-18,-12,36,34,dark);r(-15,-9,30,28,'#d4c69b');line([[0,-5],[0,6],[11,12]],dark,3);gem(0,6,a,4);r(-27,29,54,9,b);break;
 case 'gardener':
  boots();robe('#31544f');arms();face('#9ab49a');r(-33,-31,66,8,'#37675b');r(-20,-46,40,17,b);for(let i=0;i<4;i++)leaf(-25+i*16,-36,'#81a67c');staff(39,'#9c9d7b');r(32,-49,18,17,'#a8c2aa');gem(41,-41,'#bfa3da',6);r(-30,4,13,19,'#977ca2');r(-33,7,18,3,g);break;
 case 'custodian':
  boots();robe('#376f78');arms('#3d7b80');face('#a4c5bc');r(-26,-30,52,9,b);for(let i=0;i<5;i++)r(-22+i*10,-44-(i%2)*7,5,18,a);r(-22,26,44,6,'#a8bca4');staff(39,'#97b9b0');r(27,-38,28,4,g);r(26,-54,4,19,g);r(38,-59,4,23,g);r(51,-54,4,19,g);gem(0,9,a,10);break;
 case 'conductor':
  boots();robe('#42475f');arms();face('#8b95a3');r(-27,-34,54,8,b);r(-19,-45,38,13,b);r(-13,-42,26,3,g);r(-3,-4,6,24,light);r(-9,-4,18,4,dark);r(-16,3,5,5,g);r(26,-40,3,49,light);for(let i=0;i<3;i++){r(-47+i*9,-10-i*10,6,44,b);r(-46+i*9,-9-i*10,2,31,g);}break;
 case 'inspector':
  boots();robe('#314b65');arms();face('#b1b5a1');r(-26,-32,52,8,b);r(-20,-44,40,13,b);r(-14,-41,28,4,g);r(-13,-26,26,7,dark);r(-11,-16,7,3,a);r(6,-16,7,3,a);r(-15,5,10,7,g);r(-12,7,4,3,dark);book(29,12,'#b6bdad');r(-42,-15,4,43,g);r(-47,-20,14,13,a);break;
 case 'lamplighter':
  boots();robe('#746046');arms('#88734e');face('#c7b08b');r(-24,-34,48,8,b);r(-14,-47,28,14,b);staff(36,'#c2a373');r(35,-46,18,4,g);r(50,-43,3,13,g);r(43,-33,18,24,dark);r(46,-29,12,16,'#f5cd7d');r(49,-25,6,9,'#fff1b1');r(41,-35,22,4,g);r(41,-10,22,4,g);r(-17,10,18,15,'#ad8d59');gem(-8,15,a,5);break;
 case 'astronomer':
  halo('#8e9bca');robe('#514e7e');arms();face('#a0a0ba');r(-18,-29,36,9,'#9297be');r(-23,-34,46,8,b);r(-16,-45,32,12,b);r(-8,-56,16,12,b);r(-2,-63,5,8,g);r(-13,-18,26,5,'#c8c6db');r(25,-32,28,14,g);r(48,-35,8,20,a);staff(37,'#7f879e');for(let i=0;i<4;i++)gem(-16+i*10,12+(i%2)*10,'#c0c9e7',3);break;
 case 'regent':
  boots();robe('#80513f');arms('#9e7054');face('#a28c70');crown();r(-35,-8,18,15,g);r(17,-8,18,15,g);r(-18,-1,36,24,b);r(-13,1,26,3,g);gem(0,12,a,6);r(26,7,28,32,dark);r(29,10,22,25,b);r(38,10,4,25,g);r(29,18,22,4,g);staff(-42,'#baa583');r(-46,-42,12,37,'#bdd1ca');break;
 case 'winter':
  boots();robe('#7197a1');arms('#99b9bb');face('#b4d4d1');r(-27,-35,54,11,'#d1e5df');r(-20,-48,40,14,b);for(let i=0;i<5;i++)gem(-20+i*10,-39,'#c7f5ed',5);r(-26,-3,52,8,'#d5e7dc');gem(0,12,a,10);staff(41,'#b2d5d0');gem(42,-49,'#e4fff8',14);r(-30,23,60,8,'#b5d6d1');break;
 case 'eater':
  robe('#3d3657');arms('#514467');r(-24,-36,48,32,dark);r(-18,-43,36,9,b);r(-30,-22,12,27,b);r(18,-22,12,27,b);r(-14,-25,28,5,'#d5c8de');r(-17,-14,34,15,ink);for(let i=0;i<6;i++)r(-14+i*5,-14,3,5,'#b7a7cb');for(let i=0;i<5;i++){r(-22+i*11,29,6,15+(i%2)*6,b);r(-43+i*19,-49+(i%3)*5,11,8,'#9a8ba8');}book(0,15,'#867792');break;
 case 'marshal':
  boots();robe('#526773');arms();face('#c3c3b0');r(-23,-34,46,9,b);r(-17,-46,34,14,b);r(-3,-53,6,12,g);r(-17,-26,34,5,dark);r(-20,-4,40,8,g);r(-3,3,6,24,g);staff(-42,'#b5ac90');r(-50,-48,21,29,b);r(-47,-44,15,3,g);r(24,-21,4,61,g);r(28,-22,26,21,'#906c6a');r(30,-17,20,3,g);break;
 case 'curator':
  boots();robe('#654657');arms();face('#baa6ad');r(-21,-39,42,10,b);r(-10,-53,20,15,g);r(-17,-17,34,4,ink);r(-15,-3,30,27,dark);gem(0,10,'#ffb38e',12);for(let i=0;i<4;i++){const ang=t*.45+i*Math.PI/2,x=Math.round(Math.cos(ang)*46),y=Math.round(Math.sin(ang)*21-18);r(x-6,y-8,12,16,g);gem(x,y,a,4);}break;
 case 'echo':{
  const colors=globalThis.EchoesStory?.chapters[19].crystalPalette||[a];halo('#e7dfbd');robe('#9aafb7');arms('#bdcbd0');face('#e3e0cf');crown();for(let i=0;i<colors.length;i++){const angle=t*.15+i*Math.PI*2/colors.length,x=Math.cos(angle)*49,y=Math.sin(angle)*35-8;gem(Math.round(x),Math.round(y),colors[i],4);}r(-14,-1,28,26,'#4a6678');gem(0,10,'#fff3cb',10);r(-24,30,48,7,'#d6e7df');break;}
 }
 // Awakened guardians carry a brighter core and a slow pulse, never a hit flash.
 if(phase===2){const pulse=Math.floor(t*3)%2;r(-3,3,6,6,pulse?a:light);}
 c.restore();
}
globalThis.EchoesCharacters={skins,enemy};
})();
