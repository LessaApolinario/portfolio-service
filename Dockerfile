# Stage 1: Build the application
FROM node:25-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build # Compile TypeScript to JavaScript

# Stage 2: Run the production application
FROM node:25-alpine AS runner
WORKDIR /usr/src/app
# Set environment variable
ENV NODE_ENV=production

# Copy optimized production build from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/infra/main.js"]
