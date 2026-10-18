/* Prefer natural device voices, without the extreme pitch/time stretching that sounds robotic. */
(()=>{
const naturalName=/Natural|Neural|Online|Premium|Enhanced/i;
function choose(role){const voices=globalThis.speechSynthesis?.getVoices?.()||[],english=voices.filter(v=>/^en(?:-|_)/i.test(v.lang));const preferred=role==='brindle'?/Ryan|Daniel|George|Arthur|Brian/i:/Andrew|Guy|Christopher|Thomas|Alex/i;const score=v=>(naturalName.test(v.name)?100:0)+(preferred.test(v.name)?22:0)+(/Samantha|Ava|Serena|Evan|Nathan|Tom/i.test(v.name)?10:0)+(v.default?2:0);return english.slice().sort((a,b)=>score(b)-score(a))[0]||null;}
function configure(u,role){const voice=choose(role);if(voice)u.voice=voice;u.rate=role==='brindle'?.98:.94;u.pitch=1;return{voice:voice?.name||'Device default',natural:!!voice&&naturalName.test(voice.name)};}
function speak(u,role){const parts=u.text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s=>s.trim()).filter(Boolean)||[u.text];if(parts.length===1){speechSynthesis.speak(u);return;}for(let i=0;i<parts.length;i++){const line=new SpeechSynthesisUtterance(parts[i]);configure(line,role);line.volume=u.volume;line.onstart=i===0?u.onstart:null;line.onend=i===parts.length-1?u.onend:null;line.onerror=u.onerror;speechSynthesis.speak(line);}}
// Trigger asynchronous device voice discovery before the first spoken conversation.
try{speechSynthesis.getVoices();}catch{}
const histories=new Map();
function history(){const key='echoesBelow_spoken_v1_'+(globalThis.EchosVoiceJourney?.()||'title');if(!histories.has(key)){let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]');}catch{}histories.set(key,new Set(Array.isArray(saved)?saved:[]));}return{key,seen:histories.get(key)};}
function fresh(role,text){const h=history();return !h.seen.has(role+':'+text);}
function remember(role,text){const h=history();h.seen.add(role+':'+text);try{localStorage.setItem(h.key,JSON.stringify([...h.seen].slice(-220)));}catch{}}
function next(role,lines){return lines.find(line=>fresh(role,line))||null;}
globalThis.EchosVoices={choose,configure,speak,fresh,remember,next,get quality(){return configure(new SpeechSynthesisUtterance(''),'brindle')}};
})();
