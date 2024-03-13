FROM node:20-alpine AS base

# BUILDER STAGE
FROM base as installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@8.9.0
RUN pnpm install --frozen-lockfile
# RUN sed -i "" 's/"@cllgnotes\/zod": ".*"/"@cllgnotes\/zod": "file:.\/packages\/zod"/' package.json

# PRODUCTION DEPLOYMENT STAGE
FROM base as runner_production
WORKDIR /app
ARG PORT=3002
ENV NODE_ENV=production
RUN npm i -g nodemon

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 api
COPY --from=installer --chown=api:nodejs /app/apps/api .
COPY --from=installer --chown=api:nodejs /app/apps/api/node_modules ./node_modules

EXPOSE ${PORT}

ENV PORT ${PORT}


USER api

CMD nodemon server.js