# CarPlay Racer

by [@seltos.gtx](https://www.instagram.com/seltos.gtx/) on Instagram

A lightweight browser racing game you steer by **tilting your phone**. It uses the phone's motion sensors through `DeviceOrientationEvent`. It's one HTML file with no dependencies and no build step.

**Play:** https://carplay-game.seltosgtx.workers.dev/ (backup: https://akumar36.github.io/carplay-game/)

## How to play

1. Open the link on your phone and rotate to **landscape**.
2. Hold the phone like a steering wheel and tap **Tap to start**. On iPhone, tap **Allow** for motion access.
3. During the 3-2-1 countdown, hold the phone steady in a comfortable position. That becomes "straight ahead".
4. Tilt or rotate the phone to steer. Dodge traffic, grab coins (+50) and hearts (+1 life). You have 3 lives, and the game speeds up gradually.

Lane assist gently centres the car in a lane when you're not steering, which makes the game easier to play.
On a desktop, or a device without sensors, use ← → / A D keys, or touch the left or right half of the screen.

## Platform notes

| | Android (Chrome) | iPhone (Safari) |
|---|---|---|
| Tilt controls | ✅ no prompt | ✅ after tapping *Allow* |
| Full screen + landscape lock | ✅ automatic | ❌ not supported by Safari. Use **Share → Add to Home Screen** for a full-screen app, and turn off Portrait Orientation Lock |

The page must be served over **HTTPS**, because motion sensors are blocked on insecure pages. GitHub Pages provides HTTPS.

## Hosting

Every push to the `claude/inspiring-goodall-tmaqul` branch deploys automatically to both:

- **Cloudflare Workers** (main): https://carplay-game.seltosgtx.workers.dev/ — configured by `wrangler.jsonc`; `.assetsignore` keeps non-game files out of the upload.
- **GitHub Pages** (backup): https://akumar36.github.io/carplay-game/

### GitHub Pages setup

Settings → Pages → *Build and deployment* → Source: **Deploy from a branch** → pick the branch with these files, folder `/ (root)` → Save.
The site goes live at `https://akumar36.github.io/carplay-game/` within a minute or two.

## Files

- `index.html`: the whole game (canvas rendering, sensor input, UI)
- `manifest.webmanifest`, `icon*`: home-screen / PWA metadata

## Beta

New features are tried out at `/beta/` (https://carplay-game.seltosgtx.workers.dev/beta/) before going to the main link.
The current beta adds **music and sound**: a synthwave loop that is composed in code once while the menu is showing, then just replayed (no music file to download); an engine sound that follows your speed with gear shifts; and crash, coin and countdown sounds. The button at the top cycles *Sound on → Effects only → Muted*, and Muted switches audio processing off completely.

## License

© 2026 @seltos.gtx. All rights reserved. See [LICENSE](LICENSE). Not open source: please don't copy or rehost without permission.
