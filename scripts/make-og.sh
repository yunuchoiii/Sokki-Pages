#!/bin/bash
# scripts/og-source.svg → public/og.png (1200×630). macOS 전용: qlmanage 로 SVG 를 그리고 sips 로 가운데를 자른다.
# qlmanage 는 정사각형으로만 그려서 원본을 1200×1200 으로 두고 가운데 630px 띠를 잘라 낸다.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
qlmanage -t -s 1200 -o "$TMP" "$DIR/scripts/og-source.svg" >/dev/null 2>&1
sips -c 630 1200 "$TMP/og-source.svg.png" --out "$DIR/public/og.png" >/dev/null
qlmanage -t -s 180 -o "$TMP" "$DIR/public/favicon.svg" >/dev/null 2>&1
sips -s format png "$TMP/favicon.svg.png" --out "$DIR/public/apple-touch-icon.png" >/dev/null
rm -rf "$TMP"
sips -g pixelWidth -g pixelHeight "$DIR/public/og.png" | tail -2
