# Echos Below v3.5.0 — build 20261018.30

Character art pass across thirty guardians and thirty minibosses: themed mantle silhouettes, feather/crystal/root projections, plating, cuffs, fasteners, belts, orbiting ornaments and chapter-specific elite masks/shields/books/staffs. Six traveler outfit motifs in portraits and world, drawn beneath equipped armor. Brindle apron/pockets and face highlights. Roaming enemies replaced with ten shaded archetypes using chapter skin palettes; hit/collision and attack logic unchanged. Original last guardian rainbow identity retained.

Rendered all sixty guardian/miniboss designs, thirty roaming palettes and six travelers; reviewed two fifteen-chapter contact sheets. Desktop/touch game checks, four-client latency/performance/chat/save test, and full desktop/phone final-fight/ending regression passed. No stats, progression, authentication or backend changes.

# Echos Below v3.4.3 — build 20261018.29

Bounded procedural death shards, ground ripples and smoke added to all named-weapon enemy death styles. Roaming kill effects expire at 1800ms. Player portrait collapses/fades over 1100ms with rainbow fragments and soft persistent lantern motes; portrait canvas size no longer reset each frame. Longer kill-audio tail. Chapter 30 mini/boss defeat-screen key now also rainbow. Final boss unique ascension, rewards and respawn timing unchanged.

Desktop and touch rendering checked across twelve weapon styles and six death ages; complete desktop/phone finale regression run.

# Echos Below v3.4.2 — build 20261018.28

Chapter 30 passage and boss-drop keys now use the final chapter rainbow palette across bow, shaft and teeth, plus soft glow/sparks and a Rainbow label. Earlier chapters retain gold keys. Pickup and door logic unchanged.

# Echos Below v3.4.1 — build 20261018.27

Reference-inspired elemental crescents, flame/ice particles, energy helix thrusts and paired high-tier arcs connected to the named-weapon renderer actually used in world and boss attacks. Does not create another weapon mesh, projectile or damage source. Bounded geometry, reduced-effect variants, same attack timing/range.

Crystal destination marker replaces rectangle: pulse rings, orbiting sparks and maximum fourteen path embers. Clipped to play area, follows actual path goal and disappears when route ends. New arrival/blocked-path/chest/phase/ACT/chat sounds with cooldowns; layered click chime and chapter-varied footsteps. Existing mute/volume and voice ducking preserved.

Passed desktop mouse and landscape touch movement/arrival checks, all twelve weapon effect renderings, new audio plan checks and four-client simulated-latency gameplay/chat/save/performance regression. No backend changes.

# Echos Below v3.4.0 — build 20261018.26

Animation/effects pass: bounded deterministic ambient pixels and footsteps; room arrival, boss hit, ACT and phase rings; layered weapon echoes, stronger collectible rings, pulsing Grace floors, enemy strike sparks and reduced-motion-aware menu entrance. World effects are clipped away from top/bottom HUD; battle effects stay in the enemy area. No gameplay RNG, damage timing or duplicate weapon rendering introduced. Existing unique weapon swings/finishers remain.

Voice director prefers role-specific natural/neural/enhanced English voices, keeps pitch neutral, uses measured delivery and sentence phrasing; preserves mute, volume, cancellation and no-repeat journey history. Actual naturalness depends on installed browser/device voices. No generated recordings are included, and recorded actor quality is not claimed.

Four-player simulated-latency regression passed with seven network snapshots per second and eleven updates in 2.3 seconds under 180ms artificial delay. Deterministic effects budget/expiry and natural-voice selection/fallback tests passed. Desktop/phone finale regression checks full spoken farewell across sentence chunks.

# Echos Below v3.3.1 — build 20261018.25

Removed progress filtering/equipment cloning from the per-frame peer draw path. Network progress is sent only when changed and acknowledged after successful responses. Roster DOM rebuilds only when displayed fields change. Active polling targets 150ms including response time rather than adding 300ms after every response; hidden/lobby polling targets 750ms. Requests remain serialized, combat events wake the queue immediately, replay acknowledgements and moderation remain unchanged. Peer easing uses elapsed time and snaps across room/screen transitions. No backend migration or solo balance changes.

# Echos Below v3.3.0 — build 20261017.24

Replaced the separate arcade multiplayer with the original solo engine plus friends. Host current-save invitations, original player/armor rendering, menus, inventory, Brindle markets, Grace, movement, combat and dodge box remain in use. Party presence shows names/levels/HP. Shared replay-safe boss FIGHT, ACT and peaceful-skill progress, puzzles/keys and roaming enemies. Guest solo saves are parked/protected, with separate per-room party checkpoint.

Chat DOM remains mounted while polling; natural typing/Enter works in lobby and in-game, failed sends retain drafts. Existing private codes, login, readiness, four-player cap and server moderation remain. New authenticated party RPC and two private RLS tables installed live; verified authenticated true, anonymous false, six protected tables total.

Passed local actual PostgreSQL migration/action/moderation tests and four-browser original-game tests, including phone, real shop/inventory, shared original FIGHT/ACT/dodge, typed chat, failed-send retry, and guest save restoration. Campaign/balance regressions preserve all 60 encounters and original final boss stats. Live four signed-in game accounts not tested.

# Echos Below v3.2.1 — build 20261017.22

Chapter-only credits section sped up: three ten-chapter cards now take 1.5 seconds each (4.5 seconds total, previously 10.5). Every chapter still appears. Creator, companion and final-message timings are unchanged; full credits are 21.1 seconds. Secret note-room delay remains ten seconds after credits end.

Multiplayer backend activated successfully in the existing live Supabase project after owner sign-in. Live SQL checks confirm the function is installed, authenticated execution is allowed, anonymous execution is denied and all four co-op tables have RLS enabled. Public API also rejects guest RPC calls and cannot list private rooms. Earlier four-client local PostgreSQL/browser tests passed; live four-player gameplay with separate signed-in game accounts has not been performed. No auth accounts, admin flags or solo saves changed.

# Echos Below v3.2.0 — build 20261017.21

Private co-op mode: login required, unlisted ten-character room codes, up to four travelers. Ready lobby, private chat, shared rooms/guardian HP/ACT/phases, individual HP and server-limited movement/attacks. Existing chapter artwork and boss skins; click/tap paths, interpolated movement, touch action buttons, names/levels/HP and landscape layout. Co-op starts a separate chapter-1 journey; solo saves remain untouched. Party-size HP scaling (+55% per extra starting traveler), character specialties, permanent guardian rewards, 1.4-second attack warnings, dodge, short-range revives, wipe/retry, reconnect and automatic leader transfer. Server-only database tables have no client access; one authenticated RPC validates identity/membership/actions. Normal users cannot read room lists or other rooms.

Server moderation: private, rate-limited 180-character chat. Common English profanity/sexual terms, common leetspeak/repetition and spaced spellings trigger a 60-second account ban and removal; offending text is not delivered. Ban persists across refresh and room changes, and expiry uses server time. Suitable word boundaries preserve class/hello. Word list is explicit and expandable; it cannot guarantee every language/evasion.

ACTIVATION REQUIRED: the production backend does not yet have echos_mp. Website deployment cannot execute database-owner SQL, and no owner connection was available. Run multiplayer-setup.sql once in the existing Supabase project's SQL Editor. See MULTIPLAYER-SETUP.txt. Live co-op is not claimed as verified until that owner step. Missing setup produces a clear activation message; guest entry remains disabled.

Credits redesigned as colorful chapter cards, constellations, flowing light ribbons, named companion cards and a rainbow crystal. First chapter cards at 5.6 seconds instead of the long lead-in; full credits 27.1 seconds. Existing epilogue and ten-second secret-door delay preserved. Chapter changes immediately show a nonblocking 1.8-second title reveal; long chapter intros are retained in the journal.

New winged crystal app icon in SVG and opaque PNGs: iPhone Home Screen 180px, installable 192/512px icons with maskable safe space; simplified 16/32px bookmark/tab icons and ICO. Added apple-touch metadata and updated manifest/cache. Existing installed iPhone shortcuts may need removing/re-adding to refresh their cached icon.

Validation: migration and ACL tests on actual local PostgreSQL; four independent browser sessions against that database plus guest and fifth-player rejection; synchronized combat and health, safe chat rendering, persistent ban and expiry, host transfer/reconnect, untouched solo state, all 206 room transitions and one-time rewards. Existing all-60-guardian, rarity/migration/character, admin coin/market/Devil grant/player-view/token-refresh/reload/logout checks pass. Desktop/phone full final phases, death, epilogue, credits, delayed door and note reload pass. Actual chapter reveal timing, credits pages, icon dimensions and responsive layouts checked. Production co-op awaits the documented one-time SQL activation. Cloud configuration unchanged.

# Echos Below v3.1.2 — build 20261017.20

Enemy balance pass: reduced boss/miniboss/ordinary/roaming HP and damage, reduced encounter armor and ACT requirements. All families still increase health/damage with chapter; guardian phases still increase aggression. Last Echo HP 2789 -> 857; Devil blade defeats it in one hit. Roaming enemies use the same central progression table. Tested all 60 guardians with earned victory gifts and Basic/Strong gear, without optional grace upgrades or relics: 2–4 attacks in the representative chapter samples, all within eight; no peak-phase one-shot against that progressed character. Chapter 30 remains lethal to a fresh 24-HP traveler. Corrected the stale how-to-play boss-room label to room 7. Includes the verified-admin Devil persistence fix from v3.1.1.

# Echos Below v3.1.1 — build 20261017.19

Fixed Devil gear disappearing when switching to player view or refreshing the same verified account session. Equipment access now follows verified authorization independently of dashboard visibility. Same-account refresh preserves authorization while its role is checked and retains player view. Logout, changed accounts, denied roles and failed role checks revoke access; stale checks cannot restore it. Tested grant, player view beyond two seconds, delayed refresh, save/reload, and logout in a real browser with a local authentication fixture. Guest grants remain denied.

# Echos Below v3.1.0 — build 20261017.18

- Markets are in room 3 of chapters 3, 6, 9, 12, 15, 18, 21, 24 and 27. No final-chapter market. Admin Next market/Choose market follow the same nine locations, with collision-safe arrival beside the stall. Existing offers and owned gear are retained.
- Reproduced the old chapter-27 market error: the growing ability loop accessed undefined ability/rarity entries after the six actual abilities. Cap the list to both catalogs. Every market now opens, including chapters 21/24/27.
- Opening/refreshing a market no longer saves unchanged stock. Equipment purchases now perform one transaction save after charging coins instead of repeated snapshots. Purchase buttons lock immediately. While a dialog is open, the high-density world backdrop is retained rather than redrawn every frame; the merchant portrait updates at 20 FPS. Removed market backdrop blur. Phone market layout is compact and the Close market button remains at the top while scrolling.
- Brindle and Last Echo remember spoken lines for the current journey across reloads. Brindle has several distinct greetings and purchase replies; exhausted replies become a quiet nod. Final-boss repeated dialogue remains readable without repeating its voice. No rarity name in purchase thanks.
- Twelve distinct animation identities: fists, ten ordinary named weapons and the Devil blade. Each uses its own swing path and kill/death transformation, including frost fracture, lightning collapse, starfall, roots and eclipse. World hits retain the equipped item ID, so variants sharing a damage tier keep distinct motion. Last Echo retains its unique rainbow ascension.
- During a swing, the body's idle hands are hidden; the single animated fist/weapon remains. Battle portraits also hide idle arms/lantern while attacking. Equipped weapon at the waist stays hidden during world attacks.
- ACT understanding now has a persistent numeric meter and bar once any is gained, plus the exact recent gain. Feedback waits through story dialogue so it can be seen when battle resumes.
- Verified admin button: Equip Devil gear. Grants/equips Devil Eclipse Blade, Crown, Carapace and Greaves, with red crystal armor/horns and the highest grade above Godlike. Gear is excluded from ordinary markets, chest/enemy rolls and player rarity guide. Guest actions/imports cannot equip it. Legitimate admin loadouts restore after verified login/reload; public equipment is kept in the admin loadout stash. Server-role/email authorization remains unchanged. Initial admin authorization no longer forcibly scrolls the title offscreen.
- Ten seconds after the final credits screen, a 2.2-second cinematic opens the circled crystal as a rainbow doorway, zooms through it and fades to black. The note room then fades in over one second. It cannot be entered early. Mouse clicks advance the four epilogue pages instead of skipping straight to the credits.

Validation: all nine markets and all 206 room placements checked; 36 open/buy/close cycles per desktop DPR2 and phone DPR3 with no runtime errors/crashes, max observed opening 8–23ms on the test host, and at most one backdrop redraw while open. All six real abilities remain available at late markets. No repeated speech in stress runs. Twelve distinct swing signatures/finite finishers; exact one-fist renderer check; Devil never rolls and guest imports/actions strip it. Actual ACT meter rendered on desktop/phone. Existing admin coin checks, nine market teleports and Devil grant/save/verified reload pass. Full three-phase finale, rainbow death/farewell, epilogue, delayed doorway and note save/reload pass on desktop/phone. Installed v3.0.0 upgrades to matching v3.1.0 assets and resumes its save offline. No cloud configuration changes.

# Echos Below v3.0.0 — build 20261017.16

## Thirty chapters, a shorter road through each district
- Chapters 1–29 have seven rooms each. Room 5 holds the miniboss and regular Grace; room 7 holds the main boss, Angel Grace and Brindle's marketplace. Final chapter 30 has exactly three rooms: entrance, miniboss/Grace, Last Echo/Angel Grace. 206 campaign rooms, 18 optional trail maps, plus one hidden post-credits room.
- The original chapter 20 finale is now chapter 30. Its rainbow Graces, Last Echo identity and voice, final rewards and homecoming ideas remain. Only chapter 30 uses a multicolor crystal palette; every earlier district has one color.
- Ten new districts after Mara's rescue: The Unlit Ward, The Salt Cathedral, The Hollow Theatre, The Bonewater Locks, The Blackroot Reliquary, The Sleepless Foundry, The House of Lost Hours, The Cinder Parliament, The Sea Beneath the Hearth, The Road of Unsaid Names. Each has original story memories, puzzle clues, routed rooms, architecture, boss/miniboss identity, relic and music. Memories from removed chambers are combined into retained rooms instead of discarded.
- Darker story follows the people erased by the engine, the difference between care and control, loss, accountability and choosing to keep living. Mara and Wick accompany the new journey; the existing rescue still matters.

## Living combat
- Thirty main bosses and thirty minibosses; all have named identities and growing health, attack, armor and understanding requirements. Ten new full guardian silhouettes, ten new elite looks and ten new roaming enemy identities.
- Bosses/minibosses have two health phases; Last Echo has three (two-thirds and one-third HP). Later phases visibly redden the eyes, increase projectile damage (120%, then 145% for finale phase 3), speed (1.4 per phase), and attack cadence. Edge warnings remain at least 700ms/800ms before damaging shots. Phase changes have distinct final-boss lines.
- Guardians visibly wind up, swing/cast and recover in step with attack waves. Ordinary encounters animate too. Roaming enemies commit to a direction, wind up for 400ms, strike, and recover; moving/dodging out of range avoids the hit. Player weapons, visible armor and existing VFX remain.
- Last Echo's lethal defeat rises into the air and bursts into all 29 district colors, followed by settling shards, a passage key and the unique line: “Go on, little light. Live what I could only remember.” It does not reuse the standard falling corpse animation. Peaceful victories keep their own farewell.

## Travelers and treasure
- Wanderer: +4 HP, +1 defense. Mossrunner: +12% movement. Embercoat: +3 damage. Duskcloak: +3 Intelligence. Seaglass: +3 defense, +2 HP. Dawnkeeper: +6 berry/potion healing, +4 HP. Descriptions appear in character creation, How to Play and inventory. Bonuses persist without stacking on reload; New Game resets the entire journey before applying the chosen traveler.
- Base gear weights: Basic 75%, Rare 16%, Strong 7%, Legends 1.7%, Godlike 0.3%. Higher grades grow slowly with depth; Godlike equipment stays chapter 16+ and 50–90 coins. Exact current rates remain in the Rarity guide.
- Chest base: Rare 80%, Strong 17%, Legends 3%, Godlike 0%; Godlike starts at 1% in chapter 16. No Basic chests. One chest per ninth campaign room (22 fresh-run chests); old pending chests remain reachable with their locked items after migration.
- Ordinary gear drops reduced to 3.5% plus 0.07 percentage points per chapter, with a small trail relic bonus. Independent 25% healing-mote rule and scarce coins/berries preserved. Guardian relics now 12%; otherwise chapter-scaled coins. Guaranteed finale relic/Sword and earned trail rewards unchanged.
- Totem of the Angels is Godlike, remains 55 coins and appears in chapter 16+ markets. Existing owned Totems remain usable. Spoken purchase thank-you mentions the item without reading its rarity; written item cards retain it.

## Homecoming
- Four player-paced epilogue pages respond to peaceful/violent choices and discovered memories. Animated credits carry the 30 districts, companions, journey totals and a new closing message. A quieter final dawn waits after the scroll.
- Stay ten seconds on the final credits screen to enter The Room Left for You. Its folded note is written by the traveler about getting lost, harmful people, difficult choices and finding a way home. It is saved, has no enemies/market, and does not add an ordinary fourth campaign room.

## Name, voices, admin and compatibility
- Visible game name is Echos Below in title, menus, install manifest, credits, launcher and download. Legacy storage keys and hosting path remain compatible.
- Brindle uses warm, healthy older delivery with near-normal pitch/rate; the Last Echo uses restrained darker pacing. Natural/neural/premium English voices are preferred when supplied by the device. Removed extreme pitch shifting and the synthetic onset effect. These are device speech voices, not recorded actors, so fidelity varies by browser/device.
- Verified KingKippy admin panel: Next market and Choose market teleport to any of the 29 marketplaces, save position and clear active movement/battle UI without granting loot or clearing guardians. No final-chapter market. Room selector shows three rooms for chapter 30. Existing account/server-role authorization and Add Coins remain unchanged.
- Saves migrate from 20 chapters/10 rooms: old finale records/rewards move to chapter 30, old room 10 becomes room 7, chapter 20/finished players can begin the new arc at chapter 20. Existing coins, items, seeds, discovered records and earned finale rewards remain. Prior earned max-stat rewards stay maxed, so completed old journeys can be very strong in the new districts. Fresh New Game gives the intended full progression. Current save schema is campaignChapters 30 / campaignRooms 7, format 4; migration is idempotent.

## Validation
- All 30 chapters, 206 rooms and 60 guardian encounters boot; one mini/boss per chapter, only final rainbow; all identities/music/relics present. Monotonic chapter stats, phase damage/speed/cadence, normalized rarity/gate/price checks and six distinct reset/load character bonuses.
- 224 campaign/trail maps, 1828 object/exit/return routes use safe collision paths. Hidden room is an open walkable room, bringing total maps to 225.
- Early/new/final bosses and minis can be spared, with correct permanent gifts. All 60 guardian animations and 6600ms finale use finite coordinates. Natural voice selection and restrained pitch/rate checked.
- Real desktop/landscape-phone title and menus; character specialties, market purchase and Godlike Totem, spoken thank-you without rarity, three actual final fight phases, unique death/farewell, epilogue, credits, ten-second hidden-room threshold, note interaction and reload.
- Actual admin authorization fixture tests next/select markets, final three-room selector, existing coin guards/save/cap; guests denied. No production account mutations.
- Installed v2.7.1 cache upgrades to v3.0.0, preserves old completion, maps boss to room 7 and resumes all 206 rooms offline. Old pending/opened chest migration verified.
- Windows launcher rebuilt with Echos branding/icon; upload allowlist, version guard, empty upload folder and automatic publishing off pass its built-in self-test. Live publishing still requires the owner's GitHub credentials.

# Echos Below v2.7.1 — build 20261017.15

- Main game canvas follows displayed size, device pixel density and browser zoom instead of stretching a fixed 960x600 bitmap. Logical coordinates, click/tap movement and touch controls remain unchanged. Backing resolution is bounded to 3840x2400. Pixel artwork keeps nearest-neighbor sampling; text renders at the new resolution.
- Clear monospace lettering for menu text, descriptions, labels and controls. Large title/headings retain the pixel typeface. Larger minimum text, brighter muted text, 24px paginated dialogue and readable HUD/battle labels. Long prompts fit their panels.
- Landscape phone menu uses a horizontal traveler summary so larger labels have room. Dialogs scroll instead of shrinking text or covering controls with the footer.
- Existing accounts, cloud configuration, save slots, equipment, stock and progress preserved.

Validation: desktop/landscape-phone menu navigation, title entrance and admin access regression; 1x desktop, 2x Retina and 3x phone canvas density/resizing; story and final boss screenshots; no browser runtime errors. Installed v2.7.0 cache upgraded to matching v2.7.1 assets, kept an existing save and resumed offline.

# Echos Below v2.7.0 — build 20261017.14

## Title, menus and admin coins
- New original pixel crystal gateway title: stepped stone vault, floating colored shards, animated motes, lantern stairs and large pixel lettering. The physical ENTER button still grows, plays its sound and fades into the game; action keybinds do not start it.
- M menu has Journey, Character and Settings categories, a visible armored traveler, chapter progress, health and coins. Resume/New game/Save & load remain readily available. Landscape-phone spacing keeps tiles above the bottom-left version/build footer. Arrow navigation skips hidden buttons.
- Verified KingKippy admin panel: Coins to add number field and Add Coins button. Accepts whole amounts 1–999999, caps wallet at 999999, updates and saves the current slot immediately. No authorization changes; guests cannot use the action.

## Five rarities and chapter growth
- Basic, Rare, Strong, Legends and Godlike use consistent names/colors in gear, shops, inventory, abilities, world finds and relics. 40 equipment pieces remain in the overall pool, including new Rare and Legends weapons/armor. Original owned IDs remain valid. New weapon powers sit between old grades; displayed names/damage use the actual equipped item.
- Base equipment-shop weights: Basic 60%, Rare 20%, Strong 12.5%, Legends 5.5%, Godlike 2%.
- From chapter 3 onward, each three chapters multiply Rare by 1.04, Strong by 1.10, Legends by 1.12. Basic fills the remaining probability. Chapter 3 Strong is 12.5%; chapter 6 is 13.75% (10% relative growth).
- Godlike equipment unlocks at chapter 16 with 2% shop weight, then grows by 8% per three chapters. Before unlock its weight belongs to Basic. Godlike equipment costs 50–90 coins per piece and ignores discounts below that floor. All items remain at or below 100; the Angel Totem stays exactly 55.
- Gear base prices: Basic 3–6; Rare 8–11; Strong 14–22; Legends 34–45; Godlike 50–90. Fixed supplies and learned abilities are separate from the two equipment rarity rolls. Guardian/trail relic rewards retain their existing rules.

## Shop variety and memory chests
- Every New Game creates a fresh journey seed, saved/exported/cloud-compatible. Each shop has two persistent equipment offers: one weapon and one armor piece. Reloads and return visits do not reroll offers; purchases do not refill the shelf. All 40 pieces can appear in the eligible pool.
- The same device avoids the preceding journey's exact offer pair at each shop. A finite item pool cannot guarantee globally unique offers across every player; different players can occasionally share an offer.
- A one-time memory chest appears every ninth campaign room: 22 across 200 rooms. Chests are spaced from story objects, bosses, Graces and shops and are reached by the normal click/tap navigation. E or mobile Collect opens them.
- No Basic chest gear. At the start, Rare 55%, Strong 32%, Legends 13%, Godlike 0%. Better-grade chest chances grow with chapter; Godlike starts at 4% in chapter 16 and grows slowly. Current exact rates are in M > Character > Rarity guide. Owned items are excluded where possible.
- A full bag locks and saves the original rolled item without consuming the chest. Opening, backtracking, dying or reloading cannot duplicate or reroll it. New Game resets all chests and stock. Original gear and old save data remain supported.

## Preserved adventure
- 20 chapters / 200 main rooms + 18 optional maps; 100 rebuilt late-chapter floorplans, backward travel, small enemies, 20 minibosses and 20 main bosses.
- Elemental weapon surfaces and crescents, crystal/rune impacts, compact fists and one physical held weapon during swings. Six original armor sets plus Rare/Legends palette variants appear on the character and battle/death portraits. M > Settings > Display saves Full/Reduced effects.
- Boss HP, damage and ACT targets scale with chapter. All peaceful routes remain viable; Intelligence speeds negotiation. The Last Echo has its own low, gentle/unsettling device voice, ten negotiation lines and speaking animation; voice/music/effects controls remain separate.
- Graces, angel revival Totems, permanent victory gifts, unique guardian relics and guaranteed finale treasures remain. Login/cloud configuration and verified admin access are preserved.

## Validation
- 320000 source-specific gear rolls: probabilities, 40 reachable pieces, no Basic chest drops, Godlike chapter/price gate, 100 journeys of persistent nonrepeating stock.
- All 22 chests reachable with collision-safe routes and E; full-bag locking, one-time collection, reload and New Game reset. Variant weapon damage uses item power.
- Desktop/landscape-phone title and category navigation, shop purchase/equip, actual New Game stock changes, mobile chest opening, five-grade guide, saves and runtime errors.
- Admin SDK fixture exercises the unchanged authorization path: additions/save, invalid inputs, cap; guest action denied. No production account mutations.
- All 40 guardians scale and remain negotiable; armor/VFX regression. Installed v2.6 upgrades to the matching runtime and resumes its save offline.
