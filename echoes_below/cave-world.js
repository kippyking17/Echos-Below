import * as THREE from './vendor/three.module.min.js';
let renderer,scene,camera,room,key='',moving=[],labels=[],activeCrystalPalette=[];
const S=.025;
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.8,...extra});
function mesh(g,m,x,y,z){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);room.add(o);return o;}
function box(x,y,z,w,h,d,m){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);}
function label(text,x,y,z,color='#e5faff'){
 const c=document.createElement('canvas');c.width=768;c.height=80;const ctx=c.getContext('2d');let size=38;do{ctx.font='600 '+size+'px monospace';size--;}while(ctx.measureText(text).width>744&&size>18);
 ctx.fillStyle='#091322df';ctx.fillRect(0,0,768,80);ctx.fillStyle=color;ctx.textAlign='center';ctx.fillText(text,384,52);
 const map=new THREE.CanvasTexture(c),o=new THREE.Sprite(new THREE.SpriteMaterial({map}));o.position.set(x,y,z);o.scale.set(3.1,.32,1);room.add(o);labels.push(o);
}
function crystalShape(radius,height){
 const positions=[],indices=[],rings=[[0,.64],[height*.13,1],[height*.74,.82],[height,0]];
 for(const [y,r] of rings)for(let i=0;i<6;i++){const a=i*Math.PI/3;positions.push(Math.cos(a)*radius*r,y,Math.sin(a)*radius*r);}
 for(let ring=0;ring<3;ring++)for(let i=0;i<6;i++){const a=ring*6+i,b=ring*6+(i+1)%6,c=a+6,d=b+6;indices.push(a,c,b,b,c,d);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
function crystal(x,z,color,h=1,light=false){
 const palette=activeCrystalPalette.length?activeCrystalPalette:[color],rainbow=palette.length>1;
 color=rainbow?'#ffffff':palette[0];const tint=new THREE.Color(color),pale=tint.clone().lerp(new THREE.Color('#ffffff'),.55);
 const m=new THREE.MeshPhysicalMaterial({color:tint,emissive:rainbow?'#352440':tint,emissiveIntensity:.23,vertexColors:rainbow,roughness:.16,metalness:.12,clearcoat:1,clearcoatRoughness:.12,flatShading:true});
 const base=mesh(new THREE.DodecahedronGeometry(h*.33,0),mat('#293746'),x,.06,z);base.scale.set(1,.3,1);
 const count=light?5:3;
 for(let i=0;i<count;i++){
  const angle=i*2.399+Math.sin(x+z),distance=i===0?0:h*.24,height=h*(i===0?1:.36+(i%3)*.15);let g=crystalShape(h*(i===0?.14:.09),height);
  if(rainbow){const original=g;g=g.toNonIndexed();original.dispose();const colors=[];for(let v=0;v<g.attributes.position.count;v++){const c=new THREE.Color(palette[(Math.floor(v/3)+i*5)%palette.length]);colors.push(c.r,c.g,c.b);}g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));}
  const o=mesh(g,m,x+Math.cos(angle)*distance,.06,z+Math.sin(angle)*distance);o.rotation.z=i===0?.07:Math.cos(angle)*.23;o.rotation.x=i===0?-.04:Math.sin(angle)*.23;
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(g,28),new THREE.LineBasicMaterial({color:pale,transparent:true,opacity:.28}));o.add(edges);
 }
 if(light){
  const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),gradient=ctx.createRadialGradient(64,64,2,64,64,64);gradient.addColorStop(0,'#ffffffc0');gradient.addColorStop(.13,color+'8c');gradient.addColorStop(.45,color+'26');gradient.addColorStop(1,color+'00');
  if(rainbow){const spectrum=ctx.createConicGradient(0,64,64);palette.forEach((c,i)=>spectrum.addColorStop(i/palette.length,c));spectrum.addColorStop(1,palette[0]);ctx.fillStyle=spectrum;ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-in';}ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),color:tint,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.45}));glow.position.set(x,h*.55,z);glow.scale.set(h*2,h*2,1);room.add(glow);
  const l=new THREE.PointLight(color,3.5,5.5,2);l.position.set(x,h*.6,z);room.add(l);
  const ring=mesh(new THREE.TorusGeometry(h*.38,.018,5,32),new THREE.MeshBasicMaterial({color:rainbow?palette[0]:color,transparent:true,opacity:.5}),x,.035,z);ring.rotation.x=Math.PI/2;
  if(rainbow){moving.push({o:ring,type:'spectrum',palette});for(let i=0;i<palette.length;i++){const a=i*Math.PI*2/palette.length;const shard=mesh(new THREE.OctahedronGeometry(.035),new THREE.MeshBasicMaterial({color:palette[i]}),x+Math.cos(a)*h*.45,h*.45+Math.sin(a)*.15,z+Math.sin(a)*h*.45);moving.push({o:shard,type:'float',y:shard.position.y});}}
 }
}
function motif(theme,x,z,size,color,base){
 const a=mat(color,{emissive:color,emissiveIntensity:.18}),b=mat(base);size=Math.max(.4,Math.min(1.2,size));
 const ring=(y,r,rotation=0)=>{const o=mesh(new THREE.TorusGeometry(r,.055,6,20),a,x,y,z);o.rotation.y=rotation;return o;};
 switch(theme){
 case'gate':box(x-size*.4,.8,z,.12,1.6,.18,b);box(x+size*.4,.8,z,.12,1.6,.18,b);box(x,1.6,z,size,.16,.22,a);break;
 case'roots':case'garden':{const trunk=mesh(new THREE.CylinderGeometry(.08,.17,1.5,5),b,x,.75,z);trunk.rotation.z=.16;for(let i=0;i<3;i++){const leaf=mesh(new THREE.OctahedronGeometry(size*.33),a,x+Math.cos(i*2)*.28,1.3+i*.1,z+Math.sin(i*2)*.25);leaf.scale.set(1,.45,1);}break;}
 case'glass':crystal(x,z,color,size*1.6);mesh(new THREE.OctahedronGeometry(.22),a,x,1.7,z);break;
 case'river':case'lake':{const pool=mesh(new THREE.CircleGeometry(size*.7,24),mat(color,{metalness:.85,roughness:.15,transparent:true,opacity:.55}),x,.04,z);pool.rotation.x=-Math.PI/2;if(theme==='river')box(x,.5,z,.15,1,.15,b);else{const bubble=mesh(new THREE.IcosahedronGeometry(.3,1),a,x,1.7,z);moving.push({o:bubble,type:'float',y:1.7});}break;}
 case'library':case'archive':for(let k=0;k<3;k++){box(x,.35+k*.5,z,size,.08,.35,b);for(let j=0;j<4;j++)box(x-size*.35+j*size*.22,.55+k*.5,z,.1,.3,.25,j%2?a:b);}break;
 case'market':box(x,.55,z,size,1.1,.5,b);box(x,1.5,z,size*1.15,.12,.8,a);box(x-size*.45,1,z,.06,1,.06,b);break;
 case'ember':mesh(new THREE.CylinderGeometry(.2,.2,1.6,8),b,x,.8,z);ring(1,.3);crystal(x,z,'#ff986c',.55);break;
 case'clock':{const gear=ring(1.2,size*.5);moving.push({o:gear,type:'spin'});for(let i=0;i<8;i++){const o=box(x+Math.cos(i*Math.PI/4)*size*.5,1.2+Math.sin(i*Math.PI/4)*size*.5,z,.16,.16,.12,a);o.rotation.z=i*Math.PI/4;}box(x,.5,z,.12,1,.12,b);break;}
 case'choir':for(let i=0;i<3;i++)mesh(new THREE.CylinderGeometry(.12,.12,1+i*.35,8),i%2?a:b,x+(i-1)*.23,(1+i*.35)/2,z);break;
 case'station':box(x,.3,z,size,.5,.5,b);box(x,.7,z,.12,1.4,.12,a);box(x,1.4,z,size,.35,.1,a);break;
 case'lanterns':box(x,.8,z,.08,1.6,.08,b);{const lamp=mesh(new THREE.OctahedronGeometry(.25),a,x,1.7,z);moving.push({o:lamp,type:'float',y:1.7});}break;
 case'stars':{const telescope=mesh(new THREE.CylinderGeometry(.18,.24,1.2,10),a,x,1.3,z);telescope.rotation.z=.85;box(x,.5,z,.1,1,.1,b);ring(1.5,.45,Math.PI/2);break;}
 case'palace':box(x,.5,z,size,.15,.6,b);box(x,1.1,z+.25,size,1.1,.14,b);box(x,1.5,z+.16,size*.7,.45,.06,a);break;
 case'winter':for(let i=0;i<3;i++){const ice=mesh(new THREE.ConeGeometry(.25,.9+i*.4,4),a,x+(i-1)*.25,(.9+i*.4)/2,z);ice.rotation.y=.7;}break;
 case'bridge':box(x,.65,z,.13,1.3,.13,b);box(x,1.1,z,size,.1,.12,a);break;
 case'heart':{const heart=mesh(new THREE.IcosahedronGeometry(size*.45,1),a,x,1.1,z);moving.push({o:heart,type:'pulse'});ring(1.1,size*.65,Math.PI/2);break;}
 case'dawn':mesh(new THREE.CylinderGeometry(.16,.24,1.6,8),b,x,.8,z);ring(1.8,size*.4);break;
 }
}
function rebuild(s){
 if(room){scene.remove(room);const geometries=new Set(),materials=new Set();room.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>{m.map?.dispose();m.dispose();});}
 room=new THREE.Group();scene.add(room);moving=[];labels=[];
 const r=s.meta,[wallColor,floorColor,accent]=r.palette,wall=mat(wallColor),floor=mat(floorColor),trim=mat(accent,{emissive:accent,emissiveIntensity:.15});activeCrystalPalette=r.crystalPalette;
 scene.background.set(floorColor);scene.fog=new THREE.FogExp2(floorColor,r.theme==='winter'?.055:.032);
 box(11.91,-.2,7.625,20.2,.3,9.5,floor);box(11.91,4.4,7.625,20.2,.3,9.5,mat(wallColor));
 for(const [x,z,w,d] of [[73,305,10,380],[880,305,10,380],[476,115,807,10],[476,495,807,10]])box(x*S,2,z*S,w*S,4,d*S,wall);
 for(const [i,o] of s.obstacles.entries()){box((o.x+o.w/2)*S,o.height/2,(o.y+o.h/2)*S,o.w*S,o.height,o.h*S,wall);if(i%3===0)motif(r.theme,(o.x+o.w/2)*S,(o.y+o.h/2)*S,Math.min(o.w,o.h)*S,accent,wallColor);}
 for(let i=0;i<8;i++){const x=(110+((i*103+s.room*37+s.chapter*17)%730))*S,z=(i%2?122:488)*S;motif(r.theme,x,z,.7+(i%3)*.13,accent,wallColor);}
 for(let i=0;i<4;i++)crystal((130+i*210)*S,(i%2?123:487)*S,r.crystalColor,.8+(i%3)*.17,true);
 const points=r.route.map(p=>new THREE.Vector3(p.x*S,.015,p.y*S));room.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:accent,transparent:true,opacity:.3})));
 const p=r.point;box(p.x*S,.38,p.y*S,.7,.76,.65,wall);
 const token=mesh(r.puzzle?new THREE.TorusGeometry(.3,.09,8,16):new THREE.OctahedronGeometry(.3),r.puzzle&&s.solved?mat('#9cffd9',{emissive:'#55bba2',emissiveIntensity:.5}):trim,p.x*S,1.1,p.y*S);moving.push({o:token,type:'spin'});label(r.landmark,p.x*S,1.75,p.y*S,accent);
 if(s.crystal){const p=r.checkpoint;crystal(p.x*S,p.y*S,r.crystalColor,1.65,true);label('HEAL / SAVE',p.x*S,2.1,p.y*S,r.crystalColor);}
 if(s.coin){const p=r.coin,c=mesh(new THREE.OctahedronGeometry(.22),mat('#ffdc7e',{emissive:'#b68b32',emissiveIntensity:.5,metalness:.65}),p.x*S,.7,p.y*S);moving.push({o:c,type:'spin'});label('RARE COIN',p.x*S,1.3,p.y*S,'#ffe398');}
 if(s.shop){const p=r.shop;box(p.x*S,.55,p.y*S,1.2,1.1,.55,wall);box(p.x*S,1.8,p.y*S,1.6,.12,.9,trim);label('WICK’S TRADING POST',p.x*S,2.15,p.y*S,'#ffe398');}
 if(s.enemy){const x=730*S,z=355*S,height=s.boss?2:1.25;mesh(new THREE.ConeGeometry(s.boss?.65:.35,height,6),mat(accent,{emissive:accent,emissiveIntensity:.2}),x,height/2,z);label(s.enemyName||'GUARDIAN',x,height+.45,z,accent);}
 const locked=s.enemy||(r.puzzle&&!s.solved),door=mat(locked?'#aa5873':'#60ceb0',{emissive:locked?'#50273e':'#30765f',emissiveIntensity:.4});box(866*S,1.1,353*S,.12,2.2,1.8,door);label(locked?'A PROMISE WAITS':'NEXT ROOM →',866*S,2.7,353*S);
 if(s.chapter||s.room)label('← PREVIOUS',88*S,2,353*S,'#a2c6d0');
}
window.EchoesCave={render(s){try{
 if(!renderer){renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(960,600);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;scene=new THREE.Scene();scene.background=new THREE.Color('#101a2c');scene.add(new THREE.HemisphereLight('#d7e8ff','#333044',2.3));camera=new THREE.PerspectiveCamera(64,1.6,.03,50);renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();window.EchoesCave.failed=true;});}
 const next=JSON.stringify([s.chapter,s.room,s.coin,s.enemy,s.solved,s.read,s.shop]);if(next!==key){rebuild(s);key=next;}
 camera.position.set(s.x*S,1.25,s.y*S);camera.lookAt(camera.position.x+Math.cos(s.heading),1.25,camera.position.z+Math.sin(s.heading));const t=performance.now()/1000;
 labels.forEach(o=>{const d=camera.position.distanceTo(o.position);o.visible=d>2.4&&d<17;});moving.forEach(({o,type,y,palette},i)=>{if(type==='spin')o.rotation.y=t*.7;else if(type==='float')o.position.y=y+Math.sin(t+i)*.08;else if(type==='pulse')o.scale.setScalar(1+Math.sin(t*2)*.06);else if(type==='spectrum')o.material.color.set(palette[Math.floor(t*2)%palette.length]);});renderer.render(scene,camera);return renderer.domElement;
 }catch(e){console.error('Cave renderer unavailable',e);window.EchoesCave.failed=true;return null;}}};
