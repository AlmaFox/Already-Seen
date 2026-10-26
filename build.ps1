# Packs the extension into dist/.
#   ./build.ps1                      -> dist/already-seen-edge-<version>.zip   (Chromium / Edge)
#   ./build.ps1 -Target firefox      -> dist/already-seen-firefox-<version>.xpi
# Personal data (initial_history.json, backups) is not included unless -IncludeHistory is passed.
param(
  [ValidateSet('edge', 'firefox')]
  [string]$Target = 'edge',
  [switch]$IncludeHistory
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = $PSScriptRoot
$manifestPath = if ($Target -eq 'firefox') { Join-Path $root 'firefox/manifest.json' } else { Join-Path $root 'manifest.json' }
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$ext = if ($Target -eq 'firefox') { 'xpi' } else { 'zip' }

$out = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $out | Out-Null
$pkg = Join-Path $out "already-seen-$Target-$($manifest.version).$ext"
if (Test-Path $pkg) { Remove-Item $pkg }

$skip = @('dist', 'firefox', 'build.ps1', 'README.md', '.git', '.gitignore', 'already_seen_backup.json')
if (-not $IncludeHistory) { $skip += 'initial_history.json' }

$zip = [System.IO.Compression.ZipFile]::Open($pkg, 'Create')
try {
  Get-ChildItem $root -Recurse -File | ForEach-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $top = $rel.Split('/')[0]
    if ($skip -contains $top) { return }
    if ($Target -eq 'firefox' -and $rel -eq 'manifest.json') { return }
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel) | Out-Null
  }
  if ($Target -eq 'firefox') {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $manifestPath, 'manifest.json') | Out-Null
  }
} finally {
  $zip.Dispose()
}

Write-Host "Built $pkg"
