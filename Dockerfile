FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Build Args untuk API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
# Install sharp secara manual untuk optimasi gambar di Docker
RUN npm install && npm install sharp 

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Penting: Copy public folder (untuk logo/static assets)
COPY --from=builder /app/public ./public
# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Copy node_modules yang berisi sharp agar image optimization jalan
COPY --from=builder /app/node_modules/sharp ./node_modules/sharp

EXPOSE 3000
CMD ["node", "server.js"]