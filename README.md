# Tilt Racer

A lightweight browser racing game you steer by **tilting your phone**. It uses the phone's motion sensors through `DeviceOrientationEvent`. It's one HTML file with no dependencies and no build step.

**Play:** https://akumar36.github.io/carplay-game/ (after GitHub Pages is enabled, see below)

## How to play

1. Open the link on your phone and rotate to **landscape**.
2. Hold the phone like a steering wheel and tap **Tap to start**. On iPhone, tap **Allow** for motion access.
3. Tilt or rotate the phone to steer. Dodge traffic and grab coins (+50). The game speeds up over time.

The position you hold the phone in when you tap start becomes "straight ahead".
On a desktop, or a device without sensors, use ← → / A D keys, or touch the left or right half of the screen.

## Platform notes

| | Android (Chrome) | iPhone (Safari) |
|---|---|---|
| Tilt controls | ✅ no prompt | ✅ after tapping *Allow* |
| Full screen + landscape lock | ✅ automatic | ❌ not supported by Safari. Use **Share → Add to Home Screen** for a full-screen app, and turn off Portrait Orientation Lock |

The page must be served over **HTTPS**, because motion sensors are blocked on insecure pages. GitHub Pages provides HTTPS.

## Hosting on GitHub Pages

Settings → Pages → *Build and deployment* → Source: **Deploy from a branch** → pick the branch with these files, folder `/ (root)` → Save.
The site goes live at `https://akumar36.github.io/carplay-game/` within a minute or two.

## Files

- `index.html`: the whole game (canvas rendering, sensor input, UI)
- `manifest.webmanifest`, `icon*`: home-screen / PWA metadata
