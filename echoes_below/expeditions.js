/* Optional districts keep the twenty-chapter campaign and its saves intact. */
(()=>{
const relics=[
 {name:'Wayfarer’s Prism',description:'Earn one extra coin after every encounter.'},
 {name:'Mossheart Pendant',description:'Restore 2 HP after every encounter.'},
 {name:'Emberglass Sigil',description:'Add 2 damage to FIGHT.'},
 {name:'Tidal Lens',description:'Slow hostile projectiles by 10%.'},
 {name:'Lantern Medallion',description:'Save 15% on shop prices, rounded to whole coins.'},
 {name:'Aurora Band',description:'Gain 0.5 seconds of extra protection after a hit.'}
];
const definitions=[
 {id:'reservoir',title:'The Starlit Reservoir',chapter:0,theme:'reservoir',colors:['#26485b','#112e3b','#71d9ff'],mode:'collect',tokens:['Ripple bell','Moon bell','Shore bell'],order:[0,1,2],instruction:'Find all three bells. They can be rung in any order.',
  intro:'Wick finds an overflow tunnel beneath the gate. Inside, a reservoir keeps the reflection of a sky the city has never seen.',
  rooms:[
   ['The Sky Under Stone','Astronomer’s bucket','A bucket holds a constellation in its dark water. Its maker once promised to bring the sky to a child who could not climb the stairs. The old promise still makes the reservoir glow.','Follow the curved blue channel to the east. This trail is optional, and its first crystal is a checkpoint.'],
   ['The Three Ripple Bells','Bells of the reservoir','Three bells were lowered into the water to guide lost travelers. Their keepers are gone, but the bells answer a careful hand. Ring every one, in any order, to light the far channel.','Look for three marked bells around the pool. Each one rings only once until the channel is open.'],
   ['An Unbroken Reflection','Wayfarer’s cradle','The cradle contains a prism made from a promise kept. “A little luck for the next traveler,” reads the inscription. Wick insists that finding it counts as good luck already.','Claim the relic at the central cradle, then use the east exit or return through the entrance.']
  ]},
 {id:'sanctuary',title:'Mosswake Sanctuary',chapter:3,theme:'sanctuary',colors:['#294d3e','#112d28','#adf3b7'],mode:'sequence',tokens:['Sleeping seed','Dew basin','Open leaf'],order:[0,1,2],instruction:'Wake the seed with dew before asking a leaf to open: seed → dew → leaf.',
  intro:'A root has broken through the river’s retaining wall. Beyond it lies a sanctuary where the plants still remember the people who tended them.',
  rooms:[
   ['The Lanternroot Steps','Gardener’s name stone','The name stone lists the gardeners before it lists the plants. Somebody wanted visitors to remember that a garden is made of care as much as soil. Giant roots hold the ceiling gently apart.','The quiet path follows the pale roots. Read the name stone before walking deeper.'],
   ['The Waking Grove','Nursery instructions','Three living vessels wait beside the root pools. A seed must wake, receive dew, then unfold its first leaf. A wrong touch only sends the grove back to sleep.','Visit the sleeping seed first, the dew basin second, and the open leaf last. No health is lost if you try again.'],
   ['A Heart Beneath the Bark','Mossheart nest','The pendant rests in a nest of living bark. It pulses when someone nearby is hurt. Wick listens, then says, “It remembers how to help. That is a useful thing to remember.”','The nest holds a relic that heals you after encounters. You can equip it from the main menu.']
  ]},
 {id:'foundry',title:'Emberglass Foundry',chapter:6,theme:'foundry',colors:['#593327','#2a2027','#ffae67'],mode:'sequence',tokens:['Pressure vent','Cooling wheel','Glass kiln'],order:[0,1,2],instruction:'Safe glassmaking: vent the pressure → cool the pipes → light the kiln.',
  intro:'An unused workers’ stair leads above the furnaces. Here, the city once made useful things from waste heat instead of demanding another voice.',
  rooms:[
   ['The Suspended Crucible','Glassworker’s bench','A crucible hangs above a river of slowly moving embers. The bench holds cups with crooked handles and uneven rims. Every one was kept because somebody could still use it.','The bright channels are below the stone walkways. Follow the warm guide lights around the machinery.'],
   ['The Last Safe Pour','Foundry safety plate','The plate has been polished by generations of nervous hands: vent pressure, turn the cooling wheel, then light the kiln. The valves are scattered so one failure cannot stop every safeguard.','Touch the vent, cooling wheel, and kiln in that order. The plate repeats the sequence.'],
   ['The Glass That Holds Dawn','Emberglass anvil','The sigil was forged from the first safe pour after the foundry reopened. It carries heat without asking a living thing to burn. A small tool can still change what a hand is able to do.','Take the Emberglass Sigil for extra FIGHT damage, or keep a different relic equipped if you prefer a peaceful build.']
  ]},
 {id:'observatory',title:'The Drowned Observatory',chapter:9,theme:'observatory',colors:['#254b68','#10293c','#83ddff'],mode:'sequence',tokens:['Moon lens','Tide lens','Star lens'],order:[2,0,1],instruction:'The old chart reads: distant stars guide the moon, and the moon calls the tide: star → moon → tide.',
  intro:'A dry staircase spirals through the water above Mara’s workshop. On its other side, an observatory studies constellations reflected beneath the lake.',
  rooms:[
   ['The Upside-Down Constellation','Waterlogged star chart','The chart was drawn from below the lake. Every constellation is reversed except one: a small lantern beside an open door. Wick thinks its astronomer had a very particular definition of home.','The blue rings are shallow reflections. The open stone aisle leads past the star chart.'],
   ['The Three Patient Lenses','Lunar tide chart','Three lenses trace a chain of influence. Distant stars guide the moon, and the moon calls the tide. Aligning them in that order will make the hidden observation deck visible.','Start at the star lens, then find the moon lens, then the tide lens.'],
   ['A Second to Breathe','Tidal lens case','The lens does not stop time. It simply makes hurried things a little easier to see. Its case is engraved: “A moment is sometimes enough room to choose.”','Claim the Tidal Lens to slow enemy projectiles while it is equipped.']
  ]},
 {id:'skywalk',title:'The Lantern Skywalk',chapter:12,theme:'skywalk',colors:['#493c60','#20283e','#ffda83'],mode:'timed',tokens:['West lantern','High lantern','East lantern'],order:[0,1,2],instruction:'Carry a single flame to all three lanterns within 24 seconds. Any order works. Menus pause the clock; a missed attempt costs no HP.',
  intro:'A maintenance lift rises above the lantern square. Bridges cross a dark space full of drifting lights, each carrying a message someone finally dared to send.',
  rooms:[
   ['The Unsent Messages','Courier’s message rack','One message says only, “I am sorry I waited.” Another says, “There is still a seat for you.” Wick folds a blank page and puts it in his pocket for later.','The lantern rails guide you across the skywalk. There are no jumps or instant-death edges.'],
   ['One Flame, Three Windows','Relay keeper’s board','The relay once brought neighbors together at dusk. Touching the first lantern starts a 24-second flame. Light the other two before it fades; if it goes out, begin again without losing health.','Choose a route between the three marked lanterns. Sprint helps, and opening the menu pauses the relay clock.'],
   ['The Ladder Left for You','Lamplighter’s gift','The medallion was left for whoever would finally finish the relay. “If this city owes you anything,” says its note, “let it be a fairer price.” Wick approves of the arithmetic.','This relic reduces shop prices. Select it before shopping; switching relics is free.']
  ]},
 {id:'aurora',title:'The Aurora Vault',chapter:15,theme:'aurora',colors:['#3c536a','#182f43','#bef7ff'],mode:'sequence',tokens:['Dawn rune','Night rune','Dusk rune'],order:[2,1,0],instruction:'The vault remembers the night from sunset to sunrise: dusk → night → dawn.',
  intro:'Warm air escapes through a crack in the winter district. Behind the ice lies a vault lit by an aurora that has been waiting to be seen.',
  rooms:[
   ['The Curtain of Quiet Colors','Explorer’s ice journal','The explorer called the aurora “a road that learned to dance.” Their last page asks the next visitor to take a useful thing and leave a kind thought in its place.','Follow the lit floor between the ice formations. The aurora is scenery, not a hazard.'],
   ['The Longest Gentle Night','Keeper’s night calendar','The calendar follows a night from dusk, through darkness, into dawn. Three runes keep the vault closed because someone once mistook darkness for the end of the journey.','Touch dusk, then night, then dawn. A wrong answer resets the runes without injury.'],
   ['The Room That Kept Tomorrow','Aurora band pedestal','The band holds a sliver of the vault’s patient light. It cannot prevent every hurt. It can give you a little more time to recover before the next one arrives.','Claim the Aurora Band for a longer protection window after taking damage.']
  ]}
];
function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
definitions.forEach((region,index)=>{
 region.index=index;region.relic=relics[index];region.reward=5+index*2;region.entryRoom=1;
 region.rooms=region.rooms.map((line,n)=>{
  const point={x:430+n*45,y:n%2?185:235},checkpoint={x:165,y:420},nodes=[{x:285,y:190},{x:505,y:430},{x:735,y:180}];
  const paths=[[{x:100,y:353},{x:220,y:353}],[{x:220,y:353},point],[point,{x:730,y:353}],[{x:730,y:353},{x:863,y:353}],[{x:110,y:353},checkpoint],...nodes.map(p=>[point,p])];
  const obstacles=[];
  // Deliberate islands, dividing walls and alcoves; walkways are carved to every target.
  for(let i=0;i<18;i++){
   const p={x:245+((i*139+index*53+n*83)%550),y:145+((i*97+index*43+n*29)%310)};
   if(paths.some(([a,b])=>segmentDistance(p,a,b)<65))continue;
   const w=36+(i%3)*10,h=32+((i+n)%3)*8;obstacles.push({x:p.x-w/2,y:p.y-h/2,w,h,height:.75+((i+index)%5)*.35});
  }
  obstacles.push({x:82+index*.1,y:116,w:42+n*8,h:14+index,height:1.4});
  const base=globalThis.EchoesStory.chapters[region.chapter];return {id:'exp:'+region.id+':'+n,name:line[0],landmark:line[1],text:line[2],hint:line[3],point,checkpoint,coin:{x:650,y:430},nodes,route:[{x:100,y:353},{x:220,y:353},point,{x:730,y:353},{x:863,y:353}],obstacles,puzzle:false,encounter:false,boss:false,palette:region.colors,crystalColor:base.crystalColor,crystalPalette:base.crystalPalette,crystalName:base.crystalName,theme:region.theme,chapter:region.chapter,number:n,expedition:true,regionId:region.id};
 });
});
globalThis.EchoesExpeditions={regions:definitions,relics,get:id=>definitions.find(r=>r.id===id),entrance:chapter=>definitions.find(r=>r.chapter===chapter)};
})();
