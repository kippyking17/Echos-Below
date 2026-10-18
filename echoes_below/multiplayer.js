/* Private, authenticated co-op. The database owns membership, combat and moderation. */
(()=>{'use strict';
let client=null,user=null,snapshot=null,opened=false,busy=false,pendingActions=0,timer=0,frame=0,generation=0;
let destination=null,waypoints=[],serverOffset=0,bannedUntil=0,failures=0,lastRoom='',lastEnemyHp=null,lastChat='',lastStatus='',renderTime=0;
const positions=new Map();
const $=id=>document.getElementById(id),now=()=>Date.now()+serverOffset;
const shell=document.createElement('section');shell.id='coopShell';shell.hidden=true;shell.setAttribute('aria-label','Private multiplayer');
shell.innerHTML=`<header class="coop-header"><div><span class="coop-kicker">ECHOS BELOW · PRIVATE CO-OP</span><h1>Carry the light together</h1><p>One descent. Up to four travelers.</p></div><div class="coop-row"><button id="coopToggleChat" aria-expanded="false">Chat</button><button id="coopBack">Back to solo</button></div></header>
<p id="coopNotice" role="status" aria-live="polite"></p>
<div id="coopSetup" class="coop-layout"><section class="coop-panel"><h2>A quiet invitation</h2><p>Only signed-in players with your room code can join. Each room holds up to four people.</p><label for="coopCharacter">Your traveler</label><select id="coopCharacter"></select><div class="coop-divider"></div><button class="coop-primary" id="coopCreate">Create private room</button><div class="coop-divider"></div><label for="coopCodeInput">Friend’s room code</label><div class="coop-row"><input id="coopCodeInput" maxlength="10" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="10-character code" aria-label="Private room code"><button id="coopJoin">Join room</button></div><p id="coopLoginHelp">Log in through M → Settings → Account & cloud first.</p></section><aside class="coop-panel"><h2>Four lights. One foe.</h2><ul class="coop-rules"><li>A separate co-op journey starts at chapter 1. Solo saves stay safe.</li><li>Everyone shares each boss’s HP and phase. Health scales by +55% per extra player.</li><li>Move out of glowing danger marks. Attack nearby, or use ACT together for a peaceful victory.</li><li>Stand beside a downed friend and revive them. If everyone falls, the leader can retry.</li><li>The leader opens the next door once everyone standing reaches it.</li><li>Chat is private to this room. Profanity or sexual language removes you from multiplayer for one minute, including after refreshing.</li></ul></aside></div>
<div id="coopLobby" class="coop-layout" hidden><section class="coop-panel"><h2>Your private room</h2><p>Share this code with your friends</p><div id="coopRoomCode" class="coop-code"></div><div class="coop-row"><button id="coopCopy">Copy code</button><button id="coopReady">Ready</button><button id="coopStart" class="coop-primary">Begin together</button></div><div id="coopLobbyRoster" class="coop-roster"></div><p>All travelers must be ready. The leader begins the journey.</p><button id="coopLeave">Leave room</button></section><aside id="coopLobbyChat" class="coop-panel"></aside></div>
<div id="coopGame" class="coop-layout coop-game-layout" hidden><section><div class="coop-game-wrap"><canvas id="coopCanvas" width="960" height="600" tabindex="0" aria-label="Cooperative journey. Click or tap to move; right-click to attack."></canvas><p id="coopFightInfo"></p><div class="coop-actions"><button id="coopAttack">Attack</button><button id="coopAct">ACT</button><button id="coopDodge">Dodge</button><button id="coopRevive">Revive</button><button id="coopGrace">Grace</button><button id="coopNext">Next door</button><button id="coopRetry">Retry fight</button></div><div id="coopOutcome" hidden></div></div></section><aside class="coop-panel"><h2>YOUR PARTY</h2><div id="coopGameRoster" class="coop-roster"></div><p class="coop-help">Click/tap move · RMB attack · E revive/door · Space dodge. Use the buttons on touch screens.</p><div id="coopGameChat"></div></aside></div>`;
document.body.append(shell);
const chatPanel=document.createElement('div');chatPanel.innerHTML='<h2>ROOM CHAT</h2><div id="coopChatLog" role="log" aria-label="Private room chat" aria-live="polite"></div><form id="coopChatForm"><input id="coopChatInput" maxlength="180" autocomplete="off" aria-label="Chat message" placeholder="Keep it kind"><button type="submit">Send</button></form><p class="coop-help">Profanity / sexual language: 1-minute multiplayer ban.</p>';
$('coopLobbyChat').append(chatPanel);
for(const p of window.EchoesAvatars.presets){const option=document.createElement('option');option.value=p.id;option.textContent=p.name+' · '+p.trait.label;$('coopCharacter').append(option);}
const canvas=$('coopCanvas'),ctx=canvas.getContext('2d');
function notice(text){$('coopNotice').textContent=text;}
function roomKey(){return snapshot?.room.chapter+':'+snapshot?.room.number;}
function me(){return snapshot?.players.find(p=>p.id===snapshot.you);}
function resetRoom(){snapshot=null;destination=null;waypoints=[];positions.clear();lastRoom='';lastEnemyHp=null;lastChat='';lastStatus='';render();}
function showBan(data){bannedUntil=Date.parse(data.bannedUntil)||now()+60000;if(data.serverTime)serverOffset=Date.parse(data.serverTime)-Date.now();resetRoom();renderBan();}
function renderBan(){const seconds=Math.max(0,Math.ceil((bannedUntil-now())/1000));if(seconds){notice('Multiplayer ban: '+seconds+'s remaining. Inappropriate language is not allowed.');}else if(bannedUntil){bannedUntil=0;notice('Your multiplayer ban has ended. You can join again.');}const disabled=!user||seconds>0;$('coopCreate').disabled=disabled;$('coopJoin').disabled=disabled;}
async function rpc(action,extra={}){
 if(!client||!user){notice('Log in through M → Settings → Account & cloud to play multiplayer.');return null;}
 if(bannedUntil>now()){renderBan();return null;}
 const request=generation,started=Date.now();
 const {data,error}=await client.rpc('echos_mp',{action,room_code:extra.code||'',message:extra.message||'',px:extra.x??null,py:extra.y??null,choice:extra.choice||''});
 if(request!==generation||!opened)return null;
 if(error){if(['PGRST202','42883'].includes(error.code))throw Error('Private multiplayer is waiting for activation. Solo play is ready.');throw Error(error.message||'Connection interrupted.');}
 if(data?.serverTime)serverOffset=Date.parse(data.serverTime)-(started+Date.now())/2;
 if(data?.reason==='banned'){showBan(data);return null;}
 if(data?.error){if(data.reason==='left'){const wasInRoom=!!snapshot;resetRoom();if(wasInRoom)notice(data.error);}else notice(data.error);return null;}
 if(data?.left){resetRoom();notice('You left the room.');return data;}
 if(data?.room){
  const wasRoom=roomKey(),wasEnemy=lastEnemyHp;
  snapshot=data;
  if(wasRoom!==roomKey()){destination=null;waypoints=[];positions.clear();lastEnemyHp=null;}
  if(wasEnemy!==null&&data.room.enemyHp<wasEnemy)window.EchoesAudio?.play?.(data.room.enemyHp===0?'kill':'hit');
  lastEnemyHp=data.room.enemyHp;failures=0;render();
 }
 return data;
}
async function action(kind,extra={}){const request=generation;pendingActions++;try{while(busy){await new Promise(resolve=>setTimeout(resolve,15));if(request!==generation)return;}busy=true;try{notice('');await rpc(kind,extra);}catch(e){notice(e.message);}finally{busy=false;}}finally{pendingActions--;}}
async function heartbeat(){
 clearTimeout(timer);if(!opened)return;renderBan();
 if(snapshot&&!busy&&!pendingActions){busy=true;try{const p=me();if(destination&&p?.hp>0&&snapshot.room.status!=='lobby'){
   while(waypoints.length&&Math.hypot(p.x-waypoints[0].x,p.y-waypoints[0].y)<7)waypoints.shift();
   if(!waypoints.length)destination=null;
   await rpc(destination?'move':'poll',waypoints[0]||{});
  }else await rpc('poll');
 }catch(e){failures++;notice('Connection interrupted. Reconnecting… '+e.message);if(failures>=8){resetRoom();notice('Room connection lost. Your solo save is safe.');}}finally{busy=false;}}
 timer=setTimeout(heartbeat,350);
}
function roster(host){host.replaceChildren();for(const p of snapshot?.players||[]){const card=document.createElement('div');card.className='coop-member';const name=document.createElement('strong'),stats=document.createElement('small'),meter=document.createElement('div'),fill=document.createElement('span');name.textContent=p.name+(p.id===snapshot.room.host?' · leader':'')+(p.id===snapshot.you?' · you':'');stats.textContent='LV '+p.level+'  ·  HP '+p.hp+' / '+p.maxHp+(snapshot.room.status==='lobby'?(p.ready?' · READY':' · waiting'):p.hp===0?' · DOWNED':'');meter.className='coop-meter';fill.style.width=Math.max(0,Math.min(100,100*p.hp/p.maxHp))+'%';meter.append(fill);card.append(name,stats,meter);host.append(card);}}
function render(){
 const r=snapshot?.room,lobby=r?.status==='lobby',p=me(),leader=snapshot?.you===r?.host;
 $('coopSetup').hidden=!!r;$('coopLobby').hidden=!lobby;$('coopGame').hidden=!r||lobby;
 $('coopLoginHelp').hidden=!!user;renderBan();
 if(!r)return;
 if(r.status!==lastStatus){shell.scrollTop=0;lastStatus=r.status;}
 if(lobby){$('coopRoomCode').textContent=r.code;$('coopReady').textContent=p?.ready?'Not ready':'Ready';$('coopStart').hidden=!leader;$('coopStart').disabled=!snapshot.players.every(p=>p.ready);roster($('coopLobbyRoster'));$('coopLobbyChat').append(chatPanel);}else{
  roster($('coopGameRoster'));$('coopGameChat').append(chatPanel);
  const chapter=window.EchoesStory.chapters[r.chapter],room=chapter.rooms[r.number];
  $('coopFightInfo').textContent=r.status==='battle'?enemyName(r)+' · '+r.enemyHp+' / '+r.enemyMax+' HP · ACT '+Number(r.peace).toFixed(1)+' / '+((3+r.chapter*.25)*(1+.35*(r.partySize-1))).toFixed(1):'CHAPTER '+(r.chapter+1)+' · '+room.name;
  for(const [id,disabled]of[['coopAttack',r.status!=='battle'||!p?.hp],['coopAct',r.status!=='battle'||!p?.hp],['coopDodge',r.status!=='battle'||!p?.hp],['coopRevive',!p?.hp||!snapshot.players.some(p=>!p.hp)],['coopGrace',r.status!=='world'||!room.graceKind],['coopNext',!leader||r.status!=='world']])$(id).disabled=disabled;
  $('coopRetry').hidden=r.status!=='defeated'||!leader;
  $('coopOutcome').hidden=!['won','defeated'].includes(r.status);
  $('coopOutcome').textContent=r.status==='won'?'Thirty chapters. Four lights, carried home together. Thank you for walking beside one another.':r.status==='defeated'?'Every light has fallen. Your leader can retry this fight.':'';
 }
 const chatKey=JSON.stringify(snapshot.chat);
 if(chatKey!==lastChat){const log=$('coopChatLog'),atBottom=log.scrollHeight-log.scrollTop-log.clientHeight<35;log.replaceChildren();for(const line of snapshot.chat){const text=document.createElement('p');text.textContent=line.name+': '+line.body;log.append(text);}if(atBottom)log.scrollTop=log.scrollHeight;lastChat=chatKey;}
}
function enemyName(r){const chapter=window.EchoesStory.chapters[r.chapter];return r.enemyKind==='boss'?chapter.boss:r.enemyKind==='mini'?(window.EchoesCombat.miniboss(r.chapter,r.number)?.name||'Midpoint guardian'):'A wandering echo';}
function text(value,x,y,size=16,color='#e4ead8',align='left'){ctx.font=size+'px Consolas,monospace';ctx.textAlign=align;ctx.fillStyle=color;ctx.fillText(value,x,y);}
function rectangle(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x,y,w,h);}
function draw(time){
 if(!opened)return;frame=requestAnimationFrame(draw);if(!snapshot||snapshot.room.status==='lobby')return;
 const box=canvas.getBoundingClientRect(),scale=Math.max(1,Math.min(3,(window.devicePixelRatio||1)*box.width/960));
 if(canvas.width!==Math.round(960*scale)){canvas.width=Math.round(960*scale);canvas.height=Math.round(600*scale);}
 ctx.setTransform(canvas.width/960,0,0,canvas.height/600,0,0);ctx.imageSmoothingEnabled=false;
 const r=snapshot.room,ch=window.EchoesStory.chapters[r.chapter],room=ch.rooms[r.number],color=ch.crystalColor,t=now(),pulse=.5+.5*Math.sin(time/420);
 window.EchoesOverworld.draw(ctx,{meta:room,time:time/1000,x:0,y:0,hideLabels:true,hidePlayer:true,extras:[],solved:true,crystal:!!room.graceKind&&r.status==='world',coin:false,shop:false,enemy:false,canLeave:r.cleared,door:{locked:!r.cleared}});
 if(r.cleared)text('EXIT',856,278,14,color,'center');
 if(r.status==='battle'){
  const danger=r.dangerAt?Date.parse(r.dangerAt)-t:null;
  if(danger!==null&&danger>-150&&danger<1500){ctx.save();ctx.globalAlpha=.2+.18*pulse;ctx.fillStyle='#ff785b';if(r.wave%3===0)ctx.fillRect(r.targetX-65,180,130,270);else if(r.wave%3===1)ctx.fillRect(120,r.targetY-55,720,110);else{ctx.beginPath();ctx.arc(r.targetX,r.targetY,100,0,Math.PI*2);ctx.fill();}ctx.restore();ctx.strokeStyle='#ffbc88';ctx.lineWidth=3;ctx.strokeRect(r.targetX-14,r.targetY-14,28,28);}
  const final=r.chapter===29&&r.enemyKind==='boss',phase=final&&r.enemyHp<=r.enemyMax/3?3:r.enemyHp<=r.enemyMax*(final?2/3:.5)?2:1;
  window.EchoesCharacters.enemy(ctx,{x:650,y:310,scale:r.enemyKind==='boss'?1.25:r.enemyKind==='mini'?1:.85,chapter:r.chapter,boss:r.enemyKind==='boss',mini:r.enemyKind==='mini',color,time:time/1000,phase,attackDuration:1400,attackAge:danger!==null?1400-danger:null});
  text(enemyName(r),650,170,20,color,'center');text('PHASE '+phase,650,192,13,'#f1c3a1','center');rectangle(530,205,240,7,'#29333e');rectangle(530,205,240*r.enemyHp/r.enemyMax,7,color);
 }
 const easing=1-Math.exp(-Math.min(60,time-renderTime)/70);renderTime=time;
 const ordered=[...snapshot.players].sort((a,b)=>a.y-b.y);
 for(const p of ordered){let visual=positions.get(p.id);if(!visual){visual={x:Number(p.x),y:Number(p.y)};positions.set(p.id,visual);}visual.x+=(Number(p.x)-visual.x)*easing;visual.y+=(Number(p.y)-visual.y)*easing;const x=visual.x,y=visual.y,preset=window.EchoesAvatars.get(p.character),age=t-Date.parse(p.animationAt),attack=p.animation==='attack'&&age<550,down=p.hp===0;
  ctx.save();ctx.translate(x,y);if(down){ctx.rotate(-Math.PI/2);ctx.globalAlpha=.55;}
  rectangle(-13,15,26,5,'#020a10');rectangle(-8,-6,16,22,preset.coat);rectangle(-9,-27,18,19,preset.hood);rectangle(-6,-18,12,10,preset.skin);rectangle(-8,-9,16,4,preset.scarf);rectangle(-7,15,5,8,'#344455');rectangle(2,15,5,8,'#344455');
  if(!attack){rectangle(-13,-4,4,13,preset.hood);rectangle(9,-4,4,13,preset.hood);}else{ctx.save();ctx.rotate(-1+age/550*2.6);rectangle(7,-3,28,5,color);rectangle(17,-7,4,13,'#e3c890');ctx.restore();ctx.save();ctx.globalAlpha=1-age/550;ctx.strokeStyle=color;ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,38,-1.1,-1.1+age/550*2.6);ctx.stroke();ctx.restore();}
  if(Date.parse(p.dodgeUntil)>t){ctx.strokeStyle='#c9eff1';ctx.lineWidth=2;ctx.strokeRect(-20,-33,40,60);}ctx.restore();
  text(p.name+(p.id===snapshot.you?' · YOU':''),x,y-53,14,p.id===snapshot.you?'#ffe1a0':'#e5eddb','center');text('LV '+p.level+'  '+p.hp+'/'+p.maxHp,x,y-37,12,down?'#ffb29c':'#b8ddca','center');rectangle(x-22,y+27,44,4,'#273840');rectangle(x-22,y+27,44*p.hp/p.maxHp,4,down?'#ff907b':'#91d8a1');
 }
 if(destination){ctx.strokeStyle=color;ctx.lineWidth=2;ctx.strokeRect(destination.x-8,destination.y-8,16,16);}
 text('CHAPTER '+String(r.chapter+1).padStart(2,'0')+'  /  '+String(r.number+1).padStart(2,'0'),80,65,16,color);text(room.name,80,94,24);text(snapshot.players.length+' / 4 TRAVELERS',880,65,14,'#b9cbc8','right');
 const line=r.status==='battle'?'The same foe. Four different lights.':room.text||'The lanterns wait for one another.';const words=line.split(' ');let buffer='',row=0;for(const word of words){if((buffer+word).length>88){text(buffer,80,537+row*21,14,'#a9c1c4');buffer='';row++;if(row>1)break;}buffer+=word+' ';}if(row<2)text(buffer,80,537+row*21,14,'#a9c1c4');
}
function moveTo(event){if(!snapshot||!me()?.hp)return;const rect=canvas.getBoundingClientRect(),target={x:Math.max(120,Math.min(840,(event.clientX-rect.left)/rect.width*960)),y:Math.max(180,Math.min(450,(event.clientY-rect.top)/rect.height*600))},room=window.EchoesStory.chapters[snapshot.room.chapter].rooms[snapshot.room.number],cells=[];
 const clear=(x,y)=>!(room.obstacles||[]).some(o=>x>o.x-10&&x<o.x+o.w+10&&y>o.y-10&&y<o.y+o.h+10);
 for(let row=0;row<14;row++)for(let col=0;col<37;col++){const x=120+col*20,y=180+row*20;if(clear(x,y))cells.push({x,y,col,row,key:col+':'+row});}
 const p=me(),nearest=q=>cells.reduce((best,cell)=>!best||Math.hypot(cell.x-q.x,cell.y-q.y)<Math.hypot(best.x-q.x,best.y-q.y)?cell:best,null),start=nearest(p),end=nearest(target);if(!start||!end)return;
 const lookup=new Map(cells.map(cell=>[cell.key,cell])),came=new Map([[start.key,null]]),queue=[start];let cursor=0;
 while(cursor<queue.length&&!came.has(end.key)){const cell=queue[cursor++];for(const [dc,dr]of[[1,0],[-1,0],[0,1],[0,-1]]){const next=lookup.get((cell.col+dc)+':'+(cell.row+dr));if(next&&!came.has(next.key)){came.set(next.key,cell);queue.push(next);}}}
 if(!came.has(end.key)){notice('That path is blocked.');return;}
 const path=[];for(let cell=end;cell;cell=came.get(cell.key))path.unshift(cell);
 waypoints=path.filter((cell,i)=>!i||i===path.length-1||(cell.x-path[i-1].x)!==(path[i+1].x-cell.x)||(cell.y-path[i-1].y)!==(path[i+1].y-cell.y)).map(({x,y})=>({x,y}));destination=waypoints[waypoints.length-1];canvas.focus({preventScroll:true});}
canvas.addEventListener('pointerdown',e=>{if(e.button===2){e.preventDefault();action('attack');}else if(e.button===0)moveTo(e);});canvas.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('keydown',e=>{if(!opened)return;e.stopImmediatePropagation();const target=e.target;if(target?.matches?.('input,select,textarea')||e.repeat)return;if(e.code==='Space'){e.preventDefault();action('dodge');}if(e.code==='KeyE'){e.preventDefault();const p=me(),down=snapshot?.players.some(q=>q.hp===0&&p&&Math.hypot(q.x-p.x,q.y-p.y)<85);action(down?'revive':snapshot?.room.status==='world'?'advance':'act');}},true);
window.addEventListener('keyup',e=>{if(opened)e.stopImmediatePropagation();},true);
$('coopCreate').onclick=()=>action('create',{choice:$('coopCharacter').value});$('coopJoin').onclick=()=>{const code=$('coopCodeInput').value.trim().toUpperCase();if(!/^[A-Z0-9]{10}$/.test(code)){notice('Enter the full 10-character room code.');return;}action('join',{code,choice:$('coopCharacter').value});};
for(const [id,kind]of[['coopReady','ready'],['coopStart','start'],['coopAttack','attack'],['coopAct','act'],['coopDodge','dodge'],['coopRevive','revive'],['coopGrace','heal'],['coopNext','advance'],['coopRetry','retry']])$(id).onclick=()=>action(kind);
$('coopCopy').onclick=async()=>{try{await navigator.clipboard.writeText(snapshot.room.code);notice('Room code copied.');}catch{notice('Your room code: '+snapshot.room.code);}};
$('coopLeave').onclick=()=>action('leave');
$('coopChatForm').onsubmit=async e=>{e.preventDefault();const input=$('coopChatInput'),message=input.value.trim();if(!message||input.disabled)return;input.disabled=true;try{await action('chat',{message});input.value='';}finally{input.disabled=false;}};
$('coopToggleChat').onclick=()=>{const show=shell.classList.toggle('coop-chat-open');$('coopToggleChat').setAttribute('aria-expanded',String(show));};
async function close(){if(busy){notice('Wait for the current room action to finish.');return;}if(snapshot){busy=true;try{await rpc('leave');}catch{notice('Connection lost; room membership will expire automatically.');}finally{busy=false;}}opened=false;generation++;clearTimeout(timer);cancelAnimationFrame(frame);shell.hidden=true;resetRoom();window.EchoesBridge?.resumeSolo?.();$('menuButton')?.focus();}
$('coopBack').onclick=close;
window.EchosMultiplayer={
 open(){if(opened)return;opened=true;generation++;shell.hidden=false;window.EchoesBridge?.pauseSolo?.();render();notice(user?'Create a private room, or enter a friend’s code.':'Log in through M → Settings → Account & cloud first.');if(user)action('poll');heartbeat();frame=requestAnimationFrame(draw);$('coopBack').focus();},
 setSession(sdk,nextUser){client=sdk;const changed=user?.id!==nextUser?.id;if(changed){generation++;bannedUntil=0;resetRoom();}user=nextUser;if(opened){render();if(!user)notice('You were signed out. Log in again to play multiplayer.');else if(changed)action('poll');}},
 get active(){return opened;},getState:()=>snapshot?JSON.parse(JSON.stringify(snapshot)):null,close
};
})();
