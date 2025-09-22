# -------- Stage 1: Build --------
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG VITE_API_URL
ARG VITE_API_KEY_GOOGLE
# These args are optional at build-time; main idea is runtime injection
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY_GOOGLE=$VITE_API_KEY_GOOGLE

RUN npm run build

# -------- Stage 2: Runtime (no Nginx) --------
FROM node:22-alpine
WORKDIR /app

# Install a tiny static server
RUN npm i -g serve

# Copy built files
COPY --from=build /app/dist ./dist

# Copy entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
USER node
CMD ["/entrypoint.sh"]
