# Echoes Below v2.7.0 — build 20261017.14

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
