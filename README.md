# RAM - Interactive Memory Lab

[한국어](README-KR.md) · [Changes](CHANGELOG.md) · [Scientific model](docs/SCIENTIFIC-MODEL.md) · [Sources](SOURCES.md) · [QA](docs/QA.md)

An offline interactive exploration of **SRAM, DRAM, HBM, HBF and 3D NAND**. Structure, circuits, operation stages and stored data share the same educational simulator. Based on [JTech-CO/RAM](https://github.com/JTech-CO/RAM), revision `a2c3cbd63b7058c0853e7197e22d660017d0087c`. The reference repository is not modified by this package.

## Run

Open **`RAM-Lab-Standalone.html`** in a browser. All runtime code is embedded; no CDN, account, API key or installation is needed. Alternatively, keep `index.html`, `css/`, `js/` and `assets/` together. An optional local development server is included:

```sh
npm start
# http://127.0.0.1:5173
```

Node.js 18+ is needed for the development commands, not for opening the app. The application, server, portable build and model tests have no npm dependencies.

## Version 1.1

**Readable, responsive layout.** UI text has a 12 CSS-pixel minimum, replacing the old 6-9px labels. Body and detailed explanations are generally 15px. Controls wrap rather than shrink. Narrow screens use horizontal memory navigation and stacked panels; arrays and comparison tables scroll internally.

**KR / EN.** The header and dialogs have language switches. The interface, details, diagrams, help, validation messages and source notes are localized. Switching language preserves the selected address, entered data, simulator state, playback stage and circuit camera. Only the language preference is saved in `localStorage`; switching still works when browser storage is unavailable.

**Concise overview, expandable detail.** Operation flows show short stage names. Equations, data summaries and model-scope summaries stay visible; longer explanations are inside disclosure panels. On a new phone-sized session, stage details and 3D callouts start collapsed or off to leave room for the model. They remain available through their controls.

**Circuit camera.** Use + / -, wheel or two-finger pinch to zoom; drag to pan. Each memory type retains its own circuit camera for the current session. Advancing a stage or changing language does not reset it. `Fit` provides an overview; `Reset` restores a readable default. The phone default is 100%, so pan to see the rest rather than reading a miniature diagram. Explicit zoom-out or Fit can make diagram lettering smaller; the toolbar is not scaled.

## Explore

Read, write, refresh, close rows, inspect volatile power loss and compare NAND programming with block erasure. Change SLC/MLC/TLC/QLC format, enter HEX or encode UTF-8 data, select array cells, and inspect electrical signals. Export a 3D scene PNG or a diagnostic session JSON.

| View / focus | Controls |
|---|---|
| 3D | Drag to rotate; Shift + drag to pan; wheel or pinch to zoom; R to reset |
| Circuit | Drag to pan; wheel/pinch or + / - to zoom; arrow keys to pan; F to fit; 0 / R to reset |
| Other non-input UI | Space to play/pause; arrows to change stage |

Circuit shortcuts take precedence only while the circuit has focus. The expanded-view control also has a CSS fallback when native fullscreen is unavailable.

## Develop and deploy

```sh
npm test                  # Deterministic model tests
npm run build:portable    # Regenerate RAM-Lab-Standalone.html
npm run test:browser      # Optional Python + Playwright: original functionality
npm run test:ui           # Optional Python + Playwright: v1.1 changes
npm run test:layouts      # Optional viewport-only layout matrix
```

Browser suites need Python, Playwright and Chromium. Set `CHROMIUM_PATH` when necessary. The app itself does not need these tools. See [QA scope](docs/QA.md) for actual executed results and limitations.

Publish the folder containing `index.html`, `css/`, `js/` and `assets/` to a static host. Paths are relative, including repository subpaths. After source edits, rebuild the standalone file; it is generated output, not the preferred editing source. This delivery does not deploy a public URL or commit to GitHub.

## Scientific boundaries and privacy

This is an **educational structural and behavioral model**, not SPICE, TCAD, a JEDEC timing model or a vendor emulator. Colors, geometry, lane counts and animation times are illustrative. HBF is explicitly a public-information-based conceptual model. Manufacturing and etching equipment are outside scope. Version 1.1 changes presentation and interaction, not the simulator kernel or device geometry.

WebGL 2 is preferred. A built-in depth-buffered Canvas renderer provides interactive 3D when a GPU context cannot be created. Circuit diagrams and the state machine are independent of either renderer.

No data is uploaded, and there are no analytics or external runtime assets. Only language preference persists automatically. Reloading restores sample memory contents; simulated non-volatility concerns the in-app power experiment, not browser persistence. PNG contains the 3D scene only; session JSON is an export, not an import/restore format.

## License

Application code: [MIT](LICENSE). Reference material is acknowledged in [SOURCES.md](SOURCES.md). No vendor CAD assets or font files are distributed.
