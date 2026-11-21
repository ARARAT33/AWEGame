# AWEGame

AWEGame is a static browser-game platform with a liquid-glass AWE Play library, AWE Store and Creator Studio. Player-specific features run in the browser; no application backend or server functions are required.

## Platform modules

- `index.html` — responsive home, player dashboard, AWE Store and Creator Studio.
- `awe-platform.js` / `awe-platform.css` — catalog search, local games, archive reader, OS filters, creator drafts, profile, import/export, themes and glass UI.
- `awe-capture.js` — browser-native screen capture, screenshots, WebM recording, download and supported native file sharing.
- `awe-game-ui.js` — in-game home, fullscreen and player-confirmed victory sharing.
- `games.js` — curated browser game list.
- `games/` — individual browser games.
- `manifest.webmanifest`, `awe-mark.svg`, `sw.js` — PWA metadata, app mark and local shell caching.
- `browser-runtime/` — experimental browser runtime playground.

## AWE Store catalog format

The Store fetches the public static JSON file:

`https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/awegames.json`

The file can be a JSON array or an object containing a `games`, `awegames`, `items` or `data` array. Each entry can contain:

```json
{
  "title": "Example Game",
  "description": "A short description",
  "elink": "https://example.org/game.zip",
  "download_url": "https://example.org/game.zip",
  "play_url": "https://example.org/",
  "logo": "https://example.org/logo.webp",
  "developer": "Creator",
  "version": "1.0.0",
  "category": "adventure",
  "platforms": ["windows", "linux", "web"]
}
```

Supported metadata aliases include `name`, `desc`, `download`, `file_url`, `direct_download`, `logo_url`, `image`, `cover`, `icon`, `os`, `operating_systems`, `supported_os` and `platform`. HTTP(S) links only are accepted. File extensions help infer Windows, macOS, Linux and Android compatibility when platform metadata is absent. Unknown platform data is labelled for manual checking rather than claimed compatible.

The Creator Studio saves submitted listings in the current browser and exports JSON entries or a complete catalog JSON file. Because this site is static and has no backend, a local draft does not automatically appear for every visitor. To publish globally, add the exported entry to the AWEArchiveDB `awegames.json` array and commit it to the repository. The Store then reads the public raw JSON URL.

## Screen capture

The floating screen tools use browser APIs only:
- Screenshot: choose a screen/window/tab and save a PNG.
- Recording: choose a screen/window/tab, record to WebM, then download.
- Share: uses the native share sheet for files when the browser and OS support it; otherwise the downloaded file can be attached manually.

Screen capture requires a supported browser and a secure context (HTTPS or localhost), and always asks the user to choose what to share. Browser/OS support varies. Tab audio is included only when the browser exposes it.

## Local data, privacy and limitations

Player name, favorites, recent games, appearance, victories, creator drafts and game saves stored in localStorage stay on the current browser/device. JSON backup can move data manually. No cloud profile, automatic cross-device sync, online leaderboard or multiplayer backend is provided. Clearing browser storage can erase local data.

The PWA shell can cache local app files, but third-party games, downloads, fonts and archive access may require an internet connection. The Store does not execute downloaded desktop binaries inside the browser; users download them and install them using their operating system's normal security process.
