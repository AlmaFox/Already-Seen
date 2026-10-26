# Already Seen

Browser extension (Manifest V3) that marks YouTube videos as watched, keeps a Watch Later list, and dims or hides watched thumbnails. Includes a dashboard with search and statistics. Interface: English / Russian.

Primary target is Chromium (Microsoft Edge, Chrome). A Firefox build uses the same code with a different manifest (`firefox/manifest.json`).

All data is stored locally in `storage.local`. The only network request is YouTube oEmbed (`youtube.com/oembed`) to fetch a video's title and channel by its ID.

## Install

**Edge / Chrome** — open `edge://extensions` (or `chrome://extensions`), enable Developer mode, click "Load unpacked" and select this folder. After changing the code, press the reload button on the extension card.

**Firefox** — build the package (below) and install it via `about:addons` → gear → "Install Add-on From File…", or load the built `.xpi` temporarily via `about:debugging`.

## Build

```powershell
./build.ps1                    # dist/already-seen-edge-<version>.zip
./build.ps1 -Target firefox    # dist/already-seen-firefox-<version>.xpi
./build.ps1 -IncludeHistory    # also bundle initial_history.json
```

Keep the `version` in `manifest.json` and `firefox/manifest.json` in sync.

## Optional seed history

If `initial_history.json` (same format as the exported backup) is present, it is loaded once on first run. It is git-ignored.
