/* Procedural scenery uses the shared, walkable game geometry. No remote assets. */
function randomSource(seed){let n=seed;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
export function makeSurfaces(T,r){
 const random=randomSource((r.chapter+1)*991+(r.number+1)*197),make=(floor)=>{
  const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d'),base=new T.Color(r.palette[floor?1:0]);x.fillStyle='#'+base.getHexString();x.fillRect(0,0,512,512);
  const rows=floor?8:6,columns=floor?8:5,w=512/columns,h=512/rows;
  for(let row=0;row<rows;row++)for(let col=-1;col<columns;col++){
   const px=(col+(row%2&&!floor?.5:0))*w,py=row*h,tint=base.clone().lerp(new T.Color('#d6d9db'),.035+random()*.11);
   x.fillStyle='#'+tint.getHexString();x.fillRect(px+2,py+2,w-4,h-4);x.strokeStyle='#03070c75';x.lineWidth=2;x.strokeRect(px+2,py+2,w-4,h-4);
   x.strokeStyle='#dbe6eb12';x.beginPath();x.moveTo(px+5,py+5);x.lineTo(px+w-6,py+5);x.stroke();
  }
  for(let i=0;i<800;i++){x.fillStyle=i%2?'#ffffff08':'#00000014';x.fillRect(random()*512,random()*512,random()*6+1,random()*4+1);}
  if(['skywalk','observatory','stars'].includes(r.theme)){for(let i=0;i<65;i++){x.fillStyle=i%3?r.palette[2]+'45':'#ffffff66';x.fillRect(random()*512,random()*512,2,2);}}
  const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(floor?5:5,floor?3:2);texture.anisotropy=4;return texture;
 };return {wall:make(false),floor:make(true)};
}
export function addScenery({T,room,mesh,box,mat,moving,meta:r}){
 const random=randomSource((r.chapter+7)*113+(r.number+3)*43),accent=r.palette[2],soft=mat(accent,{emissive:accent,emissiveIntensity:.2,roughness:.35}),stone=mat(r.palette[0]),steel=mat('#607483',{metalness:.55,roughness:.35});
 const positions=[],colors=[];for(let i=0;i<76;i++){positions.push(2.2+random()*19.4,.4+random()*3.3,3.1+random()*9.1);const color=new T.Color(i%4?accent:'#fff1c8');colors.push(color.r,color.g,color.b);}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));const dust=new T.Points(geometry,new T.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.6,depthWrite:false}));room.add(dust);moving.push({o:dust,type:'dust',base:positions.slice()});
 function water(x,z,w,d,color=accent){const o=mesh(new T.PlaneGeometry(w,d),mat(color,{emissive:color,emissiveIntensity:.14,metalness:.7,roughness:.16,transparent:true,opacity:.52}),x,.018,z);o.rotation.x=-Math.PI/2;moving.push({o,type:'water'});for(let i=0;i<3;i++){const ripple=mesh(new T.TorusGeometry(.25+i*.16,.008,3,32),new T.MeshBasicMaterial({color,transparent:true,opacity:.25}),x,.028,z);ripple.rotation.x=Math.PI/2;moving.push({o:ripple,type:'ripple',phase:i});}}
 function arch(x,z,color=accent){box(x-.8,1.45,z,.18,2.9,.3,stone);box(x+.8,1.45,z,.18,2.9,.3,stone);const o=mesh(new T.TorusGeometry(.8,.13,6,18,Math.PI),mat(color,{emissive:color,emissiveIntensity:.1}),x,2.8,z);return o;}
 function waterfall(x,z){box(x,2.5,z,1.8,5,.09,mat('#71cfee',{transparent:true,opacity:.15,emissive:'#315b73',emissiveIntensity:.3}));for(let i=0;i<22;i++){const d=box(x-.8+random()*1.6,random()*4.8,z+.02,.012,.25+random()*.5,.015,mat('#b4eeff',{emissive:'#77c6e7',emissiveIntensity:.5,transparent:true,opacity:.4}));moving.push({o:d,type:'fall',baseY:d.position.y});}water(x,z+.6,2.4,1.4,'#4caacf');}
 function mushroom(x,z,h){mesh(new T.CylinderGeometry(.06,.12,h,7),mat('#6a9b9f'),x,h/2,z);const cap=mesh(new T.SphereGeometry(h*.65,12,7,0,Math.PI*2,0,Math.PI/2),mat(accent,{emissive:accent,emissiveIntensity:.4}),x,h,z);cap.scale.y=.45;for(let j=0;j<5;j++)mesh(new T.SphereGeometry(.027,5,4),soft,x+Math.cos(j)*h*.4,h+.05,z+Math.sin(j)*h*.4);}
 function gear(x,y,z,radius){const group=new T.Group();group.position.set(x,y,z);room.add(group);const wheel=new T.Mesh(new T.TorusGeometry(radius,.11,6,28),steel);group.add(wheel);for(let i=0;i<12;i++){const tooth=new T.Mesh(new T.BoxGeometry(.18,.25,.2),steel),a=i*Math.PI/6;tooth.position.set(Math.cos(a)*radius,Math.sin(a)*radius,0);tooth.rotation.z=a-Math.PI/2;group.add(tooth);}moving.push({o:group,type:'gear'});}
 const theme=r.theme;
 // Strong silhouettes make each district readable before its title is read.
 if(['gate','bridge','palace'].includes(theme)){arch(7,3.3);arch(16,11.9);box(12,3.6,7.6,19.8,.2,.2,stone);}
 if(['roots','garden','sanctuary'].includes(theme)){
  for(let i=0;i<9;i++)mushroom(3.1+i*2.1,i%2?3.15:12.15,.55+(i%3)*.25);
  for(const x of [2.05,21.9]){mesh(new T.CylinderGeometry(.32,.6,5.5,7),mat('#3e5946'),x,2.65,8);const branch=mesh(new T.CylinderGeometry(.18,.32,7,6),mat('#45664f'),x===2.05?5.2:18.7,4.1,8);branch.rotation.z=x===2.05?-.95:.95;}
  if(theme==='sanctuary'){waterfall(15.5,3.15);for(let i=0;i<16;i++){const leaf=mesh(new T.OctahedronGeometry(.12),soft,3+random()*18,4.2+random()*1.5,3.5+random()*8);leaf.scale.set(2,.3,1);moving.push({o:leaf,type:'float',y:leaf.position.y});}}
 }
 if(['river','lake','reservoir','observatory'].includes(theme)){
  water(6,7.5,2.3,6);water(18,8.8,3.2,5);for(let i=0;i<8;i++){const stoneTile=box(10.5+i*.6,.01,7.4,.55,.06,1.8,stone);stoneTile.rotation.y=.06*Math.sin(i);}
  waterfall(16.4,3.15);if(theme==='reservoir'){arch(7.5,3.2);for(let i=0;i<9;i++){const star=mesh(new T.OctahedronGeometry(.055),soft,4+i*2,3.1+(i%3)*.3,7.3+Math.sin(i)*2);moving.push({o:star,type:'float',y:star.position.y});}}
 }
 if(['ember','foundry','clock'].includes(theme)){
  gear(5.3,2.4,3.15,1.1);gear(17.8,2.7,12,1.25);for(const z of [3.6,11.5]){const pipe=mesh(new T.CylinderGeometry(.14,.14,20,10),steel,12,3.7,z);pipe.rotation.z=Math.PI/2;}
  if(theme!=='clock'){water(5.4,7.7,1.8,8,'#f87339');water(20,7.7,1.5,8,'#ffb15b');const hot=new T.PointLight('#ff8548',2,7,2);hot.position.set(5.4,.4,7.7);room.add(hot);}
 }
 if(['stars','observatory'].includes(theme)){
  for(let i=0;i<3;i++){const orbit=mesh(new T.TorusGeometry(1.2+i*.35,.025,5,48),soft,12,3.9,7.6);orbit.rotation.x=.6+i*.55;orbit.rotation.y=i*.7;moving.push({o:orbit,type:'orbit'});}
  mesh(new T.IcosahedronGeometry(.4,1),mat('#ffe7ac',{emissive:'#d9b878',emissiveIntensity:.7}),12,3.9,7.6);
 }
 if(['lanterns','skywalk','market'].includes(theme)){
  for(let i=0;i<12;i++){const x=3.5+i*1.55,z=7.4+Math.sin(i*.8)*3,y=2.4+(i%3)*.32;box(x,y+.6,z,.015,1.1,.015,steel);const lantern=mesh(new T.OctahedronGeometry(.16+(i%2)*.04),mat(i%3?'#ffe2a6':'#ffd0a6',{emissive:'#ffd092',emissiveIntensity:.8}),x,y,z);moving.push({o:lantern,type:'float',y});}
  if(theme==='skywalk'){for(let i=0;i<6;i++){const arc=mesh(new T.TorusGeometry(3.4,.045,5,36,Math.PI),soft,4+i*3.1,2.7,7.8);arc.rotation.y=Math.PI/2;}for(let i=0;i<30;i++){const star=mesh(new T.SphereGeometry(.018,4,3),soft,2+random()*20,5+random()*2,3+random()*9);moving.push({o:star,type:'float',y:star.position.y});}}
 }
 if(['winter','aurora'].includes(theme)){
  for(let i=0;i<10;i++){const x=3+i*2,z=i%2?3.15:12.15,h=1.5+(i%4)*.7;mesh(new T.ConeGeometry(.32,h,5),mat('#a9e5f4',{emissive:'#4e829b',emissiveIntensity:.2,metalness:.25,roughness:.2}),x,h/2,z);}
  if(theme==='aurora')for(let band=0;band<3;band++){
   const vertices=[],indices=[],vertexColors=[],palette=['#9bffe1','#83b8ff','#dfa5ff','#fff2be'];
   for(let i=0;i<=32;i++){const x=2+i*.64,z=4.5+band*2;for(let row=0;row<2;row++){vertices.push(x,3.5+row*1.7,z);const c=new T.Color(palette[(Math.floor(i/8)+band)%palette.length]);vertexColors.push(c.r,c.g,c.b);}if(i<32){const n=i*2;indices.push(n,n+1,n+2,n+1,n+3,n+2);}}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('color',new T.Float32BufferAttribute(vertexColors,3));g.setIndex(indices);const ribbon=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:.48,side:T.DoubleSide,depthWrite:false}));room.add(ribbon);moving.push({o:ribbon,type:'aurora',base:vertices.slice(),phase:band});
  }
 }
}
export function updateScenery(moving,time){for(const {o,type,base,baseY,phase=0} of moving){if(type==='water')o.material.opacity=.48+Math.sin(time*.8+o.position.x)*.055;else if(type==='ripple')o.scale.setScalar(.85+((time*.1+phase*.3)%1)*.55);else if(type==='gear')o.rotation.z=time*.13;else if(type==='orbit')o.rotation.z=time*.07;else if(type==='fall')o.position.y=5-((time*1.9+baseY)%5);else if(type==='dust'||type==='aurora'){const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++){p.array[i*3+1]=base[i*3+1]+Math.sin(time*(type==='dust'?.25:.4)+i*.32+phase)*(type==='dust'?.09:.28);if(type==='aurora')p.array[i*3+2]=base[i*3+2]+Math.sin(time*.3+i*.19+phase)*.35;}p.needsUpdate=true;}}}
