# syntax=docker/dockerfile:1.6

# ----- Stage 1: build -----
FROM node:20-alpine AS builder

WORKDIR /app

# pnpm via corepack (viene con Node ≥ 16.10)
RUN corepack enable && corepack prepare pnpm@10.18.1 --activate

# Instalar deps con cache: si package.json/lock no cambian, esta capa se reusa
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del código y construir
COPY . .

# Vars de build (sobrescribibles con --build-arg)
ARG VITE_API_BASE=https://rimac-front-end-challenge.netlify.app/api
ENV VITE_API_BASE=$VITE_API_BASE

RUN pnpm build

# ----- Stage 2: serve con nginx -----
FROM nginx:1.27-alpine AS runner

# Config custom para SPA fallback + cache + gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Solo copiamos el dist final, no node_modules ni fuentes
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck básico
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
