# Echoes Below v2.5.1 — build 20261017.10

## Rarity repair
- One shared Basic / Strong / Godlike definition covers all 28 catalog items, world supplies, six abilities, six trail relics, twenty guardian relics and the Sword of Life keepsake. Labels and colors now agree in shops, equipped slots, the bag, ground pickups, skill selection and relic collection.
- Basic gear only in chapters 1–3; Strong gear unlocks in chapter 4. Strong odds grow from 10% to 34%. Godlike gear remains restricted to chapter 16+, growing from 2.5% to 7.5% of equipment rolls. Equipment drop and independent 25% health-drop rolls remain separate. The guide shows current chapter odds.
- Tonic is Basic (5 coins); Stonebrew and Clarity Draught are Strong (10 each); the automatic Angel Totem is Strong and remains exactly 55. Ability base prices: 4, 6, 12, 18, 24 and 60, with the final Last Light ability Godlike and available at chapter 18's shop. Other abilities use Basic or Strong.
- Early guardian/trail relics are Strong. Chapter 16+ relics and both final treasures are Godlike. Rarity does not change the guardian's 20% relic roll, earned trail relics, guaranteed finale rewards or story keys.
- Missing inventory rarity labels and a CSS rule overriding relic heading colors are fixed. Starter equipment and glowberry pouch are labeled Basic. No undefined rarity labels.
- Out-of-depth uncollected gear/shop stock is adjusted to its chapter's maximum tier. Already-owned bag and equipped items stay intact; repeated loading is stable.
- M > Rarity guide explains grades, price ranges, chapter requirements and reward sources. No new overlays in the play area.
- Validation: 800,000 deterministic gear rolls, all six shops, price/discount limits, migration/owned gear preservation, full campaign regression, desktop and landscape-phone UI/purchases/save reload, and cached offline upgrade.

## New worlds and chapter rewards
- Chapters 11–20 have 100 rebuilt floorplans: resonance chambers, railway switchyards, window streets, constellation galleries, council halls, winter shelters, memory vaults, suspension crossings, engine circuits and the rainbow homecoming. Distinct routes, collision walls, arena arrangements and floor motifs replace the shared late-room layout. The campaign remains 20 chapters of ten rooms, plus 18 optional maps.
- Miniboss coins: 3 + 2 × (chapter − 1); chapter 6 gives 13. Main boss coin rolls: 5 + 3 × (chapter − 1); chapter 1 gives 5. First victories only; peaceful victories also count. Main bosses roll 20% unique relic / 80% coins. The finale guarantees its two treasures instead of coins.

## Graces, equipment and final guardian
- Brighter floating green Graces; regular Graces are slightly larger and Angel Graces restore the broad wings and halo. Room 5 has a regular Grace; room 10 has an Angel Grace. Chapter 20 preserves larger rainbow versions, with the final Angel the largest.
- Totem of the Angels costs exactly 55 coins, uses a bag slot and automatically restores full health after lethal damage in a boss/miniboss fight. An expanding angel and original sound play, then the same fight resumes with enemy HP retained. Prepared Last Light triggers before a Totem. Ordinary fights cannot consume one.
- Miniboss gifts grant all six normal Grace bonuses with +2 extra each: +4 damage, +4 maximum HP, +3–4 Intelligence, +3 defense, +4 healing, +5% movement. Main boss gifts use +1 extra: +3 damage/HP/healing, +2–3 Intelligence, +2 defense, +4% movement. Once per guardian; older cleared guardians receive missing stat gifts once without re-rolling loot.
- Twenty distinct passive guardian relics are listed in M > Relics. Final boss guarantees Rainbow Relic of the Gods (capped attributes) and Sword of Life, a keepsake stored in this save and its export for a future game. Future-game integration is not part of this build. New Game clears journey rewards.
- Weapon bonuses reduced to 0 / 2 / 4 / 7 / 11 / 17 / 24, from fists through tier 6. Basic gear costs 3–6, Strong 10–18; Godlike costs 50–90 per piece, with no discount below that range. No item exceeds 100 coins; the Totem remains 55.
- Newly spawned Godlike gear is restricted to chapter 16 onward. Godlike rarity rolls grow from 2.5% to 7.5% in chapters 16–20; equipment drops themselves are rare. Already-owned equipment is preserved. Uncollected early Godlike loot/stock converts to Strong.
- The Last Echo speaks its own greeting, negotiations, phase change and farewell with a low, slow, gentle but unsettling synthesized voice and original ghostly undertones. Voice quality depends on available device voices. M > Sound has saved character voice volume/mute, separate from music/effects. Brindle retains spoken shop conversations.

## Controls and preservation
- E interacts, reads, collects, continues dialogue and confirms battle choices. Click/tap walks; RMB attacks; I inventory; M menu. Space rolls against small roaming enemies, with brief protection and cooldown. No rolls in boss/miniboss arenas. Mobile provides Interact/Collect/Continue, Attack and Dodge controls plus battle-heart touch movement.
- Each roaming enemy has an independent 25% chance to drop a persistent 10-HP healing mote. E collects it, capped at maximum HP; no bag slot. Full-health motes remain for later.
- Half-size fists retained. Original weapon animations, chapter music, 45 sound categories, fullscreen pixel interface, title entrance and verified admin-only tools remain.
- Local/cloud login configuration, save slots and old-save conversion preserved. A saved position inside a changed wall safely returns to that room's entrance. New Game resets all journey progress while retaining account and settings.

## Validation
- 200 distinct campaign layouts, all 20 puzzles, all 40 major guardians by combat and peaceful routes, 199 backward connections, 40 Graces and six shops.
- Navigation coverage for 218 campaign/optional maps and 1,780 placed-object/exit routes, including return paths.
- Reward odds, stat caps, idempotent save migration, rarity gates/prices, scaled coins, automatic Totem consumption and same-fight revival.
- Desktop and landscape-phone checks for controls, pickups, Graces, revival effects, relics, final voice parameters and finale persistence.
- Installed v2.2 cache upgrades to matching v2.5 assets and resumes its save while offline.
