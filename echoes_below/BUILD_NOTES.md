# Echoes Below 1.3.0 — The borrowed light

Mara disappears while repairing the town’s sunlamp. Follow her lantern courier Wick through twenty districts, discover the cost of the light, and build a way home that does not require another sacrifice.

This release has 20 authored chapter arcs, 120 different room names and discoveries, 120 deterministic collision layouts, 20 environmental themes, 20 named guardians, and a different crystal color in every chapter. The new crystals use hexagonal facets, edge highlights, clustered growth and a soft local glow. The 2D checkpoints use the same chapter colors. This is still a browser RPG prototype, not a claimed 20-hour finished commercial game.

Each chapter’s fourth room has a three-step mechanism with its answer embedded in the story. Mistakes reset the sequence without damage. H cycles through a nudge, directions and the exact solution. J opens the journal of discoveries. The current objective and room name stay beneath the game. Dialogue now wraps across multiple lines.

Shops appear in the fifth room (the pre-boss shelter) of chapters 3, 6, 9, 12, 15 and 18. Buy stronger weapons, armor, healing supplies and six abilities. Weapons increase FIGHT damage; armor reduces incoming damage to a minimum of one. Abilities are selected through SKILL in combat, once per encounter. Peaceful and fight victories award the same coins: four for an ordinary foe, eight for a guardian. Rare coins remain optional discoveries.

Abilities: Mend heals 10 HP; Lantern Ward blocks a hit; Kindred Voice adds one ACT; Stillness slows the next attack’s projectiles; Echo Step starts the next attack with 2.5 seconds of protection; Last Light arms one revival at 8 HP during the encounter.

Existing format-4 saves gain empty equipment defaults. Read memories, solved mechanisms, purchased equipment and currency are included in new checkpoint snapshots. Old saves retain their chapter, choices, coins and inventory; a player embedded in the new layout moves to the room entrance. Existing Supabase configuration and authentication logic are preserved. No database migration is required.

Controls: WASD/arrows move, Enter/Z interact, V switches views, Shift sprints, H hints, J journal, C save, P pause. In 3D, W/S walks, A/D strafes and left/right arrows or the mouse turn horizontally. Clicking the view requests mouse capture; Escape releases it.

Publish using the Windows app: select the folder containing this index.html and choose Publish update, or replace the contents of the game folder beside the app before enabling automatic publishing. The app places files in echoes_below, which the existing GitHub Pages workflow deploys. Keep the newer game files selected so a later publish does not restore an old bundle. The public game address is https://kippyking17.github.io/Echos-Below/ .

The service worker caches story.js, cave-world.js and the bundled Three.js renderer under the 1.3.0 cache. The website checks for updates every minute while visible and online and when returning to the tab. Choose Update ready — save and reload after a new build is installed.

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
