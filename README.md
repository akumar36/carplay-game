# Tilt Arcade

by [@seltos.gtx](https://www.instagram.com/seltos.gtx/) on Instagram

A collection of lightweight browser games you play by **tilting your phone**. They use the phone's motion sensors through `DeviceOrientationEvent`. Each game is a single HTML file with no dependencies and no build step.

**Play:** https://carplay-game.seltosgtx.workers.dev/ (backup: https://akumar36.github.io/carplay-game/)

The home page lists every game; tap one to play it.

| Game | Link |
|---|---|
| Lane Rush | https://carplay-game.seltosgtx.workers.dev/lane-rush/ |
| Sky Dash | https://carplay-game.seltosgtx.workers.dev/sky-dash/ |
| Brick Smash | https://carplay-game.seltosgtx.workers.dev/brick-smash/ |
| Star Strike | https://carplay-game.seltosgtx.workers.dev/star-strike/ |
| Light Trail | https://carplay-game.seltosgtx.workers.dev/light-trail/ |
| Midnight Run | https://carplay-game.seltosgtx.workers.dev/midnight-run/ |
| Pothole Panic | https://carplay-game.seltosgtx.workers.dev/pothole-panic/ |
| Park It! | https://carplay-game.seltosgtx.workers.dev/park-it/ |
| Hill Climb | https://carplay-game.seltosgtx.workers.dev/hill-climb/ |
| Lane Rush Classic (the original, no music) | https://carplay-game.seltosgtx.workers.dev/lane-rush-classic/ |

## Safety

**Play safe:** never play while driving, cycling or walking in traffic. In a vehicle, only passengers should play. If a car's screen can show these games (for example through Apple CarPlay or Android Auto), only use it while the car is safely parked. Follow your local laws. Every game shows a short "Play safe: stay aware of your surroundings" reminder on its start menu and game-over screens, and the home page shows the full note.

Apple CarPlay is a trademark of Apple Inc. Android Auto is a trademark of Google LLC. Tilt Arcade is not affiliated with or endorsed by Apple or Google.

## Lane Rush: how to play

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
- `lane-rush/index.html`: Lane Rush (canvas rendering, sensor input, music and sound, Neon/Classic themes, UI)
- `sky-dash/index.html`: Sky Dash, a side-scroller: tilt to climb and dive through gaps between neon towers (↑ ↓ / W S or touch top/bottom as fallback, M mutes)
- `brick-smash/index.html`: Brick Smash, a brick breaker: tilt to slide the paddle (← → / A D or touch left/right as fallback, M mutes)
- `star-strike/index.html`: Star Strike, a space shooter: tilt to move the ship, which fires by itself (← → / A D or touch left/right as fallback, M mutes)
- `light-trail/index.html`: Light Trail: turn the phone like a wheel to steer; eat orbs to grow, avoid walls and your own trail (← → / A D or touch left/right as fallback, M mutes)
- `midnight-run/index.html`: Midnight Run, a first-person pseudo-3D driving game: turn the phone to steer, the car accelerates by itself; overtake traffic and stay on the road (← → / A D or touch left/right as fallback, M mutes)
- `pothole-panic/index.html`: Pothole Panic: tilt to dodge potholes, cows, autos, trucks and wrong-side scooters; speed breakers and near-miss bonuses
- `park-it/index.html`: Park It!: tilt to steer, hold D / R (or ↑ ↓) to drive and reverse; 8 parking levels with stars and parking sensors
- `hill-climb/index.html`: Hill Climb: side-view jeep physics; lean right for gas, left to brake, and lean in the air to tip the jeep; watch the fuel
- `lane-rush-classic/index.html`: Lane Rush Classic, the original single-theme racer with simple beeps
- `fonts/`: Orbitron (title font, latin subset, SIL Open Font License, see `fonts/OFL.txt`)
- `manifest.webmanifest`, `icon*`: home-screen / PWA metadata, shared by all games

### Adding a game

1. Create a folder, e.g. `newgame/index.html`. Reference shared files with `../` (`../manifest.webmanifest`, `../icon.svg`) and keep the @seltos.gtx branding and copyright notice.
2. Add a "← All games" link back to `../`.
3. Add an entry to `GAMES` in the root `index.html`.

## Controls

Steer with tilt, ← → / A D, or touch. Every game has a **pause button** at the bottom right during play (or **P** / **Esc**); the pause screen has Resume and All games. **T** switches theme (Neon / Classic), **M** cycles sound (*Sound on → Effects only → Muted*). Theme and sound choices are remembered per device.

## License

© 2026 @seltos.gtx. All rights reserved. See [LICENSE](LICENSE). Not open source: please don't copy or rehost without permission.
