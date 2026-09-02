# Download 14 gallery photos for the Warsaw Barbican guide from LoremFlickr
# (redirects to live.staticflickr.com). Tag rotation: warsawbarbican / warsawoldtown / warsaw.
# When real photos are available, replace public/gallery/warsaw-barbican-1..14.jpg and
# delete the .svg placeholders — keep the same file names.
param(
  [int]$Count = 14,
  [int]$Width = 1200,
  [int]$Height = 800
)

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\gallery"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$tags = @("warsawbarbican", "warsawoldtown", "warsaw")
$ok = 0

for ($i = 1; $i -le $Count; $i++) {
  $out = Join-Path $outDir "warsaw-barbican-$i.jpg"
  $tag = $tags[($i - 1) % $tags.Count]
  $lock = ($i * 137) % 997
  $url = "https://loremflickr.com/$Width/$Height/$tag`?lock=$lock"
  curl.exe -sL -m 40 $url -o $out
  if (-not (Test-Path $out)) { Write-Host "SKIP $i (no file)"; continue }
  $bytes = [System.IO.File]::ReadAllBytes($out)
  if ($bytes.Length -gt 20000 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) {
    $ok++
    Write-Host "OK $i ($( [math]::Round($bytes.Length/1kb) ) KB)"
  } else {
    Write-Host "RETRY $i with fallback tag"
    curl.exe -sL -m 40 "https://loremflickr.com/$Width/$Height/warsaw`?lock=$lock" -o $out
    $bytes = [System.IO.File]::ReadAllBytes($out)
    if ($bytes.Length -gt 20000 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) {
      $ok++
      Write-Host "OK $i (fallback)"
    } else {
      Write-Host "FAIL $i"
    }
  }
}

Write-Host "Downloaded $ok / $Count valid JPEGs."
