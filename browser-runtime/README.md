# AWE Play — Browser Game Platform UI

Branch: `feat/browser-game-runtime` (based on `Real`).

## Platform experience

The `browser-runtime/` folder contains a responsive, dark-by-default AWE Play interface with a quiet, low-noise visual language:

- Persistent navigation rail, responsive mobile drawer, search and category filters.
- Featured experience area, continue-playing cards, discovery grid and project footer.
- AWE Drive launch flow and an embedded Canvas 2D driving demo.
- Runtime capability status and local WebAssembly module compilation/metadata inspection.
- Light appearance toggle; no account or remote service is required for the prototype.

## Run locally

Serve this directory with any static HTTP server and open `index.html`. No build step or dependency installation is required. Google Fonts are optional; system fonts remain as fallback.

## Current implementation boundaries

- AWE Drive is a small Canvas 2D top-down demo, not a 3D open-world game.
- WebGPU availability is detected, but rendering currently uses Canvas 2D.
- A selected WASM module is compiled and inspected locally; it is not executed through a game ABI.
- Search and category filters operate on the sample experiences only.
- The theme toggle is session-only. Navigation, accounts, cloud saves, multiplayer, store, catalog APIs and streamed game delivery are not connected.
- SharedArrayBuffer requires cross-origin isolation headers (COOP/COEP), not configured by this static prototype.

## Architecture roadmap

1. Define and version the AWE WASM Game ABI (lifecycle, input, memory, rendering and audio contracts).
2. Implement WebGPU rendering with WebGL/Canvas fallbacks.
3. Add signed manifests, chunked asset delivery, cache and save-state boundaries.
4. Add worker-based simulation and capability-aware performance profiles.
5. Add a real catalog service, identity integration and optional multiplayer only after the runtime contract is stable.

## Legal and technical scope

This is an original browser-native foundation, not a GTA V port, emulator, cloud gaming service or copy of FivePlay. A browser cannot simply execute an arbitrary Windows game executable. Every title needs a compatible browser build, engine port or authorized runtime. Do not bundle copyrighted game files, proprietary engine code or bypass DRM. Commercial titles need an authorized distribution path.
