# Changelog

## 1.1.0 - 2026-09-10

Presentation and interaction update; no changes to `js/simulator.js` or `js/models.js`.

- Replace UI em dashes with hyphens or semantic separators. Raw user data is not rewritten.
- Replace 6-9px UI labels with a 12px minimum and use generally 15px body/detail text. Raise schematic lettering, strengthen muted-text contrast and enlarge controls instead of squeezing them.
- Add offline KR/EN catalogs and a reversible presentation-localization layer. Translate static and dynamic text, SVG labels, help, validation and source notes. Preserve user data and simulator/camera state. Save language preference only, with storage-denial handling.
- Use compact stage captions and short summaries. Keep detailed explanations in disclosure panels; phone sessions default to collapsed stage details and hidden 3D callouts.
- Add an independent circuit camera with buttons, wheel, drag, touch pinch, keyboard, fit/reset and per-memory view retention. Preserve the camera when the inner SVG is replaced. Avoid caching an uninitialized, zero-sized camera before the first circuit view.
- Reflow navigation, controls, inspector, data panels and details for phones/tablets. Keep wide arrays/tables internally scrollable. Add expanded-view fallback for platforms without native fullscreen.
- Update the portable builder to tolerate HTML attribute ordering and preserve literal JavaScript replacement tokens.
- Add 92 UI regression checks and a 210-case layout matrix alongside the existing 40 model tests and 44 browser checks.

No manufacturing, etching, device physics, benchmark claims or new memory mechanisms were added.
