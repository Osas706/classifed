# Use the official Node.js image for building the React app.
FROM node:14 AS build

# Set the working directory.
WORKDIR /frontend

# Copy package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of your application code.
COPY . .

# Build the React app.
RUN npm run build

# Use a lightweight web server to serve the build files (production stage).
FROM nginx:alpine

# Copy the build files from the previous stage.
COPY --from=build /frontend /usr/share/nginx/html

# Expose the port the server runs on.
EXPOSE 5173

# Command to run nginx.
CMD ["nginx", "-g", "daemon off;"]