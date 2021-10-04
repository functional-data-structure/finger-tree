#!/usr/bin/env sh

TIMESTAMP="$(date '+%Y-%m-%dT%H:%M:%S')"

logfile="$(printf '%s-' "$@")${TIMESTAMP}-analyze-v8.log"

node --prof --log-all --logfile="$logfile" "$@"
