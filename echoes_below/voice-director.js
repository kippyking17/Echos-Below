/* Prefer natural device voices, without the extreme pitch/time stretching that sounds robotic. */
(()=>{
function choose(role){const voices=globalThis.speechSynthesis?.getVoices?.()||[],english=voices.filter(v=>/^en(?:-|_)/i.test(v.lang));const male=/Guy|Ryan|Andrew|Brian|Christopher|Eric|Roger|Thomas|Arthur|Daniel|George|David|James|Mark|Alex/i,score=v=>(/Natural|Neural|Online|Premium|Enhanced/i.test(v.name)?100:0)+(male.test(v.name)?24:0)+(/en-GB/i.test(v.lang)&&role==='brindle'?9:0)+(v.default?2:0);return english.sort((a,b)=>score(b)-score(a))[0]||null;}
function configure(u,role){const voice=choose(role);if(voice)u.voice=voice;const natural=voice&&/Natural|Neural|Online|Premium|Enhanced/i.test(voice.name);u.rate=role==='brindle'?1:.91;u.pitch=role==='brindle'?.98:natural?.86:.9;return {voice:voice?.name||'Device default',natural:!!natural};}
globalThis.EchosVoices={choose,configure};
})();
