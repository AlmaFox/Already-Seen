# Already Seen

Firefox extension (Manifest V3) that marks YouTube videos as watched, keeps a Watch Later list, and dims or hides watched thumbnails. Includes a dashboard with search and statistics. Interface: English / Russian.

All data is stored locally in `storage.local`. The only network request is YouTube oEmbed (`youtube.com/oembed`) to fetch a video's title and channel by its ID.

## Build

```powershell
./build.ps1          # dist/already-seen-<version>.xpi, without personal history
./build.ps1 -IncludeHistory
```

Install the `.xpi` via `about:addons`, or load `manifest.json` temporarily via `about:debugging`.

## Optional seed history

If `initial_history.json` (same format as the exported backup) is present, it is loaded once on first run. It is git-ignored.
