/* The Unlit Districts: ten authored chapters between the rescue and the final door. */
(()=>{
const chapters=[];
function add(title,theme,color,colors,boss,mini,ordinary,goal,intro,acts,order,clue,rooms){chapters.push({title,theme,crystalColor:color,crystalName:title.split(' ').slice(-1)[0],colors,boss,mini,ordinary,goal,intro,acts:acts.split('|'),order:order.split('|'),clue,rooms:rooms.map(s=>{const [name,landmark,text]=s.split('|');return{name,landmark,text,hint:'Look closely at the room and the people who remain. Your journal keeps what you discover.'};})});}
add('The Unlit Ward','ward','#dc785f',['#48332f','#231c27','#dc785f'],'The Vigil Matron','The Empty Cradle','Ward Attendant','Find the missing districts the engine erased.',
'Mara is free, but the stair to the surface folds back into darkness. Ten district lights are missing from the return ring. Below the glass, someone is still knocking. Mara takes your free hand. This time, she is coming with you.',
'Ask who never left the ward|Read the discharge names|Offer a door that opens from inside','Unbind|Breathe|Rise',
'A patient drew three pictures beneath the restraints: open hands, a chest lifting, two feet meeting the floor. The bed straps conceal the first drawing.',[
'The Stair That Refused|Blackened exit lamp|The lamp has no wire. Its socket opens into ten thin corridors, each marked REMOVED FROM RECORD. Wick remembers delivering letters here. He cannot remember why he stopped.',
'The Beds Still Warm|Unfinished discharge book|The patients were not too sick to leave. They had heard the engine screaming, and the Curator called remembering an illness. Mara finds a page in her own handwriting, copied as evidence.',
'The Night Rounds|Attendant’s soft shoes|The attendant still takes everyone’s pulse, even the empty beds. You hear it whisper good news to a sheet. It does not know how to deliver any other kind.',
'Hands Beneath the Linen|Torn restraint diagram|A strip of linen hides a patient’s drawings. Someone kept removing the straps; someone else kept recording that the patient had become less cooperative.',
'The Empty Cradle|Rocking iron cradle|The cradle has memorized the weight of a child who grew up and left. It clamps around every new shadow. Its lullaby has become a lock.',
'A Window for Tomorrow|Small paper sun|Brindle has opened a kettle beside the ward window. He says a place can hold terrible things and still deserve a good cup of tea. Mara drinks hers with both hands.',
'The Patient Who Left|Worn outdoor shoes|One patient escaped barefoot, returned with shoes for everyone, and was entered in the records as a recurring fever. A whole shelf is devoted to suppressing the weather.',
'Visiting Hours|Unsurrendered visitor badge|A daughter visited for forty years. Her last badge is smaller than the first: her hands shook, and the clerk trimmed its edges so it would not scratch her.',
'What Care Became|Matron’s broken mirror|The matron stopped looking at her patients when their faces began to resemble people she had lost. She polished the locks instead. The locks always looked healthy.',
'The Open Discharge|Unwritten departure date|The Vigil Matron has a key sewn through her palm. Every time someone leaves, she feels it turn. Mara asks whether love is allowed to hurt without becoming a cage.'
]);
add('The Salt Cathedral','salt','#e1c9a1',['#51463b','#292632','#e1c9a1'],'The Salt Confessor','The Bellmouth Acolyte','Salt Penitent','Carry the witnesses through the cathedral of swallowed truth.',
'The next district has preserved every confession as salt. The cathedral walls are white with things people were frightened to say. Water runs upward along the seams.',
'Confess your own fear|Ask what absolution costs|Refuse another scapegoat','Gather|Name|Release',
'Three bowls stand beneath a leak. Loose salt waits in the first; a name is scratched beneath the second; the third has a hole facing the running water.',[
'The White Steps|Salt-crusted sandals|The steps are soft with knees. Nobody was permitted to stand until the priest declared the city innocent. The declaration was renewed every morning.',
'A Choir Without Mouths|Sealed choir masks|Every mask fits a different face. The inside of each is scratched with a name. Wick reads one and realizes he has been humming its owner’s tune.',
'An Honest Sin|Unpolished offering cup|A penitent admits stealing bread and leaving half for a stranger. The engine recorded two crimes. Mara writes the stranger’s survival in the margin.',
'The Three Bowls|Leaking confession font|The old font moved grief from one person to the river. The new pipe returns every offering to the same locked vessel. Salt has split the vessel open.',
'The Bellmouth Acolyte|Tongueless bronze bell|The acolyte swallowed the bell’s tongue so it could never announce an execution again. It mistakes your footsteps for the return of the crowd.',
'The Unsalted Cup|Fresh rainwater|A bowl of ordinary water tastes almost sweet here. Mara says she used to think courage meant being certain. She has been afraid since the well.',
'Names on the Tongue|Dissolving prayer strip|You read a name and the salt around it loosens. The wall gives up an old footprint. Someone was here, and the building no longer has to pretend otherwise.',
'The Listener’s Chair|Two facing chairs|One chair is padded; the other is bare stone. A child moved the cushion halfway between them. Nobody filed a complaint because nobody knew which chair to blame.',
'The Cost of Clean Hands|Confessor’s basin|The confessor washed until his hands became translucent. Under the water, each finger still points toward somebody else.',
'The Mercy of Water|Cracked ceremonial mask|The Salt Confessor offers to forgive you if you name one person who deserves the dark. Behind him, the walls begin to sweat. You have brought no such name.'
]);
add('The Hollow Theatre','theatre','#bc638e',['#4b2d45','#241b30','#bc638e'],'The Mourning Director','The Understudy of Ash','Stagehand Puppet','Return the missing ending to the people on stage.',
'A theatre performs the same rescue every night. In every version, the hero takes the prisoner’s place. From a seat in the dark, Mara says she has seen enough.',
'Ask the actors for their names|Leave the sacrifice unwritten|Invite the audience onto the stage','Dim|Listen|Speak',
'The prompt book shows a darkened lamp, an actor holding still, then an uncovered mouth. All the speeches were added later in a different ink.',[
'The Ticket With No Seat|Unnumbered ticket|Your ticket reads WITNESS. The usher tries to tear off the second half, but there is no second half. Wick keeps it carefully anyway.',
'The Hero’s Spare Coat|Bloodless costume|The coat has been patched where a hero always kneels. The kneeling was once an actor’s choice. Now the floor contains a hook.',
'The Applause Machine|Cranked wooden hands|A stagehand winds the hands whenever somebody disappears through the trapdoor. It asks whether the audience likes the show. It has never heard an answer.',
'Before the First Word|Black prompt book|The earliest script begins with silence. Under a glued-in speech, an actor wrote: let them answer before deciding who they are.',
'The Understudy of Ash|Spare porcelain face|The understudy was told it would become real if it died convincingly enough. It has rehearsed that death for years. Its first unrehearsed word is no.',
'The Interval|Two warm stage lamps|Brindle has moved his market into the interval. He gives the actors somewhere to put their hands when they are not pretending. Nobody asks him to hurry.',
'The Audience of Coats|Empty coat-filled seats|Somebody set coats in the seats after the last audience fled. The director could bear an angry crowd. He could not bear an empty room.',
'An Unwritten Part|Blank page in Mara’s hand|Mara steps onto the stage and says her own name. The scenery shakes. She asks you to stand beside her, without giving you a line.',
'The Curtain’s Weight|Fraying curtain rope|Every missing actor is sewn into the red curtain as a little silver name. Cutting the rope will not erase them. Wick loosens one knot at a time.',
'The Last Rehearsal|Director’s unwound watch|The Mourning Director has kept opening night from ending so he will never have to read the reviews. You offer him something harder: a second night, with people free to leave.'
]);
add('The Bonewater Locks','bonewater','#54a6a0',['#30494b','#172d36','#54a6a0'],'The Ossuary Diver','The Ribcage Pilot','Lockside Scavenger','Bring the drowned messages back into living hands.',
'The cathedral’s water pours into a canal lined with white ribs of broken boats. Far below, sealed letters move like fish. Mara recognizes the town’s evacuation stamp.',
'Read a message aloud|Ask who ordered the sinking|Offer to carry the dead without becoming them','Drain|Steady|Lift',
'The salvage winch hangs above a flooded cradle. A dry drain leads away from it. The braces are bent where someone tried to lift before the water stopped pulling.',[
'The River Under the River|Chained rescue boat|The boats were meant for those who would not surrender a name. Someone cut their moorings upstream and called the loss a storm.',
'The Returned Letter|Waterproof birthday card|A father promised to be home before the candles burned down. The envelope carries thirty return stamps. The child’s reply says the cake was still good the next day.',
'The Customs of Loss|Stamped mourning permit|A scavenger demands permission to grieve. Its own permit has been renewed so often that the original name is gone beneath the ink.',
'The Low Water Mark|Bent salvage cradle|The machinery groans under water that should have drained years ago. Beneath a layer of official seals, the maintenance marks are still legible.',
'The Ribcage Pilot|Boat made of salvaged spars|The pilot built a boat from every wreck it found. It will not let anybody aboard because it remembers what happened to the last passengers.',
'A Dry Pair of Socks|Clothesline by a brazier|Mara laughs at the sight of socks in a place this terrible. Then she cries into a sleeve. You wait. Wick guards the laundry as though it is treasure.',
'The Undelivered Fleet|Tin message boats|Each little boat contains a sentence somebody could not finish. You do not finish them. You make room in the journal for the silence.',
'The Door Below Water|Scratched dive plate|The diver went back for a child who had already reached the bank. Nobody told it. It has spent an entire afterlife searching the wrong shore.',
'The Shore That Answered|Child’s grown handwriting|The child lived, grew old, planted an orchard, and wrote every spring. The letters were held because good news might encourage more divers to leave.',
'The Last Descent|Unlatched diving helmet|The Ossuary Diver asks to make one more search. You show it the letters. Inside the helmet, the sound is not water anymore.'
]);
add('The Blackroot Reliquary','blackroot','#9aa956',['#3b442d','#202b24','#9aa956'],'The Rootbound Widow','The Thorn Bride','Rootbound Forager','Unbury the lives the city reduced to keepsakes.',
'Roots have grown through a district of locked reliquaries. Every root carries the last warm moment of a person taken by the engine. They will not let the stones forget.',
'Ask about the person before the relic|Return the borrowed wedding ring|Leave the door unlatched','Loosen|Water|Unfold',
'A folded root strangles the watering pipe. A ring of damp soil surrounds a closed leaf. The gardener’s hands are carved open, never pulling.',[
'The Reliquary Gate|Door crowded with rings|The gate was built from marriage rings surrendered as fuel. No two bands fit together. The lock insists that all the owners volunteered.',
'A Life Before the Last Day|Scuffed dancing shoes|The plaque calls its owner a noble sacrifice. The shoes remember somebody who danced badly and laughed first. Mara writes that down instead.',
'The Collector of Roots|Pocket of severed shoots|A forager collects roots before they crack the memorial stones. It is afraid that names will be lost if the stories underneath them grow.',
'The Folded Orchard|Choked watering pipe|The irrigation pipe was tied shut to preserve the roots exactly as they were. Nothing has been allowed to live long enough to change.',
'The Thorn Bride|Veil caught in thorns|The bride is a promise repeated until it grew teeth. It believes moving on would make the love untrue. Wick sits where the thorns can see him.',
'The Living Shelf|Pot of ordinary basil|Brindle sells beside a shelf of plants nobody has named after the dead. Their leaves smell stubbornly of dinner. The market is alive with small, practical arguments.',
'A Ring Returned|Unclaimed wedding band|The ring is too small for the widow now. Grief has changed her hands. Mara lays it on the table without asking her to wear it.',
'The Unkept Anniversary|Weathered picnic map|For one year they meant to visit the river. The engine kept needing another shift. On the map, the river is still drawn in bright ink.',
'Roots Toward Weather|Hairline in the ceiling|A root has found real rain. It will split a memorial if it keeps growing. The person named on the stone once loved gardens more than statues.',
'The Door in the Bark|Widow’s open jewelry box|The Rootbound Widow offers to keep Mara safe forever in a perfect memory. Mara asks you to remember her as a person who gets to have another bad day.'
]);
add('The Sleepless Foundry','sleepless','#ef9b69',['#56362d','#29202b','#ef9b69'],'The Unfinished Giant','The Hammer Saint','Foundry Striker','Stop the machines that make replacement sacrifices.',
'The foundry did not receive the shutdown order. Its machines are still building empty bodies for the people the engine expects to consume tomorrow.',
'Ask the giant what it wanted to build|Show the unsigned work orders|Offer the right to leave something unfinished','Vent|Cool|Rest',
'The pressure gauge has cracked. Meltwater stains the cooling trough. Beyond it, a worker has drawn a tool lying flat beside two empty hands.',[
'The Unsent Order|Burnt signal cable|The shutdown message reached this cable and stopped. Its last intact word is ENOUGH. The machines never learned it was addressed to them.',
'The Spare Hands|Rack of unfinished palms|Each hand is fitted to one small task. None was built to hold another hand. Mara removes the dividers from the rack.',
'The Worker’s Shadow|Punch clock with no exit slot|A striker clocks in after every repair, including repairs to itself. Its card is longer than its body. The supervisor calls that devotion.',
'The Cooling Silence|Fractured pressure wheel|The shutoff lever is hot enough to blister the air. Someone tried to pull it before the pipes emptied. Their glove is still on the floor.',
'The Hammer Saint|Hammer worn into a hand|The saint teaches that pain proves useful work. Its hammer has worn down until it resembles a palm. For a moment, it seems embarrassed.',
'The Meal Bell|Unused lunch pail|The bell rang only when a quota was met. A worker painted the inside of its pail with pictures of food. Wick rings the bell without checking a number.',
'Nobody’s Replacement|Unlabeled body frame|A half-built frame reaches for Mara’s voice. She answers from outside it. The frame tries the sound of its own joints and listens with surprise.',
'The Smallest Machine|Clockwork wind-up bird|The giant built one thing that was not ordered: a bird that cannot fly but insists on singing. It kept the bird hidden in a furnace that never lit.',
'What Must Be Finished|Unsigned production order|The final order demands a machine that will never need kindness. Under it, the giant has quietly written impossible, again and again.',
'The Weight Put Down|Giant’s cooling hand|The Unfinished Giant blocks the road with a hand larger than a room. You can see the little bird between its fingers. It is afraid to put anything down.'
]);
add('The House of Lost Hours','hours','#a498db',['#3c3655','#201e34','#a498db'],'The Hourless Father','The Minute Collector','Clockhouse Shade','Let the city mourn the time it cannot give back.',
'Every clock in the house points to a moment somebody wants again. In the nursery, a man is still saying he will be home in a minute.',
'Ask what happened after that minute|Share an ordinary memory|Leave tomorrow unpromised','Wind|Wait|Release',
'The spring rests loose beside a closed escapement. A child’s drawing shows a patient hand beside the face, then an open window where the pendulum used to hang.',[
'The Late Front Door|Key left in a coat|The coat belonged to someone who worked below so the family could stay above. They kept his room warm. The engine counted the warmth as proof that nobody was missing.',
'One More Minute|Unfinished bedtime story|The last page has no monster. It has a father promising to finish tomorrow. Mara says she does not remember which story your mother read last.',
'The Borrowing Cupboard|Jars of ticking seconds|The collector stole seconds from people who looked happy. It hoped a handful of them would feel like happiness. They only sound louder in a jar.',
'The Open Escapement|Unwound nursery clock|The clock has been wound until its hands cut grooves in the wall. The original mechanism was made to let time leave, not keep it.',
'The Minute Collector|Pocket watch without hands|The collector offers you the moment before Mara vanished. It cannot explain what would happen to the Mara standing beside you now.',
'An Hour Uncounted|Warm market bench|Brindle closes his ledger for a minute that belongs to no account. Nobody has to deserve the bench. Outside, the clocks continue without an audience.',
'The Height on the Door|Pencil marks in a doorframe|The child grew taller while the father was gone. Later marks belong to grandchildren. The doorframe has become a family portrait without faces.',
'The Last Angry Letter|Unsent letter to a father|The letter says I needed you. Beneath it, in older handwriting: I know you needed us too. Neither sentence cancels the other.',
'The Room That Changed|Moved nursery bed|The nursery is a workshop now. The father thinks the change means he has been forgotten. Every tool on the wall carries his initials.',
'The Time Left to Live|Father’s unlatched watch|The Hourless Father offers thirty stolen years if you will trade the morning ahead. Mara asks whether a day is worthless because it cannot repair the last one.'
]);
add('The Cinder Parliament','parliament','#d890ad',['#4c3445','#281f31','#d890ad'],'The Unanimous King','The Tally Knight','Ballot Warden','Give the erased districts the right to refuse.',
'The new circuit reaches a chamber that has been voting without people. Every empty seat says yes. The engine learned its cruelty from someone who called that agreement.',
'Name the absent voters|Accept a voice that disagrees|Return the deciding crown','Hear|Question|Choose',
'The charter table has an ear cut into the first seal. A question scars the second. The third is a plain handprint, with room around it for other hands.',[
'The Chamber of Yes|Automatic voting lever|The lever falls to yes when nobody holds it. Its inventor called that efficient. Mara wedges her broken screwdriver beneath the arm.',
'The Removed Seats|Seats folded into a wall|Ten seats were removed so the council could reach a unanimous decision. Names remain under the hinges. Wick recognizes every delivery address.',
'The Security of Silence|Warden’s approved questions|The warden permits any question whose answer has already been stamped. It grows frightened when you ask whether it is tired.',
'The Listening Charter|Three worn council seals|The oldest charter left space between a question and a vote. Later rulers filled the space with emergency orders. You can still feel the original grooves.',
'The Tally Knight|Shield of shifting numbers|The knight mistakes the size of a crowd for the worth of a person. Its shield cannot count the one person holding it up.',
'The Dissenter’s Tea|Cold cup beside an open ledger|A dissenter left this cup on the table before the guards arrived. Brindle has brewed another. He does not know whether she will come back; the chair is still hers.',
'The First No|Scratched refusal under a seat|One person wrote no where the clerk could not erase it. The handwriting shakes. The next ten names are steadier.',
'The Right to Leave|Unsealed district ballot|Mara’s circuit gives every district a switch it controls. The engine calls that weakness. You have seen what happens when nobody can stop a machine.',
'The Crown of Absences|Crown lined with paper names|The king wore the missing people as authority. Without their silence, the crown does not fit. His hands are smaller than his statue’s.',
'A Vote With Consequences|King’s empty second chair|The Unanimous King says one dissenting voice could ruin everything. Wick asks how many voices were ruined to make everything work.'
]);
add('The Sea Beneath the Hearth','hearthsea','#62bbcc',['#2d4859','#182a3d','#62bbcc'],'The Drowned Sun','The Cold Lantern','Hearthside Drifter','Return the stolen warmth without demanding another sacrifice.',
'Beneath every warm home lies a sea of borrowed light. Its tide is turning. You hear the first people above complain that their lamps are dimmer.',
'Acknowledge the cold above|Name the cost beneath it|Offer a warmth shared by choice','Shelter|Share|Kindle',
'A broken hearth tile shows a roof before a joined pair of hands. Only the last image contains a flame. The engine’s version starts with a fire and ends with an empty roof.',[
'The Underside of Home|Warm ceiling above black water|You can hear dishes being washed above the ceiling. The ordinary sound almost hurts. Someone below has spent years listening to meals they could never join.',
'The First Complaint|Town service message|The message says the light is weaker and somebody should fix it. Mara starts to answer, then stops. They do not know yet. Knowing will have to change what they ask for.',
'The Keeper of Embers|Drifter’s stolen coal|The drifter stole one coal to warm a friend. It guards the coal with its whole body. In this city, even a small kindness learned to look like theft.',
'The Order of Warmth|Cracked hearth mural|The mural survived behind a pipe. The first families built roofs and shared blankets before they found enough dry wood. The engine painted over the blankets.',
'The Cold Lantern|Lantern with an inward flame|The lantern has burned inward for so long that it believes giving light means vanishing. It attacks the hands reaching to open its shutters.',
'The Last Market Below|Brindle’s travel kettle|Brindle packs the shelves into a cart. He plans to open a shop where daylight can find him. He keeps the kettle out until the last traveler has passed.',
'A Smaller Sun|Uneven shared circuit|A hundred small lamps answer the damaged engine. Some flicker. Some need fixing. None contains a person. Mara says she can work with that.',
'What Comfort Owed|Unpaid household ledger|The ledger lists every bright room above and every name burned beneath it. You cannot make the numbers equal. You can stop adding names.',
'The Light That Refused|Sunlamp without a socket|The old sun has no place for anyone to stand outside it. It cannot imagine being loved unless it keeps the whole town warm.',
'The Warmth We Choose|Drowned sun’s broken crown|The Drowned Sun rises through black water, terrified of going out. Mara offers it a place among the small lamps. It has never been asked to be less than necessary.'
]);
add('The Road of Unsaid Names','namesroad','#c6bd8b',['#48473d','#262b30','#c6bd8b'],'The Keeper of Almost','The Unsent Messenger','Roadside Remnant','Carry the unfinished stories to the final door.',
'The last dark district is a road made of things people nearly said. The door above is visible now. Every step closer makes the silence behind you sound more human.',
'Let an unfinished story remain unfinished|Say what you cannot repair|Ask the keeper to walk beside you','Remember|Answer|Carry',
'A traveler’s satchel holds a worn name, a letter addressed back to the sender, and a strap repaired for a second shoulder. None asks you to forget the first owner.',[
'The Almost Goodbye|Half-written note|The note says when I get back. There is no next line. Wick stops searching for it and makes room for the paper as it is.',
'The Name You Forgot|Empty space in your journal|You know there are names you missed. Mara does not tell you that it is all right. She helps you leave pages for the people who may tell you later.',
'The Roadside Remnant|Shadow of a raised hand|The remnant has waited so long to be recognized that it attacks every passing face. It is afraid to stop moving in case the road forgets it.',
'A Promise Without a Cage|Mended traveler satchel|The satchel was built to carry letters, not keep their writers. Its oldest repairs leave the flap loose enough to open with one hand.',
'The Unsent Messenger|Courier with a sealed mouth|The messenger carries one last instruction: do not deliver the truth. Wick reads it twice, then quietly tears off the address.',
'The Space Beside You|Three shadows at rest|For the first time, your shadow, Mara’s and Wick’s all fall in the same direction. Nobody says the journey was worth what it cost. Nobody has to walk the next part alone.',
'What You Did With Fear|Unpolished reflection|The reflection does not show a hero. It shows a tired traveler who kept making choices. Some were kinder than others. All of them reached somebody.',
'The Names Behind the Door|Answering knocks|The knocks are not asking you to stay. They are asking whether you will remember after the danger is over, when remembering no longer looks brave.',
'Room for Another Day|Unlit blank lantern|The lantern is empty. Mara leaves it empty. Some things should wait for a life that has not happened yet.',
'The Threshold of Almost|Keeper’s unfinished map|The Keeper of Almost offers you a perfect ending where nobody has to grieve. The map contains no roads beyond its border. You ask for a door instead.'
]);
chapters.forEach((c,i)=>c.crystalName=['Cinnabar','Ivory','Mulberry','Sea green','Olive','Flame orange','Periwinkle','Dusty rose','Deep cyan','Pale gold'][i]);
const plans=[[[190,353],[270,170],[480,170],[620,400],[770,400]],[[180,353],[230,435],[390,435],[510,190],[740,190]],[[180,353],[320,210],[580,210],[580,420],[760,420]],[[180,353],[250,170],[400,320],[550,445],[730,320]],[[180,353],[200,440],[350,270],[520,170],[710,440]],[[180,353],[290,440],[450,440],[610,170],[755,170]],[[180,353],[310,170],[310,420],[610,420],[610,210]],[[180,353],[260,200],[480,430],[690,200],[770,353]],[[180,353],[300,440],[510,170],[710,440],[760,353]],[[180,353],[270,240],[420,400],[570,240],[720,400]]];
function layout(ch,r){const k=ch-19,arena=r===4||r===9,flip=r%2,points=plans[k].map(([x,y],i)=>({x:x+((r*17+i*11)%23)-11,y:Math.max(160,Math.min(450,(flip?610-y:y)+(r%3-1)*10))})),point=arena?{x:480,y:205}:{...points[1+r%3]},checkpoint={x:185,y:410},coin={x:680,y:180},shop={x:690,y:430};const route=arena?[{x:100,y:353},{x:260,y:353},{x:480,y:270},{x:730,y:355},{x:863,y:353}]:[{x:100,y:353},...points,{x:730,y:355},{x:863,y:353}],branches=[[route[1],checkpoint],[point,coin],[point,shop],[point,{x:730,y:355}],[route[1],{x:160,y:180}],[{x:100,y:353},{x:90,y:353}]],segments=route.slice(1).map((p,i)=>[route[i],p]).concat(branches),safe=[point,checkpoint,coin,shop,{x:730,y:355}];const distance=(p,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t);},obstacles=[];for(let row=0;row<8;row++)for(let col=0;col<16;col++){const p={x:144+col*44,y:145+row*44};if(safe.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<66)||segments.some(([a,b])=>distance(p,a,b)<56)||(arena&&Math.hypot(p.x-510,p.y-320)<195))continue;if((col*3+row+r+k)%8===0)continue;obstacles.push({x:p.x-20,y:p.y-20,w:40,h:40,height:1.2,architecture:true});}return {point,checkpoint,coin,shop,route,obstacles,arena,architecture:chapters[k].theme,floorplan:chapters[k].theme+'-'+(r+1)};}
globalThis.EchosExpansion={chapters,layout};
})();
