FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the development server with debugging enabled
CMD ["npm", "run", "dev"]

# Enable hot reload by setting environment variable
ENV WATCHPACK_POLLING=true