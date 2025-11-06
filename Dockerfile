FROM node:20-bullseye AS builder
 
WORKDIR /app
 
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*
 
COPY package*.json ./
COPY prisma ./prisma/
 
RUN npm ci
 
COPY . .
 
RUN npx prisma generate
RUN npm run build
 
FROM node:20-bullseye AS runner
 
WORKDIR /app
ENV NODE_ENV=production
 
# Copy package manifests and Prisma schema
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
 
# Install production dependencies only
RUN npm ci --omit=dev
 
# Generate Prisma Client in the runtime environment
RUN npx prisma generate
 
# Copy built Next.js app and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/tsconfig.json ./tsconfig.json
 
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]