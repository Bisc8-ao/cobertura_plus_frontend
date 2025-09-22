# -------- Stage 1: Build --------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# -------- Stage 2: Runtime --------
FROM node:22-alpine
WORKDIR /app

# Install a tiny static server (as root)
RUN npm i -g serve@14

# Copy built files and give ownership to node user
COPY --from=build /app/dist ./dist
RUN chown -R node:node /app/dist

# Copy entrypoint and make it executable
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use a non-root user for process safety
USER node

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
