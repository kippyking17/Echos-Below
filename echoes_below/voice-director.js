/* Prefer natural device voices, without the extreme pitch/time stretching that sounds robotic. */
(()=>{
function choose(role){const voices=globalThis.speechSynthesis?.getVoices?.()||[],english=voices.filter(v=>/^en(?:-|_)/i.test(v.lang));const male=/Guy|Ryan|Andrew|Brian|Christopher|Eric|Roger|Thomas|Arthur|Daniel|George|David|James|Mark|Alex/i,score=v=>(/Natural|Neural|Online|Premium|Enhanced/i.test(v.name)?100:0)+(male.test(v.name)?24:0)+(/en-GB/i.test(v.lang)&&role==='brindle'?9:0)+(v.default?2:0);return english.sort((a,b)=>score(b)-score(a))[0]||null;}
function configure(u,role){const voice=choose(role);if(voice)u.voice=voice;const natural=voice&&/Natural|Neural|Online|Premium|Enhanced/i.test(voice.name);u.rate=role==='brindle'?1:.91;u.pitch=role==='brindle'?.98:natural?.86:.9;return {voice:voice?.name||'Device default',natural:!!natural};}
const histories=new Map();
function history(){const key='echoesBelow_spoken_v1_'+(globalThis.EchosVoiceJourney?.()||'title');if(!histories.has(key)){let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]');}catch{}histories.set(key,new Set(Array.isArray(saved)?saved:[]));}return{key,seen:histories.get(key)};}
function fresh(role,text){const h=history();return !h.seen.has(role+':'+text);}
function remember(role,text){const h=history();h.seen.add(role+':'+text);try{localStorage.setItem(h.key,JSON.stringify([...h.seen].slice(-220)));}catch{}}
function next(role,lines){return lines.find(line=>fresh(role,line))||null;}
globalThis.EchosVoices={choose,configure,fresh,remember,next};
})();
