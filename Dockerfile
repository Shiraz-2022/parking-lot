# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY  . .

# Build the TypeScript app
RUN npm run build

# Expose the port your app uses
EXPOSE 3000

# Run the built app
CMD ["node", "dist/main"]
