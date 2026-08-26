# Agents Orbit Section

RTL Persian feature section with an interactive 3D robot (three.js).

## Files
- `Agents Orbit Section.dc.html` — the section (open directly in a browser)
- `robot-scene.js` — `<robot-scene>` web component: robot model, jet exhaust, flight, engine audio
- `support.js` — runtime required by the .dc.html file
- `uploads/logo-mark.png` — chest logo texture

## Run
Serve the folder over HTTP (the robot loads three.js and the logo texture as modules/textures):

    npx serve .        # or: python3 -m http.server

then open `Agents Orbit Section.dc.html`. Opening via `file://` blocks the module + texture loads.

## Interactions
- Hover a card → robot flies toward it, afterburner flares, and it reads the card aloud (fa-IR speech).
- Drag the robot to spin it; pointer movement makes it track the cursor.
- Bottom-left pill toggles engine sound + narration. Browsers keep audio muted until the first click.

## Dependencies (CDN, no build step)
- three.js 0.184.0 (module)
- Vazirmatn (Google Fonts)
- lucide 0.544.0 (card icons)
