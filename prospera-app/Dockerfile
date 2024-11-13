# Use the official Node.js image as a build environment
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY prospera-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY prospera-app/ .

# Build the React application for production
RUN npm run build

# Use NGINX to serve the static files
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
