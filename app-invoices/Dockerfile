FROM node:lts-alpine AS base

# habilita pnpm via corepack
RUN corepack enable

# ------ #

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

# ------ #

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

USER api

EXPOSE 3333

ENV PORT=3333
ENV HOSTNAME=0.0.0.0

CMD ["pnpm", "run", "start"]
