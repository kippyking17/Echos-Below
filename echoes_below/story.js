/* Authored campaign content. Layouts share rules, not a repeating set of rooms. */
(()=>{
const chapters=[];
function chapter(title,theme,goal,intro,boss,acts,order,rooms){chapters.push({title,theme,goal,intro,boss,acts:acts.split('|'),order:order.split('|'),rooms:rooms.map(line=>{const [name,landmark,text,hint]=line.split('|');return {name,landmark,text,hint};})});}
chapter('The Forgotten Gate','gate','Follow Mara’s trail into the sealed city.',
 'Your sister Mara vanished while repairing the town’s last sunlamp. Her lantern has returned without her. Something inside it is knocking.',
 'The Gatekeeper','Show Mara’s ribbon|Ask who closed the gate|Promise to bring the missing home','Knock|Listen|Answer',[
 'The Fallen Bell|Mara’s lantern|A small flame unfolds into a face. “Wick,” it says. “Courier, mostly. Your sister went below. She told me to find someone who would follow.”|The blue crystal beside the entrance heals you. Walk close and press your interact key.',
 'Ribbon on the Rail|Blue ribbon|Mara tied her work ribbon to a broken handrail. Beneath it she scratched: THE LIGHT IS BORROWED. You remember her saying that every machine leaves a bill.|The ribbon rests beside the inner bend. Read it before following the lit exit.',
 'The Toll of Footsteps|Toll ledger|The guard’s ledger records footsteps instead of names. One pair entered yesterday; the return column is blank. Wick insists that blank is not the same as dead.|An encounter waits near the far doorway. ACT twice can make an ordinary foe ready for MERCY.',
 'Three Quiet Knocks|Speaking door|The door bears an old courtesy: knock, listen, then answer. Wick taps the wood. Something on the other side taps back a moment too late.|The three seals repeat the courtesy written on the door. Their order matters.',
 'Shelter Under Stone|Folded blanket|A blanket covers a chair sized for a child. Mara left a note: “If you came after me, rest here first. Brave is easier when you are not exhausted.”|Use the checkpoint before entering the next room. It restores all HP.',
 'The Keeper’s Threshold|Broken key|The Gatekeeper closed this passage to keep the city’s stolen voices from escaping. He recognizes Mara’s ribbon. “She asked whether a locked door can also be a wound.”|The Gatekeeper needs three ACTs before MERCY. His falling stones leave gaps; move into them.'
]);
chapter('Mosslight Corridors','roots','Trace the living roots carrying Mara’s signal.',
 'Beyond the gate, roots glow with the rhythm of a heartbeat. Wick’s flame leans toward them. “That rhythm was not here yesterday.”',
 'Bramble Nurse','Notice the injured root|Offer your clean bandage|Promise water for every seed','Root|Stem|Leaf',[
 'The Breathing Stair|Root pulse|The stair rises each time the roots breathe. A chalk arrow in Mara’s handwriting points down, against the flow. She was following the signal to its source.|The root pulse is your landmark. The exit lies beyond its branching path.',
 'Bandage Grove|Hanging bandage|A bandage hangs from a thorn, stained green. Someone treated the plants as patients. Wick admits Mara spent an hour here fixing a root nobody thought important.|The pale object near the roots is readable. Memories remain in your journal.',
 'The Gardener’s Bite|Chewed watering can|A frightened seedling has swallowed the watering can’s handle. Its keeper mistakes your lantern for fire. The first thing it protects is the smallest sprout.|This guardian responds to patient ACTs. ITEM restores health if the attack catches you.',
 'The Upward Sap|Growth wheel|The wheel follows a plant’s life upward: root drinks, stem carries, leaf opens. Correcting the flow will carry the faint signal into the next district.|Begin underground and finish where a plant meets the light.',
 'Rain in a Bottle|Sealed rain jar|Mara caught a single drop of rain leaking from above. She left it for the nursery instead of keeping proof that the surface was close.|This shelter has a checkpoint. Your next opponent protects the nursery rather than a treasure.',
 'The Nursery Knot|Empty seed cradle|Bramble Nurse holds a cradle full of dormant seeds. She believes every stranger comes to harvest them. A loose bandage on her wrist matches the one Mara tore.|Use ACT to understand her fear, then MERCY. You do not need to hurt her to continue.'
]);
chapter('The Glass Orchard','glass','Recover the first clear recording of Mara’s voice.',
 'Fruit made of glass hangs over a field of broken reflections. Each piece repeats a different word. One of them says your name.',
 'The Orchard Queen','Hum the harvest song|Ask about the silent fruit|Let her hear Mara’s recording','Seed|Blossom|Fruit',[
 'The Chiming Trellis|Cracked fruit|Inside a cracked pear, Mara says, “Test one. If this works, nobody has to disappear.” Wick stops joking long enough to hear it twice.|The glass fruit is a memory, not an enemy. Approach its pedestal to listen.',
 'Reflections Out of Step|Silver pruning shears|Your reflection reaches for the shears before you do. A label explains that the orchard preserves moments, not people. Wick looks relieved and disappointed.|Follow the gaps between the glass trunks. The reflection cannot block your path.',
 'The Borrowed Harvest|Harvest basket|A basket contains memories of meals never eaten here. Its attendant calls them stolen; the labels call them donations. Neither label names the donors.|Reach the attendant at the far end. Two ACTs reveal why it guards the basket.',
 'The Season Engine|Season dial|Three pictures circle the dial: a seed under soil, a blossom opening, ripe fruit falling. The orchard has been forced to harvest before anything can grow.|Set the seasons in the order a real tree would live them.',
 'The Unpicked Apple|Warm glass apple|Mara left one fruit untouched. Its voice belongs to your mother, calling both of you in from the rain. You turn it over gently, afraid to break the sound.|Save here. The next room belongs to the person who keeps these memories alive.',
 'Crown of Splinters|Queen’s empty crown|The Orchard Queen remembers every harvest except her own childhood. She fears returning the voices will leave her with nothing. Wick asks if keeping a gift can become a theft.|Her side-to-side attacks reward small movements. Three ACTs can give her a reason to let go.'
]);
chapter('The Silent River','river','Cross the river that carries names into the engine.',
 'The river flows without making a sound. Paper boats drift toward a distant machine, each bearing a name that vanishes when it gets wet.',
 'The Ferryman','Read a passenger’s name|Ask who pays the return fare|Offer to carry the manifest','Bank|Boat|Shore',[
 'Shore Without Waves|Dry oar|Mara’s footprints end at the bank, but the oar beside them is dry. Wick points out a second path: names can travel where bodies cannot.|The winding dry path is safe. The blue floor markings are shallow water, not a damage zone.',
 'Paper Passenger|Unsent boat|An unsent boat is addressed to Iven, a man whose family still sets a place at dinner. His name has been counted as fuel for seventeen years.|Read the boat to add Iven’s name to the journal. Follow the mooring posts toward the exit.',
 'The Drowned Tollhouse|Toll bell|A river guard rings a bell nobody can hear. It is waiting for permission to leave its post, but the official who signed its orders became water long ago.|ACT can interrupt the guard’s routine. Stay within the outlined box during its attack.',
 'Crossing by Memory|Ferry route board|The route board describes an ordinary crossing: leave the bank, board the boat, reach the far shore. Someone replaced the final stop with a furnace.|Restore the journey’s original destination, from departure to arrival.',
 'The Last Mooring|Mara’s wet glove|One of Mara’s gloves is caught on a post. Inside is a second message: “The voices are awake. Please do not let anyone call them fuel.”|The checkpoint is a safe place to recover before the ferryman’s crossing.',
 'A Fare Unpaid|Return manifest|The Ferryman keeps return tickets for passengers whose names he has forgotten. He will not abandon them a second time, even to let you pass.|Read his motive in the journal. Three ACTs offer a way to keep his promise.'
]);
chapter('A Library of Ash','library','Find out who authorized the taking of voices.',
 'Ash falls upward through shelves with no books. A librarian has arranged the empty spaces alphabetically.',
 'The Ash Archivist','Name the missing passengers|Show the altered contract|Ask her to preserve the truth','Read|Question|Record',[
 'The Index of Absence|Missing index card|The index lists people by the space they left behind: a spare cup, a coat hook, an unfinished letter. Mara has added a name to each description.|Inspect the index card. Chapter goals and collected memories are in the journal.',
 'Margins Still Warm|Burned contract|The contract promised “a little remembered light.” A later hand crossed out LITTLE. The signature belongs to the Curator of the Sun Engine.|The contract lies in the reading nook. Watch the aisle openings rather than walking into shelves.',
 'The Shushing Hall|Librarian’s seal|A paper sentinel attacks any noise above a whisper. Its own pages are screaming. Wick lowers his voice and asks who gets to decide what counts as quiet.|Patient ACTs can calm the sentinel; the falling pages leave space near the edges.',
 'The Witness Desk|Testimony press|A notice tells witnesses to read the evidence, question its meaning, then record what is true. The Curator’s replacement asks them to sign without reading.|Use the original witness procedure. A signature belongs at the end, not the beginning.',
 'The Unburned Page|Mara’s sketch|Mara drew the engine with a second circuit: a path that returns light instead of consuming voices. One part is missing, labeled A WILLING CHORUS.|Heal at the crystal. The sketch changes your goal from finding Mara to helping her finish the circuit.',
 'The Cinder Catalogue|Archivist’s spectacles|The Ash Archivist burned the books because she was ordered to erase the crime. She kept the index because she could not erase the people. Her hands still smell of smoke.|Three ACTs let her testify. FIGHT also opens the route, but her testimony will be lost.'
]);
chapter('The Hollow Market','market','Buy back the map without selling a memory.',
 'Stalls offer bottled laughter, borrowed courage, and yesterday’s weather. Every price is something the buyer cannot afford to forget.',
 'The Debt Collector','Ask for an itemized bill|Point out the missing consent|Offer a trade with no memories','Offer|Agree|Exchange',[
 'The Price of Rain|Weather stall|A merchant offers a storm in exchange for your happiest birthday. Wick offers three terrible jokes instead. For the first time, the merchant laughs without opening a bottle.|The stalls are solid; use their central lane to reach the weather sign.',
 'The Map with a Hole|Incomplete map|Mara bought a map with ordinary coins. The seller cut out the engine district after she left. A faint imprint on the backing paper still shows the tunnels.|Read the map. Coins remain optional treasure; this story never requires grinding for them.',
 'A Shopkeeper’s Shadow|Unpaid receipt|The shopkeeper’s shadow works a second shift to pay a debt that grows whenever it rests. Its owner has forgotten that a shadow is part of a person.|This encounter is guarding a receipt, not a locked purchase. ACT twice is enough to seek peace.',
 'The Fair Exchange|Trading scales|The scales once required an offer, an agreement, and only then an exchange. The debt office removed the middle step. Its debts were never freely accepted.|Put consent back into the trade before anything changes hands.',
 'A Cup on Credit|Shared teacup|A tea seller remembers Mara refusing a free cup until the apprentice had one too. She gives you the missing map piece, already paid for by that kindness.|Rest here and save. The map points into the furnace tunnels after this chapter.',
 'The Empty Countinghouse|Debt book|The Debt Collector is bound by every contract it enforces, including its own. It cannot leave until someone proves the first signature was forged.|Three ACTs challenge the contract. The collector’s attacks come from alternating sides.'
]);
chapter('Ember Tunnels','ember','Restore safe power to Mara’s return circuit.',
 'Red light trembles behind the rock. The engine is burning faster to replace every voice that has fallen silent.',
 'The Furnace Warden','Show the cracked pressure gauge|Ask about the night shift|Propose shutting down one burner','Vent|Cool|Restart',[
 'The Cooled Footprint|Slag footprint|A bootprint has hardened in spilled slag. Mara stood here until a pipe cooled enough for the workers to touch it. She was moving slowly because she kept stopping to help.|Follow the cooled stone path. The orange edge pools are scenery; the pipes block movement.',
 'Shift That Never Ends|Shift whistle|The whistle calls the same shift back to work every hour. No one has been relieved since the sunlamp first lit your town.|The whistle marks the workers’ story. Read it to learn why the furnace guard is exhausted.',
 'The Coal Listener|Listening tube|A coal tender hears names in the fuel and has begun refusing to shovel. The supervisor calls this a mechanical fault. Wick calls it listening.|Use ACT to acknowledge the voices. Small movements help avoid the tender’s falling embers.',
 'The Pressure Chapel|Cooling controls|The maintenance plate is clear: vent the trapped pressure, cool the chamber, then restart. Mara circled the first step hard enough to tear the metal.|Never restart a sealed hot chamber. The plate gives the full safe sequence.',
 'The Workers’ Bench|Lunch tin|A lunch tin holds six spoons and one note: “Share until the next shift arrives.” Mara added a seventh spoon, although she had nothing left to eat.|Use the checkpoint before meeting the Warden. ITEM can heal during combat as well.',
 'The Furnace Mouth|Warden’s gauge|The Furnace Warden believes a shutdown will freeze the city. Nobody told it the engine is already failing. It has spent years protecting a number on a broken gauge.|Three ACTs offer a controlled shutdown instead of a catastrophe.'
]);
chapter('Clockwork Chapel','clock','Recover the time the city was forced to repeat.',
 'Every clock is stopped at the minute the first voice disappeared. The bells keep trying to finish that minute.',
 'The Clock Saint','Notice the unfinished minute|Ask whom she is waiting for|Let the bell finish ringing','Wind|Set|Release',[
 'The Minute Stair|Stopped pocketwatch|Mara’s watch is stopped, but yours is not. Wick notices the chapel is keeping a promise to one person, at the cost of everyone else’s tomorrow.|The gold clock hands mark the route. You can turn sideways in 3D with the arrow keys.',
 'The Late Arrival|Unopened invitation|An invitation promises that the Saint’s daughter will return before the final bell. The paper has been folded and unfolded until the date is gone.|Inspect the invitation tucked between the mechanisms. It explains the Saint’s vigil.',
 'The Second Hand|Clockmaker’s stool|A little clockmaker measures time in breaths because the clocks cannot be trusted. Its guardian tries to stop you breathing too quickly.|Use ACT to slow the encounter down. Wait for gaps rather than chasing the moving projectiles.',
 'The Unwound Choir|Bell mechanism|The repair diagram says wind the spring, set the hour, and release the bell. Holding the final lever forever is what trapped the chapel in this minute.|The last action must let something go. The mechanism needs all three steps.',
 'Tomorrow’s Alcove|Fresh calendar|Mara drew a new square beneath the last printed day. Inside it she wrote: “She can be remembered tomorrow too.”|Save at the crystal. The next room is the source of the stalled clocks.',
 'The Last Chime|Saint’s bell rope|The Clock Saint has kept her daughter’s final minute alive for decades. The child’s echo asks for a new morning, but the Saint can only hear goodbye.|Three ACTs help her hear the request. Mercy lets the final bell ring.'
]);
chapter('The Starless Garden','garden','Grow a signal that does not need stolen sunlight.',
 'The garden has forgotten the shape of the sun. Its flowers open whenever someone tells the truth.',
 'The Night Gardener','Admit that you are afraid|Show the living seed|Ask what darkness can protect','Soil|Water|Light',[
 'The Folded Petals|Closed sunflower|The flower opens when you admit you do not know whether Mara is alive. Wick says it is the first honest light he has seen all day.|Inspect the flower. Some discoveries offer comfort rather than another obstacle.',
 'The Blind Sundial|Moonlit dial|Mara has carved a moon beside the sun on the dial. Under it: “Rest is not a failure of light.” The gardener crossed out the word FAILURE twice.|The sundial stands off the main path. Follow the low flowerbeds around to it.',
 'The Thorn Apology|Snapped trellis|A thorn creature broke the trellis while trying to help a seed climb. It attacks because it expects punishment before anyone asks what happened.|Two ACTs let the creature explain. A peaceful victory still clears the exit.',
 'The Patient Bed|Seed basin|The seed basin asks for soil, then water, then light. The old engine tried to start with light alone and wondered why nothing took root.|Give the seed somewhere to live before asking it to grow.',
 'A Lamp of Leaves|Living lamp|The planted seed glows without speaking anyone’s name. Mara’s note beside it says, “A beginning. Small is allowed to be a beginning.”|The crystal restores HP. Your journal keeps the evidence for the new power source.',
 'The Gardener’s Eclipse|Black gardening veil|The Night Gardener hides the garden because the Curator harvests anything that shines. It sees your lantern as a signal for the next raid.|Three ACTs show that you came to protect this light, not take it.'
]);
chapter('Beneath the Lake','lake','Reach Mara’s submerged workshop.',
 'A lake hangs above you like a second sky. Fish swim through the reflections of rooms you have not entered yet.',
 'The Lake Custodian','Show the workshop key|Ask whose reflection is missing|Promise an open route home','Seal|Pump|Open',[
 'The Upside-Down Shore|Floating buoy|A buoy hangs from the ceiling. Mara tied her workshop key beneath it where only someone looking for her habits would find it.|The buoy’s pedestal is the landmark; you never need to aim upward to interact.',
 'A Window into Yesterday|Clouded window|Through the window you see your kitchen on the morning Mara left. She pauses at your empty chair, then puts a second lunch in her bag.|Read the window’s echo. It is a recording, not a passage you can walk through.',
 'The Pressure Keeper|Dent in a diving bell|The diving bell is dented from the inside. A maintenance spirit was sealed in during a safety drill and has been announcing that the drill is over ever since.|The spirit needs two ACTs to understand that you heard it.',
 'The Dry Airlock|Airlock controls|The scratched instructions say seal the outer door, pump out the water, then open the inner door. Mara added: “One dry breath at a time.”|Keep the water outside until the chamber has been pumped clear.',
 'Mara’s Worktable|Half-built return coil|The workshop is empty but warm. Mara’s coil needs twenty districts willing to share power. Under the diagram is a list of names you have begun to recognize.|Rest before leaving. The workshop proves Mara was building a return path for everyone.',
 'The Custodian’s Mirror|Reflection ledger|The Lake Custodian guards reflections left by people who never came back. It has kept Mara’s reflection safe, mistaking it for Mara herself.|Three ACTs separate the person from the recording. Her reflection points deeper.'
]);
chapter('The Choir of Stone','choir','Teach the return coil to carry willing voices.',
 'Stone mouths line the walls. Each can sing one note, but the engine has forced them all to sing the same one.',
 'The Basalt Conductor','Listen to the quietest singer|Offer a different note|Ask the choir to choose','Listen|Breathe|Sing',[
 'The Missing Harmony|Silent music stand|One stand has no score. Mara wrote, “Leave a place for a voice you have not heard yet.” Wick stands in that place and hums badly but bravely.|The music stand begins this chapter’s story. Follow the resonating pillars.',
 'The Singer with No Name|Chipped nameplate|A nameplate was sanded blank so its owner could be replaced without changing the roster. You trace the old letters until the stone remembers them.|Read the plate to restore a singer’s name in your journal.',
 'The Cracked Solo|Broken tuning fork|A soloist cracked its own voice to stop repeating the engine’s command. Its body still vibrates with an order it no longer believes.|ACT twice can answer the soloist. Keep moving gently through the falling notes.',
 'A Breath Between Notes|Choir controls|The conductor’s first lesson survives: listen to each other, take a breath, then sing. The engine’s score removed every rest.|Music begins before the first note. Follow the surviving lesson.',
 'The Unforced Refrain|Mara’s score|Mara’s score has blank bars where singers can refuse. The coil works only when a voice can also choose silence.|This is the pre-boss checkpoint. The choice to stop is part of the new engine design.',
 'The Conductor’s Rest|Lowered baton|The Basalt Conductor fears that different notes will break the city apart. It has never heard harmony, only perfect agreement.|Three ACTs invite a harmony. Mercy lets the singers choose their own volume.'
]);
chapter('Dreaming Station','station','Find the train Mara took to the engine’s center.',
 'The departure board lists destinations people dreamed of, then crossed out. A train waits for a ticket nobody remembers buying.',
 'The Sleeper Inspector','Name your destination|Ask about her unfinished journey|Offer a seat instead of a ticket','Choose|Board|Depart',[
 'Platform of Almost|Smudged timetable|The timetable lists ALMOST HOME every six minutes. Mara changed one entry to HOME and drew an arrow toward a real track.|The timetable is the room’s landmark. The rails are painted guides, not moving hazards.',
 'Lost Luggage Moon|Small yellow suitcase|A suitcase contains clothes for a child who grew up while waiting. Wick recognizes the owner’s name from the river manifest.|Inspect the suitcase. Your journal connects people across chapters.',
 'The Ticket Nobody Bought|Blank ticket punch|A ticket guard is searching for its own ticket. Without it, the station says it was never born. It turns its empty pockets out before raising its fists.|Two ACTs can give the guard a destination even without a ticket.',
 'The Departing Thought|Signal box|The signal box waits for a decision: choose a destination, board the train, then depart. Endless planning has kept the points between tracks.|You cannot depart before boarding. Start by choosing where to go.',
 'The Sleeping Car|Mara’s seat|Mara slept with her hand over the return coil. Someone tucked a coat around her. For once, the trail contains evidence that another person helped her.|Use the checkpoint. The Inspector guards the only train that actually leaves.',
 'The Final Inspection|Inspector’s unused ticket|The Sleeper Inspector has checked everyone else’s ticket for years. Her own says ANYWHERE, and she is terrified to choose.|Three ACTs offer her a place in the journey instead of another duty.'
]);
chapter('A Thousand Lanterns','lanterns','Turn isolated lights into a shared route.',
 'A thousand lanterns float over a city square. Each believes it is the last light left. Wick has never looked so small.',
 'The Lamplighter','Notice the unlit lantern|Share your flame|Let someone else hold the ladder','Light|Share|Guide',[
 'One Small Flame|Wick’s old hook|Wick finds the hook where he once hung. He was made to deliver warnings, not answer them. “I suppose I am late,” he says, looking at the empty square.|The empty hook is worth reading. Not every landmark is large or bright.',
 'The Unlit Street|Covered lantern|A family covered its lantern to hide from the collectors. It still has enough oil to guide the neighbors, if it believes someone will protect them.|Read the covered lantern beside the alley. Follow the open spaces between posts.',
 'The Moth Procession|Torn procession flag|The moths carry a flag with no leader’s name. Their guard thinks your flame will lure them back to the collection towers.|ACT twice shows the moths that this procession can choose its own route.',
 'The Chain of Windows|Lantern relay|The relay begins with one light, shares it with the next window, then guides the people below. It fails when every lantern tries to light itself first.|Begin with a single flame, pass it on, then use it to lead.',
 'The Courier’s Name|Old delivery badge|Wick’s badge names him WICK-0041. Mara crossed out the number. He asks you to call him Wick again, just to hear how it sounds.|Save here. Wick’s fear matters to the Lamplighter in the next room.',
 'The Ladder’s End|Abandoned ladder|The Lamplighter refuses to come down because every lantern once went dark when she rested. She cannot see the lights you have helped share behind her.|Three ACTs give her permission to rest. Your own flame is no longer the only one.'
]);
chapter('The Lost Observatory','stars','Locate the return circuit’s missing connection.',
 'The observatory points inward instead of at the sky. Its telescope has been tracking the engine’s hunger like a moving star.',
 'The Blind Astronomer','Describe the living lamp|Show the reversed chart|Ask her to look with you','Align|Focus|Observe',[
 'The Inward Telescope|Reversed eyepiece|Through the eyepiece you see the town’s sunlamp above, fed by threads running through every district. The machine was never an isolated miracle.|Inspect the eyepiece on its low stand. The stars on the floor mark open walking space.',
 'Constellation of Houses|Pinned roof map|Mara connected the roofs of your town into a circuit. Light could return through the same wires that took it, if the central lock were opened.|The map connects your home to the city below. Find its red pin.',
 'The False North|Bent compass|The compass points toward whichever thing its holder fears most. A star sentinel has followed it in circles for a century.|ACT twice can help the sentinel put down the compass.',
 'The Patient Lens|Telescope controls|The lens instructions say align the mount, focus the glass, then observe. The Curator ordered conclusions first and measurements afterward.|Let the telescope see before asking it to confirm a belief.',
 'The Star Kept Back|Unmailed chart|An astronomer hid a chart proving the machine would fail. Mara found it and wrote: “Being wrong in time is better than being right too late.”|The checkpoint prepares you for the astronomer who hid the chart.',
 'The Unseen Sky|Astronomer’s blindfold|The Blind Astronomer covered her eyes after the Curator punished her prediction. She still knows the safe route, but no longer trusts anyone to want it.|Three ACTs show her that you are asking for evidence, not reassurance.'
]);
chapter('The Rusted Palace','palace','Obtain the central lock’s original authority.',
 'The palace is full of servants made from discarded armor. They polish a throne nobody has used since the Curator arrived.',
 'The Rust Regent','Ask who elected him|Read the old charter|Offer the key back to the city','Petition|Hear|Decide',[
 'The Empty Audience|Citizen’s stool|A small stool faces the throne. The original rulers sat here to hear complaints at eye level. Someone later bolted it outside the door.|Inspect the stool before following the ceremonial aisle.',
 'The Coat of Many Hands|Patched banner|The royal banner was sewn by twenty districts, each adding a piece. Mara has marked the seams. The city was built to hold differences together.|The banner is your memory landmark. Your route passes around the display stands.',
 'The Saluting Armor|Dented helmet|A suit of armor salutes until its joints grind. It has no person inside to give it a new order. Wick tries saying “at ease” like a question.|Two ACTs can release the old order. The armor’s threat ends when it is heard.',
 'The Public Hearing|Council seal|The charter requires a petition, a hearing, then a decision. The Curator stamped decisions onto blank petitions and called that efficiency.|A hearing must happen before a decision. Restore the charter’s sequence.',
 'The Spare Throne|Uncut key|The key blank is shaped for twenty hands to turn together. Mara left it uncut because the lock’s owner was meant to be the whole city.|Heal and save. The Regent’s authority is the last thing blocking the key.',
 'The Regent’s Burden|Rusted crown|The Rust Regent was a caretaker who stayed after everyone else left. He confuses giving up control with abandoning the city. The crown has rusted to his brow.|Three ACTs distinguish shared responsibility from abandonment.'
]);
chapter('Winter in the Deep','winter','Keep the return circuit alive through the cold.',
 'The furnaces are cooling. Frost covers the path you need to open. Helping the city has made its old system weaker before the new one is ready.',
 'The Winter Sentinel','Acknowledge the cold|Show the shared supplies|Promise that no district is expendable','Shelter|Warm|Wake',[
 'The First Frost|Frozen warning lamp|The warning lamp blinks with a fault Mara predicted. Wick’s flame gutters. You can hear how much faith a plan requires before it starts working.|The ice-colored floor is safe to walk on. The tall frozen structures are obstacles.',
 'A Blanket for Two|Stitched blanket|Two names are stitched into one blanket, from opposite ends. Mara started a third line with yours. The thread leads toward the shelters.|Read the blanket. The story’s setbacks do not erase the people you have helped.',
 'The Hoarded Hearth|Locked coal box|A frost guard has locked away the last coal to make it last forever. The room around it is freezing now. Its fear has mistaken saving for never using.|ACT twice can change how the guard understands saving something.',
 'The Thawing Room|Shelter controls|The rescue instructions say shelter the sleeper, warm them, then wake them. The frozen mechanism will open only for patient care.|Give warmth a safe place to work before asking someone to rise.',
 'The Seventh Bowl|Soup pot|Six bowls are set around a pot. Mara brought a seventh for someone she had not met. Wick warms the soup with a little of his own flame.|Use the checkpoint before the Sentinel. A full health bar makes the final approach easier.',
 'The Sentinel’s Vigil|Frozen watchtower bell|The Winter Sentinel has been told that one warm district requires another to freeze. It cannot imagine a system without an abandoned edge.|Three ACTs show the supplies and the shared circuit. Mercy asks it to protect everyone.'
]);
chapter('The Broken Archive','archive','Recover Mara’s final plan from the erased records.',
 'Names float between torn shelves. Some belong to people you met. One belongs to the Curator before he changed it.',
 'The Name-Eater','Speak his original name|Ask what he tried to forget|Offer memory without punishment','Find|Name|Remember',[
 'The Erased Doorway|Half-visible name|The doorway used to bear the Curator’s name: Orin. He was an apprentice who tried to save a dying town and never learned how to stop an emergency.|Read the fading plate. Understanding him does not excuse what he did.',
 'The Unfinished Letter|Mara’s last letter|Mara writes, “I reached the heart. If I become part of it, do not trade yourself for me. Find another answer. Please be stubborn.”|This letter explains why the final choice must be more than an exchange.',
 'The Ink That Fights Back|Spilled ink bowl|A memory guard formed from crossed-out apologies. It lashes out whenever a sentence reaches “I was wrong.” Wick waits for the sentence to finish.|Two ACTs can let the apology exist. Watch the spaces between the ink drops.',
 'The Reconstruction Table|Name press|The restoration guide says find the fragments, name the person, then remember their life. A label without a life is another kind of erasure.|First recover what is missing, then name it, then give the name meaning.',
 'What the Page Kept|Unburned corner|One corner of Mara’s letter survived: a drawing of twenty people holding a ring. Nobody stands in its center. The missing answer was never another sacrifice.|Rest at the checkpoint. The next guardian protects the Curator’s erased past.',
 'The Hunger for Silence|Empty name frame|The Name-Eater is Orin’s discarded shame, given a body and a command to forget. It has eaten so many names that it cannot remember its own.|Three ACTs can return its name. Mercy preserves the truth you will need at the heart.'
]);
chapter('The Last Crossing','bridge','Bring the districts’ promises to the heart.',
 'The last bridge spans the engine’s empty fuel well. Voices from the districts travel beside you, uncertain but no longer alone.',
 'The Bridge Marshal','Name the people behind you|Show the open return circuit|Ask him to cross as well','Anchor|Test|Cross',[
 'The First Loose Plank|Bridge anchor|Mara replaced a broken anchor with the handle of her toolbox. The bridge moves, but it holds. Wick calls it the most Mara-shaped thing he has ever seen.|The railings show the route. The dark floor below is visual depth, not a jump puzzle.',
 'A Line of Witnesses|Knotted witness cord|Twenty colors are tied into one cord. Every knot is a promise to share power freely. Where a guardian fell, a quiet neighbor has taken up the knot.|Read the cord to see how the journey’s choices have reached this place.',
 'The Rearguard’s Fear|Cracked signal shield|The rearguard thinks letting anyone cross will leave the city undefended. It has never been asked whether it would like to come too.|Two ACTs offer the guard a place in the group rather than another lonely post.',
 'The Span Under Strain|Bridge winch|The builder’s instructions say anchor the line, test the weight, then cross. The engine shakes hard enough to make haste sound reasonable.|Secure the support and test it before trusting your weight to the span.',
 'The Far-Side Fire|Small shared campfire|For a moment you can hear all the districts at once: spoons, bells, leaves, a badly tuned hum. Wick says this is what a city sounds like when it is not fuel.|This checkpoint is the last shelter before the approach to the heart.',
 'The Marshal’s Post|Marshal’s second badge|The Bridge Marshal carries a badge for a replacement who never arrived. He thinks leaving the post would make every year of waiting meaningless.|Three ACTs let him carry his duty forward instead of standing still forever.'
]);
chapter('The Heart of Echoes','heart','Free Mara without choosing another person to burn.',
 'Mara stands inside a ring of light, keeping the failing engine steady with her voice. She sees you and mouths a word through the glass: NO.',
 'The Curator','Show him the witnesses|Refuse the exchange of lives|Offer the shared return circuit','Disconnect|Join|Return',[
 'The Glass Between You|Mara’s handprint|You press your hand against Mara’s through the glass. Her voice is holding the engine together. You finally understand the word she mouthed: do not take my place.|Read the handprint. The route forward is the new circuit, not a sacrifice.',
 'The Emergency That Stayed|Curator’s first report|Orin’s first report asked for one night of borrowed light. The second called the deaths regrettable. The hundredth stopped counting them.|The report reveals how an emergency became the permanent rule.',
 'The Engine’s Reflex|Cracked regulator|The regulator attacks anything that changes its rhythm. It has no idea the rhythm is killing the people it was built to protect.|ACT twice can teach the regulator a new rhythm. Its attacks still leave safe gaps.',
 'The Return Ring|Central controls|Mara’s final diagram is complete: disconnect the consuming loop, join the willing circuits, then return the light. No person belongs in the socket.|Follow the diagram. The middle step connects people who can choose to stop.',
 'A Voice Held Open|Speaking tube|Through the tube, Mara says, “I knew you would come. I was afraid you would think coming meant taking my place.” Wick answers, “We brought company.”|Save before meeting the Curator. The people you remembered will shape what follows.',
 'The Curator’s Dawn|Original sun key|The Curator offers a bargain: your voice for Mara’s, and one more year of light. He calls it the only possible choice because he has refused every other one.|Three ACTs present another answer. FIGHT can break his control, but the shared circuit still matters.'
]);
chapter('The Door Above','dawn','Choose what your town will do with the truth.',
 'The engine is quiet enough to hear your own footsteps. Mara walks beside you. Above the last stair, your town is waiting for its light to return.',
 'The Last Echo','Tell it who came home|Name those who did not|Promise that remembering can change tomorrow','Open|Welcome|Remember',[
 'The Unborrowed Morning|First clear window|The light through the window is weak and uneven. It belongs to nobody’s stolen voice. Mara holds her hand in it and laughs until she has to sit down.|The final chapter still has checkpoints. Take your time with the return journey.',
 'The Seat at the Table|Two lunch tins|Mara opens the second lunch she packed for you. It is very stale. Wick declares it a historic meal and immediately regrets asking for a bite.|Read the tins for a quiet moment. Your journal records what happened below.',
 'The Keeper of Comfort|Closed town notice|A town sentinel wants to hide the truth so nobody feels guilty about the years of light. It mistakes comfort for kindness.|Two ACTs can show that a town can hear the truth and still choose to help.',
 'The Welcome Bell|Town bell controls|The town’s oldest rule says open the doors, welcome the traveler, remember their name. The city below deserves the same welcome you expect for yourself.|The last sequence turns a rule for guests into a promise to neighbors.',
 'Before the Handle Turns|Mara’s repaired ribbon|Mara ties her ribbon around the handle. “We cannot undo it,” she says. “We can stop pretending it is still the only way.” Wick asks whether couriers get holidays.|Save here. The final encounter is with the echo of the journey itself.',
 'The Door You Carry|Unlatched door|The Last Echo asks what you will tell the people above. It has your voice, Mara’s worry, and the silence of everyone who could not walk home.|Three ACTs remember both the rescued and the missing. The ending reflects your choices.'
]);
const palettes=[
 ['#30344e','#182234','#68deee'],['#243e32','#142b25','#8cdd81'],['#393454','#25243d','#e6a0ef'],['#244554','#122f40','#70d9e7'],
 ['#473b42','#29212b','#e7b77c'],['#49344e','#302338','#eab86e'],['#4d302c','#301e24','#ff9367'],['#484538','#272936','#edcf73'],
 ['#2d3a45','#17262f','#b0b9ff'],['#254557','#142b40','#8bdffc'],['#414552','#242838','#c4d2f4'],['#3c4051','#222636','#8acbc8'],
 ['#493c51','#2c243c','#ffd180'],['#303852','#151f39','#b7b0ff'],['#4d3b35','#2c252c','#dba66c'],['#3b5261','#24394d','#bceaff'],
 ['#443e56','#292238','#d9afff'],['#3b4652','#202e3d','#8fe0d1'],['#4f344c','#2d2139','#ff9cc7'],['#63574f','#3b393f','#ffe3a8']
];
function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
function layout(ch,room){
 const id=ch*6+room,landmark={x:350+((ch*73+room*97)%300),y:room%2?420:210};
 const checkpoint={x:155+(ch%3)*15,y:room%2?260:410},coin={x:600+(ch%3)*35,y:room%2?210:430};
 const route=[{x:100,y:353},{x:240,y:353},landmark,{x:730,y:355},{x:863,y:353}];
 const shop={x:690,y:430};const segments=route.slice(1).map((p,i)=>[route[i],p]);segments.push([{x:100,y:353},checkpoint],[landmark,coin]);if((ch+1)%3===0&&room===4)segments.push([landmark,shop]);
 let seed=(id+1)*104729;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const obstacles=[];
 for(let col=0;col<11;col++)for(let row=0;row<6;row++){
  const center={x:205+col*57,y:145+row*61};const roll=random();
  if(roll<.44||segments.some(([a,b])=>segmentDistance(center,a,b)<63))continue;
  const w=35+Math.floor(random()*18),h=30+Math.floor(random()*20);
  obstacles.push({x:center.x-w/2,y:center.y-h/2,w,h,height:.8+random()*1.6});
 }
 // Unique, walkable architectural feature along the north wall of every room.
 obstacles.push({x:80+(id%9)*.1,y:116,w:35+(id%17),h:13+Math.floor(id/17),height:1.1});
 return {point:landmark,checkpoint,coin,shop,route,obstacles};
}
const crystalColors=['#438bff','#ff9b42','#c583ff','#37c8c0','#f3d34f','#ff8db8','#ef5350','#b2e85e','#b1a0ed','#70c9ff','#d0d9ee','#7be2bb','#efb55c','#7872ee','#cd9468','#b0f5ff','#df89dc','#45d697','#ff698b','#ffffff'];
const crystalNames=['Blue','Orange','Violet','Teal','Gold','Pink','Ruby','Lime','Lavender','Sky blue','Silver','Mint','Amber','Indigo','Copper','Ice blue','Orchid','Emerald','Rose','Every color'];
chapters.forEach((ch,c)=>{ch.colors=palettes[c];ch.crystalColor=crystalColors[c];ch.crystalName=crystalNames[c];ch.crystalPalette=c===19?crystalColors.slice(0,19):[crystalColors[c]];ch.rooms.forEach((room,r)=>{Object.assign(room,layout(c,r));room.id=c+':'+r;room.puzzle=r===3;room.encounter=r===2||r===5;room.boss=r===5;room.palette=palettes[c];room.crystalColor=crystalColors[c];room.crystalPalette=ch.crystalPalette;room.crystalName=crystalNames[c];room.theme=ch.theme;room.chapter=c;room.number=r;});});
globalThis.EchoesStory={chapters,room:(c,r)=>chapters[c].rooms[r]};
})();
