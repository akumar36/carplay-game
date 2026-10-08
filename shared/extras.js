/*
  Tilt Arcade: shared extras loaded by every game
  Copyright (c) 2026 @seltos.gtx (https://www.instagram.com/seltos.gtx/). All rights reserved.

  1. Share button on the game-over screen: makes a story-sized score card (the final frame,
     the game, the score and a link) and opens the phone's share sheet, or saves the image.
  2. "Tilt like this" hint: the first couple of times you start each game, a small animated
     phone at the top of the screen shows how to steer.
  It only reads the page (#finalScore, #bestLine, the #game canvas, the document title), so
  the games don't depend on it: if this file fails to load, they still work.
*/
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const light = () => document.documentElement.dataset.mode === 'light';
  const gameName = () => document.title.split(' · ')[0];
  // The page's public address (from its share tags), so the card shows the real link even when testing locally
  const pageURL = () => { const m = document.querySelector('meta[property="og:url"]'); return (m && m.content) || location.origin + location.pathname; };

  // ---------- Styles ----------
  const css = document.createElement('style');
  css.textContent = `
    .scoreRow { display: flex; align-items: center; justify-content: center; gap: 14px; }
    #shareBtn {
      margin: 0; padding: 0 16px; min-height: 46px; border-radius: 999px; cursor: pointer; animation: none; letter-spacing: 0;
      font: 800 16px system-ui, -apple-system, sans-serif; color: #fff; white-space: nowrap;
      background: rgba(255, 255, 255, 0.12); border: 2px solid rgba(255, 255, 255, 0.45); box-shadow: none;
    }
    #shareBtn:active { transform: scale(0.95); }
    html[data-mode="light"] #shareBtn { color: #1b1f33; background: #fff; border-color: rgba(27, 31, 51, 0.3); }
    #shareToast {
      position: fixed; left: 50%; bottom: max(18px, env(safe-area-inset-bottom)); transform: translateX(-50%); z-index: 30;
      padding: 10px 18px; border-radius: 999px; font: 700 15px system-ui, sans-serif; color: #fff; background: rgba(18, 6, 42, 0.9);
      pointer-events: none; opacity: 0; transition: opacity 0.25s;
    }
    #shareToast.on { opacity: 1; }
    #tiltHint {
      position: fixed; z-index: 17; left: 50%; top: max(10px, env(safe-area-inset-top)); transform: translateX(-50%);
      display: flex; align-items: center; gap: 12px; max-width: min(46vw, 330px); padding: 6px 16px 6px 10px; border-radius: 999px;
      font: 800 14px/1.25 system-ui, -apple-system, sans-serif; color: #fff; background: rgba(18, 6, 42, 0.78);
      border: 1px solid rgba(255, 255, 255, 0.25); pointer-events: none; opacity: 0; transition: opacity 0.4s;
    }
    #tiltHint.on { opacity: 1; }
    #tiltHint svg { flex: none; width: 46px; height: 46px; }
    #tiltHint .phone { transform-origin: 23px 23px; animation: tiltRock 1.6s ease-in-out infinite; }
    @keyframes tiltRock { 0%, 100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }
    @media (prefers-reduced-motion: reduce) { #tiltHint .phone { animation: none; } }
    html[data-mode="light"] #tiltHint { color: #1b1f33; background: rgba(255, 255, 255, 0.92); border-color: rgba(27, 31, 51, 0.2); }
    /* "Hold it like this": phone held sideways in two hands, shown during every 3-2-1 countdown */
    #holdGuide {
      position: fixed; z-index: 17; left: 50%; top: max(8px, env(safe-area-inset-top)); transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 18px 6px; border-radius: 22px;
      background: rgba(18, 6, 42, 0.72); border: 1px solid rgba(255, 255, 255, 0.22);
      pointer-events: none; opacity: 0; transition: opacity 0.15s;
    }
    #holdGuide.on { opacity: 1; }
    #holdGuide svg { width: min(30vh, 210px); height: auto; display: block; }
    @media (max-height: 460px) { #holdGuide { padding: 4px 10px; border-radius: 16px; } #holdGuide svg { width: 25vh; } #holdGuide span { display: none; } }
    #holdGuide span { font: 800 13px system-ui, -apple-system, sans-serif; color: #fff; letter-spacing: 0.3px; }
    html[data-mode="light"] #holdGuide { background: rgba(255, 255, 255, 0.9); border-color: rgba(27, 31, 51, 0.18); }
    html[data-mode="light"] #holdGuide span { color: #1b1f33; }
  `;
  document.head.appendChild(css);

  // ---------- 1. Share button + score card ----------
  const score = $('finalScore'), over = $('over');
  if (score && over) {
    const row = document.createElement('div');
    row.className = 'scoreRow';
    score.parentNode.insertBefore(row, score);
    row.appendChild(score);
    const btn = document.createElement('button');
    btn.id = 'shareBtn'; btn.type = 'button'; btn.textContent = '📤 Share';
    btn.setAttribute('aria-label', 'Share your score');
    row.appendChild(btn);
    btn.addEventListener('click', (e) => { e.stopPropagation(); share(); });
  }

  const toast = document.createElement('div');
  toast.id = 'shareToast';
  document.body.appendChild(toast);
  let toastT = 0;
  function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 2400); }

  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }

  // A 1080x1920 card (Instagram / WhatsApp story size)
  function makeCard() {
    const W = 1080, H = 1920, L = light();
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    const bg = g.createLinearGradient(0, 0, 0, H);
    if (L) { bg.addColorStop(0, '#f7f9ff'); bg.addColorStop(0.6, '#e6ecfb'); bg.addColorStop(1, '#ffd9c2'); }
    else { bg.addColorStop(0, '#12062a'); bg.addColorStop(0.6, '#2b0a4e'); bg.addColorStop(1, '#5a1460'); }
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    // a synthwave sun low down, behind everything
    const sun = g.createLinearGradient(0, H - 620, 0, H - 120);
    sun.addColorStop(0, '#ffd319'); sun.addColorStop(0.5, '#ff901f'); sun.addColorStop(1, '#ff2975');
    g.save(); g.globalAlpha = L ? 0.35 : 0.5; g.fillStyle = sun; g.beginPath(); g.arc(W / 2, H - 230, 330, Math.PI, 0); g.fill(); g.restore();

    const ink = L ? '#1b1f33' : '#ffffff';
    const grad = (y0, y1) => { const t = g.createLinearGradient(0, y0, 0, y1); t.addColorStop(0, L ? '#ff6a00' : '#fff3a0'); t.addColorStop(0.5, L ? '#ff2975' : '#ffd319'); t.addColorStop(1, L ? '#8c1eff' : '#ff2975'); return t; };
    g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.font = '900 58px Orbitron, system-ui, sans-serif'; g.fillStyle = grad(90, 160); g.fillText('TILT ARCADE', W / 2, 150);
    let size = 104; g.font = `900 ${size}px Orbitron, system-ui, sans-serif`;
    while (g.measureText(gameName().toUpperCase()).width > W - 120 && size > 50) { size -= 4; g.font = `900 ${size}px Orbitron, system-ui, sans-serif`; }
    g.fillStyle = grad(200, 300); g.fillText(gameName().toUpperCase(), W / 2, 290);

    // The final frame of the game
    const game = $('game');
    const fw = W - 120, fh = Math.round(game ? fw * (game.height / game.width) : fw * 0.5), fx = 60, fy = 360;
    g.save(); rr(g, fx, fy, fw, fh, 36); g.clip();
    if (game) g.drawImage(game, fx, fy, fw, fh); else { g.fillStyle = '#000'; g.fillRect(fx, fy, fw, fh); }
    g.restore();
    g.lineWidth = 6; g.strokeStyle = L ? 'rgba(27,31,51,0.25)' : 'rgba(255,255,255,0.45)'; rr(g, fx, fy, fw, fh, 36); g.stroke();

    // Score
    let y = fy + fh + 150;
    g.fillStyle = ink; g.globalAlpha = 0.75; g.font = '800 46px system-ui, sans-serif'; g.fillText('MY SCORE', W / 2, y); g.globalAlpha = 1;
    y += 200;
    g.font = '900 230px system-ui, sans-serif'; g.fillStyle = grad(y - 200, y); g.fillText((score && score.textContent) || '0', W / 2, y);
    const best = ($('bestLine') && $('bestLine').textContent) || '';
    if (best) { y += 90; g.fillStyle = ink; g.font = '700 48px system-ui, sans-serif'; g.fillText(best, W / 2, y); }

    // Call to action and link
    y = H - 330;
    g.fillStyle = ink; g.font = '900 64px system-ui, sans-serif'; g.fillText('Can you beat it?', W / 2, y);
    const link = pageURL().replace(/^https?:\/\//, '').replace(/\/$/, '');
    g.font = '700 38px system-ui, sans-serif';
    const lw = Math.min(W - 120, g.measureText(link).width + 70);
    g.fillStyle = L ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.35)'; rr(g, (W - lw) / 2, y + 40, lw, 76, 38); g.fill();
    g.fillStyle = L ? '#0077b6' : '#6ff7ff'; g.fillText(link, W / 2, y + 92, W - 160);

    // @seltos.gtx with the Instagram mark
    y = H - 110;
    g.font = '800 52px system-ui, sans-serif';
    const hw = g.measureText('@seltos.gtx').width, ix = W / 2 - (hw + 96) / 2, iy = y - 58, is = 72;
    const ig = g.createRadialGradient(ix + is * 0.3, iy + is * 1.07, 0, ix + is * 0.3, iy + is * 1.07, is * 1.4);
    ig.addColorStop(0, '#fdf497'); ig.addColorStop(0.05, '#fdf497'); ig.addColorStop(0.45, '#fd5949'); ig.addColorStop(0.6, '#d6249f'); ig.addColorStop(0.9, '#285aeb');
    g.fillStyle = ig; rr(g, ix, iy, is, is, 20); g.fill();
    g.strokeStyle = '#fff'; g.lineWidth = 6; rr(g, ix + 15, iy + 15, is - 30, is - 30, 12); g.stroke();
    g.beginPath(); g.arc(ix + is / 2, iy + is / 2, 11, 0, 7); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(ix + is - 22, iy + 22, 4, 0, 7); g.fill();
    g.textAlign = 'left'; g.fillStyle = ink; g.fillText('@seltos.gtx', ix + is + 24, y);
    return c;
  }

  async function share() {
    let canvas;
    try { canvas = makeCard(); } catch (e) { say('Could not make the score card'); return; }
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    const name = gameName(), pts = (score && score.textContent) || '0';
    const text = `I scored ${pts} in ${name}! Can you beat it? ${pageURL()}`;
    const file = blob && new File([blob], `${name.replace(/\W+/g, '-').toLowerCase()}-score.png`, { type: 'image/png' });
    try {
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name, text }); return; }
      if (navigator.share) { await navigator.share({ title: name, text, url: pageURL() }); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    // No share sheet (most desktops): save the image instead
    if (blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = file.name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      say('Score card saved. Post it and tag @seltos.gtx!');
    }
  }

  // ---------- 2. "Tilt like this" hint ----------
  const HINTS = {
    'midnight-run': 'Tilt your phone like a steering wheel to steer',
    'lane-rush': 'Tilt your phone like a steering wheel to steer',
    'lane-rush-classic': 'Tilt your phone like a steering wheel to steer',
    'pothole-panic': 'Tilt your phone like a steering wheel to steer',
    'hill-climb': 'Tilt your phone right for gas, left to brake',
    'sky-dash': 'Tilt your phone to climb and dive',
    'brick-smash': 'Tilt your phone to slide the paddle',
    'star-strike': 'Tilt your phone to move your ship',
    'light-trail': 'Turn your phone like a steering wheel to turn',
    'park-it': 'Turn your phone to steer, hold D / R to drive',
  };
  // The game's folder name, wherever the site is hosted (e.g. /midnight-run/ or /carplay-game/midnight-run/)
  const hintText = () => {
    const folder = location.pathname.split('/').filter((p) => p && p !== 'index.html').find((p) => HINTS[p]);
    return HINTS[folder] || 'Tilt your phone like a steering wheel to steer';
  };
  const KEY = 'tiltHintSeen:' + location.pathname, SHOW_TIMES = 2;
  let seen = 0;
  try { seen = +localStorage.getItem(KEY) || 0; } catch (e) {}
  if (seen < SHOW_TIMES) {
    const hint = document.createElement('div');
    hint.id = 'tiltHint';
    hint.setAttribute('role', 'status');
    hint.innerHTML = `<svg viewBox="0 0 46 46" aria-hidden="true">
        <path d="M6 30a19 19 0 0 1 3-17M40 30a19 19 0 0 0-3-17" fill="none" stroke="#ffd319" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M5 14l4-3 1 5M41 14l-4-3-1 5" fill="none" stroke="#ffd319" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="phone"><rect x="9" y="15" width="28" height="16" rx="4" fill="#ff2975"/><rect x="12.5" y="17.5" width="21" height="11" rx="2" fill="#12062a"/>
        <circle cx="23" cy="23" r="3" fill="none" stroke="#6ff7ff" stroke-width="1.6"/></g></svg>
      <span>${hintText()}</span>`;
    document.body.appendChild(hint);
    let hideT = 0, shown = seen, prev = '';
    window.__tiltHintTick = (state) => {        // called by the countdown watcher below
      if (prev === 'countdown' && state === 'play' && shown < SHOW_TIMES) {
        shown++;
        try { localStorage.setItem(KEY, String(shown)); } catch (e) {}
        hint.classList.add('on'); clearTimeout(hideT);
        hideT = setTimeout(() => hint.classList.remove('on'), 3500);
      } else if (state !== 'play' && hint.classList.contains('on')) { hint.classList.remove('on'); clearTimeout(hideT); }
      prev = state;
    };
  }
  // ---------- 3. "Hold it like this" during the countdown ----------
  // Every game exposes its state as window.__<name> = { G, ... }; show the guide while G.state is 'countdown'.
  const guide = document.createElement('div');
  guide.id = 'holdGuide';
  guide.setAttribute('aria-hidden', 'true');
  guide.innerHTML = `<svg viewBox="0 0 240 132">
      <defs>
        <linearGradient id="hgScreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa9f5"/><stop offset=".55" stop-color="#9fd8ff"/><stop offset=".56" stop-color="#4aae45"/><stop offset="1" stop-color="#3f9e3a"/></linearGradient>
        <linearGradient id="hgSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6cfa0"/><stop offset="1" stop-color="#d9a273"/></linearGradient>
      </defs>
      <!-- palms and fingers behind the phone -->
      <path d="M6 132 L12 94 Q10 64 28 54 Q44 48 54 56 L52 112 Q46 126 36 132 Z" fill="url(#hgSkin)" stroke="#b97a4e" stroke-width="2"/>
      <path d="M234 132 L228 94 Q230 64 212 54 Q196 48 186 56 L188 112 Q194 126 204 132 Z" fill="url(#hgSkin)" stroke="#b97a4e" stroke-width="2"/>
      <!-- iPhone, landscape -->
      <rect x="40" y="28" width="160" height="80" rx="17" fill="#18181c" stroke="#9aa0ab" stroke-width="3"/>
      <rect x="48" y="35" width="144" height="66" rx="11" fill="url(#hgScreen)"/>
      <path d="M112 71 L128 71 L150 101 L90 101 Z" fill="#5a5d63"/><path d="M119 75h2v6h-2zM119 86h2v8h-2z" fill="#fff"/>
      <rect x="111" y="86" width="9" height="12" rx="2.5" fill="#e53935"/>
      <rect x="52" y="56" width="7" height="24" rx="3.5" fill="#000"/>
      <!-- level line: hold it steady -->
      <path d="M70 46H170" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5" stroke-linecap="round" opacity=".85"/>
      <!-- thumbs: from the palm at the lower side, resting on the screen edge and pointing inward -->
      <path d="M36 104 Q44 84 66 72" fill="none" stroke="#b97a4e" stroke-width="19" stroke-linecap="round"/>
      <path d="M36 104 Q44 84 66 72" fill="none" stroke="#efc08f" stroke-width="15" stroke-linecap="round"/>
      <ellipse cx="65" cy="72.5" rx="5" ry="3.6" transform="rotate(-28 65 72.5)" fill="#fbe3cb" stroke="#d9a273" stroke-width="1"/>
      <path d="M204 104 Q196 84 174 72" fill="none" stroke="#b97a4e" stroke-width="19" stroke-linecap="round"/>
      <path d="M204 104 Q196 84 174 72" fill="none" stroke="#efc08f" stroke-width="15" stroke-linecap="round"/>
      <ellipse cx="175" cy="72.5" rx="5" ry="3.6" transform="rotate(28 175 72.5)" fill="#fbe3cb" stroke="#d9a273" stroke-width="1"/>
    </svg><span>Hold the phone sideways, like this</span>`;
  document.body.appendChild(guide);
  let hook = null;
  setInterval(() => {
    if (!hook) for (const k of Object.keys(window)) if (k.startsWith('__') && window[k] && window[k].G) { hook = window[k]; break; }
    const state = hook ? hook.G.state : '', on = state === 'countdown';
    if (window.__tiltHintTick) window.__tiltHintTick(state);
    if (on !== guide.classList.contains('on')) guide.classList.toggle('on', on);
  }, 100);
})();
