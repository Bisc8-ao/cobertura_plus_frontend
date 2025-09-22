# -------- Stage 1: Build --------
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci
COPY . .

# Copy source and build
ARG VITE_API_URL
ARG VITE_API_KEY_GOOGLE

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY_GOOGLE=$VITE_API_KEY_GOOGLE

RUN $VITE_API_URL $VITE_API_KEY_GOOGLE npm run build

# -------- Stage 2: Runtime (no Nginx) --------
FROM node:22-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist
# Cloud Run expõe 8080 por convenção
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
