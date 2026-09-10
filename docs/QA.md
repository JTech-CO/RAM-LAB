# QA and validation scope

Version 1.1.0. Review date: 2026-09-10.

## Executed results

| Suite | Result | Evidence |
|---|---:|---|
| Model invariants | 40 / 40 | `tests/results/model-tests.tap` |
| Existing browser behavior | 44 / 44 | `tests/results/browser-results.json` |
| Version 1.1 UI regressions | 92 / 92 | `tests/results/ui-regression-results.json` |
| Layout-only matrix | 210 / 210 | `tests/results/layout-matrix.json` |

The 210 layout cases are narrow overflow checks, not additional independent physics or functional validations. They cover 2 languages × 7 viewport sizes × 5 memory types × 3 views, including QLC and landscape layouts. The UI regression suite separately checks 320, 360, 390, 600, 768, 834, 1024, 1280 and 1536 CSS-pixel widths in both languages.

**Model and existing behavior.** Reads/writes, address isolation and replay; volatile power loss and flash retention; program rejection and block erase; Gray mappings; charge conservation; row hits, leakage and refresh; invalid input and QLC packing; HBM direction metadata; actual UI-driven data changes; Korean UTF-8 round-trip; array selection; exploded geometry; playback/pause; source/help/comparison dialogs; PNG and JSON Blob contents.

**Version 1.1.** Language switching without model or camera reset; reversible translation of open dialogs; dynamic English translation coverage through operation stages, power changes and formats; preservation of Korean user data inside the English UI; short flow captions; collapsible details; no visible em dash in audited UI; a 12px computed-size floor for visible non-SVG UI text; circuit buttons, wheel, drag, keyboard, zoom bounds, fit/reset, camera retention across stages/types and initial centering; emulated two-finger touch pinch and pointer cleanup; phone defaults; expanded-view fallback; internally scrollable arrays and tables; preference read/write and blocked-storage handling.

No uncaught JavaScript errors were observed in the executed behavioral suites. Test code and JSON reports identify individual assertions.

## Interpreting font and layout checks

The 12px floor applies to interface text, not to a schematic deliberately zoomed out by the user. Circuit SVG text starts at 16 logical pixels; default phone scale is 100%. An explicit Fit view can make this lettering smaller. A narrow display does not reduce the surrounding toolbar text.

Viewport dimensions are CSS pixels. Tests emulate browser dimensions and touch input, not the optics, font rasterization or browser implementation of a physical phone or tablet. The matrix checks page-wide horizontal overflow. It is not a proof that all possible texts, localization changes or assistive technologies have zero layout defects.

## Explicit verification limitations

The available Chromium environment did not create a WebGL 2 context. Rendering checks used the application's **software 3D fallback**. Native WebGL shader execution, GPU performance and GPU memory behavior were not runtime-validated. Fallback results are not WebGL certification.

The environment restricts direct HTTP/file navigation. Browser suites load the portable document with `page.set_content()`. This exercises the built HTML, scripts and styles, but does not test file URL policy, public hosting, GitHub Pages, origin security headers or navigation permissions. No public URL was deployed. The language preference tests use a storage fixture plus an explicit denied-storage fixture; they do not certify storage persistence on every file URL implementation.

Touch pinch uses Chromium's CDP touch events rather than fingers on physical hardware. Native fullscreen fallback is tested by making the capability unavailable; platform-specific native fullscreen remains browser-dependent. Safari, Firefox, iOS Safari, screen readers and a formal accessibility audit were not tested.

PNG/JSON assertions inspect generated Blob payloads. The operating system's download picker and destination folders were not exercised. Scientific tests validate the documented educational model rather than measurements from a real semiconductor device.

## Run again

```sh
npm test
npm run test:browser
npm run test:ui
npm run test:layouts
```

Browser scripts rebuild the portable document first. They need Python, Playwright and Chromium. `CHROMIUM_PATH` can specify an executable; otherwise the runner uses Chromium on PATH or Playwright's installed browser. The application itself has no such runtime dependency.
