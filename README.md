# CarPlay Games

by [@seltos.gtx](https://www.instagram.com/seltos.gtx/) on Instagram

A collection of lightweight browser games you play by **tilting your phone**. They use the phone's motion sensors through `DeviceOrientationEvent`. Each game is a single HTML file with no dependencies and no build step.

**Play:** https://carplay-game.seltosgtx.workers.dev/ (backup: https://akumar36.github.io/carplay-game/)

The home page lists every game; tap one to play it.

| Game | Link |
|---|---|
| CarPlay Racer | https://carplay-game.seltosgtx.workers.dev/racer/ |
| Neon Jet | https://carplay-game.seltosgtx.workers.dev/jet/ |
| Neon Bricks | https://carplay-game.seltosgtx.workers.dev/bricks/ |
| CarPlay Racer Lite (the original, no music) | https://carplay-game.seltosgtx.workers.dev/racer-lite/ |

## CarPlay Racer: how to play

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

- `index.html`: the home page. The game list is the `GAMES` array near the bottom.
- `racer/index.html`: CarPlay Racer (canvas rendering, sensor input, music and sound, Neon/Classic themes, UI)
- `jet/index.html`: Neon Jet, a side-scroller: tilt to climb and dive through gaps between neon towers (↑ ↓ / W S or touch top/bottom as fallback, M mutes)
- `bricks/index.html`: Neon Bricks, a brick breaker: tilt to slide the paddle (← → / A D or touch left/right as fallback, M mutes)
- `racer-lite/index.html`: CarPlay Racer Lite, the original single-theme racer with simple beeps
- `manifest.webmanifest`, `icon*`: home-screen / PWA metadata, shared by all games

### Adding a game

1. Create a folder, e.g. `newgame/index.html`. Reference shared files with `../` (`../manifest.webmanifest`, `../icon.svg`) and keep the @seltos.gtx branding and copyright notice.
2. Add a "← All games" link back to `../`.
3. Add an entry to `GAMES` in the root `index.html`.

## Racer controls

Steer with tilt, ← → / A D, or touch. **T** switches theme (Neon / Classic), **M** cycles sound (*Sound on → Effects only → Muted*), **F** toggles fullscreen (the button is hidden on iPhone, whose Safari doesn't allow fullscreen for web pages). Theme and sound choices are remembered per device.

## License

© 2026 @seltos.gtx. All rights reserved. See [LICENSE](LICENSE). Not open source: please don't copy or rehost without permission.
