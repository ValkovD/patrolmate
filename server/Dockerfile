# FROM oven/bun:latest
# WORKDIR /app
# COPY . .
# RUN bun install

# ENV PORT=5000
# EXPOSE 5000

# CMD ["bun", "start"]
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .

EXPOSE 5000

CMD ["bun", "run", "start"]