# Architecture

The app uses classic deferred scripts in dependency order. All assets have relative paths. There is no bundler, CDN, service worker, network API or third-party runtime.

| File | Responsibility |
|---|---|
| `index.html` | Semantic controls, language switch, disclosure panels and stable visualization containers |
| `css/app.css` | Responsive layout, 12px UI minimum, detail hierarchy, touch controls and fullscreen fallback |
| `js/content.js` | Base profiles, component explanations and source registry |
| `js/locales.js` | Offline Korean/English catalog, concise summaries and stage captions |
| `js/i18n.js` | Source-preserving text/attribute localization and guarded language preference storage |
| `js/simulator.js` | Deterministic memory state machine and illustrative electrical model; CommonJS export for tests |
| `js/engine.js` | 3D camera, procedural rendering, WebGL 2, Canvas fallback and translated callouts |
| `js/models.js` | Representative device geometry and signal paths |
| `js/circuit.js` | SVG circuits, signal charts and threshold distributions derived from the simulator |
| `js/circuit-viewport.js` | Independent 2D camera, pointer gestures, wheel/keyboard controls and per-device views |
| `js/app.js` | Events, stage playback, bindings, dialogs and exports |
| `server.cjs` | Optional localhost-only static development server |
| `scripts/build-portable.cjs` | Inline CSS, scripts and favicon into the portable HTML |
| `tests/` | Model, original browser, v1.1 interaction and layout-only suites |

## State boundaries

`Simulator` is the source of truth for stored data and operation stages. Version 1.1 does not alter this kernel or the model-construction code. Inspecting a part, changing camera or translating the interface must not seek, reset or mutate the simulator. Render functions derive the circuit, array and measured values from the same state.

The 2D camera transforms a fixed 860 × 430 logical surface. Rendering replaces only `#circuit-surface` contents, leaving pointer listeners and the outer camera intact. Each device has a session-local camera cache. A view is saved only after nonzero dimensions have been measured. Resize adjusts the viewport center; Fit mode recalculates its scale. Touch cancellation clears pointer capture.

Camera scale is 0.25 to 4. The small-screen default is 1, not a tiny auto-fit. UI typography is outside this transformed surface. Consequently, the 12px UI floor does not prohibit a user from explicitly zooming out and making schematic lettering smaller.

## Localization

`content → locales → i18n` load before the simulator and renderers. Catalog entries contain source text, concise Korean wording and English wording. Regular expressions handle controlled dynamic templates such as addresses and threshold values. Missing Korean strings in English mode are exposed through `RAMLab.i18n.missing` for auditing.

A `WeakMap` retains each node's original string and most recent output, making a language toggle reversible. Text and `title` / `aria-label` / `placeholder` attributes are localized. Input values, user-output regions, technical opcodes and script/style content are excluded. Only `ram-lab.language` is persisted; denied storage is handled without stopping initialization. No stored memory state or external translation service is used.

Keep scientific detail in its full source record, and place concise flow labels in `RAM.flowLabels` and short overview text in `RAM.summaries`. Do not encode shortened text by cutting sentences or truncating scientific values at runtime.

## Development boundary

Rebuild the portable file after source edits. It is generated output, not the preferred editing source. JSON export is a diagnostic snapshot; import/restore is not implemented. Extend invariant tests before adding a scientific mechanism. Product-calibrated timing, real ECC/FTL or analog-device solvers belong in separate kernels, not in animation code.
