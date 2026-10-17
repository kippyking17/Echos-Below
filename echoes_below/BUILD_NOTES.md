# Echoes Below 1.6.1 — The borrowed light

Mara disappears while repairing the town’s sunlamp. Follow her lantern courier Wick through twenty districts, discover the cost of the light, and build a way home that does not require another sacrifice.

This release has 20 authored chapter arcs, 120 different room names and discoveries, 120 deterministic collision layouts, 20 environmental themes, 20 named guardians, and a different crystal color in every chapter. The new crystals use hexagonal facets, edge highlights, clustered growth and a soft local glow. The 2D checkpoints use the same chapter colors. This is still a browser RPG prototype, not a claimed 20-hour finished commercial game.

Each chapter’s fourth room has a three-step mechanism with its answer embedded in the story. Mistakes reset the sequence without damage. H cycles through a nudge, directions and the exact solution. J opens the journal of discoveries. The current objective is available in the game and menu. Dialogue now wraps across multiple lines.

Shops appear in the fifth room (the pre-boss shelter) of chapters 3, 6, 9, 12, 15 and 18. Buy stronger weapons, armor, healing supplies and six abilities. Weapons increase FIGHT damage; armor reduces incoming damage to a minimum of one. Abilities are selected through SKILL in combat, once per encounter. Peaceful and fight victories award the same coins: four for an ordinary foe, eight for a guardian. Rare coins remain optional discoveries.

Abilities: Mend heals 10 HP; Lantern Ward blocks a hit; Kindred Voice adds one ACT; Stillness slows the next attack’s projectiles; Echo Step starts the next attack with 2.5 seconds of protection; Last Light arms one revival at 8 HP during the encounter.

Existing format-4 saves gain empty equipment defaults. Read memories, solved mechanisms, purchased equipment and currency are included in new checkpoint snapshots. Old saves retain their chapter, choices, coins and inventory; a player embedded in the new layout moves to the room entrance. Existing Supabase configuration and authentication logic are preserved. No database migration is required.

Controls: WASD/arrows move, Enter/Z interact, V switches views, Shift sprints, H hints, J journal, C save, P pause. In 3D, W/S walks, A/D strafes and left/right arrows or the mouse turn horizontally. Clicking the view requests mouse capture; Escape releases it.

Publish using the Windows app: select the folder containing this index.html and choose Publish update, or replace the contents of the game folder beside the app before enabling automatic publishing. The app places files in echoes_below, which the existing GitHub Pages workflow deploys. Keep the newer game files selected so a later publish does not restore an old bundle. The public game address is https://kippyking17.github.io/Echos-Below/ .

The service worker caches story.js, cave-world.js and the bundled Three.js renderer under the 1.4.1 cache. The website checks for updates every minute while visible and online and when returning to the tab. Choose Update ready — save and reload after a new build is installed.

Validation: all 120 collision layouts were checked for reachable exits, clues, checkpoints, coins and shops. Gameplay checks exercised all 20 mechanisms, hints/journal, six shops, equipment persistence, save migration, six ability effects, weapon damage, armor mitigation and equal coin rewards. Microsoft Edge rendered all 20 3D themes without uncaught errors and passed real puzzle, journal, shop and equipment reload checks. Actual account sign-in and authenticated cloud-save round trips require user credentials and were not performed.

Three.js 0.169.0 is bundled under the MIT license in vendor/THREE-LICENSE.txt.

## Chapter colors and victory credits

1. The Forgotten Gate — Blue (#438bff)
2. Mosslight Corridors — Orange (#ff9b42)
3. The Glass Orchard — Violet (#c583ff)
4. The Silent River — Teal (#37c8c0)
5. A Library of Ash — Gold (#f3d34f)
6. The Hollow Market — Pink (#ff8db8)
7. Ember Tunnels — Ruby (#ef5350)
8. Clockwork Chapel — Lime (#b2e85e)
9. The Starless Garden — Lavender (#b1a0ed)
10. Beneath the Lake — Sky blue (#70c9ff)
11. The Choir of Stone — Silver (#d0d9ee)
12. Dreaming Station — Mint (#7be2bb)
13. A Thousand Lanterns — Amber (#efb55c)
14. The Lost Observatory — Indigo (#7872ee)
15. The Rusted Palace — Copper (#cd9468)
16. Winter in the Deep — Ice blue (#b0f5ff)
17. The Broken Archive — Orchid (#df89dc)
18. The Last Crossing — Emerald (#45d697)
19. The Heart of Echoes — Rose (#ff698b)
20. The Door Above — Every color (all 19 earlier chapter colors together)

Every ordinary, decorative and checkpoint crystal uses its chapter’s single color. The final chapter uses colored facets and drifting shards from all previous palettes, with the same rainbow treatment in 2D and the software fallback. The story line at the last checkpoint explains why all the districts’ colors belong together.

After completing the last room, the epilogue leads into an animated credit sequence automatically after 12 seconds, or immediately with Enter. Credits include KingKippy, Mara and Wick, the 20 districts, the player’s journey statistics and Three.js attribution. Enter skips to the victory summary, P pauses, and R replays from the summary. Replay credits is also available beside Continue on a completed save. The completed journey is saved and survives reloading.

Validation for this release includes blue/orange/final-palette checks, real 2D/3D browser rendering, completed-save recovery, credits entry, pause, skip, replay and automatic completion.

## Player surface and main menu

Normal players see a window-filling game canvas with a black surround, no dashboard, page backgrounds, version badges, external controls, account panels or status panels. The game keeps its original aspect ratio to preserve the art and text. M (or the small in-game menu button) opens a paused main menu. Save slots, imports/exports, map, journal, hints, keybindings, display, sound, account/cloud saves and progress each have a menu option. The map shortcut moves to G; old default M map bindings migrate to avoid a conflict with the new menu action. Custom distinct bindings are preserved.

Hints appear as a timed in-game story-style box. Native browser fullscreen is requested during a play gesture when enabled; the game fills the browser window regardless. Fullscreen targets the document so menus and account dialogs stay usable. Display settings include entering/exiting fullscreen and enabling fullscreen on play.

The original dashboard and admin test lab are shown only after the existing Supabase administrator check succeeds for the KingKippy email alias and the matching game_admins record. That authorization now stays inside the private game/auth scope; the old public authorizeOnlineAdmin function has been removed. F2 or the verified-admin menu option can switch between player view and the dashboard. Logout immediately restores the player view. No backend policies or login configuration were changed.

Browser validation covered the normal full-window layout, M/Escape navigation, dialogue preservation, timed hint box, all menu pages, remapping, real document fullscreen with menus visible, gameplay pause while menus are open, local save reload, mobile-sized no-scroll layout, verified-admin dashboard, rejected spoofed/unverified identities, and logout. Admin identities were tested with isolated SDK fixtures; real account credentials were not used. The existing 120-room, shop, ability and credits regression checks passed.

## Optional regions and scenery — 1.4.1

Six optional regions add 18 authored maps, bringing the world to 138 rooms. Look for the glowing side entrance in room 2 of chapters 1, 4, 7, 10, 13 and 16. The Starlit Reservoir, Mosswake Sanctuary, Emberglass Foundry, Drowned Observatory, Lantern Skywalk and Aurora Vault each have a scenic entry, a three-object challenge and a relic chamber. Each map has its own collision layout and story discovery. Main-story chapter progression remains unchanged.

The reservoir asks you to find three bells. The sanctuary, foundry, observatory and vault use story clues to order their mechanisms. The skywalk is a 24-second lantern relay; menus, conversations and pause stop its clock, and expiration costs no HP. H supplies local hints. All challenge mistakes are harmless.

Relics grant bonus encounter coins, post-battle healing, FIGHT damage, slower hostile projectiles, shop discounts or longer protection after damage. Only one can be equipped at a time, under M > Relics & discoveries. Every reward is claimed once per save, including its coins and glowberries. Revisit discovered trails from that menu; completed journeys may visit all six. Return to story restores the point you left, including your completed ending. Saves and checkpoint snapshots preserve expedition state and equipment. No database changes are needed.

The cave renderer now uses locally generated stone textures, drifting particles, rippling pools, waterfalls, glowing fungi and roots, rotating foundry gears, celestial rings, suspended lanterns and animated aurora ribbons. Scenery is visual; collision follows the marked, tested walkways. Overhead rooms receive matching scenery. Existing chapter-colored crystals and the rainbow finale remain intact. New files are bundled in the versioned offline cache.

Validation: collision searches reached every target in all 18 new layouts; gameplay exercised six entrances, challenge gates, sequence resets, relay expiration and pause, save normalization, reload, checkpoint snapshots, single-claim rewards, and return paths. Relic combat and shop effects were checked. Browser checks cover the 18 3D maps, reward/equipment menus and saved journeys. Existing 120-room, puzzle, shop, combat, save, credits, player-view and verified-admin checks remain covered. Real account sign-in is left to the account owner.

## Permanent launcher and downgrade protection — 1.4.1

The Auto Update 2.0 Windows launcher opens the live game instead of publishing a bundled copy. It has no selected upload folder by default. It checks the served version on startup, every minute while open and before Play, remembers the newest version seen, and rejects missing or older version responses. Creator publishing is optional; its guard rejects unknown versions, files older than 1.4.1, files older than the newest live version seen and files older than the repository game. Playing does not require Git. Creator publishing still requires Git and authorized GitHub credentials.

The launcher opens the game with desktop=1. The website checks for a new offline worker every minute while visible and online. After an updated worker takes control, desktop mode waits for an active world, title or completed-credits screen with no pause or open dialog, saves successfully, reloads and resumes the saved journey. It waits through combat and conversations. Failed saving cancels automatic reload so the player can export a backup. Other browser visits retain the manual update button.

The deployment workflow now checks the game version against a fixed recovery floor and the latest twenty successful deployments, using numeric version comparisons. An old publisher may still commit old files, but those files cannot replace the live game. Valid future versions can deploy without changing the guard. Checks fail closed if release history cannot be verified.

Validation: actual offline-worker updates from 1.4.1 to simulated 1.4.2 and 1.4.3 waited through combat, saved/resumed and preserved HP and coins. A simulated save failure prevented reload. Launcher tests verified no selected upload folder, automatic publishing off, blocked old/missing versions, accepted future versions, and the upload allowlist. Deployment tests rejected 1.0.1 and future downgrades. The 138-room exploration, combat, shops, legacy saves and ending checks still pass.

## Interface refresh — 1.5.0

The title screen now uses layered cave silhouettes, crystal facets, drifting motes and a clear start prompt. The player menu, saves, keybindings, account form, journal, puzzle controls, skill picker, shop and relic collection share dark stone panels, chapter-colored crystal accents, warm lantern highlights and visible keyboard focus. Relics have individual discovery/equipment cards; shops use two columns on desktop and one on narrow screens. Save labels fit without horizontal scrolling. Decorative menu icons are hidden from assistive technology. The menu focuses its primary action after opening.

The game HUD uses compact location and health panels. Dialogue, hints, notifications, the map and battle controls use matching carved-panel borders. Notices no longer cover the enemy health bar. The battle arena and collision rules are unchanged. Click the title to begin or continue; click a battle action to use it, or use the existing keyboard controls. Clicking a dialogue advances it. Menus remain inside native fullscreen. The verified-admin dashboard receives the same palette without granting new privileges.

Windows launcher 2.1 uses the matching dark stone, crystal and lantern palette. Its automatic game update and protected creator upload logic are unchanged. Existing launcher 2.0 users receive the game interface online; downloading 2.1 updates the Windows window itself.

Validation: checked styled title, dialogue, battle, save, shop and relic screens in Edge. Verified mouse start/battle action, primary menu focus, arrows, key remapping, fullscreen, game pause under menus and no horizontal overflow in mobile shop/save/controls/account/relic screens. Existing gameplay, legacy saves, 18 optional maps, rewards, combat, credits and verified-admin isolation checks pass.

## Return paths — 1.5.1

Every campaign room after the first has a visible return doorway in both views. Walk into its west threshold or press Enter/Z near it; M > Previous room offers the same action while exploring. Chapter 2 room 1 returns to chapter 1 room 6, and the same applies at every later chapter boundary. The first room of the whole story cannot go below chapter 1. Optional trails use the same return action for earlier maps and their story entrance. The camera direction stays consistent while walking across the boundary. Existing choices, cleared guardians, solved puzzles, inventory and journal discoveries stay intact. Revisiting a chapter no longer repeats its entrance gift or opening dialogue.

Validation: walking tests crossed all 119 campaign connections backward, tested the start boundary, door interaction, 3D backward movement, save-state preservation, trail return and repeated chapter visits. Browser checks exercised the Previous room menu and actual 3D movement back and forth across a chapter boundary.

## 2D cave artwork — 1.6.0

The overhead view now uses locally drawn pixel artwork in overworld-art.js. Room floors have seeded stone textures, cracks and worn route stones. Raised cave walls frame the actual floor; obstacles use rock formations, bookshelves, crates, garden growth, machinery or ice/glass formations according to the district. Water areas have rippling pools and plank paths. Star districts have floor constellations, industrial districts have conduits and vents, winter has drifting particles, and the aurora vault has subtle animated ribbons. Ambient effects remain faint and do not hide the play area.

The overhead player is a scarf-wearing traveler with a small lantern, movement animation and shadow. Story landmarks use lanterns, books or mechanisms; guardians, shops, optional portals, challenge nodes and relic chests have matching sprites. Checkpoint clusters retain chapter colors; the final chapter uses the complete rainbow palette. Labels appear within interaction range and are hidden during dialogue. Doors stay visible on both sides of eligible rooms. Battle hearts and combat remain unchanged.

Static room artwork is cached in a bounded six-room cache, keeping per-frame rendering small. The new art file is included in the offline cache. All artwork comes from local drawing code; no external image or font service is required. Collision layouts, interactable coordinates, story progress, saves and 3D rendering are unchanged.

Validation: all 120 campaign and 18 optional maps render through the actual game canvas in Edge without uncaught errors. Checked traveler movement, landmarks, menus, 3D switching and the mobile viewport. Existing puzzles, shops, equipment, six optional challenges/rewards, old-save migration, credits and all 119 campaign return links pass gameplay checks.

## Pixel menus and fresh starts — 1.6.1

The M menu, saves, account panel, controls, journal, shops, relics and puzzle/ability dialogs use locally bundled Pixelify Sans with chunky square frames, stepped 8×8 icons, raised pixel buttons, hard shadows and a dithered backdrop. Canvas dialogue, hints and notifications use stepped pixel borders too. Keyboard focus and mobile wrapping are retained. Pixelify Sans is distributed unchanged under the SIL Open Font License; see fonts/OFL.txt. The font and license are included in the offline cache. The Windows publisher upload allowlist now includes bundled TTF fonts.

New Game opens a dedicated New Journey slot picker with only fresh-start actions. The header explicitly names chapter 1. Save & Load remains separate for continuing or copying current progress. Starting New resets chapter/room, checkpoint, equipment/relics, story flags, health, inventory, choices, ending, timers, camera heading and active combat. Other slots are retained, and replacing an occupied slot still needs confirmation.

Validation: browser checks started fresh journeys in all three slots from late-game progress and combat, verified resets, preserved other slots, cancelled an overwrite without changing progress, reloaded the new journey and separately loaded the old journey. Checked actual font loading, desktop/mobile popup layouts, keybindings, native fullscreen and verified-admin isolation. Existing campaign and optional-trail gameplay checks pass.
