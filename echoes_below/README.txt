ECHOES BELOW v0.6.0 — PC / browser / offline

CHANGES
• No auto-save on room transitions, enemy defeats, dying, title menu, or timer.
• Manual saves: C or Manual Save button. Checkpoints: glowing crystal in first room of each chapter only.
• Eight rotating distinct room layouts: cave bridges, crystal passages, columns, moss grottos, libraries, rivers, fungal dens and shrines.
• Room obstacles block movement in both 2D and first-person mode. First-person renderer is still simplified 2.5D.
• The admin panel ONLY unlocks when logged in as the exact KingKippy account AND that account's UUID is in the game_admins table. No offline F2 bypass.
• Username aliases are unique by Supabase Auth email uniqueness. The sole admin record has a DB singleton uniqueness rule.

IMPORTANT OWNER SECURITY STEP
Before publishing, ensure YOU control the KingKippy account. Register it first yourself and find its unique user ID in Supabase Authentication > Users. Run the updated supabase-setup.sql. After verifying the account is truly yours, insert your USER UUID with the SQL instructions. Merely picking the KingKippy username does NOT grant admin privileges. If somebody else already claimed the username, DO NOT authorize them. Configure Supabase Auth to disable email confirmation for these placeholder aliases. This username-only prototype does not have password recovery or rate-limit protections suitable for a production public service.

PLAY
Offline: extract ZIP and open index.html; local guest play and saves work. Online: deploy entire folder to existing Netlify site. Login and cloud saves require cloud-config.json and your Supabase project to be configured. Cloud saves are explicitly uploaded/downloaded, not automatic.

CONTROLS
WASD move; Shift sprint; V change 2D / 3D; Z/Enter interact; C manual save; P pause; F2 admin panel (verified KingKippy only).

PREVIOUS SAVES
Version 0.6.0 retains existing local slot keys and attempts to load v0.5.0 saves. Saves from different site origins are not shared automatically. Export and import if moving between sites.

V0.7.0 PATCH: Fixed first-person raycast perspective and occlusion, horizontal-only camera; top-right logged-in username badge; deterministic rare coins 4–11 rooms apart; distinct boss attack patterns and unique boss dialogue. Manual saves and checkpoints unchanged. Admin remains KingKippy only, requires configured backend.

V0.8.0: Camera switching allowed only during world exploration, not dialogue, boss menus, dodge rounds, or pause. Rare coin rooms and room 5 of every chapter (just before room 6 boss) automatically set and persist checkpoints, plus coin collection saves again. Regular rooms do not autosave.

V0.8.1: clearer auth errors, real signup confirmation feedback, config checks and detailed LOGIN_SETUP.txt. Account setup remains required.
