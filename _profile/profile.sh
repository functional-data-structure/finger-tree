#!/usr/bin/env sh

TIMESTAMP="$(date '+%Y-%m-%dT%H:%M:%S')"

logfile="$(printf '%s-' "$@")${TIMESTAMP}-v8.log"

node --prof --logfile="$logfile" "$@"
