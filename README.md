# AWEGame

AWEGame is a browser-game collection with a calm, consistent AWE Play interface.

## Main application

- `index.html` — responsive AWEGame home and catalog.
- `games.js` — curated local game catalog.
- `awe-platform.js` / `awe-platform.css` — search, categories, favorites, recently played, theme, responsive UI and shared design layer.
- `awe-game-ui.js` — small shared in-game home/fullscreen controls.
- `manifest.webmanifest`, `awe-mark.svg`, `sw.js` — install metadata, app mark and local shell caching.
- `browser-runtime/` — experimental AWE browser runtime playground and AWE Drive demo.
- `games/` — individual browser games.

## Catalog behavior

Local games appear immediately. Optional AWEArchiveDB entries are fetched from the public archive and validated to allow only HTTP(S) destinations. Search covers title, description and developer. Category filters, favorites and recently played are local-device features stored in browser localStorage.

## Offline and installation

The service worker caches the app shell and local game documents. Individual games may still depend on third-party libraries, fonts, or services and may not be fully playable offline. The web app manifest enables installation where the browser and hosting origin support it.

## Safety

The service worker is self-contained and does not import remote scripts. Archive links are restricted to HTTP(S). Favorites and recent history stay in local browser storage; there is no account, analytics endpoint, or remote profile backend in this prototype.

## Development status

This is a static browser-game platform. It does not yet provide cloud saves, multiplayer, a remote user account system, game streaming, or a universal engine capable of running arbitrary desktop games. The browser runtime remains an experimental foundation.
