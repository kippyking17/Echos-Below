import * as THREE from './vendor/three.module.min.js';

// Render the same rooms and interactables used by the original game logic.
let renderer, scene, camera, room, roomKey='', animated=[];
const scale=.025;
const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.86,...extra});
function mesh(geometry,mat,x,y,z){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);room.add(m);return m;}
function crystal(x,z,color,height=1){
  const mat=material(color,{emissive:color,emissiveIntensity:.8,metalness:.25,roughness:.25});
  for(let i=0;i<3;i++){
    const c=mesh(new THREE.ConeGeometry(.19,height*(1-i*.18),5),mat,x+(i-1)*.24,height*.5,z+i*.12);
    c.rotation.z=(i-1)*.24;
    mesh(new THREE.CylinderGeometry(.19,.14,.28,5),mat,c.position.x,.14,c.position.z);
  }
  const glow=new THREE.PointLight(color,3,4,2);glow.position.set(x,.9,z);room.add(glow);
}
function label(text,x,y,z,color){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=64;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#080b19cc';ctx.fillRect(0,0,512,64);
  ctx.fillStyle=color;ctx.font='bold 32px monospace';ctx.textAlign='center';ctx.fillText(text,256,43);
  const map=new THREE.CanvasTexture(canvas);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,depthTest:true}));
  sprite.position.set(x,y,z);sprite.scale.set(2,.25,1);room.add(sprite);
}
function rebuild(s){
  if(room){scene.remove(room);room.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose();}});}
  room=new THREE.Group();scene.add(room);animated=[];
  const rock=material('#30334c'),floor=material('#23273a'),dark=material('#181d30');
  mesh(new THREE.BoxGeometry(20.2,.3,9.5),floor,11.91,-.2,7.625);
  mesh(new THREE.BoxGeometry(20.2,.4,9.5),dark,11.91,3.6,7.625);
  for(const [x,z,w,d] of [[73,305,12,380],[880,305,12,380],[476,115,807,12],[476,495,807,12]])
    mesh(new THREE.BoxGeometry(w*scale,3.7,d*scale),rock,x*scale,1.7,z*scale);
  for(const o of s.obstacles)mesh(new THREE.BoxGeometry(o.w*scale,2.6,o.h*scale),rock,(o.x+o.w/2)*scale,1.15,(o.y+o.h/2)*scale);
  // Wall crystals stay outside the walkable floor and never add hidden collision.
  for(let i=0;i<22;i++){
    const x=100+(i*137+s.chapter*23)%750,z=i%2?122:488;
    crystal(x*scale,z*scale,['#46ddff','#b180ff','#ff74d7'][i%3],.65+(i%4)*.22);
  }
  for(let i=0;i<14;i++){
    const x=(95+(i*173)%770)*scale,z=(i%2?126:483)*scale;
    const b=mesh(new THREE.DodecahedronGeometry(.35+(i%3)*.12,0),dark,x,.12,z);b.scale.y=.6;
  }
  // Shallow luminous pools along the cave edge.
  for(let i=0;i<4;i++){
    const pool=mesh(new THREE.CircleGeometry(.65+i*.08,32),material('#237c98',{metalness:.85,roughness:.18,emissive:'#123e58',emissiveIntensity:.5}),5+i*4,.005,11.8);
    pool.rotation.x=-Math.PI/2;
  }
  if(s.crystal){crystal(184*scale,300*scale,'#65f4ff',1.6);label('CHECKPOINT',184*scale,2.1,300*scale,'#afffff');}
  if(s.lore){mesh(new THREE.BoxGeometry(.7,.8,.5),material('#9170ad'),470*scale,.4,258*scale);label('INSCRIPTION',470*scale,1.3,258*scale,'#edc6ff');}
  if(s.coin){const c=mesh(new THREE.OctahedronGeometry(.22),material('#ffce54',{emissive:'#ffc83d',emissiveIntensity:.7,metalness:.7}),590*scale,.7,235*scale);animated.push(c);label('RARE COIN',590*scale,1.3,235*scale,'#ffe58e');}
  if(s.enemy){const m=material(s.boss?'#d56ba8':'#8e7cae');mesh(new THREE.ConeGeometry(s.boss?.7:.4,s.boss?2:1.2,6),m,730*scale,.7,355*scale);label(s.boss?'BOSS':'ENEMY',730*scale,2.4,355*scale,'#ffb7d6');}
  mesh(new THREE.BoxGeometry(.16,2,2.5),material(s.enemy?'#743650':'#317568',{emissive:s.enemy?'#572037':'#287b69',emissiveIntensity:.7}),866*scale,1,353*scale);
  label(s.enemy?'ENCOUNTER':'NEXT ROOM',866*scale,2.5,353*scale,'#a5ffe0');
}
window.EchoesCave={
  render(s){
    try{
      if(!renderer){renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(960,600);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
        scene=new THREE.Scene();scene.background=new THREE.Color('#090d20');scene.fog=new THREE.FogExp2('#111a32',.065);
        scene.add(new THREE.HemisphereLight('#b4d8ff','#36213c',2));camera=new THREE.PerspectiveCamera(64,1.6,.03,45);
        renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();window.EchoesCave.failed=true;});}
      const key=JSON.stringify([s.chapter,s.room,s.crystal,s.lore,s.coin,s.enemy,s.boss]);if(key!==roomKey){rebuild(s);roomKey=key;}
      camera.position.set(s.x*scale,1.25,s.y*scale);camera.lookAt(camera.position.x+Math.cos(s.heading),1.25,camera.position.z+Math.sin(s.heading));
      animated.forEach(c=>c.rotation.y=performance.now()*.0015);renderer.render(scene,camera);return renderer.domElement;
    }catch(e){console.error('Cave renderer unavailable',e);window.EchoesCave.failed=true;return null;}
  }
};
