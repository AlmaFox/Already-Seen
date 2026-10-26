# Packs the extension into dist/already-seen-<version>.xpi.
# Personal data (initial_history.json, backups) is not included unless -IncludeHistory is passed.
param(
  [switch]$IncludeHistory
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = $PSScriptRoot
$manifest = Get-Content (Join-Path $root 'manifest.json') -Raw | ConvertFrom-Json
$out = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $out | Out-Null
$xpi = Join-Path $out "already-seen-$($manifest.version).xpi"
if (Test-Path $xpi) { Remove-Item $xpi }

$skip = @('dist', 'build.ps1', '.git', 'already_seen_backup.json')
if (-not $IncludeHistory) { $skip += 'initial_history.json' }

$zip = [System.IO.Compression.ZipFile]::Open($xpi, 'Create')
try {
  Get-ChildItem $root -Recurse -File | ForEach-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $top = $rel.Split('/')[0]
    if ($skip -contains $top) { return }
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel) | Out-Null
  }
} finally {
  $zip.Dispose()
}

Write-Host "Built $xpi"
