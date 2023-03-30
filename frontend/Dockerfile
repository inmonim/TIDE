# Builder
FROM node:18.14.1 as builder

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

# Runner
FROM nginx:stable-alpine as runner

# Copy nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]