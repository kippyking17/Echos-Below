# Echoes Below 2.0.0 — Gifts of Grace
Build 20261017.03

The journey includes 20 chapters, 120 main rooms, six optional regions and 18 optional maps, 20 guardians, six minibosses, authored mechanism clues, chapter crystal colors, equipment, six learned abilities and victory credits.

## Graces and progression

One grace appears in the first room of each chapter: six rooms between graces. No grace appears in a boss room or the room immediately before a boss. There is no automatic pre-boss checkpoint on room entry. Optional trails do not add extra graces.

Resting heals and saves. Each chapter's grace offers one permanent gift: Damage +2, Hearts +2 maximum HP, Skill +1 in chapters 1–10 or +2 in chapters 11–20, Defense +1 (minimum hit damage 1), Glowberry Healing +2, or Movement +3% (maximum bonus 30%). You may leave without choosing and decide later. Repeat visits heal/save but cannot grant another gift.

Skill power improves all six learned abilities. Mend gains healing, Ward can block more hits, Kindred Voice can build more understanding, Stillness slows projectiles further, Echo Step lasts longer and Last Light restores more health. Ability descriptions display current effects.

Choices are stored in format-4 saves and checkpoint snapshots. Old saves receive an empty blessings record. Level gains preserve added hearts. New Game resets all gifts, gear and story state while preserving other save slots.

## Art and title entrance

The traveler has a six-step directional walk with separate feet and arms, scarf movement, idle breathing/blinking and a moving, flickering lantern. Twenty guardians and six minibosses have pixel skins matched to their names: keys, crowns, paddles, clockwork, books, instruments, lanterns and the final spectrum. The same skins appear in rooms, battles and animated 3D billboards. Room lanterns flicker gently in both views.

Only the title's on-screen ENTER button starts its entrance. It plays a rising five-note chime, grows, fades the title to black, then fades into a saved or new journey. Keyboard confirmation and background clicks do not start the title. Gameplay waits until the transition completes. A desktop updater may resume a saved journey directly after installing an update.

## Doors, clues and controls

Seven east gates require a named key, found beside the previous room's landmark. Reading that landmark also discovers the key. Locks stay open, back doors remain available, and old saves that already passed a gate remain unlocked. Door art distinguishes open arches, mechanism seals and key locks. Transition bands match the doorway opening.

All twenty campaign mechanism inscriptions contain their actual control labels in order. Hints use current key, grace and healing state. Shortcut teaching appears in How to Play and Controls; normal gameplay prompts use nearby object names.

2D exploration: click/tap a floor destination or marked object. Routes go around obstacles; a new click replaces the destination. Menus, dialogue, pauses, loading, loss of focus and room/view changes cancel walking. Keyboard direction keys do not steer 2D exploration.

3D: WASD on desktop, drag joystick on mobile. Battle dodging: keyboard on desktop; left joystick or direct hold-and-drag in the heart arena on touch devices. Release/cancel stops touch movement. M opens the menu; H hints, J journal, K controls, G map, V view, P pause, C save. These shortcuts are taught only in the instruction pages. Phone/tablet play uses landscape with safe-area controls and a portrait rotation prompt.

Normal players see the window-filling game. Only the verified KingKippy administrator can use the original dashboard. Authentication and public cloud configuration are unchanged; no database migration is required. The same Windows launcher receives this game update.

## Validation

Checks cover collision-safe paths across all 138 maps; all seven key/door loops; twenty mechanism clues; six-room grace spacing with no pre-boss grace; all six gift choices and repeat prevention; save migration and death/checkpoint persistence; actual damage, healing, defense, movement and skill bonuses; all twenty bosses and six minis using peaceful/fight routes; title-only start, sound scheduling, growth and fade stages; desktop/phone layout; real touch joystick and heart dragging; 3D skins; fresh games in all three slots; existing slot preservation, cancellation and reload. Mobile interaction checks use browser device emulation.