# Builder
FROM node:18.14.1 as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build-dev

# Runner
FROM nginx:stable-alpine as runner

# Copy nginx.conf
COPY nginx.dev.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]