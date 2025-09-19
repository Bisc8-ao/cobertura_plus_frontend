# -------- Stage 1: Build --------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ARG VITE_API_KEY_GOOGLE
ENV VITE_API_KEY_GOOGLE=$VITE_API_KEY_GOOGLE

# Build frontend
RUN npm run build

# -------- Stage 2: Runtime --------
FROM nginx:stable-alpine

RUN adduser -D -H -u 10001 appuser

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/run/nginx \
&& chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/run /var/run/nginx /var/log/nginx

USER appuser

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
