# Echoes Below 1.0.1

Play: start or continue, finish the opening dialogue with Enter, then select **Switch to 3D** (V). W/S moves forward/back, A/D strafes, left/right arrows turn, Shift sprints, and Z/Enter interacts. Click the game for mouse turning. Looking stays horizontal.

This update adds bundled Three.js 0.169.0 geometry, cyan/pink/purple crystals, cave walls, fog, pools, rocks, and visible checkpoints, inscriptions, coins, enemies, and exits. Gameplay collision and room progression still use the original world data. The previous ray renderer remains a fallback if WebGL is unavailable. Pools use a shiny material; they do not implement scene reflections or bloom postprocessing.

The existing Supabase project configuration, account aliases, session storage, cloud save tables, save keys, keybindings, and save migration remain intact. No database migration is required. Existing credentials were not available for an authenticated cloud-save round trip; guest saves and connection initialization were tested. Retain the existing site origin to preserve browser sessions and local saves.

The earlier /mnt/data/echoes_below_v1_0 directory was not accessible in this Windows chat. This build is based on repository commit 6bc2787f94f8a7a30c67e152b56b901423acadd4, rather than a recovered v1.0 archive. The original reference image was not available for visual comparison.

## Deployment

The repository's existing GitHub Pages workflow publishes the contents of echoes_below on pushes to main. Its public URL is https://kippyking17.github.io/Echos-Below/ .

For manual upload: extract the package, open kippyking17/Echos-Below on GitHub, enter the echoes_below folder, choose Add file > Upload files, and upload the package contents into that folder, including vendor. Replace matching files and commit to main. Keep cloud-config.json unchanged. Check Actions > Deploy Echoes Below for a successful run, then refresh the game. Do not place an extra enclosing folder inside echoes_below.

For a local preview, serve the extracted folder over HTTP (for example `python -m http.server 8000` from that folder), then open http://localhost:8000. Opening index.html directly as a file cannot reliably load JavaScript modules or login configuration.

Three.js is distributed under the MIT license included in vendor/THREE-LICENSE.txt.

Automatic updates: the website checks for a newer service worker every 60 seconds while visible and online, and when returning to the tab. After a new build is installed, choose “Update ready — save and reload”. This saves your current local slot before refreshing. Publishing new files to GitHub is still required; this does not grant repository write access.
