FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm@8.14.0
RUN pnpm install
RUN pnpm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["pnpm", "start"]
