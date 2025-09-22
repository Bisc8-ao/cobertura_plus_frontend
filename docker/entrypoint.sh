#!/bin/sh
set -e

INDEX=/app/dist/index.html

echo "[entrypoint] Starting container, injecting runtime env..."

if [ -f "$INDEX" ]; then
    # Replace placeholders. Use parameter expansion to allow empty default.
    sed -i "s|__VITE_API_KEY_GOOGLE__|${VITE_API_KEY_GOOGLE:-}|g" "$INDEX"
    sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" "$INDEX"
    echo "[entrypoint] Injecting complete."
else
    echo "[entrypoint] Warning: $INDEX not found. Nothing injected"
fi

# Start static server (serve) on port 8080
exec serve -s /app/dist -l 8080
