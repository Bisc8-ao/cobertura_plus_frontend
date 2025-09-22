# -------- Stage 1: Build --------
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .

# Keep the args/env if you ever want to build with them
#ARG VITE_API_URL
#ARG VITE_API_KEY_GOOGLE
#ENV VITE_API_URL=$VITE_API_URL
#ENV VITE_API_KEY_GOOGLE=$VITE_API_KEY_GOOGLE

RUN npm run build

# -------- Stage 2: Runtime (no Nginx) --------
FROM node:22-alpine
WORKDIR /app

# Install a tiny static server (as root)
RUN npm i -g serve@14

# Copy built files
COPY --from=build /app/dist ./dist

# Copy entrypoint
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use a non-root user (node user exists in official node image)
USER node

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
