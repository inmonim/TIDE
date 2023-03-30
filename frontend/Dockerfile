# Builder
FROM node:18.12.1 as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn add typescript
RUN yarn build

# Runner
FROM nginx:stable-alpine as runner

# Copy nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]