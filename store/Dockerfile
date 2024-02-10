# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# If you are using Prisma, install the Prisma CLI
RUN npm install prisma --save-dev

# Copy project files and folders to the current working directory (i.e., “/app” folder)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js start script
CMD ["npm", "run","dev"]
