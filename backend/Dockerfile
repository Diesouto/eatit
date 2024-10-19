# Dockerfile
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your server runs on
EXPOSE 5050

# Build the React app (if you are serving it from here)
RUN npm run build

# Start the server
CMD ["npm", "app"]
