# AWEGame

AWEGame is a static browser-game collection with a personalized AWE Play interface. It requires no application backend, account service, or server-side functions for player data.

## Main application

- `index.html` — responsive game library and personal player card.
- `games.js` — curated local game catalog.
- `awe-platform.js` / `awe-platform.css` — search, categories, favorites, recent games, light/dark appearance, profile, import/export and share controls.
- `awe-game-ui.js` — shared in-game home, fullscreen and victory-sharing controls.
- `manifest.webmanifest`, `awe-mark.svg`, `sw.js` — install metadata, app mark and local shell caching.
- `browser-runtime/` — experimental browser runtime playground.
- `games/` — individual browser games.

## Personal data and portability

Player name, favorites, recent games, appearance and recorded victories are saved in the current browser's `localStorage`. The player card can be renamed. Export creates a JSON backup file; import validates the AWEGame backup format and merges favorites, recent titles and victory history. Users can move this file to another browser/device manually.

There is no cloud account, remote save, server-side profile, or automatic synchronization. Clearing browser storage or using private browsing can remove local progress; export backups regularly.

## Victory sharing

Each game page includes a trophy control. After completing a game, the player can record a victory, optionally add a short note, and share it through the browser's native share sheet or copy/paste fallback. The share message includes the game URL. Victory recording is player-confirmed; the platform does not claim to detect every game's internal win state automatically.

## Catalog behavior

Local games appear immediately. Optional AWEArchiveDB entries are fetched from its public static JSON archive and validated to allow only HTTP(S) destinations. Search covers title, description and developer. Favorites and recent history remain local.

## Appearance, install and offline

The home page supports persistent light and dark themes and responsive layouts. The web app manifest enables installation where supported. The service worker caches the local app shell; games that depend on third-party libraries, fonts, or services may not be fully playable offline.

## Safety and limitations

No player-specific data is sent to AWEGame servers by the profile, backup or victory-sharing features. Sharing is initiated by the player and sends only the text/URL they choose through the browser's share interface. External game libraries and the public archive remain third-party network dependencies.

This is a static browser-game platform. It does not provide cross-device synchronization, online leaderboards, multiplayer, cloud saves, or a universal engine for arbitrary desktop games. Individual games retain their own mechanics and visual identity.
