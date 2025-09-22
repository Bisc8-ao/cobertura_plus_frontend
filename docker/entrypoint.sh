#!/bin/sh
set -e

INDEX=/app/dist/index.html
PORT=${PORT:-8080}

echo "[entrypoint] Starting container, injecting runtime env..."

if [ -f "$INDEX" ]; then
    # Substitui placeholders (podem estar vazios)
    sed -i "s|__VITE_API_KEY_GOOGLE__|${VITE_API_KEY_GOOGLE:-}|g" "$INDEX"
    sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" "$INDEX"

    if [ -z "${VITE_API_KEY_GOOGLE:-}" ]; then
      echo "[entrypoint] Warning: VITE_API_KEY_GOOGLE is empty"
    else
      echo "[entrypoint] VITE_API_KEY_GOOGLE present (not printed for security)"
    fi

    echo "[entrypoint] Injecting complete."
else
    echo "[entrypoint] Warning: $INDEX not found. Nothing injected"
fi

echo "[entrypoint] Starting static server on 0.0.0.0:${PORT}"
# serve aceita "tcp://0.0.0.0:PORT" para bind seguro
exec serve -s /app/dist -l "tcp://0.0.0.0:${PORT}"
