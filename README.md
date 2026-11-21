# AWEGame — The Playverse

AWEGame is a static, browser-first gaming portal: one immersive interface for AWE's curated games, browser launches, downloads and player tools. It runs without an application backend or server functions.

## Curated publishing model

- Only the AWE owner adds or removes games.
- There is no public Creator Studio, upload form, user publishing flow or local draft publishing.
- The website reads the official catalog from:
  `https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/awegames.json`
- To publish a game, the owner adds its metadata to `ARARAT33/AWEArchiveDB/awegames.json` and commits the change. The AWEGame Store refreshes that public catalog.
- Visitors can search, filter, launch browser games inside the AWEGame player, and download listed builds from their AWE Store cards.

## Catalog format

The catalog may be a JSON array or an object containing a `games`, `awegames`, `items` or `data` array.

```json
[
  {
    "id": "example-game",
    "title": "Example Game",
    "description": "A short description",
    "play_url": "https://example.org/game/",
    "download_url": "https://example.org/releases/example-game.zip",
    "logo": "https://example.org/logo.webp",
    "developer": "AWE",
    "version": "1.0.0",
    "category": "adventure",
    "platforms": ["web", "windows", "linux"],
    "featured": true
  }
]
```

Accepted aliases include `name`, `desc`, `elink`, `url`, `launch_url`, `download`, `file_url`, `direct_download`, `logo_url`, `image`, `cover`, `icon`, `os`, `operating_systems`, `supported_os` and `platform`. HTTP(S) links only are accepted.

## Play and download behavior

- Browser-playable titles open inside the AWEGame player overlay by default.
- AWE-hosted local games open inside the same AWEGame shell.
- Downloadable builds are initiated from the AWE Store card. The site attempts to fetch the file and save it through the browser; if the file host blocks cross-origin downloads, the browser must use that host's download URL.
- A static website cannot technically force a downloaded Windows/macOS/Linux executable to launch only from the website. That requires a separately installed launcher or operating-system integration. AWEGame does not pretend to provide that restriction.
- Some third-party game hosts prohibit iframe embedding. Those titles may need to be hosted under AWE-controlled pages for guaranteed in-site launch.

## Platform features

- Futuristic responsive AWE Playverse interface with animated cosmic surfaces and liquid-glass panels.
- Search, genre filters, favorites, recent sessions, featured/random launch and platform-aware Store filters.
- In-site game player with fullscreen and optional pop-out.
- Local player identity, achievements feed, favorites and recent history.
- Local JSON backup and restore for player data.
- Browser-native screenshot and screen recording tools in `awe-capture.js`.
- PWA installation and static shell caching.

## Privacy and limitations

Player name, favorites, recent history, theme and local achievements stay in browser storage. No cloud account, cross-device sync, online leaderboard or multiplayer backend is provided. Clearing browser storage may erase local progress. Browser screen capture requires HTTPS or localhost and explicit user permission. Downloaded desktop software remains subject to the operating system's security checks.
