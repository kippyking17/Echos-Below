/* Original synthesized effects. One audio context, independent music/effects buses. */
(()=>{
const KEY='echoesBelow_audio_v1',defaults={musicEnabled:true,effectsEnabled:true,voicesEnabled:true,musicVolume:.7,effectsVolume:.7,voiceVolume:.85};let prefs={...defaults};
try{const old=JSON.parse(localStorage.getItem(KEY)||'null');if(old)for(const k of Object.keys(defaults)){if(typeof defaults[k]==='boolean'){if(typeof old[k]==='boolean')prefs[k]=old[k];}else if(Number.isFinite(old[k]))prefs[k]=Math.max(0,Math.min(1,old[k]));}}catch{}
let ctx=null,music=null,effects=null,compressor=null,noise=null,voices=0;const recent=new Map(),history=[];
const note=(f,d=.12,v=.04,type='triangle',t=0,to=f)=>({f,d,v,type,t,to});
const chord=(notes,t=0,d=.22,v=.025)=>notes.map((f,i)=>note(f,d,v,i%2?'sine':'triangle',t));
const signatures=[110,220,659,147,988,392,523];
function plan(name,o={}){
 const w=Math.max(0,Math.min(6,Number(o.weapon)||0)),f=signatures[w],pitch=1+(Number(o.combo)||0)*.045;
 if(name==='swing')return[note(0,w===3?.2:.13,.045,'noise',.02,0),note(f*.6*pitch,.18,.025,w===4?'sine':'triangle',0,f*.16),...(w>=3?[note(f,.1,.016,'sine',.03,f*1.3)]:[])];
 if(name==='hit')return[note(0,.11,.075,'noise'),note(w===6?65:100+w*15,.17,.07,'triangle',0,35),...chord(w===3?[147,220]:w===4?[988,1482]:w===5?[392,494,587]:w===6?[523,659,784]:[f*2,f*3],.035,.19,.023)];
 if(name==='kill')return[note(0,.32,.07,'noise'),note(70,.35,.065,'sine',0,30),...[1,1.25,1.5,2].map((n,i)=>note(f*n,.3,.027,'triangle',.04+i*.065))];
 const sets={
  echoVoice:[note(92,.7,.012,'sine'),note(138,.8,.01,'triangle',.08),note(184,.7,.007,'sine',.13)],angelRevive:[...chord([262,330,392],0,.8),...[523,659,784,1047].map((f,i)=>note(f,.7,.035,'sine',.15+i*.13)),note(0,.55,.02,'noise')],title:[...chord([262,392],0,.5),...chord([523,659,784],.15,.65)],
  menuOpen:chord([196,294],0,.14),menuBack:[note(330,.09),note(220,.12,.03,'triangle',.055)],menuMove:[note(440,.035,.012,'square')],menuConfirm:[note(523,.06,.02),note(784,.1,.025,'sine',.045)],
  dodge:[note(0,.16,.025,'noise'),note(300,.15,.02,'sine',0,100)],walkTarget:[note(294,.035,.012,'sine')],act:chord([392,494],0,.15,.018),dialogue:[note(330+(o.chapter||0)*8,.045,.014,'triangle')],footstep:[note(0,.035,.017,'noise'),note(90+(o.chapter||0)%4*19,.045,.012,'sine')],
  collectCoin:[note(1175,.07,.035,'sine'),note(1568,.22,.03,'sine',.06)],collectBerry:chord([330,440],0,.13),collectKey:[note(880,.09,.035),note(1320,.2,.03,'sine',.065)],collectLoot:[...chord([392,494],0,.18),...chord([587,784],.1,.24)],
  grace:[...chord(o.angel?[262,330,392]:[330,392],0,.6),...chord(o.angel?[523,659,784]:[494,659],.18,.7)],upgrade:[0,4,7,12,16].map((n,i)=>note(262*Math.pow(2,n/12),.36,.035,'triangle',i*.075)),
  doorOpen:[note(0,.25,.035,'noise'),note(100,.25,.025,'triangle',0,180)],doorLocked:[note(0,.065,.035,'noise'),note(95,.09,.045,'square')],
  puzzleStep:[note(392*Math.pow(2,(o.step||0)*3/12),.16,.03,'sine')],puzzleWrong:[note(220,.1,.025),note(165,.16,.025,'triangle',.09)],puzzleSolve:[...chord([330,494],0,.25),...chord([392,587,784],.18,.45)],
  shopOpen:[note(784,.18,.026,'sine'),note(988,.28,.025,'sine',.08)],purchase:[...chord([784,1175],0,.12),note(1568,.25,.025,'sine',.09)],equip:[note(0,.07,.025,'noise'),...chord([262,392],.04,.15)],potion:[note(440,.2,.025,'sine',0,880),note(660,.22,.025,'sine',.1,1320)],heal:[...chord([330,440],0,.2),...chord([494,659],.12,.3)],
  skill:[note(196,.3,.035,'sine',0,784),...chord([392,587],.12,.32)],enemyAlert:[note(110,.2,.035,'square'),note(165,.24,.025,'triangle',.14)],warning:[note(165,.12,.018,'sine'),note(220,.13,.018,'sine',.13)],
  hurt:[note(0,.12,.06,'noise'),note(120,.2,.045,'triangle',0,50)],block:[note(784,.1,.04,'triangle'),note(1175,.24,.025,'sine',.03)],death:[392,294,220,147].map((f,i)=>note(f,.45,.035,'triangle',i*.12)),respawn:[196,294,392,587].map((f,i)=>note(f,.4,.027,'sine',i*.1)),
  mercy:[...chord([294,370,440],0,.35),...chord([392,494,587],.18,.45)],save:[note(523,.07,.018,'sine'),note(659,.14,.02,'sine',.07)],load:[note(392,.1,.025),note(587,.2,.025,'sine',.1)],
  portal:[note(147,.45,.025,'sine',0,588),...chord([440,659],.16,.45)],relic:[0,7,12,16,19].map((n,i)=>note(262*Math.pow(2,n/12),.5,.028,'sine',i*.09)),chapter:[...chord([196,294],0,.4),...chord([392,494,587],.16,.5)],credits:[...chord([262,330,392],0,.7),...chord([523,659,784],.3,.8)]
 };return sets[name]||[];
}
function sync(){if(!ctx)return;music.gain.setValueAtTime(prefs.musicEnabled?prefs.musicVolume:0,ctx.currentTime);effects.gain.setValueAtTime(prefs.effectsEnabled?prefs.effectsVolume:0,ctx.currentTime);}
function configure(values){for(const k of Object.keys(defaults))if(Object.hasOwn(values,k)){const v=values[k];prefs[k]=typeof defaults[k]==='boolean'?!!v:Math.max(0,Math.min(1,Number(v)||0));}try{localStorage.setItem(KEY,JSON.stringify(prefs));}catch{}sync();if(!prefs.voicesEnabled||prefs.voiceVolume===0){globalThis.EchoesMerchant?.stop();globalThis.EchoesLastVoice?.stop();}return {...prefs};}
function unlock(){try{if(!ctx){const C=globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)return null;ctx=new C();music=ctx.createGain();effects=ctx.createGain();compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-16;compressor.ratio.value=5;music.connect(compressor);effects.connect(compressor);compressor.connect(ctx.destination);noise=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*.8),ctx.sampleRate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.65;sync();}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx;}catch{return null;}}
function play(name,options={}){
 if(!prefs.effectsEnabled||prefs.effectsVolume===0||!ctx||ctx.state!=='running')return false;
 const now=performance.now(),gap=({menuMove:110,dialogue:60,footstep:85,warning:900,doorLocked:220})[name]||0;if(now-(recent.get(name)??-Infinity)<gap)return false;recent.set(name,now);
 const notes=plan(name,options);if(!notes.length)return false;history.push({name,weapon:options.weapon||0,time:now});if(history.length>64)history.shift();
 for(const n of notes){if(voices>=64)break;const at=ctx.currentTime+n.t,g=ctx.createGain(),source=n.type==='noise'?ctx.createBufferSource():ctx.createOscillator(),nodes=[g,source];
  if(n.type==='noise'){source.buffer=noise;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=name==='footstep'?900:3200;source.connect(filter);filter.connect(g);nodes.push(filter);}else{source.type=n.type;source.frequency.setValueAtTime(Math.max(20,n.f),at);source.frequency.exponentialRampToValueAtTime(Math.max(20,n.to),at+n.d);source.connect(g);}
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(n.v*((globalThis.EchoesMerchant?.speaking||globalThis.EchoesLastVoice?.speaking) ? .55 : 1),at+.006);g.gain.exponentialRampToValueAtTime(.0001,at+n.d);g.connect(effects);voices++;source.onended=()=>{voices=Math.max(0,voices-1);for(const node of nodes)node.disconnect();};source.start(at);source.stop(at+n.d+.025);
 }return true;
}
globalThis.EchoesAudio={plan,configure,unlock,play,get settings(){return {...prefs}},get context(){return ctx},get musicBus(){return music},get status(){return {state:ctx?.state||'locked',voices,history:history.map(x=>({...x})),settings:{...prefs}}}};
})();
