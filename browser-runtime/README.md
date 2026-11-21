# AWE Play — Browser Runtime Prototype

Experimental implementation on `feat/browser-game-runtime`, based on the AWEGame `Real` branch.

## What is included

- Responsive browser launcher UI under `browser-runtime/`.
- A small playable top-down driving demo rendered with Canvas 2D.
- Keyboard controls (WASD / arrow keys) and restart.
- WebGPU capability detection with Canvas fallback.
- Local WebAssembly module selection and compilation/metadata inspection. The selected file stays in the browser; it is not uploaded.

## Run locally

Open `index.html` through a local static HTTP server (recommended) or a static hosting preview. No build step or dependency installation is required.

## Architecture direction

1. **Presentation shell** — library, launch surface, settings and status.
2. **Runtime host** — browser APIs, input, lifecycle, storage and diagnostics.
3. **Graphics backends** — WebGPU when available, Canvas/WebGL fallback.
4. **WASM game ABI** — a documented contract for supported game modules, memory, imports, frame updates and input.
5. **Asset delivery** — manifests, chunked downloads, cache and progressive loading.
6. **Optional multiplayer** — a separate networking layer; never assume peer connections are trusted.

## Important scope and legal boundary

This is a foundation/demo, not a port of GTA V, not an emulator, and not a cloud gaming service. A browser cannot simply run an arbitrary Windows game executable. Each game needs a compatible browser build, engine port or authorized runtime. Do not bundle copyrighted game files, proprietary engine code, or bypass DRM. Commercial titles must be supplied through a lawful, authorized distribution path.

## Current limitations

- The demo is a simple Canvas 2D game, not a 3D engine.
- WebGPU is detected but is not yet used for rendering.
- WASM files are compiled and inspected, not executed as games.
- No asset streaming, save synchronization, game catalog API, multiplayer or account integration yet.
- SharedArrayBuffer requires cross-origin isolation headers (COOP/COEP), which are not configured by this static prototype.

## Next engineering milestones

- Define and version the AWE WASM Game ABI.
- Add a real WebGPU renderer and WebGL fallback.
- Add signed game manifests and chunked asset cache.
- Add worker-based simulation and optional SharedArrayBuffer only when isolated.
- Add automated browser tests and performance profiling on low-memory integrated-GPU devices.
