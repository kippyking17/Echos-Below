# Echoes Below 1.1.0 — The borrowed light

Mara disappears while repairing the town’s sunlamp. Follow her lantern courier Wick through twenty districts, discover the cost of the light, and build a way home that does not require another sacrifice.

This release has 20 authored chapter arcs, 120 different room names and discoveries, 120 deterministic collision layouts, 20 environmental themes, 20 named guardians, and a different crystal color in every chapter. The new crystals use hexagonal facets, edge highlights, clustered growth and a soft local glow. The 2D checkpoints use the same chapter colors. This is still a browser RPG prototype, not a claimed 20-hour finished commercial game.

Each chapter’s fourth room has a three-step mechanism with its answer embedded in the story. Mistakes reset the sequence without damage. H cycles through a nudge, directions and the exact solution. J opens the journal of discoveries. The current objective and room name stay beneath the game. Dialogue now wraps across multiple lines.

Shops appear in the fifth room (the pre-boss shelter) of chapters 3, 6, 9, 12, 15 and 18. Buy stronger weapons, armor, healing supplies and six abilities. Weapons increase FIGHT damage; armor reduces incoming damage to a minimum of one. Abilities are selected through SKILL in combat, once per encounter. Peaceful and fight victories award the same coins: four for an ordinary foe, eight for a guardian. Rare coins remain optional discoveries.

Abilities: Mend heals 10 HP; Lantern Ward blocks a hit; Kindred Voice adds one ACT; Stillness slows the next attack’s projectiles; Echo Step starts the next attack with 2.5 seconds of protection; Last Light arms one revival at 8 HP during the encounter.

Existing format-4 saves gain empty equipment defaults. Read memories, solved mechanisms, purchased equipment and currency are included in new checkpoint snapshots. Old saves retain their chapter, choices, coins and inventory; a player embedded in the new layout moves to the room entrance. Existing Supabase configuration and authentication logic are preserved. No database migration is required.

Controls: WASD/arrows move, Enter/Z interact, V switches views, Shift sprints, H hints, J journal, C save, P pause. In 3D, W/S walks, A/D strafes and left/right arrows or the mouse turn horizontally. Clicking the view requests mouse capture; Escape releases it.

Publish using the Windows app: select the folder containing this index.html and choose Publish update, or replace the contents of the game folder beside the app before enabling automatic publishing. The app places files in echoes_below, which the existing GitHub Pages workflow deploys. Keep the newer game files selected so a later publish does not restore an old bundle. The public game address is https://kippyking17.github.io/Echos-Below/ .

The service worker caches story.js, cave-world.js and the bundled Three.js renderer under the 1.1.0 cache. The website checks for updates every minute while visible and online and when returning to the tab. Choose Update ready — save and reload after a new build is installed.

Validation: all 120 collision layouts were checked for reachable exits, clues, checkpoints, coins and shops. Gameplay checks exercised all 20 mechanisms, hints/journal, six shops, equipment persistence, save migration, six ability effects, weapon damage, armor mitigation and equal coin rewards. Microsoft Edge rendered all 20 3D themes without uncaught errors and passed real puzzle, journal, shop and equipment reload checks. Actual account sign-in and authenticated cloud-save round trips require user credentials and were not performed.

Three.js 0.169.0 is bundled under the MIT license in vendor/THREE-LICENSE.txt.
